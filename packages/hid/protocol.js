export const OSRBOT_DEVICE = Object.freeze({
  vendorId: 0x413d,
  productId: 0x2107,
  usagePage: 0xff00
});

export const COMMAND = Object.freeze({
  KEYBOARD: 1,
  MOUSE_ABSOLUTE: 2,
  STATUS: 3,
  RESET_MCU: 4,
  RGB: 5,
  MOUSE_RELATIVE: 7,
  USB_SWITCH: 0x6f
});

export const MODIFIER = Object.freeze({
  LEFT_CTRL: 1,
  LEFT_SHIFT: 2,
  LEFT_ALT: 4,
  LEFT_GUI: 8,
  RIGHT_CTRL: 16,
  RIGHT_SHIFT: 32,
  RIGHT_ALT: 64,
  RIGHT_GUI: 128
});

export function rotateForWrite(logicalReport) {
  assertByteArray(logicalReport, "logicalReport");

  if (logicalReport.length === 0) {
    throw new RangeError("logicalReport must not be empty");
  }

  const rotated = [logicalReport[logicalReport.length - 1], ...logicalReport.slice(0, -1)];
  rotated[0] = 0;
  return rotated;
}

export function keyboardReport({ modifiers = 0, keys = [] } = {}) {
  assertByte(modifiers, "modifiers");

  if (!Array.isArray(keys)) {
    throw new TypeError("keys must be an array");
  }

  const report = [COMMAND.KEYBOARD, 0, modifiers, 0, 0, 0, 0, 0, 0, 0, 0];
  for (const [index, key] of keys.slice(0, 6).entries()) {
    assertByte(key, `keys[${index}]`);
    report[4 + index] = key;
  }
  return report;
}

export function absoluteMouseReport({ buttons = 0, x = 0, y = 0, wheel = 0 } = {}) {
  assertByte(buttons, "buttons");

  const safeX = clampInteger(x, 0, 0x7fff, "x");
  const safeY = clampInteger(y, 0, 0x7fff, "y");
  const safeWheel = signedByte(wheel, "wheel");

  return [
    COMMAND.MOUSE_ABSOLUTE,
    0,
    buttons,
    safeX & 0xff,
    (safeX >> 8) & 0x7f,
    safeY & 0xff,
    (safeY >> 8) & 0x7f,
    safeWheel,
    0
  ];
}

export function relativeMouseReport({ buttons = 0, x = 0, y = 0, wheel = 0 } = {}) {
  assertByte(buttons, "buttons");

  return [
    COMMAND.MOUSE_RELATIVE,
    0,
    buttons,
    signedByte(clampInteger(x, -127, 127, "x"), "x"),
    signedByte(clampInteger(y, -127, 127, "y"), "y"),
    signedByte(clampInteger(wheel, -127, 127, "wheel"), "wheel"),
    0,
    0,
    0
  ];
}

export function usbSwitchQueryReport() {
  return [COMMAND.USB_SWITCH, 0, 3, 0];
}

export function usbSwitchSetReport(mode) {
  const safeMode = clampInteger(mode, 0, 2, "mode");
  return [COMMAND.USB_SWITCH, 0, safeMode, 0];
}

function signedByte(value, name) {
  const safeValue = clampInteger(value, -127, 127, name);
  return safeValue < 0 ? 256 + safeValue : safeValue;
}

function clampInteger(value, min, max, name) {
  if (!Number.isInteger(value)) {
    throw new TypeError(`${name} must be an integer`);
  }
  return Math.max(min, Math.min(max, value));
}

function assertByte(value, name) {
  if (!Number.isInteger(value) || value < 0 || value > 255) {
    throw new RangeError(`${name} must be a byte`);
  }
}

function assertByteArray(value, name) {
  if (!Array.isArray(value)) {
    throw new TypeError(`${name} must be an array`);
  }

  for (const [index, byte] of value.entries()) {
    assertByte(byte, `${name}[${index}]`);
  }
}
