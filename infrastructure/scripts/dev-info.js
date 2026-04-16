#!/usr/bin/env node

/**
 * Development Information Script
 * Displays current project status and development information
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class DevInfo {
  constructor() {
    this.projectRoot = process.cwd();
    this.packageJson = this.loadPackageJson();
  }

  run() {
    this.printHeader();
    this.printProjectInfo();
    this.printEnvironmentInfo();
    this.printDevelopmentServers();
    this.printFileStructure();
    this.printAvailableScripts();
    this.printGitStatus();
    this.printQuickCommands();
  }

  printHeader() {
    console.log('🎨 UX Portfolio - Development Information');
    console.log('==========================================\n');
  }

  printProjectInfo() {
    console.log('📁 PROJECT INFORMATION:');
    console.log(`   Name: ${this.packageJson.name}`);
    console.log(`   Version: ${this.packageJson.version}`);
    console.log(`   Description: ${this.packageJson.description}`);
    console.log(`   Root: ${this.projectRoot}`);
    console.log(`   Node Version: ${process.version}`);
    console.log('');
  }

  printEnvironmentInfo() {
    console.log('🌍 ENVIRONMENT:');
    console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
    console.log(`   Platform: ${process.platform}`);
    console.log(`   Architecture: ${process.arch}`);
    
    // Check if Docker is available
    try {
      execSync('docker --version', { stdio: 'ignore' });
      console.log('   Docker: ✅ Available');
    } catch {
      console.log('   Docker: ❌ Not available');
    }
    
    console.log('');
  }

  printDevelopmentServers() {
    console.log('🚀 DEVELOPMENT SERVERS:');
    console.log('   Static Portfolio: http://localhost:8000');
    console.log('   Case Study Generator: http://localhost:3000');
    console.log('   Docker Portfolio: http://localhost:8000 (with Docker)');
    console.log('   Docker Next.js: http://localhost:3000 (with Docker)');
    console.log('');
  }

  printFileStructure() {
    console.log('📂 KEY DIRECTORIES:');
    
    const keyDirs = [
      { path: 'src/', desc: 'Source code and components' },
      { path: 'src/tools/case-study-generator/', desc: 'Next.js case study tool' },
      { path: 'case-studies/', desc: 'Generated case study outputs' },
      { path: 'infrastructure/', desc: 'Development infrastructure' },
      { path: 'images/', desc: 'Static images and assets' },
      { path: 'public/', desc: 'Public assets and resume' },
      { path: 'css/', desc: 'Stylesheets' }
    ];

    keyDirs.forEach(({ path: dirPath, desc }) => {
      const fullPath = path.join(this.projectRoot, dirPath);
      const exists = fs.existsSync(fullPath);
      const status = exists ? '✅' : '❌';
      console.log(`   ${status} ${dirPath} - ${desc}`);
    });
    
    console.log('');
  }

  printAvailableScripts() {
    console.log('⚡ AVAILABLE SCRIPTS:');
    
    const scriptCategories = [
      {
        title: 'Development',
        scripts: ['dev', 'serve', 'dev:case-study', 'docker:dev']
      },
      {
        title: 'Building',
        scripts: ['build', 'build:production', 'optimize']
      },
      {
        title: 'Testing',
        scripts: ['test', 'test:accessibility', 'test:lighthouse', 'test:links']
      },
      {
        title: 'Maintenance',
        scripts: ['clean', 'health', 'setup', 'lint', 'format']
      }
    ];

    scriptCategories.forEach(({ title, scripts }) => {
      console.log(`\n   ${title}:`);
      scripts.forEach(script => {
        if (this.packageJson.scripts && this.packageJson.scripts[script]) {
          console.log(`     npm run ${script}`);
        }
      });
    });
    
    console.log('');
  }

  printGitStatus() {
    console.log('🔧 GIT STATUS:');
    
    try {
      // Check if we're in a git repo
      execSync('git rev-parse --git-dir', { stdio: 'ignore' });
      
      const branch = execSync('git symbolic-ref --short HEAD', { encoding: 'utf8' }).trim();
      console.log(`   Current Branch: ${branch}`);
      
      const status = execSync('git status --porcelain', { encoding: 'utf8' });
      if (status.trim()) {
        console.log('   Working Directory: 🔄 Changes detected');
        const lines = status.trim().split('\n');
        console.log(`   Modified Files: ${lines.length}`);
      } else {
        console.log('   Working Directory: ✅ Clean');
      }
      
      // Check for pre-commit hook
      const hookPath = path.join(this.projectRoot, '.git/hooks/pre-commit');
      const hookExists = fs.existsSync(hookPath);
      console.log(`   Pre-commit Hook: ${hookExists ? '✅' : '❌'} ${hookExists ? 'Installed' : 'Not installed'}`);
      
    } catch {
      console.log('   Status: ❌ Not a git repository');
    }
    
    console.log('');
  }

  printQuickCommands() {
    console.log('🚀 QUICK START COMMANDS:');
    console.log('   Start Development:');
    console.log('     npm run dev              # Start both servers');
    console.log('     npm run docker:dev       # Start with Docker');
    console.log('');
    console.log('   Setup Project:');
    console.log('     npm run setup            # Complete project setup');
    console.log('     npm run setup:docker     # Setup Docker environment');
    console.log('');
    console.log('   Quality Checks:');
    console.log('     npm run test             # Run all tests');
    console.log('     npm run lint             # Lint all files');
    console.log('     npm run health           # Health check');
    console.log('');
    console.log('   Utilities:');
    console.log('     npm run clean            # Clean build artifacts');
    console.log('     npm run help             # Show help information');
    console.log('     npm run info             # Show this information');
    console.log('');
  }

  loadPackageJson() {
    try {
      const packagePath = path.join(this.projectRoot, 'package.json');
      const content = fs.readFileSync(packagePath, 'utf8');
      return JSON.parse(content);
    } catch {
      return { name: 'unknown', version: '0.0.0', description: 'No package.json found' };
    }
  }
}

// Run if called directly
if (require.main === module) {
  const info = new DevInfo();
  info.run();
}

module.exports = DevInfo;