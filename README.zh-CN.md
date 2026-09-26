# Topmind — 官方主页

> Agent 时代的本地优先个人动态流与知识工作台

[Topmind](https://github.com/topmindspace/topmind) 项目的官方网站，托管于 GitHub Pages。

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
| 字体 | Fraunces + Sora + JetBrains Mono（Google Fonts） |
| 图标 | [Lucide Icons](https://lucide.dev/)（CDN） |
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

站点会根据浏览器/操作系统设置自动检测语言。用户也可通过导航栏的语言按钮手动切换，偏好会保存到 `localStorage`。

### 主题

默认使用深色主题。通过导航栏的太阳/月亮按钮切换，选择会持久化保存在 `localStorage` 的 `topmind-theme` 键下。

## 姊妹产品：tms-skills

[tms-skills](https://github.com/topmindspace/tms-skills) / top-ppt-html 演示文稿技能的在线展示：

- 落地页：https://topmindspace.github.io/tms-skills/
- Showcase 演示文稿：https://topmindspace.github.io/tms-skills/showcase.html
- 风格画廊：https://topmindspace.github.io/tms-skills/style-gallery.html
- 官网专区：https://topmindspace.github.io/#tms-skills

## 相关链接

- [Topmind GitHub](https://github.com/topmindspace/topmind)
- [Releases](https://github.com/topmindspace/topmind/releases)
- [文档](https://github.com/topmindspace/topmind/blob/main/docs/README.md)

---

© TopMindSpace · MIT License
