// Scroll reveal — subtle fade-up on section enter.
// Adopted from the current dev.uxmeas.pages.dev implementation.
// Any element with class `.reveal` starts hidden; adds `.visible` when it
// intersects the viewport. Respects prefers-reduced-motion (shows immediately).
(function () {
  'use strict';

  function init() {
    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveals.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      // Legacy fallback: just show everything
      reveals.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
