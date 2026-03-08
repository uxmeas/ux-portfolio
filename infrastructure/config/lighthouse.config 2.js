// Lighthouse CI Configuration
// Performance, accessibility, and best practices testing

module.exports = {
  ci: {
    collect: {
      // URLs to test
      url: [
        'http://localhost:8000',
        'http://localhost:8000/akm-case-study.html',
        'http://localhost:8000/case-studies/akm-secure/akm-secure-hiring.html',
        'http://localhost:8000/case-studies/katipult/katipult-hiring.html',
        'http://localhost:8000/case-studies/mypick/mypick-hiring.html'
      ],
      
      // Collection settings
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--headless --no-sandbox --disable-gpu',
        preset: 'desktop',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0
        },
        // Disable certain audits for local development
        skipAudits: [
          'canonical',
          'robots-txt',
          'hreflang'
        ]
      }
    },

    assert: {
      // Performance thresholds
      assertions: {
        'categories:performance': ['error', {minScore: 0.85}],
        'categories:accessibility': ['error', {minScore: 0.95}],
        'categories:best-practices': ['error', {minScore: 0.90}],
        'categories:seo': ['error', {minScore: 0.80}],

        // Specific metric thresholds
        'first-contentful-paint': ['error', {maxNumericValue: 2000}],
        'largest-contentful-paint': ['error', {maxNumericValue: 2500}],
        'cumulative-layout-shift': ['error', {maxNumericValue: 0.1}],
        'total-blocking-time': ['error', {maxNumericValue: 300}],

        // Accessibility requirements
        'color-contrast': 'error',
        'image-alt': 'error',
        'label': 'error',
        'link-name': 'error',
        'button-name': 'error',

        // Best practices
        'uses-https': 'warn', // Warning for local development
        'is-on-https': 'warn',
        'external-anchors-use-rel-noopener': 'error',
        'no-vulnerable-libraries': 'error',

        // SEO requirements
        'meta-description': 'error',
        'document-title': 'error',
        'html-has-lang': 'error',
        'meta-viewport': 'error'
      }
    },

    upload: {
      // Local report generation
      target: 'filesystem',
      outputDir: './infrastructure/testing/lighthouse-reports',
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%'
    },

    server: {
      // Server configuration for testing
      command: 'npm run serve:portfolio',
      port: 8000,
      timeout: 30000
    }
  },

  // Budget configuration
  budgets: [
    {
      path: '/*',
      resourceSizes: [
        {
          resourceType: 'total',
          budget: 1024
        },
        {
          resourceType: 'script',
          budget: 300
        },
        {
          resourceType: 'stylesheet',
          budget: 100
        },
        {
          resourceType: 'image',
          budget: 400
        },
        {
          resourceType: 'font',
          budget: 100
        }
      ],
      resourceCounts: [
        {
          resourceType: 'total',
          budget: 50
        },
        {
          resourceType: 'script',
          budget: 10
        },
        {
          resourceType: 'stylesheet',
          budget: 5
        },
        {
          resourceType: 'image',
          budget: 20
        }
      ]
    }
  ]
};