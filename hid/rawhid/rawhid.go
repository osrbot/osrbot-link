//go:build !darwin

// Package rawhid provides direct HID device access, bypassing path-based
// IOregistry lookup that fails on macOS 26+ DEXT devices.
package rawhid

import "errors"

// Supported returns true on platforms with direct HID support (macOS).
func Supported() bool { return false }

// DeviceInfo describes a discovered HID device.
type DeviceInfo struct {
	Path      string
	Product   string
	VendorID  uint16
	ProductID uint16
}

// Device is an opened HID device handle. The fallback always reports closed.
type Device struct {
	info DeviceInfo
}

// Open tries to open a HID device by VID/PID. Fallback: always fails.
func Open(vendorID, productID uint16) (*Device, error) {
	return nil, errors.New("rawhid: not supported on this platform")
}

// Write returns an error on fallback platforms.
func (d *Device) Write(b []byte) (int, error) {
	return 0, errors.New("rawhid: device not open")
}

// Read returns an error on fallback platforms.
func (d *Device) Read(b []byte) (int, error) {
	return 0, errors.New("rawhid: device not open")
}

// Close is a no-op on fallback platforms.
func (d *Device) Close() error { return nil }

// IsOpen returns false on fallback platforms.
func (d *Device) IsOpen() bool { return false }
