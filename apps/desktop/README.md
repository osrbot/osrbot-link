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

当前主线基于 Electron 28，目标为 macOS、Windows 10/11、Ubuntu Linux。Windows 7 需要单独 legacy 构建。
