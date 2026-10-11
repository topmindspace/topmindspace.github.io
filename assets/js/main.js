/* ============================================================
   Topmind — Main JavaScript
   Theme · Language · Nav · Scroll Spy · Copy
   ============================================================ */

(function () {
    'use strict';

    /* ----------------------------------------
       1. Theme Toggle (dark / light)
       Consistently uses document.documentElement (<html>)
       to match the FOUC prevention script.
       ---------------------------------------- */
    function initTheme() {
        var toggle = document.getElementById('themeToggle');
        if (!toggle) return;

        var saved = localStorage.getItem('topmind-theme') || 'light';
        applyTheme(saved);

        toggle.addEventListener('click', function () {
            var current = document.documentElement.getAttribute('data-theme') || 'dark';
            var next = current === 'dark' ? 'light' : 'dark';
            applyTheme(next);
        });
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('topmind-theme', theme);

        // Sync <meta name="theme-color"> with current theme
        var metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#0f141b' : '#f7f9fc');
        }
    }

    /* ----------------------------------------
       2. Language Toggle (zh / en)
       Uses the I18n module from i18n.js.
       ---------------------------------------- */
    function initLanguage() {
        var toggle = document.getElementById('langToggle');
        if (!toggle || typeof I18n === 'undefined') return;

        I18n.init();

        toggle.addEventListener('click', function () {
            var next = I18n.getLang() === 'zh' ? 'en' : 'zh';
            I18n.apply(next);
        });
    }

    /* ----------------------------------------
       3. Nav: scroll state + burger menu
       ---------------------------------------- */
    function menuLabel(isOpen) {
        if (typeof I18n !== 'undefined' && I18n.t) {
            var key = isOpen ? 'nav_menu_close' : 'nav_menu';
            var label = I18n.t(key);
            if (label && label !== key) return label;
        }
        return isOpen ? '关闭菜单' : '打开菜单';
    }

    function initNav() {
        var nav = document.getElementById('nav');
        var burger = document.getElementById('navBurger');
        if (!nav) return;

        // Scroll state — add border when scrolled
        window.addEventListener(
            'scroll',
            function () {
                nav.classList.toggle('is-scrolled', window.scrollY > 8);
            },
            { passive: true }
        );

        // Burger menu (mobile)
        if (burger) {
            burger.addEventListener('click', function () {
                var isOpen = nav.classList.toggle('is-open');
                burger.setAttribute('aria-expanded', String(isOpen));
                burger.setAttribute('aria-label', menuLabel(isOpen));
            });

            // Close on link click
            nav.querySelectorAll('.nav__link').forEach(function (link) {
                link.addEventListener('click', function () {
                    nav.classList.remove('is-open');
                    burger.setAttribute('aria-expanded', 'false');
                    burger.setAttribute('aria-label', menuLabel(false));
                });
            });

            document.addEventListener('i18n:applied', function () {
                var open = nav.classList.contains('is-open');
                burger.setAttribute('aria-label', menuLabel(open));
            });

            // Close on Escape
            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape' && nav.classList.contains('is-open')) {
                    nav.classList.remove('is-open');
                    burger.setAttribute('aria-expanded', 'false');
                    burger.setAttribute('aria-label', menuLabel(false));
                    burger.focus();
                }
            });
        }
    }

    /* ----------------------------------------
       4. Scroll Spy — highlight active nav link
       ---------------------------------------- */
    function initScrollSpy() {
        var navLinks = document.querySelectorAll('.nav__link[href^="#"]');
        if (!navLinks.length) return;

        var sections = [];
        navLinks.forEach(function (link) {
            var id = link.getAttribute('href').slice(1);
            var section = document.getElementById(id);
            if (section) sections.push({ link: link, section: section });
        });

        if (!sections.length) return;

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        navLinks.forEach(function (l) { l.classList.remove('is-active'); });
                        var match = sections.find(function (s) { return s.section === entry.target; });
                        if (match) match.link.classList.add('is-active');
                    }
                });
            },
            { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
        );

        sections.forEach(function (item) { observer.observe(item.section); });
    }

    /* ----------------------------------------
       5. Copy to Clipboard
       Uses Clipboard API with execCommand fallback.
       Shows a toast notification on success.
       ---------------------------------------- */
    function initCopy() {
        var toast = document.getElementById('toast');
        var toastTimer = null;

        function showToast() {
            if (!toast) return;
            toast.classList.add('is-visible');
            if (toastTimer) clearTimeout(toastTimer);
            toastTimer = setTimeout(function () {
                toast.classList.remove('is-visible');
            }, 2000);
        }

        document.querySelectorAll('.copy-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var text = btn.getAttribute('data-copy');
                if (!text) return;

                function onSuccess() {
                    btn.classList.add('is-copied');
                    showToast();
                    setTimeout(function () { btn.classList.remove('is-copied'); }, 1600);
                }

                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(text).then(onSuccess).catch(function () {
                        fallbackCopy(text, onSuccess);
                    });
                } else {
                    fallbackCopy(text, onSuccess);
                }
            });
        });
    }

    function fallbackCopy(text, callback) {
        var textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            if (callback) callback();
        } catch (e) {
            // Silently fail — command text is still visible for manual copy
        }
        document.body.removeChild(textarea);
    }

    /* ----------------------------------------
       Init
       ---------------------------------------- */
    document.addEventListener('DOMContentLoaded', function () {
        initTheme();
        initLanguage();
        initNav();
        initScrollSpy();
        initCopy();
    });
})();
