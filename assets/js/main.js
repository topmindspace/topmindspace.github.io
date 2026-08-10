/* ============================================================
   Topmind — Main JavaScript
   Theme · Nav · Scroll Spy · Scroll Reveal · Copy · Lucide Icons
   ============================================================ */

(function () {
    'use strict';

    /* ----------------------------------------
       1. Theme Toggle (dark / light)
       Consistently uses document.documentElement (<html>)
       to match the FOUC prevention script.
       ---------------------------------------- */
    function initTheme() {
        const toggle = document.getElementById('themeToggle');
        if (!toggle) return;

        const saved = localStorage.getItem('topmind-theme') || 'dark';
        applyTheme(saved);

        toggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme') || 'dark';
            const next = current === 'dark' ? 'light' : 'dark';
            applyTheme(next);
        });
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('topmind-theme', theme);

        // Sync <meta name="theme-color"> with current theme
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#0a0b0f' : '#f5f4f0');
        }
    }

    /* ----------------------------------------
       2. Language Toggle (zh / en)
       Uses the I18n module from i18n.js
       ---------------------------------------- */
    function initLanguage() {
        const toggle = document.getElementById('langToggle');
        if (!toggle || typeof I18n === 'undefined') return;

        // Initialize i18n on page load
        I18n.init();

        toggle.addEventListener('click', () => {
            const next = I18n.getLang() === 'zh' ? 'en' : 'zh';
            I18n.apply(next);
        });
    }

    /* ----------------------------------------
       3. Nav: scroll state + burger menu
       ---------------------------------------- */
    function initNav() {
        const nav = document.getElementById('nav');
        const burger = document.getElementById('navBurger');
        if (!nav) return;

        // Scroll state — add border when scrolled
        window.addEventListener(
            'scroll',
            () => {
                nav.classList.toggle('is-scrolled', window.scrollY > 8);
            },
            { passive: true }
        );

        // Burger menu (mobile)
        if (burger) {
            burger.addEventListener('click', () => {
                const isOpen = nav.classList.toggle('is-open');
                burger.setAttribute('aria-expanded', String(isOpen));
            });

            // Close on link click
            nav.querySelectorAll('.nav__link').forEach((link) => {
                link.addEventListener('click', () => {
                    nav.classList.remove('is-open');
                    burger.setAttribute('aria-expanded', 'false');
                });
            });

            // Close on Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && nav.classList.contains('is-open')) {
                    nav.classList.remove('is-open');
                    burger.setAttribute('aria-expanded', 'false');
                    burger.focus();
                }
            });
        }
    }

    /* ----------------------------------------
       4. Scroll Spy — highlight active nav link
       Uses IntersectionObserver to detect the
       section currently in view.
       ---------------------------------------- */
    function initScrollSpy() {
        const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
        if (!navLinks.length) return;

        const sections = [];
        navLinks.forEach((link) => {
            const id = link.getAttribute('href').slice(1);
            const section = document.getElementById(id);
            if (section) sections.push({ link, section });
        });

        if (!sections.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        navLinks.forEach((l) => l.classList.remove('is-active'));
                        const match = sections.find((s) => s.section === entry.target);
                        if (match) match.link.classList.add('is-active');
                    }
                });
            },
            {
                // Trigger when section top crosses the nav bar area
                rootMargin: '-40% 0px -55% 0px',
                threshold: 0,
            }
        );

        sections.forEach(({ section }) => observer.observe(section));
    }

    /* ----------------------------------------
       5. Scroll Reveal (IntersectionObserver)
       ---------------------------------------- */
    function initReveal() {
        const items = document.querySelectorAll('[data-reveal]');
        if (!items.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
        );

        items.forEach((el) => observer.observe(el));
    }

    /* ----------------------------------------
       6. Copy to Clipboard
       ---------------------------------------- */
    function initCopy() {
        document.querySelectorAll('.copy-btn').forEach((btn) => {
            btn.addEventListener('click', async () => {
                const text = btn.getAttribute('data-copy');
                if (!text) return;

                try {
                    await navigator.clipboard.writeText(text);
                    btn.classList.add('is-copied');
                    setTimeout(() => btn.classList.remove('is-copied'), 1600);
                } catch {
                    // Clipboard API not available (e.g., non-HTTPS context)
                    // Silently fail — the command text is still visible for manual copy
                }
            });
        });
    }

    /* ----------------------------------------
       7. Lucide Icons Initialization
       ---------------------------------------- */
    function initIcons() {
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
            lucide.createIcons();
        }
    }

    /* ----------------------------------------
       Init
       ---------------------------------------- */
    document.addEventListener('DOMContentLoaded', () => {
        initTheme();
        initLanguage();
        initNav();
        initScrollSpy();
        initReveal();
        initCopy();
        initIcons();
    });
})();
