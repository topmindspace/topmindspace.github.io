# AI · Tech · Knowledge

topmindspace 的个人项目站，公开分享对 AI / SI、科技与知识的探索。由 GitHub Pages 从 `main` 根目录发布。[打开站点](https://topmindspace.github.io/)

[English](README.md)

## 信息架构

- **首页**从个人方向进入。开源代表作并列展示 Topmind Desktop、AI 复刻和 DSH 任务看板。Desktop 卡内可以直达 Obsidian 社区安装页和 Agent 技能。
- **Grok Bots**介绍 X Pulse 的个人回放与公共话题热度。两个入口直达各自的 x.ai 页面。
- **方法与技能**收录写作、Handoff、演示和研究工具。前三项可展开查看子技能、交接流程或样张。
- **演示详情**保留样张、风格矩阵、PPT 美化对照、快捷键与可复制的安装命令。`/tms-skills/`、`showcase.html` 和 `style-gallery.html` 继续跳转到 `/presentation/`。

首屏使用暖白底、墨黑文字、青柠色操作入口和线框主视觉。代表作使用公开作品和演示截图，页面在手机上改为单列。站点以 HTML、CSS 和原生 JavaScript 交付。默认中文，主题跟随系统，手动偏好保存在当前浏览器。

## 本地预览和检查

```sh
python3 -m http.server 8000
python3 scripts/check_site.py
python3 scripts/check_no_versions.py
```

访问 [本机预览](http://localhost:8000/)。CI 检查双语覆盖、站内资源、锚点、旧入口与外链的新标签页行为。产品版本与安装兼容性以各仓库的 Releases 或安装文档为准。

## 内容维护

- `index.html` 和 `presentation/index.html` 保存中文正文、链接及社交分享元数据。编辑带 `data-i18n` 的文案时，同步 `i18n/zh.json` 与 `i18n/en.json`。
- `assets/css/home.css` 保存主题、布局和公共组件。修改页面内容后，更新 `sitemap.xml` 对应日期。
- `assets/img/work/` 保存首页素材。线框主视觉由 ImageGen 生成，`optimus-ember-signal.webp` 来自 [GPT-6.2 Sol 擎天柱《余烬信号》剧照](https://github.com/topmindspace/awesome-ai-recreations/tree/main/cases/optimus-prime-2007/models/gpt-6-2-sol)，`super-kanban.webp` 来自 [Super Kanban 演示截图](https://github.com/topmindspace/dsh-super-kanban/blob/main/docs/SCREENSHOTS.md)。
