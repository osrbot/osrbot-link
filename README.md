# OSRBOT Link

OSRBOT Link 是面向 OSRBOT 键盘鼠标共享器 2.0 的跨平台桌面客户端。它用于在主控电脑上连接 OSRBOT 共享器硬件，并将键盘、鼠标输入转发到被控端设备，同时可选接入 USB 采集卡进行画面预览。

这个项目面向机器人调试、嵌入式设备维护、无头主机管理、多设备桌面控制等场景。用户可以在一台主控电脑上完成键盘、鼠标和可选视频画面的集中控制，减少频繁切换外设和显示器带来的成本。

## 使用场景

### 键鼠共享

当被控端设备本身已经连接显示器，或用户可以直接看到被控端屏幕时，只需要连接 OSRBOT 键盘鼠标共享器，即可使用 OSRBOT Link 转发主控端键盘和鼠标输入。

### 视频预览与控制

当主控端需要查看被控端画面时，可以同时接入 USB 采集卡。OSRBOT Link 会在客户端内显示采集画面，并将鼠标、键盘操作转发到共享器硬件，实现更完整的 KVM 控制体验。

### 多屏目标设备

当被控端拥有多个显示器时，客户端提供显示切换快捷操作，方便用户在不同桌面输出之间切换。

## 主要功能

- 键盘和鼠标输入转发。
- 支持绝对鼠标、相对鼠标和滚轮操作。
- 支持 USB 采集卡视频预览。
- 支持无采集卡的纯键鼠共享模式。
- 支持自定义采集分辨率。
- 支持手动切换被控端显示输出。
- 支持截图、录屏和 GIF 录制。
- 截图、录屏和 GIF 输出带 OSRBOT Link 溯源水印。
- 支持明亮/深色皮肤切换。
- 支持中文和英文界面。

## 硬件

OSRBOT Link 配套 OSRBOT 键盘鼠标共享器 2.0 使用。硬件参数、连接方式和使用注意事项，请以 OSRBOT 官方产品说明书为准。

如需购买 OSRBOT 键盘鼠标共享器硬件，请联系 OSRBOT。

## 系统支持

OSRBOT Link 面向常见桌面平台提供客户端：

- macOS
- Windows
- Ubuntu Linux

不同系统对 HID 设备、输入监听、视频采集和应用权限的要求不同。首次使用时，可能需要根据系统提示授予输入监听、辅助功能、摄像头或 HID 设备访问权限。

## 技术栈

- Electron
- HTML / CSS / JavaScript
- Chromium MediaDevices API
- node-hid / HIDAPI
- Rust N-API 原生模块

## Contributors

- [sunmaxwll](https://github.com/sunmaxwll)
- [dajianli](https://github.com/dajianli)
- [kitso666](https://github.com/kitso666)

## Thanks

感谢 [MotorBottle](https://github.com/MotorBottle) 在相关客户端设计方向上的探索与参考。

感谢 [Jackadminx/KVM-Card-Mini](https://github.com/Jackadminx/KVM-Card-Mini) 原始项目在 KVM 方向上的开源工作。
