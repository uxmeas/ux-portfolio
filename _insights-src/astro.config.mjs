import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// uxmeas.com /insights/* — builds into ../insights/ at repo root.
// CF Pages serves the repo root statically; no Astro runtime needed in cloud.
export default defineConfig({
  site: 'https://uxmeas.com',
  base: '/insights',
  trailingSlash: 'always',
  outDir: '../insights',
  build: {
    format: 'directory',
    assets: '_assets',
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/_'),
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
