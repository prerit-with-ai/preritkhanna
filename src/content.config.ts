import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const errands = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/errands' }),
  schema: z.object({
    title: z.string(),
    started: z.date(),
    status: z.enum(['cooking', 'live', 'shipped', 'abandoned', 'paused']),
    tagline: z.string(),
    threads: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    looking_for: z.string().optional(),
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url(),
        })
      )
      .optional(),
    updates: z
      .array(
        z.object({
          date: z.date(),
          note: z.string(),
        })
      )
      .optional(),
  }),
});

const essays = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/essays' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    last_updated: z.date().optional(),
    status: z.enum(['draft', 'published']),
    dek: z.string().optional(),
    threads: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const threads = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/threads' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    started: z.date(),
    status: z.enum(['active', 'dormant', 'closed']),
    related: z.array(z.string()).optional(),
  }),
});

export const collections = { errands, essays, threads };
