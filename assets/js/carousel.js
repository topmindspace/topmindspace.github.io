/* Topmind — hero carousel (vanilla, no dependencies)
   Arrows · dots · keyboard ←/→ · swipe · auto-advance (pauses on hover/focus/hidden tab) · prefers-reduced-motion */
(function () {
    'use strict';
    function init(root) {
        var track = root.querySelector('.carousel__track');
        var slides = Array.prototype.slice.call(root.querySelectorAll('.carousel__slide'));
        var dotsBox = root.querySelector('.carousel__dots');
        if (!track || slides.length < 2) return;
        var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
        var index = 0, timer = null, paused = false, DELAY = 6000;

        var dots = slides.map(function (_, i) {
            var b = document.createElement('button');
            b.type = 'button'; b.className = 'carousel__dot'; b.setAttribute('role', 'tab');
            b.addEventListener('click', function () { go(i, true); });
            dotsBox.appendChild(b); return b;
        });
        function labelDots() {
            var zh = (document.documentElement.lang || '').indexOf('zh') === 0;
            dots.forEach(function (d, i) { d.setAttribute('aria-label', zh ? '第 ' + (i + 1) + ' 张' : 'Slide ' + (i + 1)); });
        }
        labelDots();
        new MutationObserver(labelDots).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

        function go(i, user) {
            index = (i + slides.length) % slides.length;
            track.style.transform = 'translateX(' + (-100 * index) + '%)';
            slides.forEach(function (s, k) {
                var on = k === index;
                s.toggleAttribute('aria-hidden', !on);
                if (on) { var img = s.querySelector('img'); if (img && img.loading === 'lazy') img.loading = 'eager'; }
            });
            // warm the next image so it is ready before it slides in
            var nx = slides[(index + 1) % slides.length].querySelector('img');
            if (nx && nx.loading === 'lazy') nx.loading = 'eager';
            dots.forEach(function (d, k) { d.setAttribute('aria-selected', k === index ? 'true' : 'false'); });
            if (user) restart();
        }
        function auto() { return !paused && !(reduce && reduce.matches) && !document.hidden; }
        function restart() {
            clearInterval(timer);
            timer = setInterval(function () { if (auto()) go(index + 1); }, DELAY);
        }

        root.querySelectorAll('.carousel__btn').forEach(function (b) {
            b.addEventListener('click', function () { go(index + Number(b.getAttribute('data-dir')), true); });
        });
        root.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft') { go(index - 1, true); e.preventDefault(); }
            else if (e.key === 'ArrowRight') { go(index + 1, true); e.preventDefault(); }
        });
        root.addEventListener('mouseenter', function () { paused = true; });
        root.addEventListener('mouseleave', function () { paused = false; });
        root.addEventListener('focusin', function () { paused = true; });
        root.addEventListener('focusout', function () { paused = false; });

        var x0 = null, y0 = null;
        track.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; paused = true; }, { passive: true });
        track.addEventListener('touchend', function (e) {
            if (x0 === null) return;
            var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
            if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(index + (dx < 0 ? 1 : -1), true);
            x0 = null; paused = false;
        });

        go(0); restart();
    }
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('[data-carousel]').forEach(init);
    });
})();
