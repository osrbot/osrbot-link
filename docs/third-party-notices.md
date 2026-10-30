# Third-party notices

OSRBOT Link contains OSRBOT code and third-party components. Each third-party component remains governed by its own license.

## OSRBOT Link 1.0

The [complete notice file](../THIRD-PARTY-NOTICES.txt) includes the Go runtime, Wails, native HID components, WebRTC transport and supporting modules, and Lucide action icons. The same notices are accessible from the application's About panel.

Native HID uses go-hid and the BSD license option of HIDAPI. Linux packages include replaceable GTK, WebKitGTK 4.1 and GStreamer shared libraries; host graphics, session and USB libraries remain system-provided. Windows uses the system WebView2 Runtime; macOS uses the system WebKit framework.

The Linux runtime's exact component versions, checksums, upstream source references and per-package copyright/license texts are included in each package. In an extracted AppImage, see `runtime-manifest.json` and `usr/share/doc/osrbot-link-runtime/`; the DEB stores the same runtime under `/opt/osrbot-link/`. These libraries retain their upstream terms. They are not installed into the system library directories.

The approved OSRBOT brand assets remain OSRBOT assets.
