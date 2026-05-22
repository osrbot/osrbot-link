# OSRBOT Link

OSRBOT Link 是 OSRBOT 键盘鼠标共享器的跨平台桌面客户端，用于在一台主控电脑上控制另一台电脑、手机、平板或嵌入式设备。客户端的核心能力是键盘鼠标共享；当接入 USB 采集卡时，也可以在同一窗口内完成画面预览、全屏控制、截图、录屏和 GIF 录制。

![OSRBOT Link workflow](docs/images/osrbot-link-overview.svg)

## 项目定位

OSRBOT Link 面向机器人调试、嵌入式设备维护、实验室设备运维、无头主机管理、多系统桌面切换等场景。它把键盘鼠标共享、可选视频预览和常用远端操作整合在一个客户端里，减少外设、显示器和采集软件之间反复切换的成本。

客户端支持两类工作方式：

- 纯键鼠共享：被控端本身有屏幕，或用户可以直接看到被控端画面时，只连接 OSRBOT 键盘鼠标共享器即可。
- 视频预览控制：需要在主控端查看被控端画面时，同时连接 USB 采集卡，客户端会显示采集画面并在画面区域内完成控制。

## 主要功能

- OSRBOT HID 键盘、鼠标输入转发。
- 支持无采集卡的纯键鼠共享模式。
- 支持 USB 采集卡视频预览。
- 支持电脑和安卓两种目标设备模式。
- 电脑模式使用绝对鼠标坐标，适合 Windows、macOS、Ubuntu 等桌面系统。
- 安卓模式使用相对鼠标移动，适合安卓手机和平板。
- 支持自适应、填满、原始三种画面缩放方式。
- 支持全屏显示和侧栏隐藏，方便在小屏或采集画面场景下操作。
- 支持截图、压缩录屏和 GIF 录制。
- 支持终端命令粘贴，通过 HID 键盘逐字符输入常用命令文本。
- 支持自定义采集分辨率，并显示实际协商到的采集参数。
- 支持被控端显示切换快捷操作。
- 支持中文和英文界面。
- 支持明亮和深色皮肤。

## 使用方式

### 键鼠共享

1. 将 OSRBOT 键盘鼠标共享器连接到主控电脑。
2. 在客户端左侧选择 HID 设备并连接。
3. 点击右侧工作区或采集画面进入控制。
4. 需要退出控制时：
   - macOS 主控端使用 `Shift+Esc`。
   - Windows / Linux 主控端可使用右 `Ctrl` 退出控制模式。
   - `Shift+Esc` 会同时退出全屏和控制模式。

纯键鼠共享不要求接入采集卡。被控端本身有屏幕时，可以只用共享器完成键盘鼠标控制。

### 视频预览

1. 将 USB 采集卡连接到主控电脑。
2. 在客户端左侧选择视频设备、分辨率、FPS 和画面缩放方式。
3. 点击开始视频。
4. 在画面区域内点击进入控制。

如果采集卡没有按请求分辨率输出，客户端会显示实际协商到的采集参数。画面缩放只影响客户端显示方式，不改变采集卡自身输出。

### 电脑与安卓模式

电脑模式是默认模式，适合桌面系统。它使用绝对鼠标坐标，非全屏时鼠标可以正常离开客户端窗口；再次控制时，重新点击工作区或采集画面即可。

安卓模式适合安卓手机和平板。该模式使用相对鼠标移动，进入控制后需要使用退出快捷键离开控制模式。

### 命令粘贴

命令粘贴适合把主控端剪贴板中的终端命令发送到被控端。当前实现基于 HID 键盘逐字符输入，适合英文命令、数字、路径和常见 shell 符号。

当前限制：

- 仅支持 ASCII 文本。
- 不支持中文、图片、文件或完整剪贴板同步。
- 长文本会被限制，发送前可预览，发送过程中可以停止。

完整剪贴板同步需要被控端 Agent 或额外数据通道配合，属于后续能力。

## 平台支持

- macOS
- Windows 10 / 11
- Ubuntu Linux

不同系统对输入监听、摄像头、HID 访问和应用沙盒有不同权限要求。首次使用时，请根据系统提示授予相机、辅助功能、输入监听或 HID 设备访问权限。Ubuntu 用户可能需要安装 deb 包或按客户端提示配置 HID 访问权限。

## 硬件

OSRBOT Link 配套 OSRBOT 键盘鼠标共享器使用。硬件连接、接口说明、典型使用方式和注意事项，请以 OSRBOT 官方产品说明书为准。

如需购买 OSRBOT 键盘鼠标共享器硬件，请联系 OSRBOT。

## 技术栈

- Electron
- HTML / CSS / JavaScript
- Chromium MediaDevices API
- node-hid / HIDAPI
- Rust N-API 原生输入模块

## 源码与许可证

OSRBOT Link 的完整客户端源码、硬件协议实现、原生输入模块、网络共享实现和构建流程由 OSRBOT 私有维护。公开仓库主要用于产品介绍、文档、第三方声明和客户端 Release 下载。

OSRBOT 自有代码为专有代码，未经 OSRBOT 书面许可，不得复制、修改、分发、再发布或用于商业派生项目。第三方开源组件仍遵循其原始许可证，相关说明见 [THIRD-PARTY-NOTICES.txt](THIRD-PARTY-NOTICES.txt) 和 [docs/third-party-notices.md](docs/third-party-notices.md)。

## 当前限制

- Windows 7 暂不作为支持目标。
- 命令粘贴不是完整剪贴板同步，当前仅用于常见终端命令输入。
- USB 采集画质受采集卡、线材、被控端输出分辨率、系统缩放和采集参数共同影响。
- Linux HID 权限依赖系统 udev、plugdev 和桌面环境策略，首次使用可能需要重新插拔设备或重新登录。
- macOS 输入监听和辅助功能权限由系统控制，授权后可能需要重新启动客户端。

## Contributors

- [sunmaxwll](https://github.com/sunmaxwll)
- [dajianli](https://github.com/dajianli)
- [kitso666](https://github.com/kitso666)

## Thanks

感谢 [MotorBottle](https://github.com/MotorBottle) 在相关客户端设计方向上的探索与参考。

感谢 [Jackadminx/KVM-Card-Mini](https://github.com/Jackadminx/KVM-Card-Mini) 原始项目在 KVM 方向上的开源工作。

## Source Availability

This public repository is used for OSRBOT Link product information,
documentation, release notes, and packaged client downloads. The complete
application source code is maintained privately by OSRBOT.
