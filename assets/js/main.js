/* ============================================================
   Topmind — Main JavaScript
   Theme · Nav · Scroll Spy · Scroll Reveal · Copy · Showcase · Lightbox · Icons
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
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#141c2e' : '#f7f3ec');
        }
    }

    /* ----------------------------------------
       2. Language Toggle (zh / en)
       Uses the I18n module from i18n.js.
       Re-initializes Lucide icons after translation.
       Updates showcase caption after language switch.
       ---------------------------------------- */
    function initLanguage() {
        var toggle = document.getElementById('langToggle');
        if (!toggle || typeof I18n === 'undefined') return;

        I18n.init();

        toggle.addEventListener('click', function () {
            var next = I18n.getLang() === 'zh' ? 'en' : 'zh';
            I18n.apply(next).then(function () {
                refreshIcons();
                updateShowcaseCaption();
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
       7. Showcase — Main Image + Thumbnail Switcher
       Click thumbnails to swap the main image.
       Prev/Next arrows and keyboard navigation.
       Zoom button / click main image opens lightbox.
       ---------------------------------------- */
    var showcaseThumbs = [];
    var showcaseCurrentIndex = 0;
    var showcaseMainImg = null;
    var showcaseCaption = null;

    function initShowcase() {
        var main = document.getElementById('showcaseMain');
        showcaseThumbs = Array.prototype.slice.call(document.querySelectorAll('.showcase__thumb'));
        showcaseMainImg = document.getElementById('showcaseMainImg');
        showcaseCaption = document.getElementById('showcaseCaption');

        if (!main || !showcaseThumbs.length || !showcaseMainImg) return;

        var prevBtn = document.getElementById('showcasePrev');
        var nextBtn = document.getElementById('showcaseNext');
        var zoomBtn = document.getElementById('showcaseZoom');

        // Thumbnail click → switch main image
        showcaseThumbs.forEach(function (thumb, index) {
            thumb.addEventListener('click', function () {
                switchToShowcase(index);
            });
        });

        // Prev/Next navigation
        if (prevBtn) {
            prevBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                navigateShowcase(-1);
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                navigateShowcase(1);
            });
        }

        // Zoom button → open lightbox with current image
        if (zoomBtn) {
            zoomBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                openLightbox();
            });
        }

        // Click main image → open lightbox
        showcaseMainImg.addEventListener('click', function () {
            openLightbox();
        });

        // Keyboard navigation when showcase is in view
        document.addEventListener('keydown', function (e) {
            if (!isShowcaseInView()) return;
            var lightbox = document.getElementById('lightbox');
            if (lightbox && lightbox.classList.contains('is-open')) return;

            if (e.key === 'ArrowLeft') navigateShowcase(-1);
            if (e.key === 'ArrowRight') navigateShowcase(1);
        });
    }

    function switchToShowcase(index) {
        if (!showcaseThumbs.length) return;

        showcaseCurrentIndex = index;
        var thumb = showcaseThumbs[index];
        var imgName = thumb.getAttribute('data-img');
        var alt = thumb.getAttribute('data-alt');
        var captionKey = thumb.getAttribute('data-caption-i18n');

        // Update main image with fade transition
        showcaseMainImg.style.opacity = '0';
        setTimeout(function () {
            showcaseMainImg.src = 'assets/img/' + imgName;
            showcaseMainImg.alt = alt;
            showcaseMainImg.style.opacity = '';
        }, 150);

        // Update caption using i18n
        if (showcaseCaption && captionKey) {
            var text = (typeof I18n !== 'undefined' && I18n.t) ? I18n.t(captionKey) : captionKey;
            showcaseCaption.textContent = text;
        }

        // Update active state
        showcaseThumbs.forEach(function (t, i) {
            t.classList.toggle('showcase__thumb--active', i === index);
            t.setAttribute('aria-selected', String(i === index));
        });

        // Scroll active thumb into view in the thumbnail strip
        var thumbsContainer = thumb.parentElement;
        if (thumbsContainer) {
            var thumbLeft = thumb.offsetLeft;
            var thumbRight = thumbLeft + thumb.offsetWidth;
            var scrollLeft = thumbsContainer.scrollLeft;
            var visibleWidth = thumbsContainer.clientWidth;
            if (thumbLeft < scrollLeft) {
                thumbsContainer.scrollLeft = thumbLeft - 8;
            } else if (thumbRight > scrollLeft + visibleWidth) {
                thumbsContainer.scrollLeft = thumbRight - visibleWidth + 8;
            }
        }
    }

    function navigateShowcase(direction) {
        if (!showcaseThumbs.length) return;
        var next = (showcaseCurrentIndex + direction + showcaseThumbs.length) % showcaseThumbs.length;
        switchToShowcase(next);
    }

    function updateShowcaseCaption() {
        if (!showcaseThumbs.length || !showcaseCaption) return;
        var thumb = showcaseThumbs[showcaseCurrentIndex];
        var captionKey = thumb.getAttribute('data-caption-i18n');
        if (captionKey) {
            var text = (typeof I18n !== 'undefined' && I18n.t) ? I18n.t(captionKey) : captionKey;
            showcaseCaption.textContent = text;
        }
    }

    function isShowcaseInView() {
        var main = document.getElementById('showcaseMain');
        if (!main) return false;
        var rect = main.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }

    /* ----------------------------------------
       8. Lightbox — click to enlarge
       Supports: click to open, Esc to close,
       arrow keys to navigate, click outside to close.
       ---------------------------------------- */
    function initLightbox() {
        var lightbox = document.getElementById('lightbox');
        if (!lightbox) return;

        var closeBtn = document.getElementById('lightboxClose');
        var prevBtn = document.getElementById('lightboxPrev');
        var nextBtn = document.getElementById('lightboxNext');

        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        if (prevBtn) prevBtn.addEventListener('click', function () { navigateShowcase(-1); updateLightboxAfterNav(); });
        if (nextBtn) nextBtn.addEventListener('click', function () { navigateShowcase(1); updateLightboxAfterNav(); });

        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', function (e) {
            if (!lightbox.classList.contains('is-open')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') { navigateShowcase(-1); updateLightboxAfterNav(); }
            if (e.key === 'ArrowRight') { navigateShowcase(1); updateLightboxAfterNav(); }
        });
    }

    function openLightbox() {
        var lightbox = document.getElementById('lightbox');
        var img = document.getElementById('lightboxImg');
        var caption = document.getElementById('lightboxCaption');
        if (!lightbox || !img || !showcaseMainImg) return;

        img.src = showcaseMainImg.src;
        img.alt = showcaseMainImg.alt;
        caption.textContent = showcaseCaption ? showcaseCaption.textContent : '';

        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        var lightbox = document.getElementById('lightbox');
        if (!lightbox) return;
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function updateLightboxAfterNav() {
        var img = document.getElementById('lightboxImg');
        var caption = document.getElementById('lightboxCaption');
        if (!img || !showcaseMainImg) return;

        // Wait for the showcase image fade transition to complete
        setTimeout(function () {
            img.src = showcaseMainImg.src;
            img.alt = showcaseMainImg.alt;
            caption.textContent = showcaseCaption ? showcaseCaption.textContent : '';
        }, 160);
    }

    /* ----------------------------------------
       9. Lucide Icons Initialization
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
        initShowcase();
        initLightbox();
        initIcons();
    });
})();
