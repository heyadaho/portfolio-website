import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/work' }),
  schema: z.object({
    title:    z.string(),
    company:  z.string(),
    year:     z.number(),
    role:     z.string(),
    duration: z.string().optional(),
    summary:  z.string(),
    tags:     z.array(z.string()).optional().default([]),
    featured: z.boolean().optional().default(false),
    order:    z.number().optional().default(99),
    problem:  z.string().optional(),
    approach: z.string().optional(),
    outcome:  z.string().optional(),
  }),
});

export const collections = { work };
