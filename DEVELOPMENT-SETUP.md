# UX Portfolio - Development Setup Guide

Complete guide for setting up the UX Portfolio local development environment.

## 🎯 Overview

This portfolio combines:
- **Static Portfolio**: HTML/CSS/JS files served at port 8000
- **Case Study Generator**: Next.js app at port 3000
- **Complete DevOps**: Docker, testing, optimization, and quality tools

## ⚡ Quick Start (5 minutes)

```bash
# 1. Clone and navigate to project
cd /path/to/ux-portfolio

# 2. Complete setup (installs everything)
npm run setup

# 3. Start development
npm run dev

# 4. Open in browser
# Portfolio: http://localhost:8000
# Case Study Generator: http://localhost:3000
```

## 📋 Prerequisites

### Required
- **Node.js 18+** ([Download](https://nodejs.org/))
- **npm 8+** (comes with Node.js)

### Optional
- **Docker Desktop** (for containerized development)
- **Git** (for version control and hooks)

### Verification
```bash
node --version    # Should be 18.0.0 or higher
npm --version     # Should be 8.0.0 or higher
docker --version  # Optional: Docker 20.0.0 or higher
```

## 🛠️ Setup Options

### Option 1: Automated Setup (Recommended)
```bash
npm run setup
```
This runs:
- Dependency installation
- Environment configuration  
- Git hooks setup
- Verification checks

### Option 2: Manual Setup
```bash
# Install main dependencies
npm install

# Install case study generator dependencies
npm run case-study:install

# Setup environment file
npm run setup:env

# Install git hooks
npm run setup:git-hooks

# Verify setup
npm run info
```

### Option 3: Docker Setup
```bash
# Setup Docker environment
npm run setup:docker

# Start with Docker
npm run docker:dev
```

## 🚀 Development Modes

### Standard Development
```bash
# Start both servers (recommended)
npm run dev

# Individual servers
npm run serve              # Static portfolio only (port 8000)
npm run dev:case-study     # Next.js only (port 3000)
```

### Docker Development
```bash
# Start all services
npm run docker:dev

# Start with tools
npm run docker:tools

# Start with testing
npm run docker:testing

# View logs
npm run docker:logs

# Stop everything
npm run docker:down
```

## 📂 Project Structure

```
ux-portfolio/
├── index.html                    # Main portfolio page
├── case-studies/                 # Generated case studies
├── src/
│   ├── components/               # Reusable components
│   ├── scripts/                  # JavaScript files
│   ├── styles/                   # CSS files
│   └── tools/
│       └── case-study-generator/ # Next.js app
├── infrastructure/               # Development tools
│   ├── config/                   # Linting, formatting configs
│   ├── docker/                   # Docker files
│   ├── scripts/                  # Utility scripts
│   └── workflows/                # Git hooks
├── css/                          # Main stylesheets
├── images/                       # Static assets
├── public/                       # Public files
└── package.json                  # Project configuration
```

## 🧪 Testing & Quality

### Run All Tests
```bash
npm run test              # Complete test suite
npm run test:headless     # Headless browser tests
```

### Specific Tests
```bash
npm run test:accessibility    # WCAG compliance
npm run test:performance     # Lighthouse audits  
npm run test:links          # Link validation
npm run test:html           # HTML validation
```

### Code Quality
```bash
npm run lint              # All linting
npm run lint:js          # JavaScript
npm run lint:css         # CSS
npm run format           # Auto-format
npm run quality          # Complete quality check
```

### Health Monitoring
```bash
npm run health           # System health
npm run health:dependencies # Security audit
npm run health:performance  # Performance check
```

## ⚙️ Configuration

### Environment Variables
Copy `.env.example` to `.env.local` and customize:

```bash
# Development settings
NODE_ENV=development
PORT=8000
NEXTJS_PORT=3000

# Feature flags
ENABLE_CASE_STUDY_GENERATOR=true
ENABLE_DARK_MODE=false
ENABLE_ANIMATIONS=true

# Performance settings
ENABLE_IMAGE_OPTIMIZATION=true
IMAGE_QUALITY=85
```

### Quality Standards
Our tools enforce these standards:
- **Performance**: ≥85 score
- **Accessibility**: ≥95 score  
- **Best Practices**: ≥90 score
- **SEO**: ≥80 score

## 🔧 Build & Optimization

### Development Build
```bash
npm run build             # Standard build
npm run watch             # Watch for changes
```

### Production Build  
```bash
npm run build:production  # Optimized production build
npm run predeploy        # Pre-deployment checks
```

### Asset Optimization
```bash
npm run optimize         # All assets
npm run optimize:images  # Images only
npm run optimize:css     # CSS processing
npm run optimize:js      # JavaScript minification
```

## 🐳 Docker Details

### Services
- **portfolio**: Static server (port 8000)
- **case-study-generator**: Next.js (port 3000)
- **dev-tools**: Utilities container
- **lighthouse**: Performance testing  
- **axe-testing**: Accessibility testing

### Commands
```bash
# Development
npm run docker:dev         # Start development
npm run docker:dev:detached # Start in background

# Management  
npm run docker:down        # Stop services
npm run docker:clean       # Clean up everything
npm run docker:logs        # View logs

# Testing
npm run docker:testing     # Start testing services
```

## 🔗 Git Workflow

### Pre-commit Hooks
Automatically run on `git commit`:
- JavaScript linting (ESLint)
- CSS linting (Stylelint)
- Code formatting (Prettier)  
- HTML validation
- Security checks
- File size validation

### Override Hooks (Not Recommended)
```bash
git commit --no-verify     # Skip all hooks
ALLOW_MAIN_COMMIT=true git commit # Allow main branch commits
```

## 📊 Monitoring & Reports

### Generated Reports
- **Lighthouse**: `infrastructure/testing/lighthouse-reports/`
- **Accessibility**: `infrastructure/testing/accessibility-reports/`
- **Link Check**: Console output with details

### Live Monitoring
```bash
npm run info              # Project status
npm run docker:logs       # Docker logs
```

## 🛠️ Utility Commands

### Information
```bash
npm run info              # Project status
npm run help             # Help system
npm run help [topic]     # Specific help
```

### Maintenance
```bash
npm run clean            # Clean build artifacts
npm run clean:cache      # Clear caches  
npm run clean:modules    # Remove node_modules
npm run deps:check       # Check outdated packages
npm run deps:update      # Update dependencies
```

## ❌ Troubleshooting

### Common Issues

**1. Dependencies won't install**
```bash
# Clear everything and retry
npm run clean:modules
npm cache clean --force
npm install
```

**2. Ports already in use**
```bash
# Kill processes on ports
lsof -ti:8000 | xargs kill
lsof -ti:3000 | xargs kill

# Or use different ports
PORT=8001 npm run serve
```

**3. Case study generator won't start**
```bash
# Navigate and install dependencies
cd src/tools/case-study-generator
npm install
npm run dev
```

**4. Docker issues**
```bash
# Clean Docker environment
npm run docker:clean
docker system prune

# Restart Docker Desktop and retry
npm run docker:dev
```

**5. Tests failing**
```bash
# Fix common issues
npm run lint --fix
npm run format
npm run clean
npm run setup
```

**6. Build errors**
```bash
# Complete clean rebuild
npm run clean:all
npm run setup
npm run build
```

### Getting More Help
```bash
npm run help troubleshoot  # Detailed troubleshooting guide
npm run health            # System health check
npm run info              # Current status
```

## 🚨 Important Notes

### Local Development Only
This setup is for **local development only**. Staging and production deployments require manual approval following the process in `DEPLOYMENT-STRATEGY.md`.

### File Watching
- Next.js files auto-reload in browser
- Static HTML/CSS files require manual refresh
- Docker containers include file watching

### Performance
- First startup may take 2-3 minutes (dependency installation)
- Image optimization is memory-intensive  
- Lighthouse testing requires available Chrome/Chromium

## 📚 Additional Resources

- **Architecture**: `PORTFOLIO-AGENT-FRAMEWORK.md`
- **Deployment**: `DEPLOYMENT-STRATEGY.md`  
- **Infrastructure**: `infrastructure/README.md`
- **Scripts Help**: `npm run help scripts`

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] `npm run info` shows project status
- [ ] `npm run dev` starts both servers
- [ ] Portfolio loads at http://localhost:8000
- [ ] Case study generator loads at http://localhost:3000
- [ ] `npm run test` passes all tests
- [ ] `npm run lint` shows no errors
- [ ] Git pre-commit hooks are installed
- [ ] Docker setup works (if using): `npm run docker:dev`

## 🎉 You're Ready!

Your UX Portfolio development environment is now set up with:
- ✅ Hot reloading development servers
- ✅ Automated testing and quality checks
- ✅ Docker containerization (optional)
- ✅ Pre-commit hooks and workflows  
- ✅ Asset optimization pipeline
- ✅ Comprehensive monitoring and help system

Start coding with `npm run dev` and access the help system anytime with `npm run help`!