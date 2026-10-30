---
title: "常见问题与支持"
description: "先确认键鼠、视频或网络中哪一部分异常，再检查对应连接和设置。"
---

# 常见问题与支持

先确认键鼠、视频或网络中哪一部分异常，再检查对应连接和设置。

<details class="feature-detail"><summary><strong>找不到共享器，或 HID 无法连接</strong></summary><div class="detail-body"><p>检查共享器与主控端的 USB 连接，刷新 HID 列表后重新选择。仍不可用时，按“恢复与支持”中的说明重置 HID 或修复 Linux 权限。</p></div></details>

<details class="feature-detail"><summary><strong>有画面，但键盘和鼠标没有反应</strong></summary><div class="detail-body"><p>确认 HID 为“已连接”，被控端数据线接在接口 4，并点击工作区。浏览器端还需要主控端授予控制权，参见“局域网浏览器控制”。</p></div></details>

<details class="feature-detail"><summary><strong>没有画面、黑屏或采集参数无法开启</strong></summary><div class="detail-body"><p>检查采集卡连接、被控端的视频输出及摄像头权限，关闭占用采集卡的其他软件。停止视频后，选择采集卡实际支持的参数重试，参见“画面预览”。</p></div></details>

<details class="feature-detail"><summary><strong>网络共享已开启，被控端仍无法上网</strong></summary><div class="detail-body"><p>检查两块网卡是否选对、网线连接，以及被控端的地址、网关和 DNS。状态显示或 Ping 可达后，仍需在被控端验证互联网访问。</p></div></details>

<details class="feature-detail"><summary><strong>浏览器配对失败，或只能看不能控制</strong></summary><div class="detail-body"><p>在主控端生成新配对码重试，并确认网络互通。只看不能控制时，检查 HID 连接、“允许控制”开关及获准的浏览器会话。</p></div></details>

<details class="feature-detail" id="offline-ethernet"><summary><strong>没有互联网，也能用网线直连吗？</strong></summary><div class="detail-body"><p>可以。在两端的系统网络设置中配置可互通的 IP 地址，即可通过网线进行本地通信，无需接入互联网，也无需开启上游网络共享。</p></div></details>

<details class="feature-detail" id="network-sharing-linux"><summary><strong>Ubuntu 无法开启网络共享，先检查什么？</strong></summary><div class="detail-body"><p>确认系统使用 NetworkManager，并完成系统授权。当前 Linux 的“开启共享”要求所选上游网卡具备默认路由；仅做离线直连时，请在系统中配置两端网络地址。</p></div></details>

<details class="feature-detail" id="latency"><summary><strong>操作延迟主要来自哪里？</strong></summary><div class="detail-body"><p>共享器通过 USB 直接传递键鼠输入，控制链路延迟极低；使用采集画面操作时，反馈延迟主要来自视频采集、处理与显示环节。</p></div></details>

## 需要帮助，联系销售或 OSRBOT

软件下载、设备选型与配套可联系销售。反馈使用问题时，请提供主控端系统、被控端型号、接线照片、错误提示和复现步骤；需要时附上诊断日志。

[winter@osrbot.com](mailto:winter@osrbot.com)
