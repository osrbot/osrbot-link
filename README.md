# OSRBOT Share 🦞

> **跨平台键鼠共享器** — 一套键鼠控制多台电脑

OSRBOT Share 是 [OSRBOT KVM 共享器](https://osrbot.com) 的跨平台客户端。插上共享器，局域网内任何设备打开浏览器即可远程操控被控机的键盘和鼠标。

## ✨ 特性

- **即插即用** — 无需配置，插上 OSRBOT 共享器即用
- **跨平台** — Windows 7/10/11、macOS Intel/ARM、Linux x86_64/ARM64
- **零客户端** — 被控机无需安装任何软件，打开浏览器即可控制
- **局域网共享** — 同 WiFi 下电脑/手机/平板均可同时操控
- **USB 切换** — 一键切换 USB 在上位机与被控机之间
- **远程粘贴** — 直接粘贴文本到被控机

## 🖥️ 截图

```text
┌──────────────────────────────────────┐
│   OSRBOT Share  v0.1                │
│                                      │
│   🔌 连接 OSRBOT 设备                │
│                                      │
│   [点击此处激活控制]                   │
│                                      │
│   🌐 局域网设备访问:                   │
│   http://192.168.x.x:8710            │
└──────────────────────────────────────┘
```

## ⚡ 快速开始

### 1️⃣ 连接硬件

1. 将 OSRBOT KVM 共享器通过 USB 连接到**上位机**（运行此软件的电脑）
2. 将共享器的 **Target USB** 口连接到**被控机**
3. （可选）连接 USB 采集卡到上位机获取被控机画面

### 2️⃣ 运行客户端

**macOS:**

```bash
# 下载后解压
tar xzf osrbot-share-mac-arm64.tar.gz
cd osrbot-share
chmod +x osrbot
./osrbot
```

**Windows:**

```bash
# 双击 osrbot.exe 即可
# 或命令行运行
osrbot.exe
```

**Linux:**

```bash
tar xzf osrbot-share-linux-amd64.tar.gz
cd osrbot-share
chmod +x osrbot
./osrbot
```

### 3️⃣ 开始使用

1. 程序启动后浏览器自动打开 `http://127.0.0.1:8710`
2. 点击 **"连接 OSRBOT 设备"**
3. 在控制区域点击激活鼠标控制
4. 按 `Enter` 进入键盘捕获，`Shift+Esc` 退出

### 🌐 局域网控制

同一局域网下的其他设备，打开浏览器访问程序启动时显示的局域网地址（如 `http://192.168.x.x:8710`），即可同时操控被控机。

## 🏗️ 从源码构建

### 环境要求

- [Go](https://go.dev/dl/) 1.21+
- macOS 构建需安装 [Xcode Command Line Tools](https://developer.apple.com/xcode/resources/)
- Windows/Linux 构建无需额外依赖

### 编译

```bash
# 克隆仓库
git clone https://github.com/osrbot/osrbot-share.git
cd osrbot-share

# 安装依赖
go mod download

# 编译当前平台
go build -o osrbot .

# 编译全部平台
bash build.sh
```

### 构建 macOS .app

```bash
go build -o dist/osrbot-share-mac-arm64 .
bash build-mac-app.sh arm64
# 输出: dist/OSRBOT Share.app
```

## 📦 项目结构

```
osrbot-share/
├── main.go              # Go 后端（HTTP + WebSocket + HID）
├── go.mod / go.sum      # Go 依赖
├── build.sh             # 多平台编译脚本
├── build-mac-app.sh     # macOS .app 打包
├── hid/
│   └── rawhid/          # macOS 原生 HID 驱动（IOKit）
│       ├── rawhid.go         # 非 macOS 存根
│       └── rawhid_darwin.go  # macOS IOKit 实现
├── web/                 # Vue 3 前端（嵌入二进制）
│   ├── index.html
│   ├── icon.svg
│   ├── css/style.css
│   └── js/app.js
└── ws/                  # WebSocket 辅助
```

## 🛠️ 技术栈

| 组件 | 技术 |
|------|------|
| 后端 | Go + gorilla/websocket + karalabe/hid |
| 前端 | Vue 3 (CDN) + Font Awesome |
| HID (macOS) | IOKit 原生 (CGo) |
| HID (Win/Linux) | karalabe/hid (hidapi) |
| 画面 | 浏览器 MediaDevices API (可选) |

## 👥 贡献者

- [@maxwell](https://github.com/maxwell) — 硬件设计 & 固件
- [@dajianli](https://github.com/dajianli) — 客户端开发

## 🙏 致谢

感谢所有 OSRBOT 用户的反馈与支持。

## 🛒 购买

OSRBOT KVM 共享器硬件：[https://osrbot.com](https://osrbot.com)

## 📄 许可证

[MIT](LICENSE)
