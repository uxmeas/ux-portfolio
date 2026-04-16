#!/usr/bin/env node

/**
 * Link Checker for UX Portfolio
 * Validates all internal and external links across HTML files
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { parse } = require('node-html-parser');

class LinkChecker {
  constructor() {
    this.results = {
      internal: { total: 0, valid: 0, invalid: 0, errors: [] },
      external: { total: 0, valid: 0, invalid: 0, errors: [] },
      images: { total: 0, valid: 0, invalid: 0, errors: [] },
      anchors: { total: 0, valid: 0, invalid: 0, errors: [] }
    };
    
    this.checkedUrls = new Map(); // Cache for external URL checks
    this.htmlFiles = [];
    this.baseDir = process.cwd();
  }

  async check() {
    console.log('🔗 Starting link validation...');
    
    try {
      this.findHtmlFiles();
      
      for (const file of this.htmlFiles) {
        await this.checkFile(file);
      }
      
      this.printReport();
    } catch (error) {
      console.error('❌ Link checking failed:', error.message);
      process.exit(1);
    }
  }

  findHtmlFiles() {
    const directories = [
      '.',
      'case-studies',
      'src/components',
      'forms'
    ];

    for (const dir of directories) {
      if (fs.existsSync(dir)) {
        this.findHtmlInDirectory(dir);
      }
    }

    console.log(`📁 Found ${this.htmlFiles.length} HTML files to check`);
  }

  findHtmlInDirectory(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory() && !item.name.startsWith('.')) {
        this.findHtmlInDirectory(fullPath);
      } else if (item.name.endsWith('.html')) {
        this.htmlFiles.push(fullPath);
      }
    }
  }

  async checkFile(filePath) {
    console.log(`🔍 Checking: ${filePath}`);
    
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const root = parse(content);
      
      // Check different types of links
      await this.checkLinks(root, filePath, 'a', 'href', 'internal');
      await this.checkLinks(root, filePath, 'img', 'src', 'images');
      await this.checkLinks(root, filePath, 'link', 'href', 'external');
      await this.checkLinks(root, filePath, 'script', 'src', 'external');
      
      // Check anchor links within the page
      this.checkAnchors(root, filePath);
      
    } catch (error) {
      console.error(`❌ Error checking ${filePath}:`, error.message);
    }
  }

  async checkLinks(root, filePath, tagName, attribute, category) {
    const elements = root.querySelectorAll(`${tagName}[${attribute}]`);
    
    for (const element of elements) {
      const url = element.getAttribute(attribute);
      if (!url) continue;

      if (url.startsWith('#')) {
        this.checkAnchorLink(url, filePath);
      } else if (url.startsWith('http') || url.startsWith('//')) {
        await this.checkExternalLink(url, filePath);
      } else if (url.startsWith('mailto:') || url.startsWith('tel:')) {
        // Skip mailto and tel links
        continue;
      } else {
        this.checkInternalLink(url, filePath, category);
      }
    }
  }

  checkInternalLink(url, filePath, category) {
    this.results[category].total++;
    
    // Handle relative paths
    let targetPath = url;
    if (url.startsWith('./')) {
      targetPath = path.resolve(path.dirname(filePath), url.substring(2));
    } else if (url.startsWith('../')) {
      targetPath = path.resolve(path.dirname(filePath), url);
    } else if (!url.startsWith('/')) {
      targetPath = path.resolve(path.dirname(filePath), url);
    } else {
      targetPath = path.join(this.baseDir, url.substring(1));
    }

    // Remove query parameters and anchors for file existence check
    const cleanPath = targetPath.split('?')[0].split('#')[0];
    
    if (fs.existsSync(cleanPath)) {
      this.results[category].valid++;
    } else {
      this.results[category].invalid++;
      this.results[category].errors.push({
        file: filePath,
        url: url,
        error: 'File not found',
        target: cleanPath
      });
    }
  }

  async checkExternalLink(url, filePath) {
    this.results.external.total++;
    
    // Use cache to avoid checking the same URL multiple times
    if (this.checkedUrls.has(url)) {
      const cached = this.checkedUrls.get(url);
      if (cached.valid) {
        this.results.external.valid++;
      } else {
        this.results.external.invalid++;
        this.results.external.errors.push({
          file: filePath,
          url: url,
          error: cached.error
        });
      }
      return;
    }

    try {
      const isValid = await this.validateUrl(url);
      this.checkedUrls.set(url, { valid: isValid, error: null });
      
      if (isValid) {
        this.results.external.valid++;
      } else {
        this.results.external.invalid++;
        this.results.external.errors.push({
          file: filePath,
          url: url,
          error: 'URL not accessible'
        });
      }
    } catch (error) {
      this.checkedUrls.set(url, { valid: false, error: error.message });
      this.results.external.invalid++;
      this.results.external.errors.push({
        file: filePath,
        url: url,
        error: error.message
      });
    }
  }

  validateUrl(url) {
    return new Promise((resolve) => {
      // Skip social media and known good URLs to speed up checking
      const skipPatterns = [
        'linkedin.com',
        'twitter.com',
        'facebook.com',
        'instagram.com',
        'github.com',
        'fonts.googleapis.com',
        'fonts.gstatic.com'
      ];

      if (skipPatterns.some(pattern => url.includes(pattern))) {
        resolve(true);
        return;
      }

      const client = url.startsWith('https:') ? https : http;
      const timeout = 10000; // 10 second timeout

      const req = client.request(url, { method: 'HEAD', timeout }, (res) => {
        const statusCode = res.statusCode;
        resolve(statusCode >= 200 && statusCode < 400);
      });

      req.on('timeout', () => {
        req.abort();
        resolve(false);
      });

      req.on('error', () => {
        resolve(false);
      });

      req.end();
    });
  }

  checkAnchorLink(anchor, filePath) {
    this.results.anchors.total++;
    
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const root = parse(content);
      
      const targetId = anchor.substring(1); // Remove #
      const target = root.querySelector(`#${targetId}, [name="${targetId}"]`);
      
      if (target) {
        this.results.anchors.valid++;
      } else {
        this.results.anchors.invalid++;
        this.results.anchors.errors.push({
          file: filePath,
          url: anchor,
          error: `Anchor target not found: ${targetId}`
        });
      }
    } catch (error) {
      this.results.anchors.invalid++;
      this.results.anchors.errors.push({
        file: filePath,
        url: anchor,
        error: error.message
      });
    }
  }

  checkAnchors(root, filePath) {
    // This method checks if IDs referenced by anchor links exist
    const anchors = root.querySelectorAll('a[href^="#"]');
    
    for (const anchor of anchors) {
      const href = anchor.getAttribute('href');
      if (href && href !== '#') {
        this.checkAnchorLink(href, filePath);
      }
    }
  }

  printReport() {
    console.log('\n📊 Link Validation Report:');
    console.log('=====================================');
    
    const categories = ['internal', 'external', 'images', 'anchors'];
    let totalValid = 0;
    let totalInvalid = 0;
    
    for (const category of categories) {
      const result = this.results[category];
      totalValid += result.valid;
      totalInvalid += result.invalid;
      
      if (result.total > 0) {
        const percentage = ((result.valid / result.total) * 100).toFixed(1);
        console.log(`\n${category.toUpperCase()} LINKS:`);
        console.log(`  Total: ${result.total}`);
        console.log(`  Valid: ${result.valid} (${percentage}%)`);
        console.log(`  Invalid: ${result.invalid}`);
        
        if (result.errors.length > 0) {
          console.log('  Errors:');
          result.errors.forEach(error => {
            console.log(`    ❌ ${error.file}: ${error.url}`);
            console.log(`       ${error.error}`);
          });
        }
      }
    }
    
    const totalLinks = totalValid + totalInvalid;
    const overallPercentage = totalLinks > 0 ? ((totalValid / totalLinks) * 100).toFixed(1) : 100;
    
    console.log('\n=====================================');
    console.log(`OVERALL: ${totalValid}/${totalLinks} links valid (${overallPercentage}%)`);
    
    if (totalInvalid === 0) {
      console.log('🎉 All links are valid!');
      process.exit(0);
    } else {
      console.log(`⚠️  ${totalInvalid} invalid links found.`);
      process.exit(1);
    }
  }
}

// Run if called directly
if (require.main === module) {
  const checker = new LinkChecker();
  checker.check();
}

module.exports = LinkChecker;