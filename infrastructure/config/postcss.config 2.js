// PostCSS Configuration for UX Portfolio
// Handles CSS processing, optimization, and vendor prefixing

const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: [
    // Import resolution
    require('postcss-import')({
      path: [
        path.join(__dirname, '../../css'),
        path.join(__dirname, '../../src/styles'),
        path.join(__dirname, '../../node_modules')
      ]
    }),

    // CSS nesting support
    require('postcss-nesting'),

    // Custom properties (CSS variables) support
    require('postcss-custom-properties')({
      preserve: true
    }),

    // Color function support
    require('postcss-color-function'),

    // Autoprefixer for vendor prefixes
    require('autoprefixer')({
      grid: true,
      flexbox: true
    }),

    // Production optimizations
    ...(isProduction ? [
      // Remove unused CSS
      require('@fullhuman/postcss-purgecss')({
        content: [
          '../../*.html',
          '../../src/**/*.html',
          '../../src/**/*.js',
          '../../case-studies/**/*.html'
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: [
          // Preserve dynamic classes
          /^modal-/,
          /^portfolio-/,
          /^case-study-/,
          'active',
          'open',
          'closed',
          'loading',
          'error',
          'success'
        ]
      }),

      // Minify CSS
      require('cssnano')({
        preset: ['default', {
          discardComments: {
            removeAll: true
          },
          normalizeWhitespace: true,
          colormin: true,
          convertValues: true,
          reduceIdents: false, // Preserve animation names
          zindex: false // Don't optimize z-index values
        }]
      })
    ] : []),

    // Development helpers
    ...(!isProduction ? [
      // CSS syntax checker
      require('postcss-syntax-check')
    ] : [])
  ],

  // Source map configuration
  map: !isProduction ? {
    inline: false,
    annotation: true,
    sourcesContent: true
  } : false
};