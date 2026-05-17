// rawhid_darwin.go — macOS 直接 IOKit HID 访问，绕过 karalabe/hid 的 path 问题
//go:build darwin && cgo

package rawhid

/*
#cgo darwin CFLAGS: -DOS_DARWIN
#cgo darwin LDFLAGS: -framework CoreFoundation -framework IOKit

#include <CoreFoundation/CoreFoundation.h>
#include <IOKit/IOKitLib.h>
#include <IOKit/hid/IOHIDKeys.h>
#include <IOKit/hid/IOHIDManager.h>
#include <IOKit/hid/IOHIDDevice.h>
#include <string.h>
#include <stdlib.h>

// ─── Our own HID open using IOHIDManager directly (no path needed) ───

typedef struct {
	IOHIDDeviceRef device;  // IOHIDDeviceRef
	unsigned short	vendor_id;
	unsigned short	product_id;
	char			product[256];
} ios_hid_device;

// ios_hid_open — 通过 IOHIDManager 直接打开设备，不依赖 IOService path
ios_hid_device* ios_hid_open(unsigned short vendor_id, unsigned short product_id) {
	IOHIDManagerRef mgr = IOHIDManagerCreate(kCFAllocatorDefault, kIOHIDOptionsTypeNone);
	if (!mgr) return NULL;

	CFMutableDictionaryRef matchDict = CFDictionaryCreateMutable(kCFAllocatorDefault, 2,
		&kCFTypeDictionaryKeyCallBacks, &kCFTypeDictionaryValueCallBacks);
	if (!matchDict) { CFRelease(mgr); return NULL; }

	CFNumberRef vidNum = CFNumberCreate(kCFAllocatorDefault, kCFNumberShortType, &vendor_id);
	CFNumberRef pidNum = CFNumberCreate(kCFAllocatorDefault, kCFNumberShortType, &product_id);
	CFDictionarySetValue(matchDict, CFSTR(kIOHIDVendorIDKey), vidNum);
	CFDictionarySetValue(matchDict, CFSTR(kIOHIDProductIDKey), pidNum);
	CFRelease(vidNum); CFRelease(pidNum);

	IOHIDManagerSetDeviceMatching(mgr, matchDict);
	CFRelease(matchDict);

	IOReturn ret = IOHIDManagerOpen(mgr, kIOHIDOptionsTypeNone);
	if (ret != kIOReturnSuccess) { CFRelease(mgr); return NULL; }

	CFSetRef devSet = IOHIDManagerCopyDevices(mgr);
	if (!devSet || CFSetGetCount(devSet) == 0) {
		if (devSet) CFRelease(devSet);
		IOHIDManagerClose(mgr, kIOHIDOptionsTypeNone);
		CFRelease(mgr);
		return NULL;
	}

	IOHIDDeviceRef hidDev = NULL;
	{
		CFIndex count = CFSetGetCount(devSet);
		IOHIDDeviceRef *devices = (IOHIDDeviceRef*)malloc(sizeof(IOHIDDeviceRef) * count);
		CFSetGetValues(devSet, (const void**)devices);
		hidDev = devices[0];
		CFRetain(hidDev);
		free(devices);
	}
	CFRelease(devSet);
	IOHIDManagerClose(mgr, kIOHIDOptionsTypeNone);
	CFRelease(mgr);

	if (!hidDev) return NULL;

	ret = IOHIDDeviceOpen(hidDev, kIOHIDOptionsTypeSeizeDevice);
	if (ret != kIOReturnSuccess) { CFRelease(hidDev); return NULL; }

	ios_hid_device *dev = (ios_hid_device*)calloc(1, sizeof(ios_hid_device));
	if (!dev) { IOHIDDeviceClose(hidDev, kIOHIDOptionsTypeSeizeDevice); CFRelease(hidDev); return NULL; }

	dev->device = hidDev;
	dev->vendor_id = vendor_id;
	dev->product_id = product_id;

	CFStringRef prodStr = IOHIDDeviceGetProperty(hidDev, CFSTR(kIOHIDProductKey));
	if (prodStr)
		CFStringGetCString(prodStr, dev->product, sizeof(dev->product), kCFStringEncodingUTF8);
	else
		snprintf(dev->product, sizeof(dev->product), "Unknown");

	return dev;
}

// ios_hid_write — OSRBOT KVM 使用无编号报告（non-numbered）
// 整个 10 字节载荷一起发送，Report ID 固定为 0
int ios_hid_write(ios_hid_device *dev, const unsigned char *data, size_t length) {
	if (!dev || !dev->device || !data || length < 1) return -1;

	// OSRBOT KVM 的报告不使用 HID Report ID，全部字节都是载荷。
	// 所有 Report ID 固定为 0（无编号报告）。
	IOReturn ret = IOHIDDeviceSetReport(dev->device,
		kIOHIDReportTypeOutput,
		0,             // Report ID = 0 (no numbered report)
		data,          // full payload
		length);

	if (ret != kIOReturnSuccess) return -1;
	return (int)length;
}

// ios_hid_read — 同步读取 input report，无 Report ID（OSRBOT 非编号报告）
int ios_hid_read(ios_hid_device *dev, unsigned char *buf, size_t buf_size) {
	if (!dev || !dev->device || !buf || buf_size == 0) return -1;

	CFIndex len = buf_size;
	IOReturn ret = IOHIDDeviceGetReport(dev->device,
		kIOHIDReportTypeInput,
		0,            // Report ID = 0 (no numbered report)
		buf,
		&len);

	if (ret != kIOReturnSuccess) return -1;
	return (int)len;
}

// ios_hid_close
void ios_hid_close(ios_hid_device *dev) {
	if (!dev) return;
	if (dev->device) {
		IOHIDDeviceClose(dev->device, kIOHIDOptionsTypeSeizeDevice);
		CFRelease(dev->device);
	}
	free(dev);
}
*/
import "C"

import (
	"errors"
	"fmt"
	"sync"
	"unsafe"
)

// Supported returns true on macOS.
func Supported() bool { return true }

// DeviceInfo describes a discovered HID device.
type DeviceInfo struct {
	Path      string
	Product   string
	VendorID  uint16
	ProductID uint16
}

// Device is an opened HID device handle.
type Device struct {
	info DeviceInfo
	dev  *C.ios_hid_device
	mu   sync.Mutex
	isOpen bool
}

// Open opens a HID device by VID/PID using direct IOKit access, no
// IOService path needed. This works around the macOS 26+ DEXT driver
// issue where IORegistryEntryGetPath returns empty paths.
func Open(vendorID, productID uint16) (*Device, error) {
	handle := C.ios_hid_open(C.ushort(vendorID), C.ushort(productID))
	if handle == nil {
		return nil, fmt.Errorf("rawhid: failed to open device (VID=%04x PID=%04x) — device may be disconnected or in use",
			vendorID, productID)
	}
	product := C.GoString(&handle.product[0])

	return &Device{
		info: DeviceInfo{
			Product:   product,
			VendorID:  vendorID,
			ProductID: productID,
		},
		dev:    handle,
		isOpen: true,
	}, nil
}

// Write sends an output report. On macOS, the first byte is treated as Report ID.
// OSRBOT reports are 10 bytes where data[0]=command byte serves as Report ID.
func (d *Device) Write(b []byte) (int, error) {
	if len(b) == 0 {
		return 0, nil
	}

	d.mu.Lock()
	defer d.mu.Unlock()

	if !d.isOpen || d.dev == nil {
		return 0, errors.New("rawhid: device closed")
	}

	written := C.ios_hid_write(d.dev, (*C.uchar)(unsafe.Pointer(&b[0])), C.size_t(len(b)))
	if int(written) < 0 {
		return 0, errors.New("rawhid: write failed")
	}
	return int(written), nil
}

// Read reads an input report. Returns report bytes including Report ID as first byte.
func (d *Device) Read(b []byte) (int, error) {
	d.mu.Lock()
	defer d.mu.Unlock()

	if !d.isOpen || d.dev == nil {
		return 0, errors.New("rawhid: device closed")
	}

	n := C.ios_hid_read(d.dev, (*C.uchar)(unsafe.Pointer(&b[0])), C.size_t(len(b)))
	if int(n) < 0 {
		return 0, errors.New("rawhid: read failed")
	}
	return int(n), nil
}

// Close releases the device handle.
func (d *Device) Close() error {
	d.mu.Lock()
	defer d.mu.Unlock()

	if d.dev != nil {
		C.ios_hid_close(d.dev)
		d.dev = nil
		d.isOpen = false
	}
	return nil
}

// IsOpen returns whether the device is still open.
func (d *Device) IsOpen() bool {
	d.mu.Lock()
	defer d.mu.Unlock()
	return d.isOpen && d.dev != nil
}

// String returns a description.
func (d *Device) String() string {
	return fmt.Sprintf("rawhid: %s (VID=%04x PID=%04x)", d.info.Product, d.info.VendorID, d.info.ProductID)
}
