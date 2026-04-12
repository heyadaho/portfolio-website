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
    image:    z.string().optional(),
  }),
});

const ai = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/ai' }),
  schema: z.object({
    title:    z.string(),
    company:  z.string().optional(),
    year:     z.number().optional(),
    role:     z.string().optional(),
    duration: z.string().optional(),
    summary:  z.string(),
    tags:     z.array(z.string()).optional().default([]),
    order:    z.number().optional().default(99),
    problem:  z.string().optional(),
    approach: z.string().optional(),
    outcome:  z.string().optional(),
    image:          z.string().optional(),
    workInProgress: z.boolean().optional().default(false),
    heroImages:     z.array(z.object({ src: z.string(), caption: z.string().optional() })).optional(),
  }),
});

export const collections = { work, ai };
