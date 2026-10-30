---
title: "Software features"
description: "Control the device, preview video, enter commands and record procedures in one application."
---

# Software features

Control the device, preview video, enter commands and record procedures in one application.

<figure class="software-overview"><img src="/manual/en/software-overview-guide.png" alt="Main interface: top menu, device sidebar, and video and control workspace" loading="lazy"><figcaption>Main interface and function locations</figcaption></figure>

<dl class="guide-definitions"><div><dt>Top menu</dt><dd>Adjust screen display, send control commands, capture images, and access settings and network features.</dd></div><div><dt>Device sidebar</dt><dd>Select and connect the sharing device and capture card, and check connection status and actual capture parameters.</dd></div><div><dt>Video and control workspace</dt><dd>View the controlled device's screen and click to begin keyboard and mouse control. Hide the sidebar for more viewing space.</dd></div></dl>

## Control computers or switch to Android mode {#control-feature}

Operate the controlled device with the control computer's keyboard and mouse. Select the mouse mode for the device type.

1.  Follow Download and first use to connect HID, then click the workspace to take control.
2.  In the Control menu, select <strong>Computer</strong> or <strong>Android</strong>. Computer mode uses absolute mouse positioning; Android mode uses relative mouse movement.
3.  To send a system key combination, select <kbd>Ctrl+Alt+Del</kbd> in the Control menu. Some reserved system shortcuts are limited by the control computer's platform.
4.  Press <kbd>Shift+Esc</kbd> to release control. Click Disconnect in Keyboard / Mouse Share to end the HID connection.

Local control pauses when you open settings, change modes or switch to another window. Click the workspace on return to resume. You can also enable Right Ctrl to release control in Settings.

## Choose a display mode for your task {#video-feature}

Use Original to inspect detail, Fit for ongoing operation, or enter fullscreen.

1.  Select the capture card, set the resolution and frame rate under Capture Options, then click Start Video. Add a custom resolution if needed.
2.  Use the Screen menu to choose a display mode or enter fullscreen. The fullscreen toolbar can be moved, hidden and shown again. It provides zoom, mode, paste, screenshot, video recording and GIF controls.
3.  Stop video before changing the capture device or parameters. Check the status bar for the actual resolution and frame rate.

<dl class="display-modes"><div><dt>Fit</dt><dd>Preserves aspect ratio and shows the entire image.</dd></div><div><dt>Fill</dt><dd>Preserves aspect ratio; edges may be cropped.</dd></div><div><dt>Original</dt><dd>Displays the original pixel dimensions.</dd></div><div><dt>Stretch</dt><dd>Fills the workspace; the aspect ratio may change.</dd></div></dl>

Preview, resolution and frame rate depend on the capture card and input signal. Entering custom parameters does not increase the capture card's capabilities.

## Screenshots, video and GIFs {#capture-feature}

Save device images and procedures for debugging, teaching and support.

Start video first, then use the Capture menu or fullscreen toolbar.

<table><thead><tr><th scope="col">Tool</th><th scope="col">Operation and saving</th></tr></thead><tbody><tr><th scope="row">Screenshot</th><td>Click Screenshot, choose a location and save the current captured image.</td></tr><tr><th scope="row">Video recording</th><td>Click Record to start and Stop Record to finish and save. A recording stops and saves automatically at 256 MiB; you can then start another segment.</td></tr><tr><th scope="row">GIF</th><td>Click GIF to record a short clip, then stop to save it. Each clip is limited to approximately 10 seconds.</td></tr><tr><th scope="row">Custom watermark</th><td>Enter a name under Settings → Capture &amp; Watermark to append it to the OSRBOT Link watermark.</td></tr></tbody></table>

Recordings use the capture card's video. Stopping video ends recording. Wait for saving to finish before closing the software or unplugging devices.

## Send commands to the controlled device {#paste-feature}

Paste Helper converts English commands on the control computer into keyboard input, reducing manual typing.

<figure class="software-dialog"><img src="/manual/en/software-paste-guide.png" alt="Paste Helper: command input, send options, speed and controls" loading="lazy"><figcaption>Paste Helper: entering and sending commands</figcaption></figure>

1.  Connect HID and place the controlled device's input focus in a terminal or the required text field.
2.  Open Control → Paste Helper. Check the clipboard contents or type the command directly.
3.  Choose Fast, Normal or Slow and decide whether to enable Press Enter after paste.
4.  Click Send Paste and wait for completion. Click Stop if you need to interrupt sending.

### Quick Paste: Ctrl + Alt + V

During local control, directly send a single line of up to 256 printable ASCII characters without automatically pressing Enter. Longer or multiline text opens a preview before sending.

Paste Helper supports up to 1,200 ASCII characters. It does not support Chinese text or file transfer. Ordinary Ctrl+V only sends the shortcut to the controlled device; it does not synchronize the two devices' clipboards.

## Set the interface and input preferences {#settings-feature}

Interface and input preferences are saved on the control computer. Choose Chinese or English and a light, dark or system appearance.

<figure class="software-dialog"><img src="/manual/en/software-settings-guide.png" alt="OSRBOT Link illustration" loading="lazy"><figcaption>Settings: tabs and common options</figcaption></figure>

<dl class="settings-list"><div><dt>Input &amp; Shortcuts</dt><dd>Choose Computer or Android mode and Traditional or Natural scrolling. Configure Right Ctrl to release control, the mouse position indicator and Quick Paste.</dd></div><div><dt>Capture &amp; Watermark</dt><dd>Set a custom watermark name for screenshots, video recordings and GIFs.</dd></div><div><dt>Window layout and application information</dt><dd>Show or hide the sidebar through Devices or Screen. Open About for application information and third-party notices.</dd></div></dl>

Changing preferences does not connect devices automatically. Select and connect the sharing device or capture card manually when needed.

## Recover devices and retain diagnostic information {#recovery-feature}

Handle HID, permissions and logs separately to resume work or contact support.

<dl class="settings-list"><div><dt>Reset HID</dt><dd>If input stops responding, click Reset HID on the left. Wait, refresh the list, then reconnect the device. Resetting neither resumes control nor stops video or recording.</dd></div><div><dt>Repair Linux HID Permissions</dt><dd>Open Settings → Input &amp; Shortcuts → Repair Linux HID Permissions. Authorize, scan again and reconnect the USB device if necessary.</dd></div><div><dt>Export diagnostic logs</dt><dd>Enable Diagnostic Log under Settings → General, reproduce the issue and click Export. Send the log, error message and reproduction steps to support. Clear deletes the current log.</dd></div></dl>

Session status only; no keystrokes, clipboard content, images or automatic upload.
