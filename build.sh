#!/bin/bash
# OSRBOT Console — 多平台构建脚本
set -e

APP="osrbot"
DIR="$(cd "$(dirname "$0")" && pwd)"
DIST="${DIR}/dist"
ZIP="osrbot-link"

info()  { echo -e "\033[36m▶ $1\033[0m"; }
ok()    { echo -e "\033[32m✓ $1\033[0m"; }
fail()  { echo -e "\033[31m✗ $1\033[0m"; exit 1; }

cd "$DIR"
mkdir -p "$DIST"

# 检测 Go
GO=$(which go 2>/dev/null || echo "/usr/local/go/bin/go")
if [ ! -x "$GO" ]; then
  fail "Go 未安装，请先安装 Go 1.21+"
fi

BUILD_OPTS="-ldflags='-s -w'"

# ─── macOS ARM ───
info "构建 macOS ARM64..."
GOOS=darwin GOARCH=arm64 CGO_ENABLED=1 $GO build -o "${DIST}/${APP}-mac-arm64" .
ok "macOS ARM64 → dist/${APP}-mac-arm64"

# ─── macOS Intel ───
info "构建 macOS AMD64..."
GOOS=darwin GOARCH=amd64 CGO_ENABLED=1 $GO build -o "${DIST}/${APP}-mac-amd64" .
ok "macOS AMD64 → dist/${APP}-mac-amd64"

# ─── Linux AMD64 ───
info "构建 Linux AMD64..."
GOOS=linux GOARCH=amd64 CGO_ENABLED=0 $GO build -o "${DIST}/${APP}-linux-amd64" .
ok "Linux AMD64 → dist/${APP}-linux-amd64"

# ─── Linux ARM64 ───
info "构建 Linux ARM64..."
GOOS=linux GOARCH=arm64 CGO_ENABLED=0 $GO build -o "${DIST}/${APP}-linux-arm64" .
ok "Linux ARM64 → dist/${APP}-linux-arm64"

# ─── Windows AMD64 ───
info "构建 Windows AMD64..."
GOOS=windows GOARCH=amd64 CGO_ENABLED=0 $GO build -o "${DIST}/${APP}-win64.exe" .
ok "Windows AMD64 → dist/${APP}-win64.exe"

# ─── Windows 32bit ───
info "构建 Windows 386..."
GOOS=windows GOARCH=386 CGO_ENABLED=0 $GO build -o "${DIST}/${APP}-win32.exe" .
ok "Windows 386 → dist/${APP}-win32.exe"

# ─── UPX 压缩 ───
if command -v upx &>/dev/null; then
  info "UPX 压缩中..."
  for f in "${DIST}"/"${APP}"-*; do
    case "$f" in
      *.exe|*-linux-*) upx --best "$f" 2>/dev/null && ok "  已压缩: $(basename "$f")" ;;
    esac
  done
else
  echo "  (UPX 未安装，跳过压缩)"
fi

# ─── 打包 ───
info "打包..."
cd "$DIST"
for f in "${APP}"-*; do
  ext="${f##*.}"
  base="${f%.*}"
  if [ "$ext" = "exe" ]; then
    cp "$f" "${APP}.exe"
    zip -q "${ZIP}-${base#${APP}-}.zip" "${APP}.exe" && ok "${ZIP}-${base#${APP}-}.zip"
    rm "${APP}.exe"
  else
    cp "$f" "${APP}"
    chmod +x "${APP}"
    tar czf "${ZIP}-${f#${APP}-}.tar.gz" "${APP}" && ok "${ZIP}-${f#${APP}-}.tar.gz"
    rm "${APP}"
  fi
done

rm -f "${APP}"-linux-* "${APP}"-mac-* "${APP}"-win*

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║        OSRBOT Console 构建完成          ║"
echo "╠══════════════════════════════════════════╣"
echo "║  输出目录: ${DIST}               ║"
echo "╚══════════════════════════════════════════╝"
ls -lh "${DIST}" 2>/dev/null | awk '{print "  " $NF "  (" $5 ")"}'
