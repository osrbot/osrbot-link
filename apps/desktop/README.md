# OSRBOT Link Lite Desktop

OSRBOT Link Lite 桌面客户端，用于 OSRBOT 键盘鼠标共享器 2.0。

## 功能

- HID 键盘鼠标转发。
- 可选 USB 采集卡视频预览。
- 无采集卡时可作为纯键鼠共享器使用。
- 截图、压缩录屏、GIF 录制。
- 中文/英文界面。
- 自定义采集分辨率。

## 打包

```bash
npm install
npm run dist:mac
npm run dist:win
npm run dist:linux
```

当前主线基于 Electron 28，目标为 macOS、Windows 10/11、Ubuntu Linux。Windows 7 需要单独 legacy 构建。macOS 生成 arm64 和 Intel x64；Windows 默认 x64；ia32 需要在 Windows/CI 环境单独尝试；Linux 优先 Ubuntu x64。

当前 macOS 已通过真实硬件测试。Windows 和 Linux 包已可生成，但 HID 共享器识别仍需要继续适配；Windows 侧应参考 OSRBOT 旧 Windows 客户端处理“人体学输入设备”下的共享器访问方式。
