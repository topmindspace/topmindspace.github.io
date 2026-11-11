// Apply the saved theme before the stylesheet paints.
(() => {
    let theme;
    try { theme = localStorage.getItem('topmind-theme'); } catch {}
    if (theme !== 'dark' && theme !== 'light') {
        theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#161a14' : '#f7f7ef';
})();
