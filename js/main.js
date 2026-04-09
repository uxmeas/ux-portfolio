/* ============================================
   UX MEAS PORTFOLIO — MAIN JS
   Minimal: scroll reveal, email obfuscation
   ============================================ */

// Scroll reveal using IntersectionObserver
document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reveals.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
});

// Email obfuscation
document.querySelectorAll('[data-u][data-d]').forEach(el => {
  const email = el.dataset.u + '@' + el.dataset.d;
  el.href = 'mailto:' + email;
  if (!el.textContent.trim()) el.textContent = email;
});
