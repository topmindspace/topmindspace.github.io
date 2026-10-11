# Topmindspace homepage

> Open-source tools built around local Markdown: knowledge management, writing, and presentations.

GitHub Pages for [Topmindspace](https://topmindspace.github.io/), published from the root of `main`.

**[中文文档](./README.zh-CN.md)**

## Features

- **Pure static**: HTML, CSS, and vanilla JS, with no build tools or framework dependencies
- **Bilingual**: full Chinese and English i18n with a manual toggle, stored in `localStorage`
- **Light and dark themes**: light uses white and pale blue MD3 surfaces, dark uses the same blue hue
- **Accessible**: keyboard navigation, ARIA labels, reduced-motion support
- **Responsive**: desktop, tablet, and phone; screenshot strips scroll sideways on phones
- **SEO**: Open Graph, Twitter Cards, JSON-LD, sitemap

## Page structure

The site presents five projects, each as what it is, who it is for, and how to install it:

1. Knowledge: Topmind desktop, Topmind Stream (Obsidian plugin), topmind-skills
2. Writing and presentations: topmind-writing-skills, topmind-presentation (full page at `presentation/`)

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
  │   └── main.js           # Theme, language, nav, scroll spy, copy
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
