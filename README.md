# Topmindspace homepage

> Open-source tools built around local Markdown: knowledge management, writing, and presentations.

GitHub Pages for [Topmindspace](https://topmindspace.github.io/), published from the root of `main`.

**[中文文档](./README.zh-CN.md)**

## Features

- **Pure static**: HTML, CSS, and vanilla JS, with no build tools or framework dependencies; no web fonts, no analytics, no cookies
- **Design system**: every token sits at the top of `assets/css/home.css`: an MD3 tonal palette (seed `#4d6bfe`), light and dark system colors, a type scale, a 4px spacing grid, MD3 shape and easing
- **Bilingual**: full Chinese and English i18n with a manual toggle, stored in `localStorage`
- **Light and dark**: follows the system by default and remembers a manual choice
- **Accessible**: keyboard navigation, skip link, ARIA labels, WCAG AA contrast; honors Reduce Motion and Increase Contrast
- **Responsive**: desktop, tablet, and phone
- **SEO**: Open Graph, Twitter Cards, JSON-LD, sitemap

## Page structure

The home page runs: hero, an overview of the five projects, knowledge management (desktop app, Obsidian plugin, skill pack, and a comparison of the three), writing and presentations, and About this site. `presentation/` is the full Topmind Presentation page.

Earlier links to the project page, the live deck, and the style gallery are static redirect pages that land on `presentation/`.

## Updating version info

Versions, install commands, and skill lists come from each repository's README and Releases. When they change, update:

- the version tags in `index.html` and `softwareVersion` in the JSON-LD
- the version tag and JSON-LD in `presentation/index.html`
- `i18n/zh.json` and `i18n/en.json`
- `lastmod` in `sitemap.xml`

## Local preview

```bash
python3 -m http.server 8000
# Visit http://localhost:8000
```

## File structure

```
index.html                  # Home page
presentation/
  └── index.html            # Topmind Presentation project page
assets/
  ├── css/home.css          # Site styles (tokens, components, responsive)
  ├── js/
  │   ├── i18n.js           # i18n engine (async JSON, data-i18n, data-i18n-attr, ...)
  │   └── main.js           # Theme, language, nav, scroll spy, copy, reveal-on-scroll
  └── img/                  # Screenshots and logo; presentation/ holds the project page samples
i18n/
  ├── zh.json               # Chinese
  └── en.json               # English
```

## Projects

- [Topmind](https://github.com/topmindspace/topmind): desktop app
- [topmind-obsidian](https://github.com/topmindspace/topmind-obsidian): Obsidian plugin
- [topmind-skills](https://github.com/topmindspace/topmind-skills): skill pack
- [topmind-writing-skills](https://github.com/topmindspace/topmind-writing-skills): writing and images
- [topmind-presentation](https://github.com/topmindspace/topmind-presentation): presentations

---

© TopMindSpace · MIT License
