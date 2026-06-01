# Changelog

## v0.7.0

OSRBOT Link Pro v0.7.0 focuses on LAN access, network sharing, diagnostics, and UI polish.

### Added

- LAN browser control with WebRTC video transport.
- One-time LAN pairing tokens with independent browser sessions.
- Manual token generation for multiple LAN clients.
- LAN browser page controls for fit, fill, and fullscreen display.
- Network sharing panel for Windows and Linux.
- Network adapter discovery with virtual-adapter prioritization rules.
- Diagnostics panel covering HID, network sharing, LAN control, and video quality.
- HID write self-test, network sharing self-test, and video capture quality diagnostics.
- English and Chinese UI coverage improvements across menus, panels, status text, and LAN browser pages.

### Changed

- LAN access URLs no longer include the pairing token; users open the IP address and enter the token manually.
- LAN display mode changes no longer rebuild the WebRTC connection.
- WebRTC sender settings now prefer image detail and maintain resolution where supported.
- Language switching now refreshes text in one synchronized pass to avoid staggered UI updates.
- Select controls have been restyled to match the desktop UI more consistently.
- Debian packaging is repaired after electron-builder output when the generated `.deb` is invalid.

### Fixed

- LAN control preferred IP selection no longer defaults to common virtual adapters such as VirtualBox host-only addresses.
- Several English-mode UI strings that still appeared in Chinese have been localized.
- LAN browser layout no longer grows gradually as video metadata arrives.
- The generated Linux `.deb` artifact is checked and rebuilt to avoid tiny invalid packages.

### Known Limitations

- macOS Internet Sharing still needs to be configured manually in System Settings.
- LAN browser control depends on local-network reachability, firewall rules, and browser WebRTC support.
- Command paste is intended for ASCII terminal commands, not full clipboard synchronization.
- Windows 7 is not a support target.
