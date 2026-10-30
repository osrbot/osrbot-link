---
title: "局域网浏览器控制"
description: "主控端保持运行 OSRBOT Link，同一可信局域网内的其他电脑可通过浏览器查看或协同操作。"
aside: false
---

# 局域网浏览器控制

主控端保持运行 OSRBOT Link，同一可信局域网内的其他电脑可通过浏览器查看或协同操作。

<NetworkDiagram kind="lan" />

## 操作步骤

<figure class="software-dialog"><img src="/manual/lan-control-ui.png" alt="局域网控制设置" loading="lazy"><figcaption>局域网控制设置（Windows）</figcaption></figure>

1.  <strong>开启并配对</strong>

    进入“局域网控制”，选择局域网 IP 和端口后启用。在浏览器端打开显示的地址，输入配对码；每个码有效 2 分钟，仅可使用一次。

2.  <strong>观看与操作</strong>

    观看画面需主控端开启采集卡视频。操作设备需主控端连接 HID，开启“允许控制”，再为对应浏览器授予控制权。

3.  <strong>收回权限或结束</strong>

    点击“关闭控制”收回远程输入权，观看可继续；关闭局域网控制则结束全部会话。


## 协同与控制 {#collaboration}

最多 4 个浏览器观看，同时仅 1 个获得远程输入权。浏览器可调整显示方式、传输质量和全屏；主控端与获准浏览器可同时输入，请协调操作。

## 在可信局域网内使用

保持各设备网络互通，按需允许专用网络的防火墙访问，不将访问端口映射到公网。浏览器重连需新配对码；主控端网络地址改变后，停止局域网控制、刷新地址再启用。
