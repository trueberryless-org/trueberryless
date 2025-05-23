import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

export const collections = {
  work: defineCollection({
    // Load Markdown files in the src/content/work directory.
    loader: glob({ base: "./src/content/work", pattern: "**/*.{md,mdx}" }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.coerce.date(),
      tags: z.array(z.string()),
      img: z.string(),
      img_alt: z.string().optional(),
    }),
  }),
  username: defineCollection({
    // Load Markdown file 'username.md' in the src/content/username directory.
    loader: glob({ base: "./src/content/username", pattern: "username.md" }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
      img: z.string(),
      img_alt: z.string().optional(),
    }),
  }),
};
