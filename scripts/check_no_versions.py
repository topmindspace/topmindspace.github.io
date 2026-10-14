#!/usr/bin/env python3
"""全站不写产品版本号：版本以各仓库 Releases / npm / 商店为准，避免站点与发版不同步。

扫描站点里所有 .html / .json / .js / .css / .xml / .txt（不含 .git、.github、scripts/、README）。
发现 x.y.z 形式的版本号（含 v 前缀）或 JSON-LD 的 softwareVersion 就失败。
不算产品版本的写法放进 ALLOW（例如第三方宿主的最低版本要求、第三方库 CDN 路径）。
日期（2026-10-14）不会被匹配。
"""
import re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
EXTS = {".html", ".json", ".js", ".css", ".xml", ".txt"}
SKIP_DIRS = {".git", "scripts", ".github", "node_modules"}
VER = re.compile(r"(?<![\w.@/-])v?\d+\.\d+\.\d+(?![\w.])")
# 命中版本号前后的上下文若匹配任一正则，就不算产品版本
ALLOW = [
    re.compile(r"Obsidian \d+\.\d+\.\d+"),          # 第三方宿主最低版本要求（Obsidian 1.13.0+）
    re.compile(r"cdn\.|unpkg\.com|jsdelivr\.net"),  # 第三方库 CDN 路径里的版本
]

bad = []
for f in sorted(ROOT.rglob("*")):
    if not f.is_file() or f.suffix not in EXTS or SKIP_DIRS & set(f.relative_to(ROOT).parts):
        continue
    rel = f.relative_to(ROOT).as_posix()
    for no, line in enumerate(f.read_text(encoding="utf-8", errors="replace").splitlines(), 1):
        if "softwareVersion" in line:
            bad.append(f"{rel}:{no}: 出现 softwareVersion（改用 downloadUrl 指向 Releases / npm）")
        for m in VER.finditer(line):
            ctx = line[max(0, m.start() - 60): m.end() + 20]
            if any(a.search(ctx) for a in ALLOW):
                continue
            bad.append(f"{rel}:{no}: 出现版本号 {m.group(0)}")

if bad:
    print("\n".join(bad))
    print("站点不写版本号：改成指向 Releases / npm / 商店的链接；非产品版本请加进 ALLOW。")
    sys.exit(1)
print("check_no_versions：通过（全站无产品版本号）")
