# Topmindspace 主页

> Topmind：本地优先的个人动态流。同页还有演示文稿、写作技能和交接包。

[Topmindspace](https://topmindspace.github.io/) 的 GitHub Pages。主项目是 [Topmind](https://github.com/topmindspace/topmind)。

**[English](./README.md)**

## 特性

- **纯静态** — HTML + CSS + 原生 JS，无构建工具、无框架依赖
- **双语支持** — 完整中英文 i18n，自动检测语言并支持手动切换
- **深色/浅色主题** — 跟随系统并持久化保存用户偏好
- **无障碍** — 键盘导航、ARIA 标签、减弱动效支持
- **响应式** — 针对桌面、平板和移动端优化
- **SEO 就绪** — Open Graph、Twitter Cards、JSON-LD 结构化数据、站点地图

## 技术栈

| 分类 | 技术 |
|------|------|
| 字体 | Noto Serif SC + Noto Sans SC + JetBrains Mono（Google Fonts） |
| 图标 | 无图标库 |
| i18n | JSON 翻译文件 + 异步加载引擎 |
| 样式 | 模块化 CSS（tokens → base → components → sections → responsive） |

## 本地预览

```bash
python -m http.server 8000
# 访问 http://localhost:8000
```

或使用 Node.js：

```bash
npx serve .
```

## 文件结构

```
index.html                  # 主页面
assets/
  ├── css/
  │   ├── tokens.css        # 设计令牌（颜色、字体、间距）
  │   ├── base.css          # 重置、排版、布局原语
  │   ├── components.css    # 导航、按钮、命令块、复制、灯箱、Toast
  │   ├── sections.css      # Hero、展示区、理念、产品、能力
  │   ├── responsive.css    # 媒体查询、减弱动效、打印
  │   └── main.css          # 入口文件（导入所有模块）
  ├── js/
  │   ├── i18n.js           # i18n 引擎（异步 JSON 加载 + 缓存 + t()）
  │   └── main.js           # 主题、导航、滚动监听、揭示动画、复制、展示区、灯箱
  └── img/                  # 截图、主图与 logo
i18n/
  ├── zh.json               # 中文翻译
  └── en.json               # 英文翻译
```

## 自定义

### 语言

默认中文。导航栏可切到英文，偏好保存在 `localStorage`。

### 主题

默认米白浅色。导航栏可切到海军蓝深色，保存在 `localStorage` 的 `topmind-theme`。

## 项目

- [Topmind](https://github.com/topmindspace/topmind) — 主项目
- [Topmind Presentation](https://github.com/topmindspace/topmind-presentation) — 正式商务演示文稿。在线演示仍在 [showcase](https://topmindspace.github.io/tms-skills/showcase.html) 与 [风格画廊](https://topmindspace.github.io/tms-skills/style-gallery.html)
- [Topmind Writing Skills](https://github.com/topmindspace/topmind-writing-skills)
- [Topmind Handoff](https://github.com/topmindspace/topmind-handoff)

---

© TopMindSpace · MIT License
