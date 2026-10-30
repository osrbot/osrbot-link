---
title: "Network sharing"
description: "Connect the control computer and controlled device with an Ethernet cable for networking and device setup. When the control computer has a network connection over Wi-Fi or another Ethernet adapter, it can share that connection with the controlled device."
aside: false
---

# Network sharing

Connect the control computer and controlled device with an Ethernet cable for networking and device setup. When the control computer has a network connection over Wi-Fi or another Ethernet adapter, it can share that connection with the controlled device.

<NetworkDiagram kind="sharing" />

## Steps

<figure class="software-dialog"><img src="/manual/en/network-sharing-ui.png" alt="Network sharing settings" loading="lazy"><figcaption>Network sharing settings (Windows)</figcaption></figure>

1.  <strong>Connect the two devices by Ethernet</strong>

    Connect the Ethernet ports of the control computer and controlled device with a cable. Local communication does not require internet access, but both devices need compatible IP settings.

2.  <strong>Share an upstream connection when needed</strong>

    The upstream connection can be an internal network or the internet. In Network Sharing, select the Wi-Fi or Ethernet adapter providing that connection under Internet Adapter, and the adapter connected directly to the controlled device under Target Adapter. Click Enable Sharing and approve system authorization.

3.  <strong>Verify the connection and finish</strong>

    Check the status and controlled-device IP address, then test the required internal service or internet access from the controlled device. Disable sharing when finished. Closing the application does not automatically turn off system network sharing.


## System settings {#system-settings}

<dl class="network-platforms"><div><dt>Windows</dt><dd>Enable or disable sharing in the application and approve administrator authorization when prompted.</dd></div><div><dt>Ubuntu</dt><dd>Sharing uses NetworkManager. Approve system authorization when prompted. <a href="./troubleshooting.html#network-sharing-linux">Troubleshooting</a></dd></div><div><dt>macOS</dt><dd>Enable Internet Sharing in System Settings, selecting the upstream connection and the adapter connected to the controlled device.</dd></div></dl>
