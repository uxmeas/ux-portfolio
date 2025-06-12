function setupNavigation() {
    // Select all the navigation elements
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // --- Mobile Menu Logic ---
    if (mobileMenuButton && closeMobileMenuButton && mobileMenuOverlay) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('hidden');
            mobileMenuOverlay.classList.add('flex');
            document.body.style.overflow = 'hidden';
        });

        const closeMenu = () => {
            mobileMenuOverlay.classList.add('hidden');
            mobileMenuOverlay.classList.remove('flex');
            document.body.style.overflow = 'auto';
        };

        closeMobileMenuButton.addEventListener('click', closeMenu);
        mobileNavLinks.forEach(link => link.addEventListener('click', closeMenu));
    }

    // --- Smooth Scrolling for All Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Active Nav Link Highlighting on Scroll ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find the nav link that corresponds to the section in view
                const navLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                
                // Remove 'active' from all links first
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add 'active' to the correct one
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }, {
        rootMargin: '0px 0px -70% 0px' // This makes the link active when a section is at the top of the viewport
    });

    sections.forEach(section => {
        if (section) {
            observer.observe(section);
        }
    });
}
