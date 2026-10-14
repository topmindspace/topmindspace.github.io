# Topmindspace 主页

> 围绕本地 Markdown 的开源工具：知识管理、写作与演示。

[Topmindspace](https://topmindspace.github.io/) 的 GitHub Pages，从 `main` 根目录发布。

**[English](./README.md)**

## 特性

- **纯静态**：HTML、CSS、原生 JS，无构建工具、无框架依赖；不加载外部字体，无统计脚本，无 Cookie
- **设计系统**：`assets/css/home.css` 顶部是全部令牌，包括 MD3 色调调色板（种子色 `#4d6bfe`）、明暗两套系统色、字体层级、4px 间距、MD3 圆角与缓动
- **中英双语**：完整 i18n，可手动切换，偏好保存在 `localStorage`
- **浅色与深色**：默认跟随系统，手动切换后记住选择
- **无障碍**：键盘导航、跳转链接、ARIA 标签、对比度符合 WCAG AA；支持「减少动态效果」和「增强对比度」
- **响应式**：桌面、平板和手机
- **SEO**：Open Graph、Twitter Cards、JSON-LD、站点地图

## 页面结构

首页依次是：首屏、五个项目总览、知识管理（桌面版、Obsidian 插件、技能包，以及三种入口对比）、写作与演示、关于本站。`presentation/` 是 Topmind Presentation 的详细页。

早期的项目页、在线演示和风格画廊链接已改成静态跳转页，统一指向 `presentation/`。

## 更新版本信息

版本号、安装命令和技能清单以各仓库的 README 与 Release 为准。更新时同步修改：

- `index.html` 里的版本标签和 JSON-LD 的 `softwareVersion`（Topmind Writing Skills 除外：它的磁贴、区块、技能清单和 JSON-LD **不写版本号**，改为链接到 Releases / npm；`python3 scripts/check_writing_no_versions.py` 负责检查，CI 自动运行）
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
  │   └── main.js           # 主题、语言、导航、滚动高亮、复制、滚动渐显
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
