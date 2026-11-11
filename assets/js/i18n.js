const I18n = (() => {
    const root = document.documentElement;
    const base = root.dataset.i18nBase;
    const cache = {};
    let current = 'zh';

    async function load(lang) {
        if (cache[lang]) return cache[lang];
        const response = await fetch(`${base}/${lang}.json`);
        if (!response.ok) throw new Error(`Could not load ${lang} translations`);
        cache[lang] = await response.json();
        return cache[lang];
    }

    async function apply(lang) {
        const dictionary = await load(lang);
        document.querySelectorAll('[data-i18n]').forEach((node) => {
            const translation = dictionary[node.dataset.i18n];
            if (translation != null) node.textContent = translation;
        });
        document.querySelectorAll('[data-i18n-attr], [data-i18n-meta]').forEach((node) => {
            const specs = node.dataset.i18nAttr || node.dataset.i18nMeta;
            specs.split(';').forEach((spec) => {
                const [attribute, key] = spec.trim().split(':');
                if (dictionary[key] != null) node.setAttribute(attribute, dictionary[key]);
            });
        });

        current = lang;
        const english = lang === 'en';
        root.lang = english ? 'en' : 'zh-CN';
        const toggle = document.getElementById('langToggle');
        const label = document.getElementById('langCurrent');
        if (toggle) toggle.setAttribute('aria-label', english ? 'Switch to Chinese' : '切换到英文');
        if (label) label.textContent = english ? '中' : 'EN';
        try { localStorage.setItem('topmind-lang', lang); } catch {}
        document.dispatchEvent(new CustomEvent('i18n:applied'));
    }

    async function init() {
        let saved;
        try { saved = localStorage.getItem('topmind-lang'); } catch {}
        if (saved !== 'en') return;
        await apply('en');
        // The initial hash was resolved against the Chinese layout.
        try {
            document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
        } catch {
            // Malformed URL escapes do not affect the selected language.
        }
    }

    return { init, apply, getLang: () => current };
})();
