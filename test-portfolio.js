#!/usr/bin/env node

/**
 * Portfolio Testing Script
 * Run with: node test-portfolio.js
 */

const { chromium } = require('@playwright/test');

async function testPortfolio() {
  console.log('🚀 Starting portfolio tests...\n');
  
  const browser = await chromium.launch({ headless: false });
  
  try {
    // Test 1: Desktop View
    console.log('📱 Test 1: Desktop View');
    const desktop = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    const desktopPage = await desktop.newPage();
    await desktopPage.goto('http://localhost:8000');
    await desktopPage.waitForTimeout(3000); // Wait for animations
    await desktopPage.screenshot({ path: 'screenshots/desktop.png' });
    console.log('✅ Desktop screenshot saved\n');

    // Test 2: Mobile View (iPhone 14)
    console.log('📱 Test 2: Mobile View (iPhone 14)');
    const mobile = await browser.newContext({
      viewport: { width: 390, height: 844 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15'
    });
    const mobilePage = await mobile.newPage();
    await mobilePage.goto('http://localhost:8000');
    await mobilePage.waitForTimeout(2000);
    await mobilePage.screenshot({ path: 'screenshots/mobile.png' });
    console.log('✅ Mobile screenshot saved\n');

    // Test 3: Click AKM Secure Card
    console.log('🖱️ Test 3: Testing AKM Secure Modal');
    await desktopPage.goto('http://localhost:8000');
    await desktopPage.waitForTimeout(2000);
    
    // Scroll to portfolio section
    await desktopPage.evaluate(() => {
      document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
    });
    await desktopPage.waitForTimeout(1000);
    
    // Click AKM Secure (Best) card
    const akmCard = await desktopPage.locator('text=AKM Secure (Best)').first();
    await akmCard.click();
    console.log('✅ Clicked AKM Secure card');
    
    // Wait for modal
    await desktopPage.waitForTimeout(1000);
    await desktopPage.screenshot({ path: 'screenshots/akm-modal.png' });
    console.log('✅ Modal screenshot saved');
    
    // Close modal with ESC
    await desktopPage.keyboard.press('Escape');
    await desktopPage.waitForTimeout(500);
    
    const modalHidden = await desktopPage.locator('#case-study-modal.hidden').count() > 0;
    console.log(modalHidden ? '✅ Modal closed successfully\n' : '❌ Modal still open\n');

    // Test 4: Performance Check
    console.log('⚡ Test 4: Animation Performance');
    const metrics = await desktopPage.evaluate(() => {
      return new Promise((resolve) => {
        let frames = 0;
        let lastTime = performance.now();
        const results = [];
        
        function measureFPS() {
          frames++;
          const currentTime = performance.now();
          const delta = currentTime - lastTime;
          
          if (delta >= 1000) {
            results.push(frames);
            frames = 0;
            lastTime = currentTime;
          }
          
          if (results.length < 5) {
            requestAnimationFrame(measureFPS);
          } else {
            const avgFPS = results.reduce((a, b) => a + b, 0) / results.length;
            resolve({ avgFPS, measurements: results });
          }
        }
        
        requestAnimationFrame(measureFPS);
      });
    });
    
    console.log(`✅ Average FPS: ${metrics.avgFPS.toFixed(1)}`);
    console.log(`   Measurements: ${metrics.measurements.join(', ')} fps\n`);

    console.log('🎉 All tests completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
}

// Run tests
testPortfolio().catch(console.error);