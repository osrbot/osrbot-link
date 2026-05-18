# OSRBOT Link Lite Technical Direction

Date: 2026-05-18

## Inputs Reviewed

- OSRBOT Python/PySide client archive.
- Third-party Electron KVM client archive.
- OSRBOT keyboard/mouse sharing hardware user manual.

## Hardware/Product Facts

The OSRBOT keyboard/mouse sharing hardware is a lightweight KVM alternative for robot, SBC, embedded, NUC, industrial PC, and lab debugging scenarios.

The hardware intentionally separates the input path and the video path:

- Keyboard/mouse control is handled by the OSRBOT sharing device over USB HID.
- Video is handled by an external USB capture card.
- The controlled side should not require a special driver; it only needs a normal USB interface.
- The host side should support Windows, Ubuntu/Linux, and macOS.

Manual parameters:

- Capture input can be 3840x2160 at 60 Hz or 1920x1080 at 60 Hz, depending on capture hardware.
- Capture output to host is typically 1920x1080 at 60 Hz over USB 3.0.
- Typical video latency is 50-100 ms, mainly determined by capture card quality.
- Recommended practical target for compatibility problems is 1920x1080.
- Existing packaged OSRBOT_Client targets Windows 10+, while the product ambition here is Windows 7+.

## Shared HID Protocol Baseline

Both reviewed clients target the same control device identity:

- VID: `0x413D`
- PID: `0x2107`
- Usage page: `0xFF00`

The host writes vendor HID reports to the control interface. Both clients rotate the logical buffer before writing:

- Python pattern: `buffer = buffer[-1:] + buffer[:-1]`, then `buffer[0] = 0`
- Electron pattern: `rotatedBuffer = [buffer[last], ...buffer.slice(0, last)]`, then `rotatedBuffer[0] = 0`

Important logical report commands:

- `1`: keyboard report
- `2`: absolute mouse report
- `3`: keyboard LED/status query
- `4`: MCU reset in the Python client/firmware path
- `5`: RGB/WS2812 payload in firmware path
- `7`: relative mouse report
- `0x6F`: USB switch command/status in the OSRBOT Python client/firmware path

Keyboard report shape:

- Logical buffer starts with `1`
- Modifier byte uses standard HID bits:
  - Left Ctrl: `1`
  - Left Shift: `2`
  - Left Alt: `4`
  - Left GUI: `8`
  - Right Ctrl: `16`
  - Right Shift: `32`
  - Right Alt: `64`
  - Right GUI: `128`
- Up to 6 simultaneous non-modifier HID usages are sent.

Absolute mouse report:

- Logical command: `2`
- Button byte
- X and Y are scaled to `0..0x7FFF`
- Wheel byte supports positive/negative deltas.

Relative mouse report:

- Logical command: `7`
- Button byte
- X/Y deltas clamped to `-127..127`
- Wheel byte supports positive/negative deltas.

USB switch command:

- Query: `[0x6F, 0, 3, 0]`
- Set floating/disconnect: payload command with mode `0`
- Set master/control side: payload mode `1` or `2`
- Response includes power/input/enable pin states.

## Client 1: Existing OSRBOT Python/PySide Client

Strengths:

- Mature OSRBOT feature set.
- Includes USB switch UI and automation.
- Includes remote server/web client path.
- Supports screenshots, recording, audio routing, theme, clipboard/paste, file-transfer-like paste flow, special shortcuts, and keyboard maps.
- HID protocol implementation matches current hardware behavior.

Weaknesses:

- Windows-centric dependencies: `pyWinhook`, `pywin32`, compiled `_cpyHook.cp39-win_amd64.pyd`.
- Cross-platform support is partial; README notes Hook removal is needed for cross-platform builds.
- Packaging Python + PySide + native hook dependencies across Windows/macOS/Linux is operationally heavier.
- Windows 7 support is already problematic according to the hardware manual due missing runtime DLL/API compatibility.

Best use in the new client:

- Treat it as the reference for OSRBOT-specific product behavior and HID protocol.
- Preserve its USB switch, shortcut presets, paste behavior, and user-facing workflow ideas.
- Do not use it as the main cross-platform app foundation.

## Client 2: Third-Party Electron + Rust Native Client

Strengths:

- Better direction for a modern cross-platform GUI.
- Uses Electron for UI and WebRTC APIs for capture-card video.
- Uses `node-hid` for USB HID control.
- Uses Rust/N-API native module with `rdev`-based keyboard grabbing.
- Has explicit Windows/macOS/Linux packaging via `electron-builder`.
- Supports absolute and relative mouse modes.
- Includes Linux udev rules and macOS entitlement/permission assets.

Weaknesses:

- Electron 28 targets modern OS versions and does not satisfy Windows 7.
- The renderer is currently a large monolithic JS/CSS/HTML implementation.
- Some security flags in `main.js` should be tightened before production, especially broad web-security disabling.
- USB switch support is less complete than the OSRBOT Python client path.
- The bundled firmware tree is useful as protocol reference but should probably not live inside the application repo unless firmware distribution is part of scope.

Best use in the new client:

- Use as the architecture baseline for the main app: Electron UI + native key grabber + HID manager.
- Port OSRBOT-specific HID behavior and USB switch UI from the Python client.
- Refactor into modules before productizing.

## Windows 7 Decision

This is the major fork in the road.

Electron 22 is the last Electron major line that supports Windows 7/8/8.1. Newer Electron lines require newer Windows versions. See Electron's official notes: [Electron 22.0.0](https://www.electronjs.org/blog/electron-22-0) and [Farewell, Windows 7/8/8.1](https://www.electronjs.org/blog/windows-7-to-8-1-deprecation-notice). Therefore:

- If Windows 7 is a hard requirement, do not build the single product line on Electron 28+.
- Recommended approach: maintain two tracks.
  - Mainline: modern Electron, current Chromium, best macOS/Linux/Win10+ experience.
  - Legacy: Windows 7 build pinned to Electron 22, with reduced feature expectations and stricter dependency pinning.

Alternative if one binary family must cover Windows 7+:

- Consider Tauri/WebView2 only if Windows 7 WebView/runtime requirements are acceptable. In practice this is risky.
- Consider Qt/C++ or Qt/Python legacy build for Windows 7. This gives more compatibility control but increases native development and packaging cost.

Recommended product stance:

- Market the main client as Windows 10+/11, macOS, Linux.
- Provide a separate `legacy-win7` package only if customers truly require Windows 7.

## Recommended Architecture

Use a layered architecture:

- `packages/app`: Electron shell and windows
- `packages/ui`: renderer UI, capture preview, controls, settings
- `packages/hid`: HID protocol encoder/decoder and device discovery
- `packages/native-input`: Rust/N-API global keyboard grabber
- `packages/shared`: platform constants, device profiles, config schema, i18n
- `docs`: hardware protocol and user/developer docs

Core runtime flow:

1. Discover compatible HID devices by VID/PID/usage page.
2. Discover capture card using browser media device APIs.
3. Render low-latency video preview.
4. When control mode is active, capture keyboard/mouse events.
5. Convert events into OSRBOT HID logical reports.
6. Rotate and write reports through `node-hid`.
7. Expose USB switch/status, reset, reconnect, and diagnostics in the UI.

## MVP Scope

Phase 1 should be small and shippable:

- Device discovery and auto reconnect.
- Video preview from external capture card.
- Absolute mouse mode.
- Relative mouse mode.
- Keyboard capture with system hotkey blocking where supported.
- Ctrl+Alt+Del and common shortcut buttons.
- USB switch query/set support.
- Chinese/English UI.
- Linux udev permission helper.
- macOS permission onboarding.
- Windows installer and portable package.

Defer until after MVP:

- Audio routing.
- Recording.
- Screenshots.
- Remote server/web client.
- File transfer/paste board enhancements.
- Firmware flashing UI.
- Multi-device fleet management.

## Packaging Plan

Mainline:

- Windows: NSIS installer and portable package, x64 first, ARM64 optional.
- macOS: DMG for x64 and arm64, signing/notarization when Apple developer credentials are ready.
- Linux: AppImage and deb, x64 first, ARM64 when native input stack is validated.

Legacy Windows 7:

- Separate branch or build profile.
- Electron pinned to `22.x` if using Electron.
- Node/native dependencies pinned and tested on Windows 7.
- Reduced support matrix documented clearly.

## Immediate Repository Plan

1. Keep this `lite` branch as the new client branch.
2. Add the architecture document and README first.
3. Scaffold the mainline Electron client after direction approval.
4. Port HID protocol and USB switch support from the OSRBOT Python client.
5. Bring in the Rust native input module after refactoring and license review.
6. Add GitHub Actions builds for Windows, macOS, and Linux.

## Local-First Release Rule

Do not push to GitHub until the local branch has passed its available validation suite.

Current local command:

```bash
npm test
```

As the client grows, this gate should expand to include:

- HID protocol unit tests.
- Renderer/UI smoke tests.
- Native input module tests per platform.
- Hardware-in-the-loop HID tests when an OSRBOT device is connected.
- Package build smoke tests for the target platform.

## Open Questions

- Is Windows 7 a strict must-have, or can it be a separate legacy package?
- Does the new client need remote browser control in v1?
- Should firmware source/flashing live in this repository, or stay separate?
- What official product name should replace temporary names like `KVM Client`?
- Which capture card models should be QA-certified first?
