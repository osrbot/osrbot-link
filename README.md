<img src="docs/images/osrbot-primary.png" alt="OSRBOT" width="240">

# OSRBOT Link

**Keyboard and mouse sharing. Optional video capture. One workspace.**

OSRBOT Link connects your computer to another computer, Android device or embedded system through OSRBOT sharing hardware. Use your existing keyboard and mouse to operate the connected device. Add a USB capture card to see its screen in the same window, or use input sharing on its own when the device already has a display.

The controlled device does not need OSRBOT client software. Pro extends this workflow with LAN browser access and network sharing on supported host systems.

**English** · [简体中文](README_CN.md) · [Downloads](#download) · [Get started](#get-started) · [Release notes](CHANGELOG.md)

## Choose your edition

Choose **Lite** for local USB control and video capture. Choose **Pro** when you also need browser access from another device on your LAN, or network-sharing assistance.

| Capability | Lite | Pro |
| --- | --- | --- |
| OSRBOT keyboard and mouse sharing | Included | Included |
| Use without a capture card | Included | Included |
| Computer / Android mouse modes | Included | Included |
| Video preview, scaling and fullscreen | Included | Included |
| Screenshots, video and GIF recording | Included | Included |
| ASCII command paste | Included | Included |
| Chinese / English interface | Included | Included |
| LAN browser control with WebRTC | Not included | Included |
| Network-sharing configuration | Not included | Windows / Linux |
| Network and LAN diagnostics | Not included | Included |

On macOS, Pro can list network adapters, but Internet Sharing must be configured manually in System Settings. Android mode controls an attached Android device; it is not a mobile client download.

## Download

**[Lite v0.2](https://github.com/osrbot/osrbot-link/releases/tag/lite-v0.2.0)** is currently a preview release. **[Pro v0.7.0](https://github.com/osrbot/osrbot-link/releases/tag/pro-v0.7.0)** is the available full-featured release. Check each release page for its system requirements and installation notes.

| Host platform | Lite v0.2 | Pro v0.7.0 |
| --- | --- | --- |
| Windows x64 | [Portable](https://github.com/osrbot/osrbot-link/releases/download/lite-v0.2.0/OSRBOT-Link-Lite-v0.2-20261002-win-x64-portable.exe) · [Installer](https://github.com/osrbot/osrbot-link/releases/download/lite-v0.2.0/OSRBOT-Link-Lite-v0.2-20261002-win-x64.exe) | [Portable](https://github.com/osrbot/osrbot-link/releases/download/pro-v0.7.0/OSRBOT-Link-Pro-v0.7.0-20260601-win-x64-portable.exe) · [Installer](https://github.com/osrbot/osrbot-link/releases/download/pro-v0.7.0/OSRBOT-Link-Pro-v0.7.0-20260601-win-x64.exe) |
| macOS | [Apple Silicon](https://github.com/osrbot/osrbot-link/releases/download/lite-v0.2.0/OSRBOT-Link-Lite-v0.2-20261002-mac-arm64.dmg) · [Intel](https://github.com/osrbot/osrbot-link/releases/download/lite-v0.2.0/OSRBOT-Link-Lite-v0.2-20261002-mac-x64.dmg) | [Apple Silicon](https://github.com/osrbot/osrbot-link/releases/download/pro-v0.7.0/OSRBOT-Link-Pro-v0.7.0-20260601-mac-arm64.dmg) · [Intel](https://github.com/osrbot/osrbot-link/releases/download/pro-v0.7.0/OSRBOT-Link-Pro-v0.7.0-20260601-mac-x64.dmg) |
| Ubuntu x64 | [DEB](https://github.com/osrbot/osrbot-link/releases/download/lite-v0.2.0/OSRBOT-Link-Lite-v0.2-20261002-ubuntu-amd64.deb) · [AppImage](https://github.com/osrbot/osrbot-link/releases/download/lite-v0.2.0/OSRBOT-Link-Lite-v0.2-20261002-ubuntu-x86_64.AppImage) | [DEB](https://github.com/osrbot/osrbot-link/releases/download/pro-v0.7.0/OSRBOT-Link-Pro-v0.7.0-20260601-ubuntu-amd64.deb) · [AppImage](https://github.com/osrbot/osrbot-link/releases/download/pro-v0.7.0/OSRBOT-Link-Pro-v0.7.0-20260601-ubuntu-x86_64.AppImage) |

Windows packages target Windows 10 / 11. Lite requires WebView2 on Windows, macOS 12 or later on Mac, and Ubuntu 22.04 with compatible GTK / WebKitGTK libraries on Linux. Windows 7 is not supported. [Package and release guide](docs/release-strategy.md).

## Built for hands-on work

- **Device maintenance:** work with computers and embedded systems without moving a separate keyboard and mouse between devices.
- **Robotics and lab work:** keep the target screen, terminal interaction and capture tools together during setup and troubleshooting.
- **Screen capture:** select a capture card, resolution and frame rate; use fit, fill or original-size display, then take screenshots or record video and GIFs.
- **Command entry:** send ASCII terminal commands through the keyboard-sharing hardware, with a preview and a stop control for long input.
- **LAN access with Pro:** use another computer or tablet browser to access the host's capture preview and connected OSRBOT input hardware.

## Get started

### Connect your devices

| Connection | Purpose |
| --- | --- |
| Host computer → OSRBOT sharing hardware → controlled device | Keyboard and mouse input |
| Controlled device video output → USB capture card → host computer | Optional screen preview |
| Internet-connected host → Ethernet → controlled device | Optional network sharing in Pro |

Follow the hardware manual for the correct ports and cabling. Input sharing, video capture and network sharing are separate functions; each can be used independently.

1. Connect the OSRBOT sharing hardware to the host computer and the controlled device.
2. Open the client, select your OSRBOT HID device and connect. Device selection remains manual.
3. If you need video, connect the capture card, select its resolution and frame rate, and start the preview separately.
4. Click the workspace to begin control. Press `Shift+Esc` to release keyboard and mouse control and exit fullscreen.

### Choose a mouse mode

**Computer** is the default. It uses absolute mouse positioning for desktop systems. **Android** uses relative mouse movement for Android phones and tablets; the pointer is captured while controlling the device. Use `Shift+Esc` when you need to return to the host.

### Access over the LAN with Pro

1. Connect the HID hardware and start video preview on the host if needed, then enable LAN control.
2. Open the displayed host address in a browser on the same reachable local network.
3. Enter the one-time pairing token. Generate another token when pairing an additional browser.

Each token can be used once. Browsers use independent sessions, and closing the page ends its session. Fit, fill and fullscreen change the browser's display without reconnecting the video session. Use this feature on a trusted local network; direct public-Internet access is not the intended setup.

### Share a network connection with Pro

Select the host's Internet adapter and the adapter connected to the controlled device. Connect the Ethernet cable, then enable sharing. Adapter discovery does not require the cable to be connected.

Windows may require administrator authorization. Linux sharing depends on NetworkManager and system permissions. On macOS, enable Internet Sharing manually in System Settings. This function provides connectivity; it does not carry OSRBOT keyboard and mouse input.

## Before you start

- **Hardware:** OSRBOT sharing hardware is required for keyboard and mouse control. A compatible USB capture card is optional. [Contact OSRBOT](mailto:winter@osrbot.com) for hardware purchases and compatibility questions.
- **Capture quality:** available resolution and frame rate depend on the capture card, cable, USB connection and target video output. Scaling changes the displayed size, not the captured resolution or detail.
- **Permissions:** allow camera or input access when the operating system requests it. Linux HID access may require the supplied permission rules and reconnecting the USB device.
- **Application security:** Windows and macOS may display security prompts. Use the official downloads and check the installation notes for your edition; current macOS packages are not Developer ID signed or notarized.
- **Command paste:** ASCII text only. It is not clipboard synchronization and does not transfer Chinese text, images or files.
- **LAN access:** Pro requires network reachability, suitable firewall rules and browser WebRTC support. A successful USB connection does not establish a working LAN connection.

## Contributors and acknowledgements

Co-authors: [dajianli](https://github.com/dajianli) and [sunmaxwll](https://github.com/sunmaxwll).

Thanks to [kitso666](https://github.com/kitso666), [MotorBottle](https://github.com/MotorBottle), and the original [Jackadminx/KVM-Card-Mini](https://github.com/Jackadminx/KVM-Card-Mini) project for their contributions and inspiration.

## Support and licensing

For support, include your client edition, version, host operating system, connected hardware and a brief description of the issue. Remove passwords, pairing tokens and personal information from screenshots and logs before sharing them.

This repository provides product documentation and packaged client downloads. See the [license](LICENSE), [third-party notices](THIRD-PARTY-NOTICES.txt) and [attributions](docs/third-party-notices.md) for applicable terms. Third-party open-source components retain their original licenses.

---

[OSRBOT](https://www.osrbot.com) · Hardware & support: [winter@osrbot.com](mailto:winter@osrbot.com)
