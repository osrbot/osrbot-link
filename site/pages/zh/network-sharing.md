---
title: "网络共享"
description: "通过网线连接主控端与被控端，便于设备联网和调试。主控端通过 Wi-Fi 或另一块有线网卡接入网络时，可将该网络连接共享给被控端。"
aside: false
---

# 网络共享

通过网线连接主控端与被控端，便于设备联网和调试。主控端通过 Wi-Fi 或另一块有线网卡接入网络时，可将该网络连接共享给被控端。

<NetworkDiagram kind="sharing" />

## 操作步骤

<figure class="software-dialog"><img src="/manual/network-sharing-ui.png" alt="网络共享设置" loading="lazy"><figcaption>网络共享设置（Windows）</figcaption></figure>

1.  <strong>用网线连接两端</strong>

    用以太网线连接主控端和被控端的网口。仅做本地通信不需要互联网，但两端需配置可互通的 IP 地址。

2.  <strong>按需共享上游网络</strong>

    上游可以是内网或互联网。进入“网络共享”，将“外网网卡”选为提供网络的 Wi-Fi 或有线网卡，将“被控端网卡”选为直连被控端的网卡，再点击“开启共享”并按系统提示授权。

3.  <strong>验证连接与结束</strong>

    查看状态和被控端 IP，在被控端验证所需的内网服务或互联网访问。不用时关闭共享；退出软件不会自动关闭系统共享。


## 按系统设置 {#system-settings}

<dl class="network-platforms"><div><dt>Windows</dt><dd>在软件中开启或关闭共享，按系统提示授予管理员权限。</dd></div><div><dt>Ubuntu</dt><dd>通过 NetworkManager 配置共享，操作时按系统提示授权。 <a href="./troubleshooting.html#network-sharing-linux">排查方法</a></dd></div><div><dt>macOS</dt><dd>在系统设置中手动开启“互联网共享”，选择上游连接与被控端网卡。</dd></div></dl>
