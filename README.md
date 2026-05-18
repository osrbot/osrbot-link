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
