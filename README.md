# Topmind — Official Homepage

> A local-first personal stream & knowledge workbench for the Agent era

The official website for the [Topmind](https://github.com/topmindspace/topmind) project, hosted on GitHub Pages.

**[中文文档](./README.zh-CN.md)**

## Tech Stack

Pure static frontend (HTML + CSS + Vanilla JS) — no build tools, no framework dependencies.

- **Fonts** — Fraunces + Sora + JetBrains Mono (Google Fonts)
- **Icons** — [Lucide Icons](https://lucide.dev/) (CDN)
- **i18n** — JSON translation files + async loading engine, auto-detects language from OS/browser environment

## Local Preview

```bash
python -m http.server 8000
# Visit http://localhost:8000
```

## File Structure

```
index.html              # Main page
assets/
  ├── css/              # tokens / base / components / sections / responsive
  ├── js/               # i18n.js + main.js
  └── img/              # Screenshots & icons
i18n/                   # zh.json + en.json
```

## Links

- [Topmind GitHub](https://github.com/topmindspace/topmind)
- [Releases](https://github.com/topmindspace/topmind/releases)

---

© TopMindSpace · MIT License
