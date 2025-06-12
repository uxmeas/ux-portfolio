// --- TAILWIND CONFIG ---
// This config object is used by the Tailwind CSS CDN script.
// It's a way to customize Tailwind's default theme without a build step.
tailwind.config = {
    theme: {
        extend: {
            colors: {
                wealthBlue: '#1b4a66',
                wealthPurple: '#5c5286',
                wealthGreen: '#4ade80',
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            },
        }
    }
}

// --- SITE SCRIPT ---
// This function runs once the entire HTML document is loaded and ready.
document.addEventListener('DOMContentLoaded', () => {

    // --- COMPONENT LOADER ---
    // Fetches HTML content from a file and injects it into a placeholder element.
    const loadComponent = async (path, placeholderId) => {
        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`Failed to fetch ${path}: ${response.statusText}`);
            const text = await response.text();
            document.getElementById(placeholderId).innerHTML = text;
        } catch (error) {
            console.error(`Error loading component ${path}:`, error);
            // Optionally display an error message to the user in the placeholder
            document.getElementById(placeholderId).innerHTML = `<p class="text-center text-red-500">Failed to load section.</p>`;
        }
    };

    // --- INITIALIZATION ---
    // This function will contain all the logic that needs to run AFTER the components are loaded.
    const initializeScripts = () => {
        console.log('All components loaded. Initializing scripts...');

        // --- GLOBAL DATA ---
        const projectsData = [
            {
                id: 'terracore-ai',
                title: 'TerraCore AI: Mining Dashboards for Every Role',
                client: 'TerraCore AI',
                date: '2024',
                duration: '12 weeks',
                tags: ['Dashboard Design', 'Data Visualization', 'Enterprise UX', 'AI/ML Interface'],
                behanceLink: 'https://www.behance.net/uxmeas',
                screenTitles: ['Executive Overview', 'Operations Manager', 'Field Operator Mobile', 'Maintenance Scheduler'],
                description: `
                    <h3 class="text-2xl font-bold text-gray-800 mb-4">The Challenge</h3>
                    <p class="mb-4">TerraCore AI needed role-specific dashboards for their mining operations platform. Each stakeholder—from executives to field operators—required different data views and interaction patterns to make informed decisions quickly.</p>
                    <h3 class="text-2xl font-bold text-gray-800 my-4">My Role & Impact</h3>
                    <p class="mb-4">Led end-to-end UX/UI design for 4 distinct dashboard interfaces, conducting user research with 12+ mining professionals and delivering a design system that reduced decision-making time by 40%.</p>
                    <div class="grid grid-cols-2 gap-4 mt-4 text-center">
                        <div class="p-4 bg-gray-100 rounded-lg"><div class="text-2xl font-bold text-wealthBlue">40%</div><div class="text-sm">Faster Decisions</div></div>
                        <div class="p-4 bg-gray-100 rounded-lg"><div class="text-2xl font-bold text-wealthBlue">95%</div><div class="text-sm">User Satisfaction</div></div>
                    </div>
                `,
                screenImages: [ 'images/terracore_ai/screen_one.jpg', 'images/terracore_ai/screen_two.jpg', 'images/terracore_ai/screen_three.jpg', 'images/terracore_ai/screen_four.jpg' ]
            },
            {
                id: 'fintrust-capital',
                title: 'FinTrust Capital / UI UX Design',
                client: 'FinTrust Capital',
                date: '2023',
                duration: '8 weeks',
                tags: ['Fintech UX', 'Product Design', 'Information Architecture', 'User Research'],
                behanceLink: 'https://www.behance.net/uxmeas',
                screenTitles: ['Dashboard', 'Portfolio', 'Transactions', 'Secure Login'],
                description: `
                    <h3 class="text-2xl font-bold text-gray-800 mb-4">The Challenge</h3>
                    <p class="mb-4">FinTrust Capital required an intuitive and secure platform for financial management. The project focused on simplifying complex financial data into easily digestible interfaces and ensuring a seamless user journey from login to portfolio analysis.</p>
                    <h3 class="text-2xl font-bold text-gray-800 my-4">My Role & Impact</h3>
                    <p class="mb-4">I conducted extensive user research to understand the needs of both financial professionals and individual investors. I then developed wireframes, high-fidelity prototypes, and a comprehensive design system. My work contributed to a 25% improvement in user satisfaction and a 15% reduction in data entry errors.</p>
                `,
                screenImages: [ 'images/fintrust_capital/screen_one.jpg', 'images/fintrust_capital/screen_two.jpg', 'images/fintrust_capital/screen_three.jpg', 'images/fintrust_capital/screen_four.jpg' ]
            },
            {
                id: 'remindry',
                title: 'ReMindry: Intelligent Task Management',
                client: 'Startup Project',
                date: '2022',
                duration: '10 weeks',
                tags: ['Product Strategy', 'UX Research', 'Mobile App Design', 'AI Integration'],
                behanceLink: 'https://www.behance.net/uxmeas',
                screenTitles: ['Main Task List', 'Smart Scheduling', 'Notifications', 'Progress Tracking'],
                description: `
                    <h3 class="text-2xl font-bold text-gray-800 mb-4">The Challenge</h3>
                    <p class="mb-4">ReMindry is a conceptual project to explore how AI and intuitive design could simplify daily planning. The goal was to reduce the mental load for users with busy schedules by creating a truly "smart" reminder app.</p>
                    <h3 class="text-2xl font-bold text-gray-800 my-4">My Role & Impact</h3>
                    <p class="mb-4">I led the product strategy, conducted competitive analysis, and designed the UI to prioritize clarity and ease of input. User testing of the interactive prototype revealed high satisfaction with the "smart scheduling" feature, validating the core concept.</p>
                `,
                screenImages: [ 'images/remindry/screen_one.jpg', 'images/remindry/screen_two.jpg', 'images/remindry/screen_three.jpg', 'images/remindry/screen_four.jpg' ]
            },
            {
                id: 'katipult',
                title: 'Katipult: Fintech UX & Strategy',
                client: 'Katipult Technology Corp.',
                date: '2021-2022',
                duration: '1.5 years',
                tags: ['UX Leadership', 'Design Systems', 'Fintech Platform', 'Growth Strategy'],
                behanceLink: 'https://www.behance.net/uxmeas',
                screenTitles: ['Investor Dashboard', 'Issuer Portal', 'Admin View', 'Design System'],
                description: `
                    <h3 class="text-2xl font-bold text-gray-800 mb-4">The Challenge</h3>
                    <p class="mb-4">As a co-founder and UX leader, I spearheaded the UX vision and design operations for Katipult, a leading fintech platform for private markets. My focus was on enhancing user engagement, streamlining complex investment workflows, and building a scalable design foundation to support rapid growth.</p>
                     <h3 class="text-2xl font-bold text-gray-800 my-4">My Role & Impact</h3>
                    <p class="mb-4">I scaled the design team, introduced cross-functional design rituals, and co-founded the product vision for new modules. By building a centralized Figma design system, we improved consistency and reduced design-to-development handoff time by 40%, directly contributing to a 30% increase in platform engagement.</p>
                `,
                screenImages: [ 'images/katipult/screen_one.jpg', 'images/katipult/screen_two.jpg', 'images/katipult/screen_three.jpg', 'images/katipult/screen_four.jpg' ]
            }
        ];

        let currentProjectScreens = [];
        let currentImageIndex = 0;

        // --- DOM ELEMENT SELECTORS ---
        const projectCards = document.querySelectorAll('.project-card');
        const projectModal = document.getElementById('projectModal');
        const closeModalButton = document.getElementById('closeModal');
        const modalProjectTitle = document.getElementById('modalProjectTitle');
        const modalProjectClient = document.getElementById('modalProjectClient');
        const modalProjectTags = document.getElementById('modalProjectTags');
        const modalProjectImage = document.getElementById('modalProjectImage');
        const modalProjectDescription = document.getElementById('modalProjectDescription');
        const modalBehanceLink = document.getElementById('modalBehanceLink');
        const prevImageButton = document.getElementById('prevImage');
        const nextImageButton = document.getElementById('nextImage');
        const modalImageSpinner = document.getElementById('modalImageSpinner');
        const modalScreenIndicator = document.getElementById('modalScreenIndicator');
        const modalScreenTitle = document.getElementById('modalScreenTitle');
        const modalThumbnailNav = document.getElementById('modalThumbnailNav');
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const closeMobileMenuButton = document.getElementById('close-mobile-menu');
        const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        const contactForm = document.getElementById('contactForm');
        const formMessageBox = document.getElementById('formMessageBox');

        // --- MODAL LOGIC ---
        function openModal(projectId) {
            const project = projectsData.find(p => p.id === projectId);
            if (!project) {
                console.error(`Project with ID "${projectId}" not found.`);
                return;
            }
            
            modalProjectTitle.textContent = project.title;
            modalProjectClient.textContent = `Client: ${project.client} • ${project.date} • ${project.duration}`;
            modalProjectDescription.innerHTML = project.description;
            modalBehanceLink.href = project.behanceLink;

            modalProjectTags.innerHTML = '';
            project.tags.forEach(tag => {
                const span = document.createElement('span');
                span.className = 'bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium';
                span.textContent = tag;
                modalProjectTags.appendChild(span);
            });

            currentProjectScreens = project.screenImages;
            currentImageIndex = 0;
            
            modalThumbnailNav.innerHTML = '';
            project.screenImages.forEach((screen, index) => {
                const dot = document.createElement('div');
                dot.className = 'thumbnail-dot';
                dot.dataset.index = index;
                const img = new Image();
                img.src = screen;
                dot.addEventListener('click', () => {
                    currentImageIndex = index;
                    updateModalImage(project.screenTitles);
                });
                modalThumbnailNav.appendChild(dot);
            });

            updateModalImage(project.screenTitles);
            
            projectModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }

        function updateModalImage(screenTitles = []) {
            modalImageSpinner.classList.remove('hidden');
            modalProjectImage.classList.remove('loaded');
            modalProjectImage.style.opacity = '0';

            const imageUrl = currentProjectScreens[currentImageIndex];
            modalProjectImage.src = imageUrl;
            modalProjectImage.onerror = () => {
                console.error('Failed to load image:', imageUrl);
                modalImageSpinner.classList.add('hidden');
                modalProjectImage.src = `https://placehold.co/1200x900/ef4444/ffffff?text=Image+Not+Found`;
                modalProjectImage.classList.add('loaded');
                modalProjectImage.style.opacity = '1';
            };
            modalProjectImage.onload = () => {
                modalImageSpinner.classList.add('hidden');
                modalProjectImage.classList.add('loaded');
                modalProjectImage.style.opacity = '1';
            };
            
            modalScreenIndicator.textContent = `${currentImageIndex + 1} of ${currentProjectScreens.length}`;
            modalScreenTitle.textContent = screenTitles[currentImageIndex] || '';

            document.querySelectorAll('.thumbnail-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentImageIndex);
            });
            
            const showButtons = currentProjectScreens.length > 1;
            prevImageButton.style.display = showButtons ? 'flex' : 'none';
            nextImageButton.style.display = showButtons ? 'flex' : 'none';
        }

        function closeModal() {
            projectModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }

        projectCards.forEach(card => card.addEventListener('click', () => openModal(card.dataset.projectId)));
        closeModalButton.addEventListener('click', closeModal);
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && projectModal.classList.contains('show')) closeModal();
        });
        prevImageButton.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + currentProjectScreens.length) % currentProjectScreens.length;
            const project = projectsData.find(p => p.screenImages.includes(currentProjectScreens[0]));
            updateModalImage(project.screenTitles);
        });
        nextImageButton.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % currentProjectScreens.length;
            const project = projectsData.find(p => p.screenImages.includes(currentProjectScreens[0]));
            updateModalImage(project.screenTitles);
        });

        // --- NAVIGATION LOGIC ---
        function setupNavigation() {
            if (!mobileMenuButton || !closeMobileMenuButton || !mobileMenuOverlay) return;
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

            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    if(targetElement) {
                         targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const navLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                        navLinks.forEach(link => link.classList.remove('active'));
                        if (navLink) {
                            navLink.classList.add('active');
                        }
                    }
                });
            }, { rootMargin: "0px 0px -70% 0px" });
            sections.forEach(section => observer.observe(section));
        }
        setupNavigation();

        // --- CONTACT FORM LOGIC ---
        function showMessageBox(message, isError = false) {
            if (!formMessageBox) return;
            formMessageBox.textContent = message;
            // CORRECTED: This now correctly preserves the base class `message-box`
            formMessageBox.className = 'message-box ' + (isError ? 'error show' : 'success show');
            setTimeout(() => {
                // Also remove the specific state classes when hiding
                formMessageBox.className = 'message-box';
            }, 5000);
        }
        
        if (contactForm) {
            contactForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                const formData = new FormData(contactForm);
                // The 'bot-field' is part of the honeypot. If it has a value, it's likely a bot.
                if (formData.get('bot-field')) {
                    console.log('Honeypot field filled. Submission blocked.');
                    return; // Silently fail for bots
                }

                try {
                    const response = await fetch('/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: new URLSearchParams(formData).toString()
                    });
                    if (response.ok) {
                        showMessageBox('Thank you! Your message has been sent.', false);
                        contactForm.reset();
                    } else {
                        const errorText = await response.text();
                        console.error('Form submission failed:', errorText);
                        showMessageBox('Oops! There was a problem sending your message.', true);
                    }
                } catch (error) {
                    console.error('Form submission error:', error);
                    showMessageBox('An error occurred. Please try again later.', true);
                }
            });
        }
    };

    // --- LOAD ALL COMPONENTS AND THEN INITIALIZE THE SCRIPTS ---
    Promise.all([
        loadComponent('components/navigation.html', 'navigation-placeholder'),
        loadComponent('components/hero.html', 'hero-placeholder'),
        loadComponent('components/about.html', 'about-placeholder'),
        loadComponent('components/work.html', 'work-placeholder'),
        loadComponent('components/skills.html', 'skills-placeholder'),
        loadComponent('components/timeline.html', 'timeline-placeholder'),
        loadComponent('components/recommendations.html', 'recommendations-placeholder'),
        loadComponent('components/contact.html', 'contact-placeholder'),
        loadComponent('components/footer.html', 'footer-placeholder')
    ]).then(() => {
        // Once all components are loaded, run the initialization script.
        initializeScripts();
        
        // Hide preloader after everything is set up
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('hide');
            preloader.addEventListener('transitionend', () => preloader.remove(), { once: true });
        }
        document.body.classList.add('loaded');

    }).catch(error => {
        console.error("A critical error occurred while loading page components.", error);
    });
});
