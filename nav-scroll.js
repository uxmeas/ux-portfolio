/* nav-scroll.js — scroll-aware sticky nav.
   Hide on scroll-down, reveal on scroll-up, always visible at the top.
   Pattern adopted from MZM Labs (Header.astro): scroll-delta tracked via JS,
   no CSS transition on transform — gives an "attached to scroll velocity" feel.
   Honors prefers-reduced-motion. */

(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var nav = document.querySelector('.nav');
  if (!nav) return;

  var NAV_H = nav.offsetHeight || 64;
  var lastY = window.scrollY || 0;
  var currentOffset = 0;
  var ticking = false;

  function update() {
    var scrollY = window.scrollY;
    var delta = scrollY - lastY;

    // Accumulate delta into transform offset, clamped to [-NAV_H, 0]
    currentOffset = Math.min(0, Math.max(-NAV_H, currentOffset - delta));

    // Always show at top of page
    if (scrollY <= 0) currentOffset = 0;

    nav.style.transform = 'translateY(' + currentOffset + 'px)';
    lastY = scrollY;
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  function onResize() {
    NAV_H = nav.offsetHeight || NAV_H;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });
})();
