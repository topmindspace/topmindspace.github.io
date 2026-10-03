# Topmindspace homepage

> Topmind keeps a personal stream in local Markdown. The same page installs presentation, writing, and handoff skills.

GitHub Pages for [Topmindspace](https://topmindspace.github.io/). The primary project is [Topmind](https://github.com/topmindspace/topmind).

**[中文文档](./README.zh-CN.md)**

## Features

- **Pure static** — HTML + CSS + Vanilla JS, no build tools or framework dependencies
- **Bilingual** — Full Chinese/English i18n with auto-detection and manual toggle
- **Dark/Light theme** — System-aware with persistent preference
- **Accessible** — Keyboard navigation, ARIA labels, reduced-motion support
- **Responsive** — Optimized for desktop, tablet, and mobile
- **SEO-ready** — Open Graph, Twitter Cards, JSON-LD structured data, sitemap

## Tech Stack

| Category | Technology |
|----------|-----------|
| Fonts | Noto Sans SC + JetBrains Mono (Google Fonts) |
| Icons | No icon library |
| i18n | JSON translation files + async loading engine |
| Styling | Modular CSS (tokens → base → components → sections → responsive) |

## Local Preview

```bash
python -m http.server 8000
# Visit http://localhost:8000
```

Or with Node.js:

```bash
npx serve .
```

## File Structure

```
index.html                  # Main page
assets/
  ├── css/
  │   ├── tokens.css        # Design tokens (colors, typography, spacing)
  │   ├── base.css          # Reset, typography, layout primitives
  │   ├── components.css    # Nav, buttons, cmd-block, copy, lightbox, toast
  │   ├── sections.css      # Hero, showcase, philosophy, products, capabilities
  │   ├── responsive.css    # Media queries, reduced motion, print
  │   └── main.css          # Entry point (imports all modules)
  ├── js/
  │   ├── i18n.js           # i18n engine (async JSON loading + caching + t())
  │   └── main.js           # Theme, nav, scroll spy, reveal, copy, showcase, lightbox
  └── img/                  # Screenshots, hero image & logo
i18n/
  ├── zh.json               # Chinese translations
  └── en.json               # English translations
```

## Customization

### Language

Chinese is the default. The nav can switch to English. The choice is stored in `localStorage`.

### Theme

Light theme uses warm MD3 tonal surfaces and one amber primary, separate from body text. Dark theme uses the same hue at a lighter tone. The choice is stored in `localStorage` as `topmind-theme`.

## Projects

- [Topmind](https://github.com/topmindspace/topmind) — primary
- [Topmind Presentation](https://github.com/topmindspace/topmind-presentation) — formal business presentations. The live showcase remains at [showcase](https://topmindspace.github.io/tms-skills/showcase.html) and the [style gallery](https://topmindspace.github.io/tms-skills/style-gallery.html)
- [Topmind Writing Skills](https://github.com/topmindspace/topmind-writing-skills)
- [Topmind Handoff](https://github.com/topmindspace/topmind-handoff)

---

© TopMindSpace · MIT License
