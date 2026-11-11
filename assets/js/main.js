(() => {
    const root = document.documentElement;

    function initTheme() {
        const toggle = document.getElementById('themeToggle');
        if (!toggle) return;
        const media = matchMedia('(prefers-color-scheme: dark)');
        let saved;
        try { saved = localStorage.getItem('topmind-theme'); } catch {}
        let manual = saved === 'light' || saved === 'dark';

        function apply(theme) {
            root.dataset.theme = theme;
            toggle.setAttribute('aria-pressed', String(theme === 'dark'));
            document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#161a14' : '#f7f7ef';
        }

        apply(manual ? saved : media.matches ? 'dark' : 'light');
        media.addEventListener('change', (event) => {
            if (!manual) apply(event.matches ? 'dark' : 'light');
        });
        toggle.addEventListener('click', () => {
            const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
            manual = true;
            apply(theme);
            try { localStorage.setItem('topmind-theme', theme); } catch {}
        });
    }

    function initLanguage() {
        const toggle = document.getElementById('langToggle');
        if (!toggle || typeof I18n === 'undefined') return;

        async function change(load) {
            toggle.disabled = true;
            try {
                await load();
            } catch (error) {
                console.error(error);
            } finally {
                toggle.disabled = false;
            }
        }

        change(I18n.init);
        toggle.addEventListener('click', () => {
            change(() => I18n.apply(I18n.getLang() === 'zh' ? 'en' : 'zh'));
        });
    }

    function initNav() {
        const nav = document.getElementById('nav');
        const burger = document.getElementById('navBurger');
        if (!nav || !burger) return;

        function setMenu(open) {
            nav.classList.toggle('is-open', open);
            burger.setAttribute('aria-expanded', String(open));
            const english = root.lang === 'en';
            const labels = english ? ['Open menu', 'Close menu'] : ['打开菜单', '关闭菜单'];
            burger.setAttribute('aria-label', labels[Number(open)]);
        }

        burger.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
        document.addEventListener('i18n:applied', () => setMenu(nav.classList.contains('is-open')));
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && nav.classList.contains('is-open')) {
                setMenu(false);
                burger.focus();
            }
        });

        const localLinks = [];
        nav.querySelectorAll('.nav__link').forEach((link) => {
            const href = link.getAttribute('href');
            const target = href.startsWith('#') ? document.getElementById(href.slice(1)) : null;
            if (target) localLinks.push({ link, target });

            link.addEventListener('click', () => {
                if (nav.classList.contains('is-open') && target) {
                    target.focus({ preventScroll: true });
                }
                setMenu(false);
            });
        });

        if (!localLinks.length || !('IntersectionObserver' in window)) return;
        const observer = new IntersectionObserver((entries) => {
            const visible = entries.find((entry) => entry.isIntersecting);
            if (visible) {
                localLinks.forEach(({ link, target }) => {
                    if (target === visible.target) link.setAttribute('aria-current', 'location');
                    else link.removeAttribute('aria-current');
                });
            } else if (window.scrollY < localLinks[0].target.offsetTop - 90) {
                localLinks.forEach(({ link }) => link.removeAttribute('aria-current'));
            }
        }, { rootMargin: '-18% 0px -72%' });
        localLinks.forEach(({ target }) => observer.observe(target));
    }

    function fallbackCopy(text) {
        const field = document.createElement('textarea');
        const focused = document.activeElement;
        field.value = text;
        field.readOnly = true;
        field.style.position = 'fixed';
        field.style.opacity = '0';
        document.body.append(field);
        field.select();
        try {
            return document.execCommand('copy');
        } catch {
            return false;
        } finally {
            field.remove();
            focused?.focus({ preventScroll: true });
        }
    }

    function initCopy() {
        const toast = document.getElementById('toast');
        if (!toast) return;
        let timer;
        document.querySelectorAll('[data-copy]').forEach((button) => {
            button.addEventListener('click', async () => {
                const text = button.dataset.copy;
                let copied = false;
                try {
                    await navigator.clipboard.writeText(text);
                    copied = true;
                } catch {
                    copied = fallbackCopy(text);
                }
                const english = root.lang === 'en';
                toast.classList.add('is-visible');
                toast.textContent = copied
                    ? (english ? 'Copied' : '已复制')
                    : (english ? 'Select the command to copy it' : '请选中命令后手动复制');
                clearTimeout(timer);
                timer = setTimeout(() => toast.classList.remove('is-visible'), 2200);
            });
        });
    }

    root.classList.add('js');
    initTheme();
    initLanguage();
    initNav();
    initCopy();
})();
