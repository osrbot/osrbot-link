import { OSRBOT_DEVICE, rotateForWrite } from "../../packages/hid/protocol.js";

export async function loadNodeHid() {
  try {
    return await import("node-hid");
  } catch (error) {
    console.error("node-hid is not installed yet.");
    console.error("Run: npm install");
    console.error(`Original error: ${error.message}`);
    process.exitCode = 2;
    return null;
  }
}

export function getDevices(HID) {
  return HID.devices();
}

export function findOsrbotDevices(devices) {
  return devices.filter((device) =>
    device.vendorId === OSRBOT_DEVICE.vendorId &&
    device.productId === OSRBOT_DEVICE.productId
  );
}

export function formatHex(value, width = 4) {
  if (!Number.isInteger(value)) {
    return "n/a";
  }

  return `0x${value.toString(16).padStart(width, "0")}`;
}

export function printDevice(device, index) {
  console.log(`[${index}] ${device.product || "Unknown HID device"}`);
  console.log(`    vendorId:  ${formatHex(device.vendorId)}`);
  console.log(`    productId: ${formatHex(device.productId)}`);
  console.log(`    usagePage: ${formatHex(device.usagePage)}`);
  console.log(`    usage:     ${formatHex(device.usage)}`);
  console.log(`    interface: ${device.interface ?? "n/a"}`);
  console.log(`    path:      ${device.path}`);
}

export function openFirstOsrbotDevice(HID, devices) {
  const candidates = findOsrbotDevices(devices);
  const preferred = candidates.find((device) => device.usagePage === OSRBOT_DEVICE.usagePage) || candidates[0];

  if (!preferred) {
    throw new Error("OSRBOT HID device not found. Check USB connection and that macOS can see OSRBOT KVM.");
  }

  return {
    deviceInfo: preferred,
    device: openHidDevice(HID, preferred)
  };
}

function openHidDevice(HID, deviceInfo) {
  const errors = [];

  if (deviceInfo.path) {
    try {
      return new HID.HID(deviceInfo.path);
    } catch (error) {
      errors.push(`path open failed: ${error.message}`);
    }
  }

  try {
    return new HID.HID(deviceInfo.vendorId, deviceInfo.productId);
  } catch (error) {
    errors.push(`vid/pid open failed: ${error.message}`);
  }

  throw new Error(errors.join("; "));
}

export function writeLogicalReport(device, logicalReport) {
  const report = rotateForWrite(logicalReport);
  return device.write(report);
}
