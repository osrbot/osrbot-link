# OSRBOT Link Lite

OSRBOT Link Lite 是 OSRBOT 键盘鼠标共享器 2.0 的跨平台客户端，面向本地硬件调试、嵌入式设备维护、工控主机、机器人主机、NUC/SBC 等场景。

客户端分为两条独立链路：

- 键盘鼠标：通过 OSRBOT HID 共享器转发，支持不接采集卡单独使用。
- 视频画面：通过 USB 采集卡预览，适合被控端没有独立屏幕或需要录屏/截图时使用。

## 当前版本

- 客户端版本：`0.2.0`
- 当前分支：`lite`
- 构建产物会带版本号和构建日期，例如：

```text
OSRBOT-Link-Lite-v0.2-20260518-mac-arm64.dmg
OSRBOT-Link-Lite-v0.2-20260518-win-x64.exe
OSRBOT-Link-Lite-v0.2-20260518-ubuntu-x86_64.AppImage
```

## 平台支持

主线新版客户端基于 Electron 28：

- macOS：生成 Apple Silicon arm64 和 Intel x64 两个 DMG。
- Windows：主线目标为 Windows 10/11，默认生成 x64；ia32 需要在 Windows/CI 环境单独尝试 `npm run dist:win:ia32`。
- Linux：主线目标为 Ubuntu x64，提供 AppImage 和 deb。

当前验证状态：

- macOS：已在真实硬件上验证采集卡、键鼠共享、截图/录屏等核心功能。
- Windows：安装包可生成，但 HID 共享器识别仍需继续适配。共享器在 Windows 设备管理器中会出现在“人体学输入设备”下，后续需要参考 OSRBOT 旧 Windows 客户端的 HID 打开方式。
- Linux：安装包可生成，但 HID/udev 权限和设备识别仍需在 Ubuntu 真机上继续验证。

Windows 7 说明：

- 当前 Electron 28 主线不支持 Windows 7。
- Electron 官方从 Electron 23 起停止 Windows 7/8/8.1 支持，最后支持 Windows 7 的主版本是 Electron 22。
- 如果必须支持 Windows 7，建议单独维护 `legacy-win7` 分支或 legacy 构建，固定 Electron 22 或改用 Qt/C++ 等传统桌面技术栈。

参考：

- Electron Windows 7/8/8.1 deprecation notice: https://www.electronjs.org/blog/windows-7-to-8-1-deprecation-notice
- Electron 22 release notes: https://www.electronjs.org/blog/electron-22-0

## 当前功能

- 自动发现 OSRBOT HID 共享器。
- 自动发现 USB 视频采集设备。
- 支持有采集卡视频预览，也支持无采集卡纯键鼠共享。
- 支持绝对鼠标和相对鼠标模式。
- 支持键盘/鼠标转发，Esc 退出控制模式和全屏。
- 支持 Ctrl+Alt+Del。
- 支持发送 Win+P 作为被控端显示/投影模式切换快捷键。
- 支持截图保存 PNG。
- 支持压缩录屏保存 WebM。
- 支持短时录制 GIF。
- 支持中文/英文 UI。
- 支持自定义采集分辨率。

## 分辨率说明

分辨率列表来自三部分：

- 内置常见分辨率列表。
- 用户在设置中输入的自定义分辨率。
- 采集卡实际返回的分辨率，运行时会临时加入列表。

自定义格式示例：

```text
1920x1200,2560x1440,3840x2160
```

注意：加入列表不代表采集卡一定支持。启动视频时如果请求失败，客户端会自动尝试其他可用分辨率。

## 多屏被控端说明

当前客户端无法直接枚举被控端的多个显示器，因为被控端没有安装 agent，OSRBOT 硬件只负责 HID 输入和采集卡画面。当前的“切换显示”按钮会发送 Windows 的 `Win+P` 快捷键，用于切换复制/扩展/仅第二屏等投影模式。

如果后续需要精准选择被控端的某一个屏幕，需要增加其中一种能力：

- 被控端安装轻量 agent，回传显示器拓扑。
- 固件/硬件层提供可查询的显示切换协议。
- 让用户通过被控端系统设置或快捷键先切到采集卡所在屏幕。

## 本地测试

根目录协议测试：

```bash
npm test
```

macOS 硬件检查：

```bash
npm run hardware:usb
npm run hardware:hid:list
npm run hardware:hid:probe
npm run hardware:hid:reset
```

`hid:reset` 只发送安全的释放/复位报文，不会移动鼠标到危险位置。

## 打包

进入桌面客户端目录：

```bash
cd apps/desktop
npm install
```

macOS Apple Silicon：

```bash
npm run dist:mac
```

Windows x64：

```bash
npm run dist:win
```

Linux Ubuntu x64：

```bash
npm run dist:linux
```

全部平台：

```bash
npm run dist:all
```

注意：

- macOS 当前未配置 Developer ID 签名和 notarization，公开分发前需要补齐。
- Windows 公开分发前需要代码签名，避免安全软件误报。
- Linux deb 安装包包含 udev 权限规则安装脚本，用户可能需要重新插拔设备或重启 udev。
- 跨平台打包最好在对应系统或 CI runner 上完成；macOS 本机打 Windows/Linux 包可能受 Wine、Linux 打包工具和原生依赖限制。

## GitHub 推送

目标仓库：

```text
https://github.com/osrbot/osrbot-link
```

建议推送分支：

```text
lite
```

推送前确认：

```bash
git status
git log --oneline -5
```

推送：

```bash
git push origin lite
```

## 技术方向

详细技术方向、两个历史客户端分析、HID 协议整理、Win7 legacy 判断见：

```text
docs/technical-direction.md
```
