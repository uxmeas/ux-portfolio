// Minimal theme toggle. Respects system by default; toggle persists.
(function () {
  const KEY = 'uxmeas-theme';
  const root = document.documentElement;
  const stored = localStorage.getItem(KEY);
  if (stored === 'dark' || stored === 'light') root.setAttribute('data-theme', stored);

  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      const current = root.getAttribute('data-theme');
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      let next;
      if (!current) next = systemDark ? 'light' : 'dark';
      else next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem(KEY, next);
    });
  });
})();
