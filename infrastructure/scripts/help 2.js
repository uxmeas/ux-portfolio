#!/usr/bin/env node

/**
 * Help Script for UX Portfolio Development
 * Provides contextual help and troubleshooting
 */

const fs = require('fs');
const path = require('path');

class HelpSystem {
  constructor() {
    this.projectRoot = process.cwd();
  }

  run() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
      this.showGeneralHelp();
    } else {
      this.showSpecificHelp(args[0]);
    }
  }

  showGeneralHelp() {
    console.log('🎨 UX Portfolio - Development Help');
    console.log('==================================\n');
    
    console.log('📖 GENERAL USAGE:');
    console.log('   npm run help [topic]     # Show help for specific topic');
    console.log('   npm run info             # Show development information');
    console.log('');
    
    console.log('🏷️  AVAILABLE HELP TOPICS:');
    console.log('   setup        # Project setup and installation');
    console.log('   development  # Development workflow');
    console.log('   docker       # Docker usage');
    console.log('   testing      # Testing and quality checks');
    console.log('   deployment   # Deployment process');
    console.log('   troubleshoot # Common issues and solutions');
    console.log('   scripts      # Available npm scripts');
    console.log('');
    
    console.log('🚀 QUICK START:');
    console.log('   1. npm run setup         # Setup everything');
    console.log('   2. npm run dev           # Start development');
    console.log('   3. npm run test          # Run quality checks');
    console.log('');
    
    console.log('📞 NEED MORE HELP?');
    console.log('   • Check DEPLOYMENT-STRATEGY.md for deployment info');
    console.log('   • Check PORTFOLIO-AGENT-FRAMEWORK.md for architecture');
    console.log('   • Run npm run info for current project status');
    console.log('');
  }

  showSpecificHelp(topic) {
    const helpMethods = {
      'setup': this.showSetupHelp,
      'development': this.showDevelopmentHelp,
      'docker': this.showDockerHelp,
      'testing': this.showTestingHelp,
      'deployment': this.showDeploymentHelp,
      'troubleshoot': this.showTroubleshootHelp,
      'scripts': this.showScriptsHelp
    };

    const method = helpMethods[topic.toLowerCase()];
    if (method) {
      method.call(this);
    } else {
      console.log(`❌ Unknown help topic: ${topic}`);
      console.log('Available topics: ' + Object.keys(helpMethods).join(', '));
      console.log('Run "npm run help" for general help');
    }
  }

  showSetupHelp() {
    console.log('🔧 PROJECT SETUP HELP');
    console.log('======================\n');
    
    console.log('📋 PREREQUISITES:');
    console.log('   • Node.js 18+ (required)');
    console.log('   • npm 8+ (required)');
    console.log('   • Docker (optional, for containerized development)');
    console.log('   • Git (recommended)');
    console.log('');
    
    console.log('⚡ QUICK SETUP:');
    console.log('   npm run setup            # Complete automated setup');
    console.log('');
    
    console.log('🔨 MANUAL SETUP STEPS:');
    console.log('   1. npm install                    # Install dependencies');
    console.log('   2. npm run case-study:install     # Install case study generator deps');
    console.log('   3. npm run setup:env              # Copy .env.example to .env.local');
    console.log('   4. npm run setup:git-hooks        # Install git hooks');
    console.log('   5. npm run setup:docker           # Setup Docker (optional)');
    console.log('');
    
    console.log('📁 DIRECTORY STRUCTURE:');
    console.log('   • Root: Static portfolio files (index.html, etc.)');
    console.log('   • src/: Components and scripts');
    console.log('   • src/tools/case-study-generator/: Next.js app');
    console.log('   • case-studies/: Generated case study outputs');
    console.log('   • infrastructure/: Development tools and configs');
    console.log('');
    
    console.log('✅ VERIFY SETUP:');
    console.log('   npm run info             # Check project status');
    console.log('   npm run health           # Run health checks');
    console.log('');
  }

  showDevelopmentHelp() {
    console.log('🚀 DEVELOPMENT WORKFLOW HELP');
    console.log('=============================\n');
    
    console.log('🏃 STARTING DEVELOPMENT:');
    console.log('   npm run dev              # Start both servers (recommended)');
    console.log('   npm run serve            # Static portfolio only (port 8000)');
    console.log('   npm run dev:case-study   # Case study generator only (port 3000)');
    console.log('');
    
    console.log('🌐 ACCESS POINTS:');
    console.log('   • Portfolio: http://localhost:8000');
    console.log('   • Case Study Generator: http://localhost:3000');
    console.log('');
    
    console.log('🔄 DEVELOPMENT CYCLE:');
    console.log('   1. Make changes to files');
    console.log('   2. Test locally (automatic reload for Next.js)');
    console.log('   3. Run quality checks: npm run lint');
    console.log('   4. Run tests: npm run test');
    console.log('   5. Commit changes (pre-commit hooks run automatically)');
    console.log('');
    
    console.log('📝 EDITING WORKFLOW:');
    console.log('   • Portfolio: Edit HTML/CSS/JS files directly');
    console.log('   • Case Studies: Use the generator at localhost:3000');
    console.log('   • Components: Edit files in src/components/');
    console.log('   • Styles: Edit CSS files in css/ and src/styles/');
    console.log('');
    
    console.log('🎨 ASSET OPTIMIZATION:');
    console.log('   npm run optimize         # Optimize all assets');
    console.log('   npm run optimize:images  # Optimize images only');
    console.log('   npm run optimize:css     # Process and minify CSS');
    console.log('');
  }

  showDockerHelp() {
    console.log('🐳 DOCKER DEVELOPMENT HELP');
    console.log('===========================\n');
    
    console.log('🚀 DOCKER COMMANDS:');
    console.log('   npm run docker:dev       # Start all services');
    console.log('   npm run docker:down      # Stop all services');
    console.log('   npm run docker:clean     # Clean up everything');
    console.log('   npm run docker:logs      # View logs');
    console.log('');
    
    console.log('📦 AVAILABLE SERVICES:');
    console.log('   • portfolio: Static portfolio server (port 8000)');
    console.log('   • case-study-generator: Next.js app (port 3000)');
    console.log('   • dev-tools: Development utilities');
    console.log('');
    
    console.log('🔧 DEVELOPMENT WITH DOCKER:');
    console.log('   1. npm run setup:docker  # Setup Docker environment');
    console.log('   2. npm run docker:dev    # Start development');
    console.log('   3. Edit files normally   # Changes sync automatically');
    console.log('   4. npm run docker:down   # Stop when done');
    console.log('');
    
    console.log('🧪 TESTING WITH DOCKER:');
    console.log('   npm run docker:testing   # Start testing services');
    console.log('   # Runs Lighthouse and accessibility tests');
    console.log('');
    
    console.log('💡 DOCKER TIPS:');
    console.log('   • Containers include hot reload for development');
    console.log('   • Volume mounts sync your local files');
    console.log('   • Use docker:clean to free up space');
    console.log('   • Check docker:logs if something goes wrong');
    console.log('');
  }

  showTestingHelp() {
    console.log('🧪 TESTING AND QUALITY HELP');
    console.log('============================\n');
    
    console.log('🎯 TESTING COMMANDS:');
    console.log('   npm run test             # Run all tests');
    console.log('   npm run test:portfolio   # Test portfolio functionality');
    console.log('   npm run test:accessibility # Check accessibility');
    console.log('   npm run test:performance # Run Lighthouse tests');
    console.log('   npm run test:links       # Check all links');
    console.log('');
    
    console.log('📊 QUALITY CHECKS:');
    console.log('   npm run lint             # Lint all files');
    console.log('   npm run lint:js          # Lint JavaScript only');
    console.log('   npm run lint:css         # Lint CSS only');
    console.log('   npm run format           # Auto-format code');
    console.log('');
    
    console.log('🏥 HEALTH MONITORING:');
    console.log('   npm run health           # Complete health check');
    console.log('   npm run health:dependencies # Check for security issues');
    console.log('   npm run health:performance  # Performance audit');
    console.log('');
    
    console.log('📈 PERFORMANCE TARGETS:');
    console.log('   • Performance Score: >85');
    console.log('   • Accessibility: >95');
    console.log('   • Best Practices: >90');
    console.log('   • SEO: >80');
    console.log('');
    
    console.log('📋 TEST REPORTS:');
    console.log('   • Lighthouse: infrastructure/testing/lighthouse-reports/');
    console.log('   • Accessibility: infrastructure/testing/accessibility-reports/');
    console.log('   • Coverage: coverage/');
    console.log('');
  }

  showDeploymentHelp() {
    console.log('🚀 DEPLOYMENT HELP');
    console.log('===================\n');
    
    console.log('⚠️  IMPORTANT NOTICE:');
    console.log('   This setup is for LOCAL DEVELOPMENT ONLY!');
    console.log('   Staging/production deployment requires manual approval.');
    console.log('');
    
    console.log('📋 PRE-DEPLOYMENT CHECKLIST:');
    console.log('   npm run predeploy        # Runs quality checks + production build');
    console.log('   npm run build:production # Production build');
    console.log('   npm run test             # All tests must pass');
    console.log('   npm run health           # Health check');
    console.log('');
    
    console.log('📚 DEPLOYMENT DOCUMENTATION:');
    console.log('   • Read DEPLOYMENT-STRATEGY.md for full process');
    console.log('   • Current live URL: https://uxmeas.netlify.app');
    console.log('   • Staging URL: https://staging--uxmeas.netlify.app');
    console.log('');
    
    console.log('🔄 DEPLOYMENT WORKFLOW:');
    console.log('   1. Complete local development and testing');
    console.log('   2. Run npm run predeploy to verify readiness');
    console.log('   3. Request deployment approval');
    console.log('   4. Deploy to staging for review');
    console.log('   5. Deploy to production after approval');
    console.log('');
  }

  showTroubleshootHelp() {
    console.log('🔧 TROUBLESHOOTING GUIDE');
    console.log('=========================\n');
    
    console.log('❌ COMMON ISSUES:');
    console.log('');
    
    console.log('1. "npm install" fails:');
    console.log('   • Check Node.js version (need 18+)');
    console.log('   • Clear npm cache: npm cache clean --force');
    console.log('   • Delete node_modules: npm run clean:modules');
    console.log('   • Run npm install again');
    console.log('');
    
    console.log('2. Case study generator won\'t start:');
    console.log('   • cd src/tools/case-study-generator');
    console.log('   • npm install');
    console.log('   • npm run dev');
    console.log('');
    
    console.log('3. Port already in use:');
    console.log('   • Kill process: lsof -ti:8000 | xargs kill');
    console.log('   • Or use different port: PORT=8001 npm run serve');
    console.log('');
    
    console.log('4. Docker issues:');
    console.log('   • Docker not running: Start Docker Desktop');
    console.log('   • Port conflicts: npm run docker:down first');
    console.log('   • Clean up: npm run docker:clean');
    console.log('');
    
    console.log('5. Tests failing:');
    console.log('   • Lint errors: npm run lint --fix');
    console.log('   • Format issues: npm run format');
    console.log('   • Missing dependencies: npm install');
    console.log('');
    
    console.log('6. Build errors:');
    console.log('   • Clean cache: npm run clean');
    console.log('   • Reinstall: npm run setup');
    console.log('   • Check Node version compatibility');
    console.log('');
    
    console.log('🆘 GETTING MORE HELP:');
    console.log('   • Check project status: npm run info');
    console.log('   • Run health check: npm run health');
    console.log('   • View logs: npm run docker:logs (if using Docker)');
    console.log('');
  }

  showScriptsHelp() {
    console.log('📜 NPM SCRIPTS REFERENCE');
    console.log('=========================\n');
    
    const packagePath = path.join(this.projectRoot, 'package.json');
    
    try {
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      const scripts = packageJson.scripts || {};
      
      const categories = {
        'Development Servers': ['dev', 'serve', 'dev:case-study', 'start:case-study'],
        'Docker Commands': ['docker:dev', 'docker:down', 'docker:clean', 'docker:logs'],
        'Build Commands': ['build', 'build:production', 'optimize'],
        'Testing': ['test', 'test:accessibility', 'test:lighthouse', 'test:links'],
        'Quality Checks': ['lint', 'format', 'quality', 'security:check'],
        'Maintenance': ['clean', 'health', 'setup', 'deps:check']
      };

      Object.entries(categories).forEach(([category, scriptNames]) => {
        console.log(`${category.toUpperCase()}:`);
        scriptNames.forEach(name => {
          if (scripts[name]) {
            // Remove comment lines from script descriptions
            const cleanScript = scripts[name].replace(/^"\/\/.*": "",?\s*/gm, '');
            console.log(`   npm run ${name.padEnd(20)} # ${cleanScript}`);
          }
        });
        console.log('');
      });
      
    } catch (error) {
      console.log('❌ Could not read package.json scripts');
      console.log('Make sure you\'re in the project root directory');
    }
  }
}

// Run if called directly
if (require.main === module) {
  const help = new HelpSystem();
  help.run();
}

module.exports = HelpSystem;