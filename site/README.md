# OSRBOT Link Online Manual

Bilingual product manual using the OSRBOT Design 1.4.4 colors, layout and artwork.
Body text and headings use system fonts for fast reading without font downloads.
The approved outlined logo is unchanged and does not require a font file.

[English](https://osrbot.github.io/osrbot-link/) · [简体中文](https://osrbot.github.io/osrbot-link/zh/)

- `pages/`: English and Simplified Chinese reading pages.
- `pages/public/`: approved product images, localized screenshots and brand assets.
- `.vitepress/`: navigation, search, theme and responsive reading layout.
- `scripts/`: third-party notices and static build checks.

Use Node.js 24. Run `npm ci`, then `npm run dev` for a localhost-only preview.
Use `npm run build` and `npm run check` to validate a static site. Set
`OSRBOT_SITE_BASE=/osrbot-link/` when building for GitHub Pages; the default `/`
supports local previews. `OSRBOT_SITE_OUT` can override the build output directory.

The `Deploy product manual` workflow builds changes to `site/` on `main` and
deploys only the static output to GitHub Pages. The build includes notices for
third-party packages and checks that no font files, font preloads or web-font
declarations are included. Do not expose a development server as the public site.

No PDF manuals, client source, firmware or installation packages belong here.
