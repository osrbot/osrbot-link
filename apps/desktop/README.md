# OSRBOT Link Desktop

OSRBOT Link Desktop 是 OSRBOT Link 的 Electron 桌面客户端，配合 OSRBOT 键盘鼠标共享器使用。它负责 HID 键盘鼠标转发、USB 采集卡预览、全屏显示、截图、录屏、GIF 录制和常用快捷操作。

![OSRBOT Link workflow](../../docs/images/osrbot-link-overview.svg)

## 功能概览

- OSRBOT HID 键盘鼠标共享。
- 无采集卡纯键鼠控制。
- USB 采集卡视频预览。
- 电脑/安卓目标设备模式。
- 自适应、填满、原始三种画面缩放。
- 全屏显示和左侧栏隐藏。
- 右 Ctrl 或 Shift+Esc 退出控制。
- 终端命令粘贴。
- 截图、录屏和 GIF 录制。
- 自定义采集分辨率。
- 明亮/深色皮肤。
- 中文/英文界面。

## 平台

- macOS
- Windows 10 / 11
- Ubuntu Linux

## 技术组成

- Electron 主进程负责窗口、菜单、文件保存、系统权限和原生输入抓取。
- Renderer 负责视频采集、控制模式、菜单命令、截图录屏和界面状态。
- node-hid 负责 OSRBOT HID 设备枚举、连接和输入报告写入。
- Rust N-API 模块用于主控端键盘事件抓取。

## 使用注意

- 视频预览是可选能力；被控端本身有屏幕时，可以只连接键鼠共享器。
- 电脑模式使用绝对鼠标坐标；安卓模式使用相对鼠标移动。
- Linux 首次使用可能需要配置 HID 权限。
- macOS 首次使用可能需要授予相机、辅助功能或输入监听权限。

## Contributors

- [sunmaxwll](https://github.com/sunmaxwll)
- [dajianli](https://github.com/dajianli)
- [kitso666](https://github.com/kitso666)

## Thanks

感谢 [MotorBottle](https://github.com/MotorBottle) 和 [Jackadminx/KVM-Card-Mini](https://github.com/Jackadminx/KVM-Card-Mini) 对本项目设计与技术探索的参考价值。
