import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const now = new Date();
  const posts = (await getCollection('insights'))
    .filter((p) => !p.data.draft && p.data.publishedAt <= now)
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());

  return rss({
    title: 'UX Meas Insights',
    description: 'Essays on product design, fintech UX, design systems, and AI-native interfaces from 18 years shipping.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishedAt,
      description: post.data.excerpt,
      link: `/insights/${post.slug}/`,
      categories: [post.data.category],
      author: post.data.author,
    })),
    customData: '<language>en-ca</language>',
  });
}
