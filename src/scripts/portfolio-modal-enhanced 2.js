// Enhanced Portfolio Modal with Multiple Display Modes
class EnhancedPortfolioModal {
  constructor(options = {}) {
    this.options = {
      mode: options.mode || 'iframe', // 'iframe', 'native', or 'ajax'
      ...options
    };
    
    this.modal = null;
    this.currentProject = null;
    this.init();
  }

  init() {
    this.createModal();
    this.initializeCards();
    this.setupEventListeners();
  }

  createModal() {
    // Remove existing modal if present
    const existingModal = document.getElementById('enhanced-portfolio-modal');
    if (existingModal) existingModal.remove();

    // Create new modal structure
    const modalHTML = `
      <div class="enhanced-portfolio-modal" id="enhanced-portfolio-modal" aria-hidden="true" role="dialog">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          <button class="modal-close" aria-label="Close modal">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
          
          <div class="modal-content-wrapper">
            <!-- Content will be dynamically inserted here -->
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.modal = document.getElementById('enhanced-portfolio-modal');
  }

  initializeCards() {
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    portfolioCards.forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = card.dataset.projectId;
        const displayMode = card.dataset.displayMode || this.options.mode;
        
        if (projectId) {
          this.openModal(projectId, displayMode);
        }
      });
    });
  }

  setupEventListeners() {
    // Close button
    const closeBtn = this.modal.querySelector('.modal-close');
    closeBtn?.addEventListener('click', () => this.closeModal());

    // Backdrop click
    const backdrop = this.modal.querySelector('.modal-backdrop');
    backdrop?.addEventListener('click', () => this.closeModal());

    // ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.closeModal();
      }
    });
  }

  async openModal(projectId, mode = 'iframe') {
    const project = this.getProjectData(projectId);
    if (!project) return;

    this.currentProject = project;
    const contentWrapper = this.modal.querySelector('.modal-content-wrapper');

    // Clear previous content
    contentWrapper.innerHTML = '';

    switch (mode) {
      case 'iframe':
        await this.loadIframeContent(project, contentWrapper);
        break;
      case 'ajax':
        await this.loadAjaxContent(project, contentWrapper);
        break;
      case 'native':
        await this.loadNativeContent(project, contentWrapper);
        break;
      default:
        await this.loadIframeContent(project, contentWrapper);
    }

    // Show modal
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.modal.setAttribute('aria-hidden', 'false');
  }

  async loadIframeContent(project, container) {
    // Option 1: Load the full case study HTML in an iframe
    if (project.caseStudyUrl) {
      container.innerHTML = `
        <iframe 
          src="${project.caseStudyUrl}" 
          class="modal-iframe"
          title="${project.title} Case Study"
          loading="lazy"
        ></iframe>
      `;
    }
  }

  async loadAjaxContent(project, container) {
    // Option 2: Load the HTML content via AJAX and inject it
    if (project.caseStudyUrl) {
      try {
        const response = await fetch(project.caseStudyUrl);
        const html = await response.text();
        
        // Extract body content
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const bodyContent = doc.body.innerHTML;
        const styles = doc.head.querySelectorAll('style, link[rel="stylesheet"]');
        
        // Create a container with isolated styles
        container.innerHTML = `
          <div class="ajax-content-container">
            ${Array.from(styles).map(style => style.outerHTML).join('')}
            ${bodyContent}
          </div>
        `;
        
        // Re-initialize any scripts (like Lucide icons)
        if (window.lucide) {
          window.lucide.createIcons();
        }
      } catch (error) {
        console.error('Error loading case study:', error);
        container.innerHTML = '<p>Error loading case study content.</p>';
      }
    }
  }

  async loadNativeContent(project, container) {
    // Option 3: Native modal with AKM-inspired styling
    container.innerHTML = `
      <div class="native-case-study bg-black text-white">
        <!-- Hero Section with AKM Styling -->
        <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
          
          <div class="relative z-10 max-w-7xl mx-auto px-8 text-center">
            <!-- Impact stats -->
            <div class="flex flex-wrap justify-center gap-8 mb-12">
              ${project.badges ? project.badges.map(badge => `
                <div class="flex items-center gap-2 text-white/70">
                  <span class="uppercase text-xs tracking-wider font-medium">${badge}</span>
                </div>
              `).join('<div class="text-white/30">|</div>') : ''}
            </div>
            
            <!-- Main title -->
            <h1 class="text-6xl lg:text-8xl font-bold mb-8 tracking-tight">
              ${project.title}:<br/>
              <span class="font-light">${project.impact}</span>
            </h1>
            
            <p class="text-2xl text-white/70 mb-16 max-w-3xl mx-auto font-light">
              ${project.subtitle}
            </p>
            
            <!-- Metrics -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              ${project.results ? project.results.map(result => `
                <div class="bg-gradient-to-b from-white/10 to-black border border-white/20 p-8">
                  <div class="text-6xl font-bold mb-2">${result.value}</div>
                  <div class="text-sm text-white/50 uppercase tracking-wider">${result.label}</div>
                </div>
              `).join('') : ''}
            </div>
          </div>
        </section>

        <!-- Content Sections -->
        <div class="max-w-6xl mx-auto px-8 py-16">
          ${project.sections ? project.sections.map(section => `
            <section class="mb-16">
              <h2 class="text-4xl font-bold mb-6">${section.title}</h2>
              <div class="text-xl text-white/80 leading-relaxed">
                ${section.content}
              </div>
            </section>
          `).join('') : ''}
          
          <!-- Gallery -->
          ${project.gallery ? `
            <section class="mb-16">
              <h2 class="text-4xl font-bold mb-6">Visual Design</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                ${project.gallery.map(img => `
                  <img src="${img.src}" alt="${img.alt}" class="w-full" loading="lazy">
                `).join('')}
              </div>
            </section>
          ` : ''}
        </div>
      </div>
    `;

    // Load Tailwind CSS if not already loaded
    if (!document.querySelector('script[src*="tailwindcss"]')) {
      const tailwind = document.createElement('script');
      tailwind.src = 'https://cdn.tailwindcss.com';
      document.head.appendChild(tailwind);
    }
  }

  closeModal() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
    this.modal.setAttribute('aria-hidden', 'true');
    
    // Clear iframe to stop any media
    const iframe = this.modal.querySelector('iframe');
    if (iframe) {
      iframe.src = 'about:blank';
    }
  }

  getProjectData(projectId) {
    // Project data with case study URLs
    const projects = {
      'akm-secure': {
        id: 'akm-secure',
        title: 'AKM SecureKey',
        subtitle: 'Strategic UX transformation for a cybersecurity startup competing with Palantir & Anduril',
        impact: '400% Increase in Demo Requests',
        badges: ['4-Week Build', 'Enterprise UX', 'Live Site'],
        caseStudyUrl: 'case-studies/akm-secure/akm-secure-exact-brand.html',
        results: [
          { value: '+400%', label: 'Demo Requests' },
          { value: '+85%', label: 'Mobile Engagement' },
          { value: '60%', label: 'Faster Onboarding' },
          { value: '4 weeks', label: 'Time to Market' }
        ],
        sections: [
          {
            title: 'The Challenge',
            content: 'AKM Secure needed to compete with established defense contractors like Palantir and Anduril. Their revolutionary cryptographic technology was too complex for non-technical decision makers to understand.'
          },
          {
            title: 'The Solution',
            content: 'We transformed complex security concepts into intuitive visualizations, created a compelling narrative around their technology, and built a responsive platform that works flawlessly on all devices.'
          },
          {
            title: 'The Impact',
            content: 'Within 30 days of launch, AKM Secure saw a 400% increase in demo requests, with 85% of mobile visitors engaging with interactive features. The new design positioned them as a serious competitor in the enterprise security space.'
          }
        ],
        gallery: [
          { src: 'public/images/terracore_ai/terracore_ai_1_hero.png', alt: 'Hero Design' },
          { src: 'public/images/terracore_ai/terracore_ai_4_ux.png', alt: 'UX Flow' }
        ]
      },
      'terracore': {
        id: 'terracore',
        title: 'TerraCore AI',
        subtitle: 'AI-powered geospatial analytics platform',
        impact: '90% Faster Analysis',
        caseStudyUrl: null, // No HTML file yet
        // ... rest of project data
      }
    };

    return projects[projectId] || null;
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EnhancedPortfolioModal;
}