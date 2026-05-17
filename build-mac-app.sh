#!/bin/bash
# OSRBOT macOS .app 打包
# bash build-mac-app.sh [arm64|amd64]
set -e

ARCH="${1:-arm64}"
DIR="$(cd "$(dirname "$0")" && pwd)"
DIST="${DIR}/dist"
BINARY="${DIST}/osrbot-mac-${ARCH}"
APP_DIR="${DIST}/OSRBOT Console.app"

if [ ! -f "$BINARY" ]; then
  echo "❌ ${BINARY} 不存在，先运行: go build -o dist/osrbot-mac-${ARCH} ." >&2
  exit 1
fi

rm -rf "$APP_DIR"
mkdir -p "${APP_DIR}/Contents/MacOS" "${APP_DIR}/Contents/Resources"

# 启动脚本 — 后台启服务→开浏览器→立即退出（不 wait）
cat > "${APP_DIR}/Contents/MacOS/osrbot" << 'SHELL'
#!/bin/bash
DIR="$(cd "$(dirname "$0")/../.." && pwd)"
nohup "${DIR}/Contents/MacOS/osrbot-bin" --browser=false --port=8710 >/dev/null 2>&1 &
disown
sleep 1.5
open "http://127.0.0.1:8710"
SHELL
chmod +x "${APP_DIR}/Contents/MacOS/osrbot"

cp "$BINARY" "${APP_DIR}/Contents/MacOS/osrbot-bin"
chmod +x "${APP_DIR}/Contents/MacOS/osrbot-bin"

# Info.plist
cat > "${APP_DIR}/Contents/Info.plist" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleExecutable</key><string>osrbot</string>
  <key>CFBundleIdentifier</key><string>com.osrbot.console</string>
  <key>CFBundleName</key><string>OSRBOT Console</string>
  <key>CFBundleDisplayName</key><string>OSRBOT Console</string>
  <key>CFBundleVersion</key><string>1.0.0</string>
  <key>CFBundleShortVersionString</key><string>1.0.0</string>
  <key>CFBundlePackageType</key><string>APPL</string>
  <key>LSMinimumSystemVersion</key><string>11.0</string>
  <key>NSHighResolutionCapable</key><true/>
  <key>LSUIElement</key><true/>
</dict>
</plist>
PLIST

# ICNS 图标
python3 <<'PYEOF' 2>/dev/null
import struct, zlib
def png(w, h, pixels):
    def c(t, d):
        cid = t + d
        return struct.pack('>I',len(d)) + cid + struct.pack('>I', zlib.crc32(cid)&0xffffffff)
    raw = b''.join(b'\x00' + bytes(r) for r in pixels)
    return (b'\x89PNG\r\n\x1a\n' + c(b'IHDR', struct.pack('>IIBBBBB',w,h,8,2,0,0,0)) +
            c(b'IDAT', zlib.compress(raw)) + c(b'IEND', b''))
w,h = 512,512; img=[]
for y in range(h):
    row=[]
    for x in range(w):
        cx, cy = x-w//2, y-h//2
        r,g,b = 13,16,28
        if abs(cx) < 160 and abs(cy) < 136: r,g,b=15,23,42
        if abs(cx) < 160 and abs(cy) < 136 and (abs(cx)>156 or abs(cy)>130): r,g,b=59,130,246
        if abs(cx) < 60 and abs(cy) < 56: r,g,b=233,69,96
        if abs(cx) < 30 and abs(cy) < 28: r,g,b=245,90,115
        row.extend([r,g,b])
    img.append(row)
with open('/tmp/osrbot-icon.png','wb') as f: f.write(png(w,h,img))
PYEOF

if [ -f /tmp/osrbot-icon.png ]; then
  ISET="/tmp/osrbot-is-$$"
  mkdir -p "$ISET"
  for s in 16 32 64 128 256 512; do
    sips -z $s $s /tmp/osrbot-icon.png --out "${ISET}/icon_${s}x${s}.png" &>/dev/null
  done
  for s in 32 64 128 256 512; do
    cp "${ISET}/icon_${s}x${s}.png" "${ISET}/icon_$((s/2))x$((s/2))@2x.png"
  done
  iconutil -c icns "$ISET" -o "${APP_DIR}/Contents/Resources/icon.icns" 2>/dev/null
  rm -rf "$ISET" /tmp/osrbot-icon.png
fi

echo ""
echo "✅ OSRBOT Console.app (${ARCH})"
echo "   ${APP_DIR}"
echo ""
echo "启动: 双击 OSRBOT Console.app"
