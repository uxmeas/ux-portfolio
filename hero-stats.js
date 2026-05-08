/* =============================================================
   hero-stats.js — stagger reveal + count-up animation
   Triggers once when in view. Skips on prefers-reduced-motion.

   Extracted from inline <script> 2026-05-08 — CSP `script-src 'self'`
   without `'unsafe-inline'` was blocking the inline IIFE on dev/prod.
   ============================================================= */
(function () {
  'use strict';

  const stats = document.querySelectorAll('.hero-stats .hstat');
  if (!stats.length) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const STAGGER_MS = 120;
  const COUNT_DURATION = 900;

  const animateNumber = (el) => {
    const target = parseInt(el.dataset.count, 10);
    if (isNaN(target)) return;
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    if (reduced) { el.textContent = prefix + target + suffix; return; }
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / COUNT_DURATION);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (reduced) {
    stats.forEach((el) => {
      el.classList.add('in');
      const num = el.querySelector('.hstat-n');
      if (num && num.dataset.count) animateNumber(num);
    });
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const idx = parseInt(el.dataset.stagger || '0', 10);
      setTimeout(() => {
        el.classList.add('in');
        const num = el.querySelector('.hstat-n');
        if (num && num.dataset.count) animateNumber(num);
      }, idx * STAGGER_MS);
      io.unobserve(el);
    });
  }, { threshold: 0.4 });

  stats.forEach((el) => io.observe(el));
})();
