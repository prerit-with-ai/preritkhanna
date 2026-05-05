import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const errands = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/errands' }),
  schema: z.object({
    title: z.string(),
    started: z.date(),
    status: z.enum(['cooking', 'live', 'shipped', 'abandoned', 'paused']),
    tagline: z.string(),
    tags: z.array(z.string()).optional(),
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

export const collections = { errands };
