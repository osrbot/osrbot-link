import assert from "node:assert/strict";
import test from "node:test";

import {
  COMMAND,
  MODIFIER,
  absoluteMouseReport,
  keyboardReport,
  relativeMouseReport,
  rotateForWrite,
  usbSwitchQueryReport,
  usbSwitchSetReport
} from "./protocol.js";

test("rotates logical reports into the hidapi write shape", () => {
  assert.deepEqual(
    rotateForWrite([COMMAND.MOUSE_ABSOLUTE, 0, 1, 0xaa, 0xbb, 0xcc, 0xdd, 0, 0]),
    [0, COMMAND.MOUSE_ABSOLUTE, 0, 1, 0xaa, 0xbb, 0xcc, 0xdd, 0]
  );
});

test("builds keyboard reports with modifiers and up to six active keys", () => {
  assert.deepEqual(
    keyboardReport({
      modifiers: MODIFIER.LEFT_CTRL | MODIFIER.LEFT_ALT,
      keys: [0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a]
    }),
    [COMMAND.KEYBOARD, 0, 5, 0, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0]
  );
});

test("builds absolute mouse reports with 0..0x7fff coordinates", () => {
  assert.deepEqual(
    absoluteMouseReport({ buttons: 1, x: 0x1234, y: 0x7fff, wheel: -1 }),
    [COMMAND.MOUSE_ABSOLUTE, 0, 1, 0x34, 0x12, 0xff, 0x7f, 0xff, 0]
  );
});

test("clamps absolute mouse coordinates", () => {
  assert.deepEqual(
    absoluteMouseReport({ x: 0xffff, y: -1 }),
    [COMMAND.MOUSE_ABSOLUTE, 0, 0, 0xff, 0x7f, 0, 0, 0, 0]
  );
});

test("builds relative mouse reports with signed byte deltas", () => {
  assert.deepEqual(
    relativeMouseReport({ buttons: 2, x: -10, y: 12, wheel: -1 }),
    [COMMAND.MOUSE_RELATIVE, 0, 2, 246, 12, 255, 0, 0, 0]
  );
});

test("clamps relative mouse deltas to firmware limits", () => {
  assert.deepEqual(
    relativeMouseReport({ x: -500, y: 500, wheel: 500 }),
    [COMMAND.MOUSE_RELATIVE, 0, 0, 129, 127, 127, 0, 0, 0]
  );
});

test("builds usb switch query and set reports", () => {
  assert.deepEqual(usbSwitchQueryReport(), [COMMAND.USB_SWITCH, 0, 3, 0]);
  assert.deepEqual(usbSwitchSetReport(0), [COMMAND.USB_SWITCH, 0, 0, 0]);
  assert.deepEqual(usbSwitchSetReport(1), [COMMAND.USB_SWITCH, 0, 1, 0]);
  assert.deepEqual(usbSwitchSetReport(2), [COMMAND.USB_SWITCH, 0, 2, 0]);
});

test("rejects invalid byte input", () => {
  assert.throws(() => keyboardReport({ modifiers: 300 }), /must be a byte/);
  assert.throws(() => rotateForWrite([1, -1]), /must be a byte/);
});
