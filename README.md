# Topmind — Official Homepage

> A local-first personal stream & knowledge workbench for the Agent era

The official website for the [Topmind](https://github.com/topmindspace/topmind) project, hosted on GitHub Pages.

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
| Fonts | Fraunces + Sora + JetBrains Mono (Google Fonts) |
| Icons | [Lucide Icons](https://lucide.dev/) (CDN) |
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

The site auto-detects language from browser/OS settings. Users can also toggle
manually via the language button in the navigation bar — the preference is
saved to `localStorage`.

### Theme

Dark theme is default. Toggle via the sun/moon button in the nav. The choice
is persisted in `localStorage` under the key `topmind-theme`.

## Sister product: tms-skills

Live showcase for the [tms-skills](https://github.com/topmindspace/tms-skills) / top-ppt-html presentation skill:

- Landing: https://topmindspace.github.io/tms-skills/
- Showcase deck: https://topmindspace.github.io/tms-skills/showcase.html
- Style gallery: https://topmindspace.github.io/tms-skills/style-gallery.html
- Homepage section: https://topmindspace.github.io/#tms-skills

## Links

- [Topmind GitHub](https://github.com/topmindspace/topmind)
- [tms-skills GitHub](https://github.com/topmindspace/tms-skills)
- [Releases](https://github.com/topmindspace/topmind/releases)
- [Documentation](https://github.com/topmindspace/topmind/blob/main/docs/README.md)

---

© TopMindSpace · MIT License
