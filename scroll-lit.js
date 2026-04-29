// Scroll-lit text effect. Splits target into word spans, toggles .lit
// on each based on scroll position so the text progressively fades to
// the accent color as the reader scrolls through it.
// Respects prefers-reduced-motion (all-lit once in view, no animation).
(function () {
  'use strict';

  const targets = document.querySelectorAll('.scroll-lit');
  if (!targets.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  targets.forEach((el) => {
    const text = el.textContent.trim();
    const words = text.split(/\s+/);
    el.innerHTML = words
      .map((w) => `<span class="word">${w}</span>`)
      .join(' ');
  });

  if (reduceMotion) {
    // Just light everything once the element enters viewport; no per-word animation
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.word').forEach((w) => w.classList.add('lit'));
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    targets.forEach((el) => io.observe(el));
    return;
  }

  // Full scroll-linked per-word effect
  function update() {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // Start lighting when the element's top passes 75% of viewport down.
      // Complete lighting when the element's bottom passes 25% of viewport down.
      const startY = vh * 0.75;
      const endY = vh * 0.25;
      const topProgress = (startY - rect.top) / (startY - endY);
      const progress = Math.max(0, Math.min(1, topProgress));
      const wordEls = el.querySelectorAll('.word');
      const litCount = progress * wordEls.length;
      const currentIndex = Math.floor(litCount);
      wordEls.forEach((w, i) => {
        if (i < currentIndex) {
          w.classList.add('lit');
          w.classList.remove('just-lit');
        } else if (i === currentIndex && progress > 0 && progress < 1) {
          w.classList.add('lit');
          w.classList.add('just-lit');
        } else if (i === currentIndex && progress >= 1) {
          w.classList.add('lit');
          w.classList.remove('just-lit');
        } else {
          w.classList.remove('lit');
          w.classList.remove('just-lit');
        }
      });
    });
  }

  let rafId = null;
  function schedule() {
    if (rafId !== null) return;
    rafId = requestAnimationFrame(() => {
      rafId = null;
      update();
    });
  }

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  document.addEventListener('DOMContentLoaded', update);
  // Also run immediately in case DOMContentLoaded already fired
  if (document.readyState !== 'loading') update();
})();
