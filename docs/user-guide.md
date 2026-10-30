# OSRBOT Link user guide

[简体中文](user-guide_CN.md) · [Product overview](../README.md)

## Installation

Download a client package from the [official releases](https://github.com/osrbot/osrbot-link/releases). Confirm the control computer's platform and CPU. Hashes and exact sizes are provided in `SHA256SUMS.txt`. Complete wiring and operating instructions are in the [English product manual](manual/OSRBOT_Link_Product_Manual_EN_v1.0.pdf).

### Windows

Use Windows 10/11 x64 with Microsoft Edge WebView2 Runtime. The portable EXE opens directly; the installer adds shortcuts. The package is not Authenticode signed, so Windows may show a reputation warning. Check the download source and checksum before allowing it; do not disable antivirus globally. Only Internet Sharing changes require administrator permission.

### macOS

Choose Apple Silicon or Intel, open the DMG and copy **OSRBOT Link.app** into Applications. macOS 12 or later is required. These packages carry a local ad-hoc signature, not Apple Developer ID notarization. If macOS blocks the app, confirm the official source, then use the system's application-specific **Privacy & Security → Open Anyway** flow if offered. If it reports damage or verification fails, stop and contact support; do not disable Gatekeeper globally.

Allow camera access when using a capture card. Native system-key forwarding also needs Accessibility permission; without it, some keys fall back to ordinary window input. Internet Sharing is set up manually in macOS System Settings.

### Ubuntu

The same x86_64 DEB and AppImage support Ubuntu 22.04, 24.04 and 26.04. A private WebKitGTK 4.1/GStreamer runtime is included; installing WebKitGTK 4.0 separately is not required. A working desktop, graphics driver, USB and session services are still supplied by the host system.

Install the DEB with the system package manager so dependencies and the OSRBOT udev rule are installed. Reconnect the OSRBOT USB hardware while logged into the local desktop session to apply the rule.

Mark AppImage executable, then open it as the normal desktop user, without `sudo`. If FUSE is unavailable, prefer the DEB. Alternatively, run AppImage with `--appimage-extract`, then launch `squashfs-root/AppRun`. HID permission repair in Settings requests administrator approval for the scoped OSRBOT rule only; it does not grant access to all HID devices.

Network sharing additionally requires NetworkManager, iproute2 and PolicyKit. The native system-key backend is X11-based; Wayland may limit reserved keys.

## Local control

1. Select and connect an OSRBOT HID device. Device refresh does not connect it automatically.
2. Optionally select a capture device, resolution and FPS, then start video. Stop capture before changing those options.
3. Use Computer mode for absolute mouse positioning; use Android mode for relative input. Android capture begins after a deliberate click.
4. Click the workspace to forward input. **Shift+Esc** releases local keys and buttons and exits fullscreen. An optional right-Ctrl exit can be enabled in Input & Shortcuts.

The captured image, not the surrounding black bars, defines absolute mouse mapping. Fit shows the full image; Fill may crop; Original preserves source size; Stretch changes the aspect ratio.

## Paste and recording

Paste simulates keyboard input using the target's keyboard layout. It supports ASCII text, not Chinese text, files or a shared clipboard. Preview before sending, and use Stop to cancel. The preview is limited to 1,200 characters. The configurable **Ctrl+Alt+V** shortcut sends a single printable line of up to 256 characters without adding Enter; longer or multiline text opens the preview instead. Start with a harmless short string on a new target.

Screenshot, video and GIF output use timestamped default filenames. Stopping video also stops active recording. The file-saving dialog remains under your control.

## LAN control

LAN Control is independent of Internet Sharing. Choose the host's reachable local IP, enable LAN Control and share the address with another computer on the trusted LAN. Enter a fresh four-digit numeric pairing code in that computer's browser. Each code is valid for two minutes and one connection. A new connection or reopened page needs a new code.

Enable **Allow Control** on the host to permit input. **Stop Control** removes remote input permission while leaving viewing and local input available. Closing settings or generating another code does not revoke this permission. Multiple browsers may view, but only one remote browser controls at once. Local users and the authorized browser must coordinate simultaneous input.

Fullscreen and scaling changes do not require disconnecting. Streaming keeps the selected quality profile; there is no automatic idle-frame-rate reduction. The host needs active capture for video, but HID control can work without capture.

Allow the app through the firewall only on the intended private network. HTTP pairing and signaling are not protected against an attacker on the same network. Never port-forward this listener to the public Internet.

## Network sharing

Select the host's Internet-facing adapter and the Ethernet adapter connected to the target. They are different adapters on the **host**; the target-side selector is not an adapter installed in the remote computer. Existing system sharing is detected and displayed without enabling it again. Scanning adapters does not require a connected cable.

Windows uses ICS with administrator permission. Ubuntu uses NetworkManager and system authorization. macOS sharing is manual. These operations do not disconnect HID or stop video.

When a target-side address is detected, a Ping result describes host-to-device reachability only. It does not prove that the device can reach the Internet or is the same physical device connected by USB. If several devices are attached to that subnet, verify the intended address yourself.

## Troubleshooting

- **Visual delay:** USB input and video are separate paths. Capture hardware, USB transport, processing and display affect visual feedback; LAN access also adds network and codec factors. FPS alone does not measure end-to-end latency.
- **Input stops:** release with Shift+Esc, then use Reset HID, refresh the list and reconnect manually. If the operating system cannot recover a USB device, reconnect its cable.
- **Capture cannot start:** check camera permission, another application using the card, and supported resolution/FPS. Actual capture parameters appear in the client.
- **LAN connection fails:** check the selected IP, network reachability, firewall and a fresh pairing code. Enabling Internet Sharing is not a prerequisite.
- **Need support logs:** enable Diagnostic Log in Settings before reproducing the issue, then export. Logging starts disabled, stays local and does not record typed keys, clipboard text, images or pairing codes.

Contact [OSRBOT support](mailto:winter@osrbot.com) with the system, application version, hardware model and reproduction steps.
