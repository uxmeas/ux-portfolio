// Portfolio Modal JavaScript
class PortfolioModal {
  constructor() {
    this.modal = document.getElementById('portfolio-modal');
    this.modalBackdrop = this.modal?.querySelector('.modal-backdrop');
    this.modalClose = this.modal?.querySelector('.modal-close');
    this.portfolioCards = [];
    this.currentProject = null;
    this.init();
  }

  init() {
    if (!this.modal) return;
    
    // Close modal handlers
    this.modalClose?.addEventListener('click', () => this.closeModal());
    this.modalBackdrop?.addEventListener('click', () => this.closeModal());
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.closeModal();
      }
    });
    
    // Initialize portfolio cards
    this.initializeCards();
  }

  initializeCards() {
    // Find all portfolio cards
    this.portfolioCards = document.querySelectorAll('.portfolio-card');
    
    this.portfolioCards.forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = card.dataset.projectId;
        if (projectId) {
          this.openModal(projectId);
        }
      });
      
      // Also handle button click
      const viewBtn = card.querySelector('.view-project-btn');
      viewBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectId = card.dataset.projectId;
        if (projectId) {
          this.openModal(projectId);
        }
      });
    });
  }

  openModal(projectId) {
    // Get project data
    const project = this.getProjectData(projectId);
    if (!project) return;
    
    this.currentProject = project;
    this.populateModal(project);
    
    // Show modal
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus management for accessibility
    this.modal.setAttribute('aria-hidden', 'false');
    this.modalClose?.focus();
  }

  closeModal() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
    this.modal.setAttribute('aria-hidden', 'true');
    
    // Return focus to the card that opened the modal
    if (this.currentProject) {
      const card = document.querySelector(`[data-project-id="${this.currentProject.id}"]`);
      card?.focus();
    }
    
    this.currentProject = null;
  }

  populateModal(project) {
    // Populate hero section
    const heroImage = this.modal.querySelector('.modal-hero-image');
    const title = this.modal.querySelector('.modal-title');
    const subtitle = this.modal.querySelector('.modal-subtitle');
    
    if (heroImage) heroImage.src = project.heroImage || '';
    if (title) title.textContent = project.title || '';
    if (subtitle) subtitle.textContent = project.subtitle || '';
    
    // Populate content sections
    const overview = this.modal.querySelector('.modal-overview');
    const challenge = this.modal.querySelector('.modal-challenge');
    const solution = this.modal.querySelector('.modal-solution');
    
    if (overview) overview.textContent = project.overview || '';
    if (challenge) challenge.textContent = project.challenge || '';
    if (solution) solution.textContent = project.solution || '';
    
    // Populate process steps
    const processGrid = this.modal.querySelector('.modal-process-grid');
    if (processGrid && project.process) {
      processGrid.innerHTML = project.process.map(step => `
        <div class="process-step">
          <h3>${step.title}</h3>
          <p>${step.description}</p>
        </div>
      `).join('');
    }
    
    // Populate results
    const resultsContainer = this.modal.querySelector('.modal-results');
    if (resultsContainer && project.results) {
      resultsContainer.innerHTML = project.results.map(result => `
        <div class="result-metric">
          <span class="metric-value">${result.value}</span>
          <span class="metric-label">${result.label}</span>
        </div>
      `).join('');
    }
    
    // Populate gallery
    const galleryGrid = this.modal.querySelector('.modal-images-grid');
    if (galleryGrid && project.gallery) {
      galleryGrid.innerHTML = project.gallery.map(image => `
        <img src="${image.src}" alt="${image.alt || ''}" loading="lazy">
      `).join('');
    }
    
    // Populate tech stack
    const techTags = this.modal.querySelector('.tech-tags');
    if (techTags && project.technologies) {
      techTags.innerHTML = project.technologies.map(tech => `
        <span>${tech}</span>
      `).join('');
    }
    
    // Update CTAs
    const liveLink = this.modal.querySelector('.modal-live-link');
    const caseStudyLink = this.modal.querySelector('.modal-case-study-link');
    
    if (liveLink) {
      if (project.liveUrl) {
        liveLink.href = project.liveUrl;
        liveLink.style.display = 'inline-block';
      } else {
        liveLink.style.display = 'none';
      }
    }
    
    if (caseStudyLink) {
      if (project.caseStudyUrl) {
        caseStudyLink.href = project.caseStudyUrl;
        caseStudyLink.style.display = 'inline-block';
      } else {
        caseStudyLink.style.display = 'none';
      }
    }
  }

  getProjectData(projectId) {
    // This would typically fetch from a data source
    // For now, using sample data
    const projects = {
      'akm-secure': {
        id: 'akm-secure',
        title: 'AKM SecureKey',
        subtitle: 'Enterprise Key Management Solution',
        heroImage: '/public/images/akm-hero.jpg',
        overview: 'Designed and developed a comprehensive key management platform for enterprise security, focusing on intuitive UX for complex cryptographic operations.',
        challenge: 'Enterprise security teams struggled with fragmented key management tools, leading to security vulnerabilities and operational inefficiencies.',
        solution: 'Created a unified platform with role-based access control, automated key rotation, and real-time monitoring, reducing security incidents by 75%.',
        process: [
          {
            title: 'Research',
            description: 'Conducted interviews with 20+ security professionals to understand pain points'
          },
          {
            title: 'Design',
            description: 'Created wireframes and prototypes focusing on simplifying complex workflows'
          },
          {
            title: 'Testing',
            description: 'Ran usability tests with target users, iterating based on feedback'
          },
          {
            title: 'Implementation',
            description: 'Worked closely with developers to ensure design fidelity'
          }
        ],
        results: [
          { value: '75%', label: 'Reduced Security Incidents' },
          { value: '60%', label: 'Faster Key Deployment' },
          { value: '95%', label: 'User Satisfaction Score' },
          { value: '3x', label: 'ROI in First Year' }
        ],
        gallery: [
          { src: '/public/images/akm-dashboard.jpg', alt: 'Dashboard view' },
          { src: '/public/images/akm-keys.jpg', alt: 'Key management interface' },
          { src: '/public/images/akm-analytics.jpg', alt: 'Analytics dashboard' }
        ],
        technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
        liveUrl: 'https://www.akmsecure.com',
        caseStudyUrl: '/case-studies/akm-secure/akm-secure-elite.html'
      },
      'terracore': {
        id: 'terracore',
        title: 'TerraCore AI',
        subtitle: 'AI-Powered Geospatial Analytics',
        heroImage: '/public/images/terracore_ai/terracore_ai_1_hero.png',
        overview: 'Led the design of an AI-driven platform for geospatial data analysis, making complex satellite imagery accessible to non-technical users.',
        challenge: 'Geospatial analysts needed weeks to process and analyze satellite data, limiting response time for critical decisions.',
        solution: 'Developed an intuitive interface with AI-powered automation, reducing analysis time from weeks to hours.',
        process: [
          {
            title: 'Discovery',
            description: 'Mapped current workflows and identified automation opportunities'
          },
          {
            title: 'Prototyping',
            description: 'Built interactive prototypes to test AI integration concepts'
          },
          {
            title: 'Validation',
            description: 'Conducted A/B testing with real users in field conditions'
          },
          {
            title: 'Launch',
            description: 'Phased rollout with continuous monitoring and improvements'
          }
        ],
        results: [
          { value: '90%', label: 'Time Reduction' },
          { value: '5x', label: 'More Data Processed' },
          { value: '250+', label: 'Active Users' },
          { value: '$2M', label: 'Cost Savings' }
        ],
        gallery: [
          { src: '/public/images/terracore_ai/terracore_ai_2_challenge.png', alt: 'Challenge overview' },
          { src: '/public/images/terracore_ai/terracore_ai_3_user_personas.png', alt: 'User personas' },
          { src: '/public/images/terracore_ai/terracore_ai_4_ux.png', alt: 'UX flow' },
          { src: '/public/images/terracore_ai/terracore_ai_5_ui.png', alt: 'UI design' }
        ],
        technologies: ['Vue.js', 'Python', 'TensorFlow', 'PostgreSQL', 'Mapbox', 'AWS'],
        liveUrl: null,
        caseStudyUrl: '/case-studies/terracore.html'
      }
    };
    
    return projects[projectId] || null;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioModal();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PortfolioModal;
}