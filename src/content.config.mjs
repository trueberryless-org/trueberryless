import { defineCollection, z } from 'astro:content'

import { glob } from 'astro/loaders'

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      cover: z.object({
        alt: z.string(),
        image: image(),
      }),
      link: z.string().optional(),
    }),
})

const special = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/special' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      cover: z.object({
        alt: z.string(),
        image: image(),
      }),
    }),
})

export const collections = { projects, special }
