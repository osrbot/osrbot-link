// OSRBOT — Go 原生桥 + Web 控制台
// 单文件二进制，跨平台 HID 通信，内嵌 WebSocket 服务器 + Vue 前端
//
// 使用方式:
//   1. 双击运行 osrbot (或从终端运行)
//   2. 浏览器自动打开 http://localhost:8710
//   3. 插上 OSRBOT 共享器和采集卡
//   4. 点击"连接设备"开始使用

package main

import (
	"embed"
	"encoding/json"
	"flag"
	"fmt"
	"io/fs"
	"log"
	"net"
	"net/http"
	"os"
	"os/signal"
	"runtime"
	"strconv"

	"github.com/gorilla/websocket"
	"github.com/karalabe/hid"
	"github.com/osrbot/osrbot/hid/rawhid"
)

// ───────── 内嵌 Web 前端 ─────────

//go:embed web/index.html web/css web/js web/icon.svg
var webFS embed.FS

// ───────── 协议常量 ─────────

const (
	CmdKeyboard    = 1
	CmdMouse       = 2
	CmdReadLED     = 3
	CmdReset       = 4
	CmdUSBswitch   = 0x6F

	VID = 0x413D
	PID = 0x2107

	ReportSize = 10
)

type HIDReport [ReportSize]byte

// ───────── 配置 ─────────

type Config struct {
	Port     int
	Host     string
	OpenBrowser bool
	DevicePath  string
}

func defaultConfig() Config {
	return Config{
		Port:     8710,
		Host:     "0.0.0.0", // 默认监听所有网卡（局域网可用）
		OpenBrowser: true,
	}
}

// ───────── WebSocket 消息 ─────────

type WSMessage struct {
	Type    string          `json:"type"`
	Payload json.RawMessage `json:"payload"`
}

type KeyboardPayload struct {
	Modifier  int   `json:"modifier"`
	KeyCodes  []int `json:"keyCodes"`
	Modifiers int   `json:"modifiers"`
}

type MousePayload struct {
	Buttons int `json:"buttons"`
	X       int `json:"x"`
	Y       int `json:"y"`
	Wheel   int `json:"wheel"`
}

type USBSwitchPayload struct {
	Port int `json:"port"`
}

type ResetPayload struct {
	Type string `json:"type"`
}

// ───────── 主程序 ─────────

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

// ───────── LAN 模式 ─────────
var (
	lanMode bool
)

func main() {
	cfg := defaultConfig()

	flag.IntVar(&cfg.Port, "port", cfg.Port, "HTTP 端口")
	flag.StringVar(&cfg.Host, "host", cfg.Host, "监听地址")
	flag.BoolVar(&cfg.OpenBrowser, "browser", cfg.OpenBrowser, "自动打开浏览器")
	flag.Parse()

	log.SetFlags(log.Ltime | log.Lshortfile)
	log.Println("🦞 OSRBOT Console 启动中...")

	// ── 枚举 HID 设备 ──
	devices := hid.Enumerate(VID, PID)
	if len(devices) == 0 {
		log.Println("⚠️  未检测到 OSRBOT 设备，请连接后刷新页面")
		log.Printf("   期望 VID:0x%04X PID:0x%04X", VID, PID)
	} else {
		for _, d := range devices {
			log.Printf("🔌 发现 OSRBOT: %s (路径: %s)", d.Product, d.Path)
		}
	}

	// ── HTTP 路由 ──
	mux := http.NewServeMux()

	// WebSocket 端点
	mux.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		handleWebSocket(w, r)
	})

	// 设备信息和状态 API
	mux.HandleFunc("/api/devices", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		devs := hid.Enumerate(VID, PID)
		type DeviceInfo struct {
			Path      string `json:"path"`
			Product   string `json:"product"`
			VendorID  uint16 `json:"vendorId"`
			ProductID uint16 `json:"productId"`
			Connected bool   `json:"connected"`
		}
		info := make([]DeviceInfo, 0, len(devs))
		for _, d := range devs {
			info = append(info, DeviceInfo{
				Path:      d.Path,
				Product:   d.Product,
				VendorID:  d.VendorID,
				ProductID: d.ProductID,
				Connected: true,
			})
		}
		json.NewEncoder(w).Encode(info)
	})

	// 静态文件
	webRoot, err := fs.Sub(webFS, "web")
	if err != nil {
		log.Fatalf("❌ 无法加载内嵌资源: %v", err)
	}
	mux.Handle("/", http.FileServer(http.FS(webRoot)))

	// ── 启动 HTTP 服务 ──
	listener, err := net.Listen("tcp", net.JoinHostPort(cfg.Host, strconv.Itoa(cfg.Port)))
	if err != nil {
		log.Fatalf("❌ 无法监听端口 %d: %v", cfg.Port, err)
	}

	// 如果端口是 0，获取实际分配的端口
	actualPort := listener.Addr().(*net.TCPAddr).Port
	url := fmt.Sprintf("http://127.0.0.1:%d", actualPort)
	localIP := getLocalIP()
	lanURL := fmt.Sprintf("http://%s:%d", localIP, actualPort)

	fmt.Println()
	fmt.Println("╔══════════════════════════════════════════╗")
	fmt.Println("║       OSRBOT Console 🦞                ║")
	fmt.Println("╠══════════════════════════════════════════╣")
	fmt.Printf("║  📍 本地:  %-33s ║\n", url)
	fmt.Printf("║  🌐 局域网: %-33s ║\n", lanURL)
	fmt.Println("║                                          ║")
	if len(devices) == 0 {
		fmt.Println("║  ⚠️  未检测到 OSRBOT 设备                  ║")
		fmt.Println("║     请连接后打开页面或点击「重新扫描」          ║")
	}
	fmt.Println("║  Ctrl+C 停止服务                          ║")
	fmt.Println("╚══════════════════════════════════════════╝")
	fmt.Println()

	// ── 自动打开浏览器 ──
	if cfg.OpenBrowser {
		tryOpenBrowser(url)
	}

	// ── 优雅退出 ──
	go func() {
		sigCh := make(chan os.Signal, 1)
		signal.Notify(sigCh, os.Interrupt)
		<-sigCh
		log.Println("👋 停止服务...")
		listener.Close()
		os.Exit(0)
	}()

	// API：连接信息（必须在 actualPort 确定后注册）
	mux.HandleFunc("/api/info", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		localIP := getLocalIP()
		json.NewEncoder(w).Encode(map[string]interface{}{
			"host":     cfg.Host,
			"port":     actualPort,
			"lanURL":   fmt.Sprintf("http://%s:%d", localIP, actualPort),
			"localURL": fmt.Sprintf("http://127.0.0.1:%d", actualPort),
		})
	})

	log.Printf("✅ 服务已启动: %s", url)
	if err := http.Serve(listener, mux); err != nil {
		log.Fatalf("❌ 服务错误: %v", err)
	}
}

// ───────── WebSocket 处理器 ─────────

var (
	activeDevice *rawhid.Device
	deviceMutex  struct {
		opened bool
		mu     chan struct{}
	}
)

func init() {
	deviceMutex.mu = make(chan struct{}, 1)
	deviceMutex.mu <- struct{}{}
}

func handleWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("WebSocket 升级失败: %v", err)
		return
	}
	defer conn.Close()

	log.Printf("🔗 WebSocket 客户端已连接: %s", r.RemoteAddr)

	// 发送欢迎消息
	conn.WriteJSON(map[string]interface{}{
		"type": "connected",
		"payload": map[string]interface{}{
			"version": "1.0.0",
		},
	})

	for {
		_, msgBytes, err := conn.ReadMessage()
		if err != nil {
			log.Printf("WebSocket 断开: %v", err)
			return
		}

		var msg WSMessage
		if err := json.Unmarshal(msgBytes, &msg); err != nil {
			log.Printf("消息解析失败: %v", err)
			continue
		}

		handleMessage(conn, &msg)
	}
}

func handleMessage(conn *websocket.Conn, msg *WSMessage) {
	switch msg.Type {
	case "open_device":
		handleOpenDevice(conn, msg)
	case "keyboard":
		handleKeyboard(conn, msg)
	case "mouse":
		handleMouse(conn, msg)
	case "mouse_pos":
		handleMousePos(conn, msg)
	case "mouse_btn":
		handleMouseBtn(conn, msg)
	case "mouse_wheel":
		handleMouseWheel(conn, msg)
	case "reset_hid":
		handleReset(conn)
	case "reset_mcu":
		handleResetMCU(conn)
	case "usb_switch":
		handleUSBSwitch(conn, msg)
	case "ping":
		conn.WriteJSON(map[string]string{"type": "pong"})
	default:
		log.Printf("未知消息类型: %s", msg.Type)
	}
}

func handleOpenDevice(conn *websocket.Conn, msg *WSMessage) {
	<-deviceMutex.mu
	defer func() { deviceMutex.mu <- struct{}{} }()

	// 关闭已有连接
	if deviceMutex.opened {
		activeDevice.Close()
		deviceMutex.opened = false
	}

	// ── macOS: 用 rawhid 直接通过 IOKit 打开（绕过 karalabe/hid 的 empty path 问题）──
	// ── 其他平台: 走 karalabe/hid 的原有逻辑 ──
	var d *rawhid.Device
	var product string
	var err error

	if rawhid.Supported() {
		d, err = rawhid.Open(VID, PID)
		if err != nil {
			log.Printf("打开设备失败 (rawhid): %v", err)
			conn.WriteJSON(map[string]interface{}{
				"type":    "device_status",
				"payload": map[string]interface{}{"status": "error", "error": err.Error()},
			})
			return
		}
	} else {
		// TODO: 非 macOS 平台需要实现 rawhid 的 IOHIDDevice 替代方案
		conn.WriteJSON(map[string]interface{}{
			"type":    "device_status",
			"payload": map[string]interface{}{"status": "error", "error": "非 macOS 平台暂不支持"},
		})
		return
	}

	activeDevice = d
	deviceMutex.opened = true
	// 尝试从 rawhid 获取产品名
	product = fmt.Sprintf("OSRBOT KVM (VID=%04x PID=%04x)", VID, PID)
	log.Printf("✅ 设备已打开: %s", product)

	conn.WriteJSON(map[string]interface{}{
		"type":    "device_status",
		"payload": map[string]interface{}{"status": "connected"},
	})

	// 启动读取 goroutine（处理设备上报的状态）
	go readDeviceLoop(conn, d)
}

func readDeviceLoop(conn *websocket.Conn, dev *rawhid.Device) {
	buf := make([]byte, ReportSize)
	for {
		n, err := dev.Read(buf)
		if err != nil || n == 0 {
			return
		}
		// 设备上报：目前只有 LED 状态和 USB 切换状态
		if buf[0] == 0x6F && buf[2] == 3 {
			conn.WriteJSON(map[string]interface{}{
				"type": "usb_status",
				"payload": map[string]interface{}{
					"host":   int(buf[3]),
					"target": int(buf[4]),
					"power":  int(buf[5]),
				},
			})
		} else if buf[0] == 3 {
			conn.WriteJSON(map[string]interface{}{
				"type": "led_status",
				"payload": map[string]interface{}{
					"capsLock":    (buf[2] & 1) != 0,
					"numLock":     (buf[2] & 2) != 0,
					"scrollLock":  (buf[2] & 4) != 0,
				},
			})
		}
	}
}

func sendReport(report HIDReport) error {
	<-deviceMutex.mu
	defer func() { deviceMutex.mu <- struct{}{} }()

	if !deviceMutex.opened || activeDevice == nil {
		return fmt.Errorf("设备未打开")
	}

	_, err := activeDevice.Write(report[:])
	return err
}

func handleKeyboard(conn *websocket.Conn, msg *WSMessage) {
	var payload KeyboardPayload
	json.Unmarshal(msg.Payload, &payload)

	mod := payload.Modifier
	if payload.Modifiers != 0 {
		mod = payload.Modifiers
	}

	var report HIDReport
	report[0] = CmdKeyboard
	report[2] = byte(mod & 0xFF)
	if len(payload.KeyCodes) > 0 {
		// bytes 4-9: 最多 6 个 key codes
		for i := 0; i < len(payload.KeyCodes) && i < 6; i++ {
			report[4+i] = byte(payload.KeyCodes[i] & 0xFF)
		}
	}

	if err := sendReport(report); err != nil {
		log.Printf("键盘发送失败: %v", err)
	}
}

func handleMouse(conn *websocket.Conn, msg *WSMessage) {
	var payload MousePayload
	json.Unmarshal(msg.Payload, &payload)

	var report HIDReport
	report[0] = CmdMouse
	report[2] = byte(payload.Buttons & 0xFF)
	report[3] = byte(payload.X & 0xFF)
	report[4] = byte((payload.X >> 8) & 0xFF)
	report[5] = byte(payload.Y & 0xFF)
	report[6] = byte((payload.Y >> 8) & 0xFF)
	report[7] = byte(payload.Wheel & 0xFF)

	if err := sendReport(report); err != nil {
		log.Printf("鼠标发送失败: %v", err)
	}
}

func handleMousePos(conn *websocket.Conn, msg *WSMessage) {
	var payload struct {
		X int `json:"x"`
		Y int `json:"y"`
	}
	json.Unmarshal(msg.Payload, &payload)

	var report HIDReport
	report[0] = CmdMouse
	report[3] = byte(payload.X & 0xFF)
	report[4] = byte((payload.X >> 8) & 0xFF)
	report[5] = byte(payload.Y & 0xFF)
	report[6] = byte((payload.Y >> 8) & 0xFF)

	if err := sendReport(report); err != nil {
		log.Printf("鼠标位置发送失败: %v", err)
	}
}

func handleMouseBtn(conn *websocket.Conn, msg *WSMessage) {
	var payload struct {
		Buttons int `json:"buttons"`
	}
	json.Unmarshal(msg.Payload, &payload)

	var report HIDReport
	report[0] = CmdMouse
	report[2] = byte(payload.Buttons & 0xFF)

	if err := sendReport(report); err != nil {
		log.Printf("鼠标按键发送失败: %v", err)
	}
}

func handleMouseWheel(conn *websocket.Conn, msg *WSMessage) {
	var payload struct {
		Delta int `json:"delta"`
	}
	json.Unmarshal(msg.Payload, &payload)

	var report HIDReport
	report[0] = CmdMouse
	report[7] = byte(payload.Delta & 0xFF)

	if err := sendReport(report); err != nil {
		log.Printf("滚轮发送失败: %v", err)
	}
}

func handleReset(conn *websocket.Conn) {
	var report HIDReport
	report[0] = 4
	if err := sendReport(report); err != nil {
		log.Printf("复位发送失败: %v", err)
	}
}

func handleResetMCU(conn *websocket.Conn) {
	var report HIDReport
	report[0] = 4
	if err := sendReport(report); err != nil {
		log.Printf("MCU 复位发送失败: %v", err)
	}
}

func handleUSBSwitch(conn *websocket.Conn, msg *WSMessage) {
	var payload USBSwitchPayload
	json.Unmarshal(msg.Payload, &payload)

	var report HIDReport
	report[0] = CmdUSBswitch
	report[2] = byte(payload.Port & 0xFF)

	if err := sendReport(report); err != nil {
		log.Printf("USB 切换失败: %v", err)
	}
}

// ───────── 工具函数 ─────────

func getLocalIP() string {
	addrs, err := net.InterfaceAddrs()
	if err != nil {
		return "127.0.0.1"
	}
	for _, addr := range addrs {
		if ipnet, ok := addr.(*net.IPNet); ok && !ipnet.IP.IsLoopback() {
			if ipnet.IP.To4() != nil {
				return ipnet.IP.String()
			}
		}
	}
	return "127.0.0.1"
}

func tryOpenBrowser(url string) {
	// 跨平台打开浏览器
	var cmd string
	var args []string

	switch runtime.GOOS {
	case "windows":
		cmd = "rundll32"
		args = []string{"url.dll,FileProtocolHandler", url}
	case "darwin":
		cmd = "/usr/bin/open"
		args = []string{url}
	default:
		cmd = "xdg-open"
		args = []string{url}
	}

	proc, err := os.StartProcess(cmd, append([]string{cmd}, args...), &os.ProcAttr{
		Files: []*os.File{nil, nil, nil},
	})
	if err != nil {
		log.Printf("无法自动打开浏览器: %v (请手动打开 %s)", err, url)
	} else {
		proc.Release()
	}
}
