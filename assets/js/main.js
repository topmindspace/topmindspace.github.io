/* ============================================================
   Topmind — Main JavaScript
   Theme · Nav · Scroll Spy · Scroll Reveal · Copy · Lightbox · Icons
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

        var saved = localStorage.getItem('topmind-theme') || 'dark';
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
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#0a0b0f' : '#f5f4f0');
        }
    }

    /* ----------------------------------------
       2. Language Toggle (zh / en)
       Uses the I18n module from i18n.js.
       Re-initializes Lucide icons after translation
       to ensure dynamically set content renders icons.
       ---------------------------------------- */
    function initLanguage() {
        var toggle = document.getElementById('langToggle');
        if (!toggle || typeof I18n === 'undefined') return;

        I18n.init();

        toggle.addEventListener('click', function () {
            var next = I18n.getLang() === 'zh' ? 'en' : 'zh';
            I18n.apply(next).then(function () {
                refreshIcons();
            });
        });
    }

    /* ----------------------------------------
       3. Nav: scroll state + burger menu
       ---------------------------------------- */
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
            });

            // Close on link click
            nav.querySelectorAll('.nav__link').forEach(function (link) {
                link.addEventListener('click', function () {
                    nav.classList.remove('is-open');
                    burger.setAttribute('aria-expanded', 'false');
                });
            });

            // Close on Escape
            document.addEventListener('keydown', function (e) {
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
            {
                rootMargin: '-40% 0px -55% 0px',
                threshold: 0,
            }
        );

        sections.forEach(function (item) { observer.observe(item.section); });
    }

    /* ----------------------------------------
       5. Scroll Reveal (IntersectionObserver)
       ---------------------------------------- */
    function initReveal() {
        var items = document.querySelectorAll('[data-reveal]');
        if (!items.length) return;

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
        );

        items.forEach(function (el) { observer.observe(el); });
    }

    /* ----------------------------------------
       6. Copy to Clipboard
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
       7. Lightbox — click gallery images to enlarge
       Supports: click to open, Esc to close,
       arrow keys to navigate, click outside to close.
       ---------------------------------------- */
    function initLightbox() {
        var lightbox = document.getElementById('lightbox');
        if (!lightbox) return;

        var img = document.getElementById('lightboxImg');
        var caption = document.getElementById('lightboxCaption');
        var closeBtn = document.getElementById('lightboxClose');
        var prevBtn = document.getElementById('lightboxPrev');
        var nextBtn = document.getElementById('lightboxNext');

        var galleryImages = Array.prototype.slice.call(
            document.querySelectorAll('.gallery__img')
        );
        var currentIndex = 0;

        if (!galleryImages.length) return;

        function open(index) {
            currentIndex = index;
            var galleryImg = galleryImages[index];
            img.src = galleryImg.src;
            img.alt = galleryImg.alt;
            var fig = galleryImg.parentElement;
            var capEl = fig ? fig.querySelector('.gallery__caption') : null;
            caption.textContent = capEl ? capEl.textContent : '';
            lightbox.classList.add('is-open');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        function close() {
            lightbox.classList.remove('is-open');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        function navigate(direction) {
            currentIndex = (currentIndex + direction + galleryImages.length) % galleryImages.length;
            open(currentIndex);
        }

        galleryImages.forEach(function (galleryImg, index) {
            galleryImg.addEventListener('click', function () { open(index); });
        });

        if (closeBtn) closeBtn.addEventListener('click', close);
        if (prevBtn) prevBtn.addEventListener('click', function () { navigate(-1); });
        if (nextBtn) nextBtn.addEventListener('click', function () { navigate(1); });

        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) close();
        });

        document.addEventListener('keydown', function (e) {
            if (!lightbox.classList.contains('is-open')) return;
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowLeft') navigate(-1);
            if (e.key === 'ArrowRight') navigate(1);
        });
    }

    /* ----------------------------------------
       8. Lucide Icons Initialization
       ---------------------------------------- */
    function initIcons() {
        refreshIcons();
    }

    function refreshIcons() {
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
            lucide.createIcons();
        }
    }

    /* ----------------------------------------
       Init
       ---------------------------------------- */
    document.addEventListener('DOMContentLoaded', function () {
        initTheme();
        initLanguage();
        initNav();
        initScrollSpy();
        initReveal();
        initCopy();
        initLightbox();
        initIcons();
    });
})();
