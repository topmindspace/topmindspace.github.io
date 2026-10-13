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
    var THEME_COLORS = { light: '#fefbff', dark: '#111319' };

    function storedTheme() {
        try { return localStorage.getItem('topmind-theme'); } catch (e) { return null; }
    }

    function initTheme() {
        var toggle = document.getElementById('themeToggle');
        var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
        var saved = storedTheme();
        applyTheme(saved === 'dark' || saved === 'light' ? saved : (media && media.matches ? 'dark' : 'light'), false);

        // Follow the OS until the visitor picks a theme explicitly.
        if (media && media.addEventListener) {
            media.addEventListener('change', function (e) {
                var s = storedTheme();
                if (s !== 'dark' && s !== 'light') applyTheme(e.matches ? 'dark' : 'light', false);
            });
        }
        if (!toggle) return;
        toggle.addEventListener('click', function () {
            var current = document.documentElement.getAttribute('data-theme');
            applyTheme(current === 'dark' ? 'light' : 'dark', true);
        });
    }

    function applyTheme(theme, persist) {
        document.documentElement.setAttribute('data-theme', theme);
        if (persist) { try { localStorage.setItem('topmind-theme', theme); } catch (e) {} }
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', THEME_COLORS[theme]);
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
        window.addEventListener('scroll', function () {
            if (window.scrollY < 200) navLinks.forEach(function (l) { l.classList.remove('is-active'); });
        }, { passive: true });
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
       6. Reveal on scroll (skipped with reduced motion)
       ---------------------------------------- */
    function initReveal() {
        var items = document.querySelectorAll('.reveal');
        var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce || !('IntersectionObserver' in window)) {
            items.forEach(function (el) { el.classList.add('is-in'); });
            return;
        }
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in');
                    io.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
        items.forEach(function (el) { io.observe(el); });
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
        initReveal();
    });
})();
