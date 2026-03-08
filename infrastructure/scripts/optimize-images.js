#!/usr/bin/env node

/**
 * Image Optimization Script for UX Portfolio
 * Compresses and optimizes images for web delivery
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const CONFIG = {
  inputDirs: [
    'images/',
    'public/assets/',
    'case-studies/*/images/',
  ],
  outputDir: 'dist/images/',
  formats: ['webp', 'jpeg', 'png'],
  quality: {
    jpeg: 85,
    webp: 80,
    png: 90
  },
  sizes: [
    { width: 1920, suffix: '-xl' },
    { width: 1200, suffix: '-lg' },
    { width: 768, suffix: '-md' },
    { width: 480, suffix: '-sm' }
  ],
  excludePatterns: [
    /\.svg$/,
    /favicon/i,
    /logo/i
  ]
};

class ImageOptimizer {
  constructor() {
    this.processedCount = 0;
    this.savedBytes = 0;
    this.errors = [];
  }

  async optimize() {
    console.log('🖼️  Starting image optimization...');
    
    try {
      // Ensure output directory exists
      this.ensureDir(CONFIG.outputDir);

      // Process each input directory
      for (const inputPattern of CONFIG.inputDirs) {
        await this.processDirectory(inputPattern);
      }

      this.printSummary();
    } catch (error) {
      console.error('❌ Optimization failed:', error.message);
      process.exit(1);
    }
  }

  async processDirectory(pattern) {
    const dirs = this.expandGlobPattern(pattern);
    
    for (const dir of dirs) {
      if (!fs.existsSync(dir)) {
        console.log(`⚠️  Directory not found: ${dir}`);
        continue;
      }

      const files = await this.getImageFiles(dir);
      
      for (const file of files) {
        try {
          await this.processImage(file, dir);
        } catch (error) {
          this.errors.push({ file, error: error.message });
          console.error(`❌ Failed to process ${file}:`, error.message);
        }
      }
    }
  }

  expandGlobPattern(pattern) {
    if (pattern.includes('*')) {
      const basePath = pattern.split('*')[0];
      const suffix = pattern.split('*')[1] || '';
      
      try {
        return fs.readdirSync('.')
          .filter(item => fs.statSync(item).isDirectory())
          .map(dir => basePath.replace('*', dir) + suffix)
          .filter(path => fs.existsSync(path));
      } catch {
        return [];
      }
    }
    return [pattern];
  }

  async getImageFiles(dir) {
    const files = fs.readdirSync(dir);
    return files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      const isImage = ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
      const isExcluded = CONFIG.excludePatterns.some(pattern => pattern.test(file));
      return isImage && !isExcluded;
    });
  }

  async processImage(filename, sourceDir) {
    const inputPath = path.join(sourceDir, filename);
    const originalSize = fs.statSync(inputPath).size;
    
    console.log(`🔄 Processing: ${inputPath}`);

    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Generate responsive sizes and formats
    for (const size of CONFIG.sizes) {
      // Skip if image is smaller than target size
      if (metadata.width <= size.width) continue;

      for (const format of CONFIG.formats) {
        const outputFilename = this.generateFilename(filename, size.suffix, format);
        const outputPath = path.join(CONFIG.outputDir, outputFilename);
        
        await this.resizeAndOptimize(image, outputPath, size.width, format);
        
        const newSize = fs.statSync(outputPath).size;
        this.savedBytes += Math.max(0, originalSize - newSize);
        this.processedCount++;
      }
    }

    // Also create optimized version at original size
    for (const format of CONFIG.formats) {
      const outputFilename = this.generateFilename(filename, '', format);
      const outputPath = path.join(CONFIG.outputDir, outputFilename);
      
      await this.resizeAndOptimize(image, outputPath, metadata.width, format);
    }
  }

  async resizeAndOptimize(image, outputPath, width, format) {
    this.ensureDir(path.dirname(outputPath));

    let pipeline = image.clone().resize(width, null, {
      withoutEnlargement: true,
      fit: 'inside'
    });

    switch (format) {
      case 'webp':
        pipeline = pipeline.webp({ 
          quality: CONFIG.quality.webp,
          effort: 6
        });
        break;
      case 'jpeg':
        pipeline = pipeline.jpeg({ 
          quality: CONFIG.quality.jpeg,
          progressive: true,
          mozjpeg: true
        });
        break;
      case 'png':
        pipeline = pipeline.png({ 
          quality: CONFIG.quality.png,
          compressionLevel: 9,
          progressive: true
        });
        break;
    }

    await pipeline.toFile(outputPath);
  }

  generateFilename(originalFilename, suffix, format) {
    const name = path.parse(originalFilename).name;
    return `${name}${suffix}.${format}`;
  }

  ensureDir(dir) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  printSummary() {
    console.log('\n📊 Optimization Summary:');
    console.log(`✅ Images processed: ${this.processedCount}`);
    console.log(`💾 Bytes saved: ${this.formatBytes(this.savedBytes)}`);
    
    if (this.errors.length > 0) {
      console.log(`❌ Errors: ${this.errors.length}`);
      this.errors.forEach(({ file, error }) => {
        console.log(`   - ${file}: ${error}`);
      });
    }
    
    console.log('\n🎉 Image optimization complete!');
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

// Run if called directly
if (require.main === module) {
  const optimizer = new ImageOptimizer();
  optimizer.optimize().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = ImageOptimizer;