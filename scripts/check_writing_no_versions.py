#!/usr/bin/env python3
"""Topmind Writing Skills 区块不写版本号：版本以 Releases / npm 为准，避免页面与发版不同步。

检查范围：index.html 的写作磁贴、#writing 区块到 #presentation 之前、JSON-LD 里的 Writing Skills 条目，
以及 i18n/*.json 里 write_* / ws_* / tile_write_* 键。发现 x.y.z 形式的版本号就失败。
"""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
VER = re.compile(r"(?<![\w.])v?\d+\.\d+\.\d+(?![\w.])")
bad = []

html = (ROOT / "index.html").read_text(encoding="utf-8")
chunks = {}
m = re.search(r'<a class="tile[^"]*" href="#writing">.*?</a>', html, re.S)
chunks["写作磁贴"] = m.group(0) if m else ""
i, j = html.find('id="writing"'), html.find('id="presentation"', html.find('id="writing"'))
chunks["#writing 区块"] = html[i:j] if i >= 0 and j > i else ""
m = re.search(r'\{[^{}]*"name": "Topmind Writing Skills"[^{}]*\}', html, re.S)
chunks["JSON-LD"] = m.group(0) if m else ""
for name, text in chunks.items():
    if not text:
        bad.append(f"index.html：找不到{name}，检查脚本需要更新")
    for v in VER.findall(text):
        bad.append(f"index.html {name}：出现版本号 {v}")
    if "softwareVersion" in text:
        bad.append(f"index.html {name}：出现 softwareVersion")

for f in sorted((ROOT / "i18n").glob("*.json")):
    for k, v in json.loads(f.read_text(encoding="utf-8")).items():
        if re.match(r"(write_|ws_|tile_write_)", k) and isinstance(v, str):
            for x in VER.findall(v):
                bad.append(f"{f.name} {k}：出现版本号 {x}")

if bad:
    print("\n".join(bad))
    print("写作技能区块不放版本号，改成指向 Releases / npm 的链接。")
    sys.exit(1)
print("check_writing_no_versions：通过")
