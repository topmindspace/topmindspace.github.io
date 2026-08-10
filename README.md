# Topmind — 官方主页

> Agent 时代的本地优先个人动态流与知识工作台

这是 [Topmind](https://github.com/topmindspace/topmind) 项目的官方介绍网站，托管于 GitHub Pages。全面介绍 Topmind 的设计理念、产品表面、核心工作流、安装方式与诚实能力表。

## 技术栈

纯静态前端（HTML + CSS + Vanilla JS），无构建工具、无框架依赖，符合 GitHub Pages 零配置部署需求。

- **图标** — [Lucide Icons](https://lucide.dev/)（CDN），1500+ 轻量 SVG 图标
- **字体** — Google Fonts（Fraunces + Sora + JetBrains Mono）
- **i18n** — JSON 翻译文件 + 异步加载引擎，支持文本 / HTML / Meta 属性 / 任意属性四种替换模式

## 设计特点

- **编辑级排版** — Fraunces 衬线展示字体 + Sora 几何无衬线正文 + JetBrains Mono 等宽字体
- **设计令牌系统** — 完整的 CSS Custom Properties 体系，暗/亮双主题无缝切换
- **模块化 CSS** — 按职责拆分为 tokens / base / components / sections / responsive 五个模块
- **语义化结构** — `<nav>` / `<main>` / `<header>` / `<section>` / `<footer>` 清晰分区，ARIA 标注完善
- **中英双语** — JSON 翻译文件 + 异步 i18n 引擎，支持 `data-i18n`（文本）、`data-i18n-html`（HTML）、`data-i18n-meta`（meta 标签）、`data-i18n-attr`（任意属性）四种替换模式
- **SEO 国际化** — 切换语言时同步更新 `<title>`、`<meta description>`、Open Graph、Twitter Card
- **Lucide Icons** — 通过 CDN 引入成熟图标库，替代手动内联 SVG，减少维护成本
- **Scroll Spy** — IntersectionObserver 驱动的导航高亮，自动追踪当前可视区块
- **滚动揭示动画** — IntersectionObserver 驱动，尊重 `prefers-reduced-motion`
- **完全响应式** — 从手机到桌面端自适应布局，能力表移动端自动转为卡片布局
- **可访问性** — skip-to-content 跳转、`:focus-visible` 键盘焦点、Escape 关闭菜单、`aria-controls`、`aria-expanded`
- **SEO** — Open Graph / Twitter Card / canonical / sitemap.xml / robots.txt / JSON-LD 结构化数据
- **打印样式** — 隐藏交互元素，链接 URL 后缀输出，能力表简化打印

## 页面结构

```
├── Nav          — 固定导航 + 语言/主题切换 + 移动端汉堡菜单 + Scroll Spy
├── Hero         — 核心价值主张 + 流程可视化
├── Showcase     — 桌面端产品截图
├── Philosophy   — 四大设计理念
├── Surfaces     — 五个产品表面（Desktop / Obsidian / Skills / UTR / Clip）
├── Workflow     — 四步工作流 + 三平面目录模型（中英文国际化）
├── Install      — 四种安装方式
├── Capabilities — 诚实能力表（六项能力 + 状态徽章）
└── Footer       — 链接与版权
```

## 文件结构

```
├── index.html                  # 主页面
├── assets/
│   ├── css/
│   │   ├── main.css            # CSS 入口（@import 组合）
│   │   ├── tokens.css          # 设计令牌（颜色/字体/间距/圆角/阴影/过渡）
│   │   ├── base.css            # Reset + 排版 + 基础元素
│   │   ├── components.css      # 通用组件（Nav/Button/Badge/Footer/Copy 等）
│   │   ├── sections.css        # 页面 section 样式
│   │   └── responsive.css      # 媒体查询 + 减少动画 + 打印
│   ├── js/
│   │   ├── main.js             # 主逻辑（主题/导航/Scroll Spy/动画/复制/Lucide）
│   │   └── i18n.js             # i18n 引擎（异步 JSON 加载 + 缓存 + SEO 同步）
│   └── img/                    # 图片资源
├── i18n/
│   ├── zh.json                 # 中文翻译数据
│   └── en.json                 # 英文翻译数据
├── sitemap.xml                 # SEO sitemap
├── robots.txt                  # SEO robots
└── README.md
```

## 设计令牌

CSS 变量定义在 `assets/css/tokens.css` 的 `:root` 与 `[data-theme="light"]` 中，涵盖颜色、字体、间距、圆角、阴影、过渡、布局七个维度。所有组件仅引用令牌，不硬编码值，确保主题切换一致性。

| 类别       | 令牌示例                         |
| ---------- | -------------------------------- |
| 颜色       | `--bg` `--text` `--accent` `--teal` `--on-accent` `--nav-bg` |
| 状态色     | `--green` `--amber` `--blue`（含 subtle / border 变体） |
| 字体       | `--font-display` `--font-body` `--font-mono` |
| 间距       | `--sp-1` … `--sp-24`（0.25rem 步进） |
| 圆角       | `--r-sm` `--r-md` `--r-lg` `--r-xl` `--r-full` |
| 阴影       | `--shadow-sm` `--shadow-md` `--shadow-lg` `--shadow-glow` |
| 过渡       | `--t-fast` `--t-base` `--t-slow`  |
| 布局       | `--container-max` `--nav-height` |

## i18n 引擎

i18n 引擎支持四种替换模式：

| 属性             | 用途                          | 示例                                           |
| ---------------- | ----------------------------- | ---------------------------------------------- |
| `data-i18n`      | `textContent` 文本替换         | `<span data-i18n="hero_title">`               |
| `data-i18n-html` | `innerHTML` HTML 替换          | `<code data-i18n-html="dir_model_code">`      |
| `data-i18n-meta` | meta 标签 `content` 属性替换   | `<meta data-i18n-meta="content:og_title">`    |
| `data-i18n-attr` | 任意属性替换                   | `<nav data-i18n-attr="aria-label:nav_aria">`  |

引擎特性：
- 异步 JSON 加载 + 内存缓存，首次加载后切换零延迟
- `{{year}}` 占位符自动替换为当前年份
- 浏览器语言自动检测（首次访问）
- 语言偏好持久化（localStorage）
- 切换语言时同步更新 `<html lang>`、SEO meta 标签

## 本地预览

```bash
# 任意静态服务器均可
python -m http.server 8000
# 访问 http://localhost:8000
```

## 相关链接

- [Topmind GitHub](https://github.com/topmindspace/topmind)
- [Releases](https://github.com/topmindspace/topmind/releases)

---

© TopMindSpace · MIT License
