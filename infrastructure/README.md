# UX Portfolio - Local Development Infrastructure

This directory contains the complete local development infrastructure for the UX Portfolio project, providing a professional development environment with Docker support, automated testing, and quality assurance tools.

## 🚀 Quick Start

```bash
# Complete setup
npm run setup

# Start development (both portfolio and case study generator)
npm run dev

# Using Docker
npm run docker:dev
```

## 📁 Infrastructure Overview

```
infrastructure/
├── config/              # Configuration files
│   ├── .eslintrc.json   # JavaScript linting rules
│   ├── .stylelintrc.json # CSS linting rules
│   ├── .prettierrc      # Code formatting rules
│   ├── lighthouse.config.js # Performance testing
│   └── postcss.config.js    # CSS processing
├── docker/              # Docker configurations
│   └── Dockerfile.dev   # Development container
├── scripts/             # Automation scripts
│   ├── check-links.js   # Link validation
│   ├── dev-info.js      # Project information
│   ├── help.js          # Help system
│   └── optimize-images.js # Image optimization
├── testing/             # Test outputs (generated)
│   ├── lighthouse-reports/
│   ├── accessibility-reports/
│   └── performance-reports/
└── workflows/           # Git workflows
    └── pre-commit       # Pre-commit hooks
```

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+ 
- npm 8+
- Docker (optional, for containerized development)
- Git (recommended)

### Manual Setup Steps

1. **Install dependencies**
   ```bash
   npm install
   npm run case-study:install
   ```

2. **Environment setup**
   ```bash
   npm run setup:env  # Copies .env.example to .env.local
   ```

3. **Git hooks**
   ```bash
   npm run setup:git-hooks  # Installs pre-commit hooks
   ```

4. **Docker (optional)**
   ```bash
   npm run setup:docker  # Prepares Docker environment
   ```

## 🚀 Development Servers

### Standard Development
```bash
# Start both servers
npm run dev
# Portfolio: http://localhost:8000
# Case Study Generator: http://localhost:3000

# Individual servers
npm run serve              # Portfolio only
npm run dev:case-study     # Case study generator only
```

### Docker Development
```bash
# Start all services
npm run docker:dev

# View logs
npm run docker:logs

# Stop services
npm run docker:down

# Clean up
npm run docker:clean
```

## 🧪 Testing & Quality Assurance

### Testing Commands
```bash
npm run test               # All tests
npm run test:accessibility # WCAG compliance
npm run test:performance   # Lighthouse audits
npm run test:links         # Link validation
```

### Quality Checks
```bash
npm run lint               # All linting
npm run lint:js           # JavaScript only
npm run lint:css          # CSS only
npm run format            # Auto-format code
npm run quality           # Complete quality check
```

### Health Monitoring
```bash
npm run health            # Complete health check
npm run health:dependencies # Security audit
npm run health:performance  # Performance audit
```

## 🔧 Build & Optimization

### Production Build
```bash
npm run build:production   # Full production build
npm run predeploy         # Pre-deployment checks
```

### Asset Optimization
```bash
npm run optimize          # All assets
npm run optimize:images   # Images only
npm run optimize:css      # CSS processing
npm run optimize:js       # JavaScript minification
```

## 📊 Performance Targets

Our testing infrastructure enforces these quality standards:

- **Performance Score**: ≥85
- **Accessibility**: ≥95  
- **Best Practices**: ≥90
- **SEO**: ≥80

## 🐳 Docker Services

### Available Services

- **portfolio**: Static portfolio server (port 8000)
- **case-study-generator**: Next.js development server (port 3000) 
- **dev-tools**: Development utilities container
- **lighthouse**: Performance testing (testing profile)
- **axe-testing**: Accessibility testing (testing profile)

### Docker Profiles

```bash
# Development (default)
docker-compose up

# With development tools
docker-compose --profile tools up

# With testing services  
docker-compose --profile testing up
```

## ⚙️ Configuration Files

### ESLint (.eslintrc.json)
- Enforces JavaScript code quality
- Includes accessibility checks
- Browser and Node.js environments
- Custom rules for portfolio code

### Stylelint (.stylelintrc.json)  
- CSS/SCSS linting
- BEM methodology enforcement
- Performance-focused rules
- PostCSS compatibility

### Prettier (.prettierrc)
- Consistent code formatting
- HTML, CSS, JS, JSON, Markdown
- Custom rules per file type

### PostCSS (postcss.config.js)
- CSS processing pipeline
- Autoprefixer for vendor prefixes
- Production optimizations
- PurgeCSS for unused styles

### Lighthouse (lighthouse.config.js)
- Performance budgets
- Accessibility testing  
- SEO requirements
- Custom assertions

## 🔗 Git Workflow

### Pre-commit Hooks
The pre-commit hook automatically runs:
- JavaScript linting (ESLint)
- CSS linting (Stylelint)  
- Code formatting (Prettier)
- HTML validation
- Sensitive data detection
- File size checks
- Quick portfolio tests

### Quality Gates
```bash
# Skip hooks (not recommended)
git commit --no-verify

# Allow main branch commits
ALLOW_MAIN_COMMIT=true git commit
```

## 🛠️ Utility Scripts

### Development Information
```bash
npm run info              # Project status
npm run help             # General help  
npm run help setup       # Setup help
npm run help docker      # Docker help
npm run help troubleshoot # Common issues
```

### Maintenance
```bash
npm run clean            # Clean build files
npm run clean:cache      # Clear caches
npm run clean:modules    # Remove node_modules
npm run deps:check       # Check outdated packages
npm run deps:update      # Update dependencies
```

## 📈 Monitoring & Reports

### Generated Reports
- **Lighthouse**: `infrastructure/testing/lighthouse-reports/`
- **Accessibility**: `infrastructure/testing/accessibility-reports/` 
- **Coverage**: `coverage/`

### Log Locations
- Docker logs: `npm run docker:logs`
- Build logs: Console output
- Test results: Terminal and report files

## 🔍 Troubleshooting

### Common Issues

**Port conflicts:**
```bash
lsof -ti:8000 | xargs kill  # Kill port 8000
PORT=8001 npm run serve     # Use different port
```

**Docker issues:**
```bash
npm run docker:clean        # Clean everything
docker system prune         # Remove unused containers
```

**Dependency issues:**
```bash
npm run clean:modules       # Remove node_modules
npm install                 # Reinstall
```

**Build failures:**
```bash
npm run clean               # Clean build artifacts
npm run setup               # Full setup
```

## 🚨 Important Notes

### Local Development Only
This infrastructure is designed for **local development only**. Staging and production deployments require manual approval and follow the process outlined in `DEPLOYMENT-STRATEGY.md`.

### File Watching
- Next.js has built-in hot reload
- Static files require manual refresh
- Docker containers include file watching

### Resource Usage
- Docker development uses more resources
- Image optimization can be memory-intensive
- Lighthouse testing requires Chrome

## 📚 Additional Documentation

- `../DEPLOYMENT-STRATEGY.md` - Deployment process
- `../PORTFOLIO-AGENT-FRAMEWORK.md` - Architecture overview  
- `../QUICK-START-GUIDE.md` - Getting started
- Individual script files contain inline documentation

## 🆘 Getting Help

```bash
npm run help              # General help system
npm run help [topic]      # Specific topic help
npm run info              # Current project status  
npm run health            # System health check
```

For complex issues, check the troubleshooting guide:
```bash
npm run help troubleshoot
```