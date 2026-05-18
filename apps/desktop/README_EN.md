# OSRBOT Link Lite Desktop

Desktop client for OSRBOT keyboard/mouse sharing hardware.

## Features

- HID keyboard and mouse forwarding.
- Optional USB capture-card video preview.
- Input-only mode without a capture card.
- Screenshot, compressed WebM recording, and GIF recording.
- Chinese/English UI.
- Custom capture resolutions.

## Packaging

```bash
npm install
npm run dist:mac
npm run dist:win
npm run dist:linux
```

The mainline client uses Electron 28 and targets macOS, Windows 10/11, and Ubuntu Linux. Windows 7 requires a separate legacy build.
