/**
 * Professional Portfolio System
 * A scalable, maintainable architecture for case study presentation
 */

class PortfolioSystem {
  constructor(options = {}) {
    this.options = {
      dataSource: options.dataSource || '/src/data/case-studies.json',
      templateEngine: options.templateEngine || 'native',
      enableAnalytics: options.enableAnalytics !== false,
      enableRouter: options.enableRouter !== false,
      ...options
    };
    
    this.caseStudies = [];
    this.currentStudy = null;
    this.templates = {};
    
    this.init();
  }

  async init() {
    try {
      // Load case study data
      await this.loadCaseStudies();
      
      // Initialize routing
      if (this.options.enableRouter) {
        this.initRouter();
      }
      
      // Initialize analytics
      if (this.options.enableAnalytics) {
        this.initAnalytics();
      }
      
      // Register templates
      this.registerTemplates();
      
      // Render initial view
      this.renderPortfolioGrid();
      
    } catch (error) {
      console.error('Portfolio initialization failed:', error);
    }
  }

  async loadCaseStudies() {
    try {
      const response = await fetch(this.options.dataSource);
      const data = await response.json();
      this.caseStudies = data.caseStudies;
      return this.caseStudies;
    } catch (error) {
      console.error('Failed to load case studies:', error);
      // Fallback to embedded data if needed
      this.caseStudies = this.getFallbackData();
    }
  }

  registerTemplates() {
    // Register different template types for flexibility
    this.templates = {
      'default': this.defaultTemplate,
      'detailed': this.detailedTemplate,
      'minimal': this.minimalTemplate,
      'visual': this.visualTemplate
    };
  }

  renderPortfolioGrid(filter = null) {
    const container = document.getElementById('portfolio-grid');
    if (!container) return;

    let studies = this.caseStudies;
    
    // Apply filters if provided
    if (filter) {
      studies = this.filterStudies(studies, filter);
    }
    
    // Sort by order
    studies.sort((a, b) => a.order - b.order);
    
    container.innerHTML = studies.map(study => this.renderCard(study)).join('');
    
    // Attach event listeners
    this.attachCardListeners();
  }

  renderCard(study) {
    return `
      <article class="portfolio-card" 
               data-study-id="${study.id}"
               data-aos="fade-up">
        <div class="card-inner">
          <div class="card-media">
            <img src="${study.hero.image}" 
                 alt="${study.metadata.title}"
                 loading="lazy">
            <div class="card-overlay">
              <span class="card-category">${study.metadata.category}</span>
              ${study.featured ? '<span class="card-featured">Featured</span>' : ''}
            </div>
          </div>
          <div class="card-content">
            <h3 class="card-title">${study.metadata.title}</h3>
            <p class="card-description">${study.hero.subheadline}</p>
            <div class="card-metrics">
              <span class="metric-primary">
                ${study.metrics.primary.value} ${study.metrics.primary.label}
              </span>
            </div>
            <div class="card-tags">
              ${study.metadata.tags.slice(0, 3).map(tag => 
                `<span class="tag">${tag}</span>`
              ).join('')}
            </div>
          </div>
        </div>
      </article>
    `;
  }

  attachCardListeners() {
    document.querySelectorAll('.portfolio-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const studyId = card.dataset.studyId;
        this.openCaseStudy(studyId);
      });
    });
  }

  openCaseStudy(studyId) {
    const study = this.caseStudies.find(s => s.id === studyId);
    if (!study) return;
    
    this.currentStudy = study;
    
    // Track analytics event
    if (this.options.enableAnalytics) {
      this.trackEvent('case_study_view', {
        study_id: studyId,
        study_title: study.metadata.title
      });
    }
    
    // Update URL if router is enabled
    if (this.options.enableRouter) {
      window.history.pushState(
        { studyId }, 
        study.metadata.title,
        `/case-study/${study.slug}`
      );
    }
    
    // Render the case study
    this.renderCaseStudy(study);
  }

  renderCaseStudy(study, template = 'default') {
    const container = document.getElementById('case-study-container');
    if (!container) {
      this.createCaseStudyContainer();
    }
    
    const templateFn = this.templates[template] || this.templates.default;
    const html = templateFn.call(this, study);
    
    document.getElementById('case-study-container').innerHTML = html;
    document.getElementById('case-study-modal').classList.add('active');
    document.body.classList.add('modal-open');
    
    // Initialize any interactive elements
    this.initCaseStudyInteractions();
    
    // Scroll to top
    window.scrollTo(0, 0);
  }

  createCaseStudyContainer() {
    const modal = document.createElement('div');
    modal.id = 'case-study-modal';
    modal.className = 'case-study-modal';
    modal.innerHTML = `
      <button class="modal-close" aria-label="Close case study">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
      <div id="case-study-container" class="case-study-container"></div>
    `;
    document.body.appendChild(modal);
    
    // Attach close handlers
    modal.querySelector('.modal-close').addEventListener('click', () => {
      this.closeCaseStudy();
    });
  }

  defaultTemplate(study) {
    return `
      <article class="case-study">
        <!-- Hero Section -->
        <section class="cs-hero">
          <div class="cs-hero-background">
            <img src="${study.hero.image}" alt="${study.metadata.title}">
            <div class="cs-hero-overlay"></div>
          </div>
          <div class="cs-hero-content">
            <div class="cs-hero-badges">
              ${study.hero.badges.map(badge => 
                `<span class="badge">${badge}</span>`
              ).join('')}
            </div>
            <h1 class="cs-title">${study.metadata.title}</h1>
            <p class="cs-subtitle">${study.hero.subheadline}</p>
            <div class="cs-hero-metrics">
              <div class="metric-card primary">
                <div class="metric-value">${study.metrics.primary.value}</div>
                <div class="metric-label">${study.metrics.primary.label}</div>
              </div>
              ${study.metrics.secondary.map(metric => `
                <div class="metric-card">
                  <div class="metric-value">${metric.value}</div>
                  <div class="metric-label">${metric.label}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- Overview Section -->
        <section class="cs-section cs-overview">
          <div class="cs-container">
            <div class="cs-overview-grid">
              <div class="overview-block">
                <h2>Challenge</h2>
                <p>${study.overview.challenge}</p>
              </div>
              <div class="overview-block">
                <h2>Solution</h2>
                <p>${study.overview.solution}</p>
              </div>
              <div class="overview-block full-width">
                <h2>Impact</h2>
                <p>${study.overview.impact}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Process Section -->
        <section class="cs-section cs-process">
          <div class="cs-container">
            <h2 class="section-title">Process</h2>
            <div class="process-timeline">
              ${study.process.map((phase, index) => `
                <div class="process-phase" data-phase="${index + 1}">
                  <div class="phase-header">
                    <span class="phase-number">${String(index + 1).padStart(2, '0')}</span>
                    <h3>${phase.phase}</h3>
                    <span class="phase-duration">${phase.duration}</span>
                  </div>
                  <div class="phase-content">
                    <div class="phase-activities">
                      <h4>Activities</h4>
                      <ul>
                        ${phase.activities.map(activity => 
                          `<li>${activity}</li>`
                        ).join('')}
                      </ul>
                    </div>
                    <div class="phase-deliverables">
                      <h4>Deliverables</h4>
                      <ul>
                        ${phase.deliverables.map(deliverable => 
                          `<li>${deliverable}</li>`
                        ).join('')}
                      </ul>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- Features Section -->
        ${study.features ? `
          <section class="cs-section cs-features">
            <div class="cs-container">
              <h2 class="section-title">Key Features</h2>
              <div class="features-grid">
                ${study.features.map(feature => `
                  <div class="feature-card">
                    <h3>${feature.title}</h3>
                    <p>${feature.description}</p>
                    <span class="feature-impact">${feature.impact}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </section>
        ` : ''}

        <!-- Gallery Section -->
        ${study.gallery && study.gallery.length > 0 ? `
          <section class="cs-section cs-gallery">
            <div class="cs-container">
              <h2 class="section-title">Visual Design</h2>
              <div class="gallery-grid">
                ${study.gallery.map(item => `
                  <figure class="gallery-item" data-category="${item.category}">
                    <img src="${item.url}" 
                         alt="${item.caption}"
                         loading="lazy">
                    <figcaption>${item.caption}</figcaption>
                  </figure>
                `).join('')}
              </div>
            </div>
          </section>
        ` : ''}

        <!-- Learnings Section -->
        ${study.learnings ? `
          <section class="cs-section cs-learnings">
            <div class="cs-container">
              <h2 class="section-title">Key Learnings</h2>
              <div class="learnings-list">
                ${study.learnings.map(learning => `
                  <div class="learning-item">
                    <h3>${learning.title}</h3>
                    <p>${learning.insight}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          </section>
        ` : ''}

        <!-- Footer CTA -->
        <section class="cs-section cs-footer">
          <div class="cs-container">
            <div class="cs-footer-content">
              ${study.metadata.urls.live ? `
                <a href="${study.metadata.urls.live}" 
                   target="_blank" 
                   rel="noopener"
                   class="btn btn-primary">
                  View Live Project
                </a>
              ` : ''}
              <button class="btn btn-secondary" onclick="portfolio.closeCaseStudy()">
                Back to Portfolio
              </button>
            </div>
          </div>
        </section>
      </article>
    `;
  }

  closeCaseStudy() {
    const modal = document.getElementById('case-study-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.classList.remove('modal-open');
      
      // Reset URL if router is enabled
      if (this.options.enableRouter) {
        window.history.pushState({}, 'Portfolio', '/');
      }
      
      // Clear current study
      this.currentStudy = null;
    }
  }

  initRouter() {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', (event) => {
      if (event.state && event.state.studyId) {
        this.openCaseStudy(event.state.studyId);
      } else {
        this.closeCaseStudy();
      }
    });
    
    // Handle direct URLs
    const path = window.location.pathname;
    const match = path.match(/\/case-study\/(.+)/);
    if (match) {
      const slug = match[1];
      const study = this.caseStudies.find(s => s.slug === slug);
      if (study) {
        this.openCaseStudy(study.id);
      }
    }
  }

  initAnalytics() {
    // Track page views
    this.trackEvent('portfolio_view', {
      page: 'portfolio_grid'
    });
  }

  trackEvent(eventName, parameters = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, parameters);
    }
    
    // Console log for development
    if (this.options.debug) {
      console.log('Analytics Event:', eventName, parameters);
    }
  }

  filterStudies(studies, filter) {
    if (filter.category) {
      studies = studies.filter(s => s.metadata.category === filter.category);
    }
    if (filter.tags) {
      studies = studies.filter(s => 
        filter.tags.some(tag => s.metadata.tags.includes(tag))
      );
    }
    if (filter.featured) {
      studies = studies.filter(s => s.featured);
    }
    return studies;
  }

  initCaseStudyInteractions() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
      const images = document.querySelectorAll('.case-study img[loading="lazy"]');
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            imageObserver.unobserve(img);
          }
        });
      });
      images.forEach(img => imageObserver.observe(img));
    }
    
    // Gallery lightbox
    document.querySelectorAll('.gallery-item img').forEach(img => {
      img.addEventListener('click', () => {
        this.openLightbox(img.src, img.alt);
      });
    });
  }

  openLightbox(src, alt) {
    // Implementation for image lightbox
    console.log('Open lightbox:', src, alt);
  }

  getFallbackData() {
    // Embedded fallback data for offline/error scenarios
    return [{
      id: 'akm-secure',
      slug: 'akm-secure',
      featured: true,
      order: 1,
      metadata: {
        title: 'AKM SecureKey',
        category: 'Enterprise Security',
        tags: ['UX Design', 'Enterprise', 'Security']
      },
      hero: {
        headline: '400% Increase in Demo Requests',
        subheadline: 'Enterprise security platform transformation',
        image: '/images/akm-hero.jpg'
      },
      metrics: {
        primary: { value: '+400%', label: 'Demo Requests' },
        secondary: []
      }
    }];
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PortfolioSystem;
}

// Initialize globally if in browser
if (typeof window !== 'undefined') {
  window.PortfolioSystem = PortfolioSystem;
}