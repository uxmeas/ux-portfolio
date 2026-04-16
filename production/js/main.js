// ── Initialize Lucide icons ──
if (typeof lucide !== 'undefined') lucide.createIcons();

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
});

// ── Mobile hamburger menu ──
(function() {
    const hamburger = document.getElementById('navHamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>';
    const closeIcon = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>';
    let isOpen = false;

    function toggleMenu() {
        isOpen = !isOpen;
        mobileMenu.classList.toggle('active', isOpen);
        hamburger.innerHTML = isOpen ? closeIcon : menuIcon;
        hamburger.setAttribute('aria-expanded', isOpen);
        hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    function closeMenu() {
        if (!isOpen) return;
        isOpen = false;
        mobileMenu.classList.remove('active');
        hamburger.innerHTML = menuIcon;
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open menu');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', toggleMenu);
    mobileMenu.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeMenu();
    });
})();

// ── Hero sequential fade-in ──
(function() {
    const heroEls = document.querySelectorAll('.hero-tag, .hero h1, .hero-subtitle, .hero-ctas');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    heroEls.forEach((el, i) => {
        if (prefersReduced) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            return;
        }
        el.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.2}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.2}s`;
        requestAnimationFrame(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    });
})();

// ── Scroll reveal with stagger ──
(function() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
        document.querySelectorAll('.reveal').forEach(el => {
            el.classList.add('visible');
        });
        return;
    }

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const parent = el.parentElement;
                if (parent && parent.classList.contains('work-grid')) {
                    const siblings = Array.from(parent.querySelectorAll('.reveal'));
                    const idx = siblings.indexOf(el);
                    const col = idx % 2;
                    el.style.transitionDelay = (col * 0.1) + 's';
                }
                el.classList.add('visible');
                revealObserver.unobserve(el);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
})();

// ── Smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ── Contact form (Netlify Forms) ──
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('.contact-submit');

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
        const res = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(new FormData(contactForm)).toString()
        });

        if (res.ok) {
            contactForm.style.display = 'none';
            document.getElementById('contactSuccess').style.display = 'block';
        } else {
            submitBtn.disabled = false;
            submitBtn.textContent = 'SEND MESSAGE \u2192';
            document.getElementById('contactError').style.display = 'block';
        }
    } catch (err) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'SEND MESSAGE \u2192';
        document.getElementById('contactError').style.display = 'block';
    }
});

// ── Email obfuscation ──
document.querySelectorAll('.eml').forEach(function(a) {
    var addr = a.dataset.u + '@' + a.dataset.d;
    if (a.classList.contains('eml-show')) a.textContent = addr;
    a.addEventListener('click', function(e) {
        e.preventDefault();
        window.location = 'mailto:' + addr;
    });
});

// ── Cookie consent ──
window.acceptCookies = function() {
    gtag('consent', 'update', { 'analytics_storage': 'granted' });
    localStorage.setItem('uxmeas-analytics', 'granted');
    document.getElementById('cookieBanner').style.display = 'none';
};
window.declineCookies = function() {
    gtag('consent', 'update', { 'analytics_storage': 'denied' });
    localStorage.setItem('uxmeas-analytics', 'denied');
    document.getElementById('cookieBanner').style.display = 'none';
};
window.resetCookieConsent = function() {
    localStorage.removeItem('uxmeas-analytics');
    gtag('consent', 'update', { 'analytics_storage': 'denied' });
    document.getElementById('cookieBanner').style.display = 'block';
};
if (!localStorage.getItem('uxmeas-analytics')) {
    setTimeout(function() {
        document.getElementById('cookieBanner').style.display = 'block';
    }, 1500);
}
