import { defineCollection, z } from 'astro:content';

// Insights category enum — maps 1:1 to the 5 post types in _copy/uxmeas.com/voice.md.
// Each post declares exactly ONE category (Linear's pattern, not a tag soup).
const CATEGORY = z.enum([
  'Lever',
  'Pattern',
  'Anti-Pattern',
  'Tool & Method',
  'Industry',
]);

const insights = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().max(80),
    subtitle: z.string().max(160).optional(),
    excerpt: z.string().max(220),
    category: CATEGORY,
    publishedAt: z.date(),
    updatedAt: z.date().optional(),
    author: z.string().default('Pheak Meas'),
    readingTime: z.number().optional(),
    coverImage: z.string().optional(),
    coverImageDark: z.string().optional(),
    coverAlt: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { insights };
