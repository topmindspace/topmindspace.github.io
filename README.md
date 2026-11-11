# AI · Tech · Knowledge

The topmindspace portfolio shares workflows, methods, skills, and experiments in AI / SI, technology, and knowledge. GitHub Pages serves the root of `main`. [Visit the site](https://topmindspace.github.io/)

[中文文档](README.zh-CN.md)

## Site structure

- **Selected work** features Topmind Desktop, Awesome AI Recreations, and Super Kanban for DeepSeek Harness. The Desktop card links to the Obsidian community listing and Agent Skills.
- **Grok Bots** links to X Pulse Personal for account replays and X Pulse Public for topic activity.
- **Methods and skills** covers writing, cross-tool memory, presentations, and research. Expand cards to find individual skills, the handoff workflow, and slide samples.
- **Presentation** shows real samples, themes, slide redesigns, shortcuts, and an install command. The old `/tms-skills/` URLs redirect to `/presentation/`.

The site uses static HTML, CSS, and JavaScript. Chinese is the default language and the theme follows the system. Manual preferences are stored in the browser.

## Preview and checks

```sh
python3 -m http.server 8000
python3 scripts/check_site.py
python3 scripts/check_no_versions.py
```

Open the [local preview](http://localhost:8000/). CI checks translation coverage, local links, anchors, redirects, and new-tab behavior for external links. Project releases and install guides are the source of truth for versions and compatibility.

## Maintenance

- Edit page copy, links, and metadata in `index.html` or `presentation/index.html`. Keep translated fields in sync with `i18n/zh.json` and `i18n/en.json`.
- Shared styles live in `assets/css/home.css`. Update the page's date in `sitemap.xml` after a content change.
- Homepage visuals live in `assets/img/work/`. The atlas artwork was generated with ImageGen. The project visuals include the [GPT-6.2 Sol Optimus Prime production still](https://github.com/topmindspace/awesome-ai-recreations/tree/main/cases/optimus-prime-2007/models/gpt-6-2-sol) and [Super Kanban demo](https://github.com/topmindspace/dsh-super-kanban/blob/main/docs/SCREENSHOTS.md).
