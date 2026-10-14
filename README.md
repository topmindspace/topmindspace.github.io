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

## Version numbers

The site shows **no version numbers** for any product. Version tags and JSON-LD `softwareVersion` are replaced by links to each product's Releases / npm page (`downloadUrl` in JSON-LD). Install commands and skill lists still follow each repository's README; when they change, update `index.html`, `presentation/index.html`, `i18n/zh.json`, `i18n/en.json`, and `lastmod` in `sitemap.xml`.

`python3 scripts/check_no_versions.py` scans the whole site and fails on any `x.y.z` version or `softwareVersion`; it runs in CI (`.github/workflows/check.yml`). Non-product versions (for example the third-party requirement "Obsidian 1.13.0+", or CDN library paths) are whitelisted in `ALLOW`.

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
