import {
  findOsrbotDevices,
  formatHex,
  getDevices,
  loadNodeHid,
  printDevice
} from "./hid-common.js";

const HID = await loadNodeHid();
if (!HID) {
  process.exit();
}

const devices = getDevices(HID);
const osrbotDevices = findOsrbotDevices(devices);

console.log(`Total HID devices: ${devices.length}`);
console.log(`OSRBOT HID candidates: ${osrbotDevices.length}`);

if (osrbotDevices.length > 0) {
  console.log("");
  osrbotDevices.forEach(printDevice);
} else {
  console.log("");
  console.log("No OSRBOT HID candidates found by node-hid.");
  console.log("Expected:");
  console.log(`    vendorId:  ${formatHex(0x413d)}`);
  console.log(`    productId: ${formatHex(0x2107)}`);
}
