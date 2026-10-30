---
title: "Troubleshooting and support"
description: "First identify whether the issue affects input, video or networking, then check the relevant connections and settings."
---

# Troubleshooting and support

First identify whether the issue affects input, video or networking, then check the relevant connections and settings.

<details class="feature-detail"><summary><strong>Sharing device not found or HID cannot connect</strong></summary><div class="detail-body"><p>Check the USB connection to the control computer. Refresh the HID list and select the device again. If it is still unavailable, reset HID or repair Linux permissions as described in Recover devices and retain diagnostic information.</p></div></details>

<details class="feature-detail"><summary><strong>Video works but the keyboard and mouse do not respond</strong></summary><div class="detail-body"><p>Check that HID is Connected, the controlled device's cable is attached to port 4, and you have clicked the workspace. A browser also needs control granted by the control computer; see LAN browser control.</p></div></details>

<details class="feature-detail"><summary><strong>No video, a black screen or unsupported capture parameters</strong></summary><div class="detail-body"><p>Check the capture card connection, the controlled device's video output and camera permissions. Close other software using the capture card. Stop video, select supported capture parameters and retry; see Choose a display mode for your task.</p></div></details>

<details class="feature-detail"><summary><strong>Network sharing is on but the controlled device cannot access the internet</strong></summary><div class="detail-body"><p>Check the two adapter selections, Ethernet cable, and the controlled device's address, gateway and DNS. Even if status or Ping indicates reachability, verify internet access on the controlled device.</p></div></details>

<details class="feature-detail"><summary><strong>Browser pairing fails or viewing works without control</strong></summary><div class="detail-body"><p>Generate a new pairing code on the control computer and retry. Check network reachability. For viewing without control, check the HID connection, Allow Control and the authorized browser session.</p></div></details>

<details class="feature-detail" id="offline-ethernet"><summary><strong>Can I use a direct Ethernet connection without internet access?</strong></summary><div class="detail-body"><p>Yes. Configure compatible IP settings on both devices in the operating system to communicate over Ethernet. Neither internet access nor upstream network sharing is required for local communication.</p></div></details>

<details class="feature-detail" id="network-sharing-linux"><summary><strong>What should I check if network sharing will not start on Ubuntu?</strong></summary><div class="detail-body"><p>Check that the system uses NetworkManager and approve system authorization. On Linux, Enable Sharing currently requires a default route through the selected upstream adapter. For an offline direct connection, configure IP settings on both devices in the operating system.</p></div></details>

<details class="feature-detail" id="latency"><summary><strong>Where does the delay come from?</strong></summary><div class="detail-body"><p>The sharing device transfers keyboard and mouse input directly over USB with very low control latency. When using captured video, most feedback delay comes from video capture, processing and display.</p></div></details>

## Need help? Contact sales or OSRBOT

Contact sales for downloads, device selection and accessories. For a usage issue, provide the control computer's OS, controlled-device model, wiring photos, error message and reproduction steps. Include diagnostic logs if needed.

[winter@osrbot.com](mailto:winter@osrbot.com)
