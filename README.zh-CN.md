# Topmindspace 主页

> 围绕本地 Markdown 的开源工具：知识管理、写作与演示。

[Topmindspace](https://topmindspace.github.io/) 的 GitHub Pages，从 `main` 根目录发布。

**[English](./README.md)**

## 特性

- **纯静态**：HTML、CSS、原生 JS，无构建工具、无框架依赖
- **中英双语**：完整 i18n，可手动切换，偏好保存在 `localStorage`
- **浅色与深色主题**：浅色为白底加淡蓝 MD3 表面，深色用同一蓝色相
- **无障碍**：键盘导航、ARIA 标签、减弱动效支持
- **响应式**：桌面、平板和手机；截图在手机上改为横向滑动
- **SEO**：Open Graph、Twitter Cards、JSON-LD、站点地图

## 页面结构

站点介绍五个项目，每个项目按「是什么、适合谁、怎么装」组织：

1. 知识管理：Topmind 桌面版、Topmind Stream（Obsidian 插件）、topmind-skills
2. 写作与演示：topmind-writing-skills、topmind-presentation（详细介绍在 `presentation/`）

早期的项目页、在线演示和风格画廊链接已改成静态跳转页，统一指向 `presentation/`。

## 更新版本信息

版本号、安装命令和技能清单以各仓库的 README 与 Release 为准。更新时同步修改：

- `index.html` 里的版本标签和 JSON-LD 的 `softwareVersion`
- `presentation/index.html` 里的版本标签和 JSON-LD
- `i18n/zh.json` 与 `i18n/en.json`
- `sitemap.xml` 的 `lastmod`

## 本地预览

```bash
python3 -m http.server 8000
# 访问 http://localhost:8000
```

## 文件结构

```
index.html                  # 首页
presentation/
  └── index.html            # Topmind Presentation 项目页
assets/
  ├── css/home.css          # 全站样式（设计令牌、组件、响应式）
  ├── js/
  │   ├── i18n.js           # i18n 引擎（异步加载 JSON，支持 data-i18n、data-i18n-attr 等）
  │   └── main.js           # 主题、语言、导航、滚动高亮、复制
  └── img/                  # 截图与 logo；presentation/ 为演示项目页的样张
i18n/
  ├── zh.json               # 中文
  └── en.json               # 英文
```

## 项目

- [Topmind](https://github.com/topmindspace/topmind)：桌面版
- [topmind-obsidian](https://github.com/topmindspace/topmind-obsidian)：Obsidian 插件
- [topmind-skills](https://github.com/topmindspace/topmind-skills)：技能包
- [topmind-writing-skills](https://github.com/topmindspace/topmind-writing-skills)：写作与出图
- [topmind-presentation](https://github.com/topmindspace/topmind-presentation)：演示

---

© TopMindSpace · MIT License
