# OSRBOT Link Lite

OSRBOT Link Lite is the planned cross-platform client for OSRBOT keyboard/mouse sharing hardware.

This branch starts from a technical direction review of:

- `osrbot_client-main.zip`: existing OSRBOT Python/PySide client
- `Electron-KVM-rdev-main.zip`: third-party Electron + Rust native client
- `键盘鼠标共享器2.0用户手册-中文.pdf`: OSRBOT hardware user manual

## Target Platforms

- Windows 7 and later
- macOS Intel and Apple Silicon
- Linux x64 and ARM64

## Current Direction

The recommended product direction is a modern Electron + native module client for the mainline app, with a separate legacy-compatible build strategy if Windows 7 must remain a hard requirement.

See [docs/technical-direction.md](docs/technical-direction.md) for the detailed architecture notes and roadmap.

## Local Validation

Run the local test suite before pushing this branch:

```bash
npm test
```

The current test baseline covers the OSRBOT HID protocol encoder, including keyboard reports, absolute mouse reports, relative mouse reports, USB switch commands, and hidapi write-buffer rotation.

## macOS Hardware Checks

With the OSRBOT device and capture card connected to the macOS host:

```bash
npm install
npm run hardware:usb
npm run hardware:hid:list
npm run hardware:hid:probe
```

If the HID probe fails in a restricted shell but succeeds when run from a normal terminal or approved Codex command, the hardware is visible and the remaining issue is local process permission.

Safe write test:

```bash
npm run hardware:hid:reset
```

This sends neutral reports only: keyboard released, absolute mouse neutral, and relative mouse neutral.

Optional firmware feature check:

```bash
npm run hardware:hid:usb-switch-status
```

Some firmware builds may not respond to the `0x6F` USB switch status query even though normal keyboard/mouse HID writes work.

## Build macOS Test Client

The current macOS test build is based on the Electron client direction and targets Apple Silicon first:

```bash
cd apps/desktop
npm install
npm run dist
```

Output:

```text
apps/desktop/dist/OSRBOT Link Lite-0.1.0-mac-test.0-arm64.dmg
apps/desktop/dist/mac-arm64/OSRBOT Link Lite.app
```

Current limitation: this local test build skips the Rust native keyboard grabber because the current Mac does not have `cargo` installed. Basic app, capture-card video, HID discovery, and HID writes can be tested first; system-level hotkey blocking should be validated after installing the Rust toolchain and building `native/rdev-grabber`.

This local build is ad-hoc signed only. For public macOS distribution, use an Apple Developer ID certificate and notarization.
