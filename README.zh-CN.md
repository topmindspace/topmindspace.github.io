# Topmind — 官方主页

> Agent 时代的本地优先个人动态流与知识工作台

[Topmind](https://github.com/topmindspace/topmind) 项目的官方网站，托管于 GitHub Pages。

**[English](./README.md)**

## 技术栈

纯静态前端（HTML + CSS + Vanilla JS），无构建工具、无框架依赖。

- **字体** — Fraunces + Sora + JetBrains Mono（Google Fonts）
- **图标** — [Lucide Icons](https://lucide.dev/)（CDN）
- **i18n** — JSON 翻译文件 + 异步加载引擎，根据 OS/浏览器环境自动检测语言

## 本地预览

```bash
python -m http.server 8000
# 访问 http://localhost:8000
```

## 文件结构

```
index.html              # 主页面
assets/
  ├── css/              # tokens / base / components / sections / responsive
  ├── js/               # i18n.js + main.js
  └── img/              # 截图与图标
i18n/                   # zh.json + en.json
```

## 相关链接

- [Topmind GitHub](https://github.com/topmindspace/topmind)
- [Releases](https://github.com/topmindspace/topmind/releases)

---

© TopMindSpace · MIT License
