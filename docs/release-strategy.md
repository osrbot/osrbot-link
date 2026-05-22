# OSRBOT Link Release Strategy

OSRBOT Link should use a split public/private release model.

## Private Source Repository

Keep the complete application source, native modules, build scripts, hardware
protocol details, and anti-copying/provenance logic in a private repository.

Recommended private contents:

- `apps/desktop/src`
- `apps/desktop/native`
- `packages`
- `scripts/hardware`
- build and signing scripts
- product assets that should not be copied
- internal release checklist and test notes

## Public Repository

Use the public repository as a product and download page.

Recommended public contents:

- `README.md`
- `README_EN.md` when needed
- product screenshots and overview images
- `LICENSE`
- `THIRD-PARTY-NOTICES.txt`
- `docs/third-party-notices.md`
- release notes
- GitHub Releases with packaged clients

Do not publish source files that contain HID protocol implementation, native
input logic, network sharing implementation, watermark/provenance logic, or
hardware-specific details unless OSRBOT intentionally decides to open-source
them.

## License Policy

OSRBOT-owned source code is proprietary unless explicitly marked otherwise.
Third-party open-source components keep their original licenses.

When publishing release binaries, include third-party notices and preserve
Electron, Chromium, node-hid, HIDAPI, Rust crate, and npm dependency license
information required by their licenses.

## Practical Release Flow

1. Build and test clients in the private source repository.
2. Verify no secrets, local paths, build intermediates, or private source files
   are included in public artifacts.
3. Generate a public export with `npm run prepare:public`.
4. Push only the public export contents to the public GitHub repository.
5. Upload packaged clients to GitHub Releases.
6. Keep the full source history private.
