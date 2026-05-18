import {
  COMMAND,
  keyboardReport,
  usbSwitchQueryReport
} from "../../packages/hid/protocol.js";
import {
  getDevices,
  loadNodeHid,
  openFirstOsrbotDevice,
  printDevice,
  writeLogicalReport
} from "./hid-common.js";

const args = new Set(process.argv.slice(2));
const shouldReset = args.has("--reset");
const shouldQueryUsbSwitch = args.has("--usb-switch-status");

const HID = await loadNodeHid();
if (!HID) {
  process.exit();
}

let opened;
try {
  opened = openFirstOsrbotDevice(HID, getDevices(HID));
  console.log("Opened OSRBOT HID device:");
  printDevice(opened.deviceInfo, 0);
  console.log("");

  if (shouldReset) {
    writeLogicalReport(opened.device, keyboardReport());
    writeLogicalReport(opened.device, [COMMAND.MOUSE_ABSOLUTE, 0, 0, 0, 0, 0, 0, 0, 0]);
    writeLogicalReport(opened.device, [COMMAND.MOUSE_RELATIVE, 0, 0, 0, 0, 0, 0, 0, 0]);
    console.log("Sent safe reset reports: keyboard up, absolute mouse neutral, relative mouse neutral.");
  } else if (shouldQueryUsbSwitch) {
    opened.device.setNonBlocking(1);
    writeLogicalReport(opened.device, padReport(usbSwitchQueryReport(), 9));

    const deadline = Date.now() + 2000;
    let response = [];
    while (Date.now() < deadline) {
      response = opened.device.readSync();
      if (response.length > 0) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 20));
    }

    if (response.length === 0) {
      console.log("No USB switch response within 2 seconds.");
      process.exitCode = 1;
    } else {
      console.log(`USB switch raw response: [${response.join(", ")}]`);
      if (response[0] === 0x6f && response[2] === 3) {
        console.log(`power: ${response[3]}, input: ${response[4]}, enable_n: ${response[5]}`);
      }
    }
  } else {
    console.log("Read-only probe succeeded. Use one of:");
    console.log("  npm run hardware:hid:reset");
    console.log("  npm run hardware:hid:usb-switch-status");
  }
} catch (error) {
  console.error(`Hardware probe failed: ${error.message}`);
  process.exitCode = 1;
} finally {
  try {
    opened?.device?.close();
  } catch {
    // Ignore close errors during hardware probing.
  }
}

function padReport(report, length) {
  return [...report, ...Array(Math.max(0, length - report.length)).fill(0)];
}
