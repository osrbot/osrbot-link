---
title: "LAN browser control"
description: "Keep OSRBOT Link running on the control computer. Other computers on the same trusted LAN can view or help operate the device through a browser."
aside: false
---

# LAN browser control

Keep OSRBOT Link running on the control computer. Other computers on the same trusted LAN can view or help operate the device through a browser.

<NetworkDiagram kind="lan" />

## Steps

<figure class="software-dialog"><img src="/manual/en/lan-control-ui.png" alt="LAN control settings" loading="lazy"><figcaption>LAN control settings (Windows)</figcaption></figure>

1.  <strong>Enable and pair</strong>

    Open LAN Control, select the LAN IP address and port, and enable it. Open the displayed address in the browser and enter the pairing code. Each code is valid for two minutes and can be used once.

2.  <strong>View and control</strong>

    To view video, start the capture card video on the control computer. To operate the device, connect HID, turn on Allow Control, then grant control to the relevant browser session.

3.  <strong>Revoke control or finish</strong>

    Click Stop Control to revoke remote input; viewing may continue. Turning off LAN control ends all sessions.


## Collaboration and control {#collaboration}

Up to four browsers can view, with only one granted remote input at a time. The browser can adjust display mode, transmission quality and fullscreen. The control computer and authorized browser can both send input; coordinate operation.

## Use on a trusted LAN

Keep devices reachable on the network. Allow private-network firewall access as needed; do not forward the port to the public internet. A browser needs a new code to reconnect. If the control computer's address changes, stop LAN control, refresh the address and enable it again.
