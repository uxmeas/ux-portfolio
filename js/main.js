/* ============================================
   UX MEAS PORTFOLIO — MAIN JS
   Shared nav/footer, scroll reveal, next/prev nav
   ============================================ */

// Case study order for next/prev navigation
const CASE_STUDIES = [
  { slug: 'compliance-ux', title: 'Investor Onboarding' },
  { slug: 'dealflow', title: 'Deal Management' },
  { slug: 'donations-rewards', title: 'Donations & Rewards' },
  { slug: 'lending', title: 'Lending Platform' },
  { slug: 'white-label', title: 'White-Label System' },
  { slug: '3-to-ipo', title: '3 to IPO' },
  { slug: 'fuzehq', title: 'FuzeHQ' },
  { slug: 'multipaste', title: 'MultiPaste' },
  { slug: 'mockupkit', title: 'MockupKit' },
  { slug: 'docs-to-design', title: 'Docs to Design' },
  { slug: 'mypick', title: 'MyPick.io' },
  { slug: 'relationsync', title: 'RelationSync' },
  { slug: 'akmsecure', title: 'AKMSecure' },
  { slug: 'isoblock', title: 'IsoBlock' }
];

document.addEventListener('DOMContentLoaded', () => {
  const base = document.documentElement.dataset.base || '';

  // === MZM-351: Add next case study link to nav ===
  const currentSlug = getCurrentSlug();
  if (currentSlug) {
    const idx = CASE_STUDIES.findIndex(cs => cs.slug === currentSlug);
    if (idx !== -1) {
      injectNextNav(idx, base);
    }
  }

  // === Scroll reveal ===
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveals.forEach(el => el.classList.add('visible'));
    } else {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      reveals.forEach(el => observer.observe(el));
    }
  }

  // === Email obfuscation ===
  document.querySelectorAll('[data-u][data-d]').forEach(el => {
    const email = el.dataset.u + '@' + el.dataset.d;
    el.href = 'mailto:' + email;
    if (!el.textContent.trim()) el.textContent = email;
  });
});

// Get current case study slug from URL
function getCurrentSlug() {
  const path = window.location.pathname;
  const match = path.match(/case-study\/([^/]+)/);
  return match ? match[1] : null;
}

// Inject breadcrumb bar below nav: Work › Current | Next →
function injectNextNav(currentIndex, base) {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const current = CASE_STUDIES[currentIndex];
  const nextIndex = (currentIndex + 1) % CASE_STUDIES.length;
  const isLast = currentIndex === CASE_STUDIES.length - 1;
  const next = isLast
    ? { slug: '', title: 'All Projects' }
    : CASE_STUDIES[nextIndex];

  const nextHref = isLast
    ? base + 'index.html'
    : base + 'case-study/' + next.slug + '/';

  const breadcrumb = document.createElement('div');
  breadcrumb.className = 'breadcrumb';
  breadcrumb.innerHTML =
    '<div class="breadcrumb__left">' +
      '<a href="' + base + 'index.html" class="breadcrumb__link">Work</a>' +
      '<span class="breadcrumb__sep">\u203A</span>' +
      '<span class="breadcrumb__current">' + current.title + '</span>' +
    '</div>' +
    '<a href="' + nextHref + '" class="breadcrumb__next">' +
      next.title + ' <span class="breadcrumb__arrow">\u203A</span>' +
    '</a>';

  nav.after(breadcrumb);
}
