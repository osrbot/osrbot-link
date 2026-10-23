<img src="docs/images/osrbot-primary.png" alt="OSRBOT" width="240">

# OSRBOT Link

**键鼠共享，可选视频采集，集中在一个工作区。**

OSRBOT Link 通过 OSRBOT 共享器，将主控电脑的键盘和鼠标连接到另一台电脑、安卓设备或嵌入式系统。搭配 USB 采集卡，即可在同一窗口查看被控端画面；被控端已有屏幕时，也可以只使用键鼠共享。

被控端无需安装 OSRBOT 客户端。Pro 在此基础上提供局域网浏览器访问，以及受支持主控系统上的网络共享功能。

[English](README.md) · **简体中文** · [下载客户端](#下载客户端) · [开始使用](#开始使用) · [更新说明](CHANGELOG.md)

## 选择版本

只需要本地 USB 键鼠控制和视频采集，选择 **Lite**。需要从同一局域网内的其他设备通过浏览器访问，或需要网络共享辅助功能，选择 **Pro**。

| 功能 | Lite | Pro |
| --- | --- | --- |
| OSRBOT 键盘鼠标共享 | 支持 | 支持 |
| 不接采集卡独立使用 | 支持 | 支持 |
| 电脑 / 安卓鼠标模式 | 支持 | 支持 |
| 视频预览、缩放与全屏 | 支持 | 支持 |
| 截图、录屏与 GIF 录制 | 支持 | 支持 |
| ASCII 命令粘贴 | 支持 | 支持 |
| 中英文界面 | 支持 | 支持 |
| WebRTC 局域网浏览器控制 | 不包含 | 支持 |
| 网络共享配置 | 不包含 | Windows / Linux |
| 网络与局域网诊断 | 不包含 | 支持 |

macOS 上的 Pro 可以检测网卡，但“互联网共享”仍需在系统设置中手动开启。安卓模式指控制已连接的安卓设备，不代表提供安卓手机客户端。

## 下载客户端

**[Lite v0.2](https://github.com/osrbot/osrbot-link/releases/tag/lite-v0.2.0)** 当前为预览版；**[Pro v0.7.0](https://github.com/osrbot/osrbot-link/releases/tag/pro-v0.7.0)** 为现有完整功能版。下载前请查看对应发布页的系统要求和安装提醒。

| 主控平台 | Lite v0.2 | Pro v0.7.0 |
| --- | --- | --- |
| Windows x64 | [便携版](https://github.com/osrbot/osrbot-link/releases/download/lite-v0.2.0/OSRBOT-Link-Lite-v0.2-20261002-win-x64-portable.exe) · [安装版](https://github.com/osrbot/osrbot-link/releases/download/lite-v0.2.0/OSRBOT-Link-Lite-v0.2-20261002-win-x64.exe) | [便携版](https://github.com/osrbot/osrbot-link/releases/download/pro-v0.7.0/OSRBOT-Link-Pro-v0.7.0-20260601-win-x64-portable.exe) · [安装版](https://github.com/osrbot/osrbot-link/releases/download/pro-v0.7.0/OSRBOT-Link-Pro-v0.7.0-20260601-win-x64.exe) |
| macOS | [Apple Silicon](https://github.com/osrbot/osrbot-link/releases/download/lite-v0.2.0/OSRBOT-Link-Lite-v0.2-20261002-mac-arm64.dmg) · [Intel](https://github.com/osrbot/osrbot-link/releases/download/lite-v0.2.0/OSRBOT-Link-Lite-v0.2-20261002-mac-x64.dmg) | [Apple Silicon](https://github.com/osrbot/osrbot-link/releases/download/pro-v0.7.0/OSRBOT-Link-Pro-v0.7.0-20260601-mac-arm64.dmg) · [Intel](https://github.com/osrbot/osrbot-link/releases/download/pro-v0.7.0/OSRBOT-Link-Pro-v0.7.0-20260601-mac-x64.dmg) |
| Ubuntu x64 | [DEB](https://github.com/osrbot/osrbot-link/releases/download/lite-v0.2.0/OSRBOT-Link-Lite-v0.2-20261002-ubuntu-amd64.deb) · [AppImage](https://github.com/osrbot/osrbot-link/releases/download/lite-v0.2.0/OSRBOT-Link-Lite-v0.2-20261002-ubuntu-x86_64.AppImage) | [DEB](https://github.com/osrbot/osrbot-link/releases/download/pro-v0.7.0/OSRBOT-Link-Pro-v0.7.0-20260601-ubuntu-amd64.deb) · [AppImage](https://github.com/osrbot/osrbot-link/releases/download/pro-v0.7.0/OSRBOT-Link-Pro-v0.7.0-20260601-ubuntu-x86_64.AppImage) |

Windows 安装包面向 Windows 10 / 11。Lite 在 Windows 上需要 WebView2，在 Mac 上需要 macOS 12 或更新系统；Linux 安装包面向 Ubuntu 22.04，需要兼容的 GTK / WebKitGTK 运行库。不支持 Windows 7。另见[安装包与版本说明](docs/release-strategy.md)。

## 适用场景

- **设备维护**：在电脑与嵌入式设备之间操作，无需反复更换独立键盘和鼠标。
- **机器人与实验室调试**：将被控端画面、终端输入和画面记录集中在一起，方便配置与排查问题。
- **画面采集**：手动选择采集卡、分辨率与帧率，切换适应、填满或原始尺寸，并进行截图、录屏与 GIF 录制。
- **终端命令输入**：通过共享器发送 ASCII 命令，发送前可预览，长文本发送过程中可以停止。
- **Pro 局域网访问**：从另一台电脑或平板浏览器，访问主控端的采集画面与已连接的 OSRBOT 键鼠共享器。

## 开始使用

### 连接设备

| 连接方式 | 用途 |
| --- | --- |
| 主控电脑 → OSRBOT 共享器 → 被控设备 | 传输键盘与鼠标输入 |
| 被控设备视频输出 → USB 采集卡 → 主控电脑 | 可选的画面预览 |
| 可联网的主控电脑 → 网线 → 被控设备 | Pro 的可选网络共享 |

具体接口和接线方法请以硬件说明书为准。键鼠共享、视频采集、网络共享是独立功能，可以分别使用。

1. 将 OSRBOT 共享器连接到主控电脑和被控设备。
2. 打开客户端，手动选择 OSRBOT HID 设备并连接。
3. 如需查看画面，再连接采集卡，选择分辨率与帧率，并单独启动视频预览。
4. 点击工作区开始控制；按 `Shift+Esc` 释放键盘鼠标并退出全屏。

### 选择鼠标模式

**电脑**为默认模式，使用绝对鼠标定位，适合桌面系统。**安卓**使用相对鼠标移动，适合安卓手机和平板；控制期间鼠标会被捕获。需要返回主控端时，使用 `Shift+Esc`。

### 使用 Pro 局域网控制

1. 在主控端连接 HID，根据需要启动视频预览，然后开启局域网控制。
2. 在同一可互通局域网内，通过浏览器打开客户端显示的主控端地址。
3. 输入一次性配对码。其他浏览器需要连接时，再生成新的配对码。

每个配对码只能成功使用一次。浏览器使用独立会话，关闭页面后会话失效。网页端的适应、填满和全屏只改变显示方式，无需重新连接视频。请在可信局域网内使用，不建议直接暴露到公网。

### 使用 Pro 网络共享

选择主控端可联网的外网网卡，以及连接被控设备的网卡。连接网线后开启共享。检测网卡本身不要求先接网线。

Windows 可能需要管理员授权；Linux 依赖 NetworkManager 和系统权限；macOS 需在系统设置中手动开启“互联网共享”。该功能用于提供网络连接，不承载 OSRBOT 键盘鼠标数据。

## 使用提醒

- **配套硬件**：键鼠控制需要 OSRBOT 共享器，USB 采集卡为可选项。硬件购买与兼容性咨询请[联系 OSRBOT](mailto:winter@osrbot.com)。
- **采集质量**：可用分辨率和帧率取决于采集卡、线材、USB 连接及被控端视频输出。画面缩放改变显示大小，不增加采集分辨率或图像细节。
- **设备权限**：根据系统提示授予相机或输入权限。Linux 的 HID 访问可能需要安装包附带的权限规则，并重新插拔 USB 设备。
- **应用安全提示**：Windows 和 macOS 可能显示安全提示，请使用官方下载并查看对应版本的安装说明。目前 macOS 安装包尚未完成 Developer ID 签名和公证。
- **命令粘贴**：仅支持 ASCII 文本，不是完整剪贴板同步，不传输中文、图片或文件。
- **局域网连接**：Pro 需要网络可达、适当的防火墙规则和浏览器 WebRTC 支持。USB 连接正常不代表局域网已连通。

## 共同作者与致谢

共同作者：[dajianli](https://github.com/dajianli)、[sunmaxwll](https://github.com/sunmaxwll)。

感谢 [kitso666](https://github.com/kitso666)、[MotorBottle](https://github.com/MotorBottle)，以及原始项目 [Jackadminx/KVM-Card-Mini](https://github.com/Jackadminx/KVM-Card-Mini) 的贡献与启发。

## 支持与许可

反馈问题时，请提供客户端版本、主控系统、连接的硬件和简要复现步骤。发送截图或日志前，请移除密码、配对码与个人信息。

本仓库用于产品说明和客户端软件下载。适用条款请参阅[许可证](LICENSE)、[第三方声明](THIRD-PARTY-NOTICES.txt)与[来源致谢](docs/third-party-notices.md)。第三方开源组件继续遵循各自原有许可证。

---

[OSRBOT](https://www.osrbot.com) · 硬件与支持：[winter@osrbot.com](mailto:winter@osrbot.com)
