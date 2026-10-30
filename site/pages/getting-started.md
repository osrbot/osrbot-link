---
title: "Download and first use"
description: "Install OSRBOT Link on the control computer. No companion software is required on the controlled device, which must accept USB keyboard and mouse input."
---

# Download and first use

Install OSRBOT Link on the control computer. No companion software is required on the controlled device, which must accept USB keyboard and mouse input.

## Download OSRBOT Link

Open the releases page and choose the package for the control computer's operating system and processor.

-   <strong>Windows</strong>: choose the installer or portable package.
-   <strong>macOS</strong>: choose Apple Silicon or Intel as appropriate.
-   <strong>Ubuntu</strong>: choose the appropriate DEB or AppImage package.

[Open the download page](https://github.com/osrbot/osrbot-link/releases)

If you cannot access the download, find the right package, or need help selecting devices and accessories, contact your sales representative or email [winter@osrbot.com](mailto:winter@osrbot.com).

## Connect as illustrated {#connection}

### A · Connect the sharing device for keyboard and mouse control

<figure class="wiring-image"><img src="/manual/en/document-wiring-control.png" alt="Connect the sharing device for keyboard and mouse control" loading="lazy"><figcaption>Required · Blue arrows show the direction of keyboard and mouse input</figcaption></figure>

### B · Add a capture card to view the screen

<figure class="wiring-image"><img src="/manual/en/document-wiring-video.png" alt="Add a capture card to view the screen" loading="lazy"><figcaption>Optional · Dark arrows show the video return path</figcaption></figure>

An HDMI capture card is shown as an example. For keyboard and mouse sharing only, complete A. Add B when you also need video.

1.  <strong>Connect the sharing device</strong>

    Insert the sharing device's USB-A plug into the control computer. Use the supplied USB-A to USB-A data cable to connect <strong>port 4</strong> to the controlled device. If you need video, also connect the capture card as illustrated.

2.  <strong>Connect keyboard and mouse sharing</strong>

    Open OSRBOT Link. In Keyboard / Mouse Share on the left, refresh the device list, select OSRBOT HID and click Connect. Check that the status reads Connected.

3.  <strong>Start video preview <span class="optional">(when using a capture card)</span></strong>

    In Video Input on the left, select the capture card. Set the resolution and frame rate under Capture Options, then click Start Video. Skip this step if you only need keyboard and mouse sharing.

4.  <strong>Click the workspace to take control</strong>

    Click the video or blank workspace to operate the controlled device with the control computer's keyboard and mouse.


<kbd>Shift + Esc</kbd>: <b>Release control and return input to the control computer.</b><br>
This also exits fullscreen. Click the workspace again to resume control of the device.

## System permissions on first use

<dl class="guide-definitions"><div><dt>Windows</dt><dd>Allow camera access for video preview. Follow system authorization prompts when configuring network sharing.</dd></div><div><dt>macOS</dt><dd>Allow camera access for the capture card. Forwarding system shortcuts also requires Accessibility permission.</dd></div><div><dt>Ubuntu</dt><dd>If HID access is denied, open Settings → Input &amp; Shortcuts and repair Linux HID permissions. Reconnect after authorization.</dd></div></dl>
