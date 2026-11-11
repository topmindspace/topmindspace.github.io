# AI · Tech · Knowledge

mspd's portfolio of AI workflows, interactive experiments, and personal knowledge tools. GitHub Pages serves the root of `main`. [Visit the site](https://topmindspace.github.io/)

[中文文档](README.zh-CN.md)

## Site structure

- **Selected work** features Awesome AI Recreations, Super Kanban for DeepSeek Harness, and the cross-tool memory skill topmind-handoff.
- **Grok Bots** links to X Pulse Personal for account replays and X Pulse Public for topic activity.
- **Project index** lists knowledge management, research, and publishing tools.
- **Presentation** shows real samples, themes, slide redesigns, shortcuts, and an install command. The old `/tms-skills/` URLs redirect to `/presentation/`.

The site uses static HTML, CSS, and JavaScript. Chinese is the default language and the theme follows the system. Manual preferences are stored in the browser.

## Preview and checks

```sh
python3 -m http.server 8000
python3 scripts/check_site.py
python3 scripts/check_no_versions.py
```

Open the [local preview](http://localhost:8000/). CI checks translation coverage, local links, anchors, and redirects. Project releases and install guides are the source of truth for versions and compatibility.

## Maintenance

- Edit page copy, links, and metadata in `index.html` or `presentation/index.html`. Keep translated fields in sync with `i18n/zh.json` and `i18n/en.json`.
- Shared styles live in `assets/css/home.css`. Update the page's date in `sitemap.xml` after a content change.
- Homepage visuals live in `assets/img/work/`. The atlas artwork was generated with ImageGen. The other images are from the [OC-8 recreation](https://github.com/topmindspace/awesome-ai-recreations/tree/main/cases/oc8) and [Super Kanban demo](https://github.com/topmindspace/dsh-super-kanban/blob/main/docs/SCREENSHOTS.md).
