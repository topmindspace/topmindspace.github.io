/* ============================================================
   Topmind — i18n Engine
   Async JSON-based language switching with caching.
   Supports: data-i18n (textContent), data-i18n-html (innerHTML),
            data-i18n-meta (meta content attr), data-i18n-attr (arbitrary attr).
   Auto-detects language from OS locale, browser language, and timezone.
   ============================================================ */

const I18n = (function () {
    'use strict';

    const cache = {};
    let currentLang = 'zh';

    /**
     * Load translation file (with caching).
     * @param {string} lang - Language code ('zh' or 'en')
     * @returns {Promise<Object>} Translation dictionary
     */
    async function loadTranslations(lang) {
        if (cache[lang]) return cache[lang];
        const resp = await fetch(`./i18n/${lang}.json`);
        if (!resp.ok) throw new Error(`Failed to load i18n/${lang}.json`);
        cache[lang] = await resp.json();
        return cache[lang];
    }

    /**
     * Replace {{placeholder}} tokens in a string.
     * @param {string} str - Template string
     * @returns {string} Interpolated string
     */
    function interpolate(str) {
        return str.replace(/\{\{year\}\}/g, new Date().getFullYear());
    }

    /**
     * Apply translations to the page.
     * @param {string} lang - Language code ('zh' or 'en')
     */
    async function apply(lang) {
        const dict = await loadTranslations(lang);
        currentLang = lang;

        // textContent replacement (data-i18n)
        document.querySelectorAll('[data-i18n]').forEach((el) => {
            const key = el.getAttribute('data-i18n');
            if (dict[key] != null) {
                el.textContent = interpolate(String(dict[key]));
            }
        });

        // innerHTML replacement (data-i18n-html) — for content with HTML markup
        document.querySelectorAll('[data-i18n-html]').forEach((el) => {
            const key = el.getAttribute('data-i18n-html');
            if (dict[key] != null) {
                el.innerHTML = interpolate(String(dict[key]));
            }
        });

        // Meta tag content attribute (data-i18n-meta="attrName:key")
        document.querySelectorAll('[data-i18n-meta]').forEach((el) => {
            const spec = el.getAttribute('data-i18n-meta');
            const [attr, key] = spec.split(':');
            if (dict[key] != null) {
                el.setAttribute(attr, interpolate(String(dict[key])));
            }
        });

        // Arbitrary attribute (data-i18n-attr="attrName:key")
        document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
            const spec = el.getAttribute('data-i18n-attr');
            const [attr, key] = spec.split(':');
            if (dict[key] != null) {
                el.setAttribute(attr, interpolate(String(dict[key])));
            }
        });

        // Update <html lang="...">
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

        // Update language toggle button
        const langCurrent = document.getElementById('langCurrent');
        const langToggle = document.getElementById('langToggle');
        if (langCurrent) langCurrent.textContent = lang === 'zh' ? '中' : 'EN';
        if (langToggle) {
            langToggle.setAttribute(
                'aria-label',
                lang === 'zh' ? '切换到英文' : 'Switch to Chinese'
            );
        }

        // Persist preference
        localStorage.setItem('topmind-lang', lang);
    }

    /**
     * Get the current language code.
     * @returns {string} 'zh' or 'en'
     */
    function getLang() {
        return currentLang;
    }

    /**
     * Translate a key to the current language.
     * Returns the key itself if translation is not found.
     * @param {string} key - Translation key
     * @returns {string} Translated string
     */
    function t(key) {
        const dict = cache[currentLang];
        if (dict && dict[key] != null) {
            return interpolate(String(dict[key]));
        }
        return key;
    }

    /**
     * Detect preferred language from OS and browser environment.
     * Checks (in order of reliability):
     *   1. navigator.languages — browser's full locale preference list
     *   2. navigator.language  — browser primary locale
     *   3. navigator.userAgent — OS locale hints (e.g., Windows zh-CN, Mac zh-CN)
     *   4. Intl.DateTimeFormat().resolvedOptions().locale — system locale
     * @returns {string} 'zh' or 'en'
     */
    function detectLanguage() {
        // 1. navigator.languages — most reliable, array of preferred locales
        if (navigator.languages && navigator.languages.length > 0) {
            for (const locale of navigator.languages) {
                if (locale.toLowerCase().startsWith('zh')) return 'zh';
            }
        }

        // 2. navigator.language — primary browser locale
        if (navigator.language && navigator.language.toLowerCase().startsWith('zh')) {
            return 'zh';
        }

        // 3. OS locale from userAgent (Windows: Windows NT; Mac: Macintosh)
        // Some browsers embed OS locale info in userAgent
        const ua = (navigator.userAgent || '').toLowerCase();
        if (ua.includes('zh-cn') || ua.includes('zh-tw') || ua.includes('zh-hk')) {
            return 'zh';
        }

        // 4. Intl locale — reflects system/OS locale settings
        try {
            const intlLocale = Intl.DateTimeFormat().resolvedOptions().locale.toLowerCase();
            if (intlLocale.startsWith('zh')) return 'zh';
        } catch {
            // Intl not available, fall through to default
        }

        // Default to English for all other locales
        return 'en';
    }

    /**
     * Initialize: load saved preference (or auto-detect) and apply.
     */
    async function init() {
        const saved = localStorage.getItem('topmind-lang');
        if (saved) {
            await apply(saved);
        } else {
            const detected = detectLanguage();
            await apply(detected);
        }
    }

    return { init, apply, getLang, detectLanguage, t };
})();
