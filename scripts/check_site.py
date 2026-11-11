#!/usr/bin/env python3
"""Check static navigation, legacy entry points, and translation coverage."""
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
PAGES = (
    "index.html",
    "presentation/index.html",
    "tms-skills/index.html",
    "tms-skills/showcase.html",
    "tms-skills/style-gallery.html",
)
LEGACY_IDS = {
    "index.html": {"projects", "knowledge", "topmind", "obsidian", "skills", "create", "writing", "presentation", "about"},
    "presentation/index.html": {"dense", "simple", "beautify", "install"},
}


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.links = set()
        self.keys = set()
        self.references = set()
        self.redirect = None
        self.feed(path.read_text(encoding="utf-8"))

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if element_id := attrs.get("id"):
            if element_id in self.ids:
                raise ValueError(f"Duplicate ID {element_id}")
            self.ids.add(element_id)

        self.links.update(attrs[key] for key in ("href", "src") if key in attrs)
        if tag == "a" and (href := attrs.get("href")):
            url = urlsplit(href)
            if url.netloc:
                assert attrs.get("target") == "_blank", f"External link must open in a new tab: {href}"
                assert "noopener" in attrs.get("rel", "").split(), f"External link lacks noopener: {href}"
            else:
                assert attrs.get("target") != "_blank", f"Local link opens in a new tab: {href}"
        for key in ("aria-labelledby", "aria-controls"):
            self.references.update(attrs.get(key, "").split())

        if key := attrs.get("data-i18n"):
            self.keys.add(key)
        for name in ("data-i18n-attr", "data-i18n-meta"):
            if specs := attrs.get(name):
                self.keys.update(spec.split(":")[1] for spec in specs.split(";"))

        if tag == "meta" and attrs.get("http-equiv", "").lower() == "refresh":
            self.redirect = attrs["content"].partition("url=")[2]
            self.links.add(self.redirect)


def check_site():
    pages = {name: Page(ROOT / name) for name in PAGES}
    used_keys = set().union(*(page.keys for page in pages.values()))
    for lang in ("zh", "en"):
        locale = json.loads((ROOT / "i18n" / f"{lang}.json").read_text(encoding="utf-8"))
        assert used_keys == locale.keys(), f"{lang}: missing {used_keys - locale.keys()}, unused {locale.keys() - used_keys}"
        assert all(isinstance(value, str) and value.strip() for value in locale.values()), f"{lang}: empty translation"

    for name, page in pages.items():
        assert page.references <= page.ids, f"{name}: invalid ARIA IDs {page.references - page.ids}"
        assert LEGACY_IDS.get(name, set()) <= page.ids, f"{name}: legacy anchor removed"
        if name.startswith("tms-skills/"):
            assert page.redirect == "/presentation/", f"{name}: legacy redirect changed"
        for link in page.links:
            url = urlsplit(link)
            if url.scheme or url.netloc:
                continue
            path = unquote(url.path)
            if not path:
                target = ROOT / name
            elif path.startswith("/"):
                target = ROOT / path.lstrip("/")
            else:
                target = (ROOT / name).parent / path
            if target.is_dir():
                target /= "index.html"
            assert target.is_file(), f"{name}: missing local target {link}"
            if url.fragment:
                target_page = pages[target.resolve().relative_to(ROOT).as_posix()]
                assert unquote(url.fragment) in target_page.ids, f"{name}: missing fragment {link}"

    print(f"Site checks passed for {len(pages)} pages and {len(used_keys)} translation keys")


if __name__ == "__main__":
    check_site()
