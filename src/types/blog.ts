import { z } from "astro/zod";

const StrongRefSchema = z.object({
  uri: z.string(),
  cid: z.string(),
});

const BlobSchema = z.object({
  $type: z.literal("blob").optional(),
  ref: z.any(),
  mimeType: z.string(),
  size: z.number(),
});

const ContributorSchema = z.object({
  did: z.string(),
  role: z.string().optional(),
  displayName: z.string().optional(),
});

export const BlogRecordSchema = z.object({
  path: z.string().optional(),
  site: z.string(),
  tags: z.array(z.string()).optional(),
  links: z.array(z.any()).optional(),
  title: z.string(),
  labels: z.any().optional(),
  content: z.any().optional(),
  updatedAt: z.string().optional(),
  coverImage: BlobSchema.optional(),
  bskyPostRef: StrongRefSchema.optional(),
  description: z.string().optional(),
  publishedAt: z.string(),
  textContent: z.string().optional(),
  contributors: z.array(ContributorSchema).optional(),
});

export type RawBlogRecord = z.infer<typeof BlogRecordSchema>;

export const BlogOutputSchema = z.object({
  path: z.string().nullable(),
  site: z.string(),
  tags: z.array(z.string()),
  links: z.array(z.any()).nullable(),
  title: z.string(),
  labels: z.any().nullable(),
  content: z.any().nullable(),
  updatedAt: z.date().nullable(),
  coverImage: BlobSchema.nullable(),
  bskyPostRef: StrongRefSchema.nullable(),
  description: z.string().nullable(),
  publishedAt: z.date(),
  textContent: z.string().nullable(),
  contributors: z.array(ContributorSchema),
});

export type CleanedBlog = z.infer<typeof BlogOutputSchema>;

export function transformBlogRecord(value: RawBlogRecord): CleanedBlog {
  return {
    path: value.path ?? null,
    site: value.site,
    tags: value.tags ?? [],
    links: value.links ?? null,
    title: value.title,
    labels: value.labels ?? null,
    content: value.content ?? null,
    updatedAt: value.updatedAt ? new Date(value.updatedAt) : null,
    coverImage: value.coverImage ?? null,
    bskyPostRef: value.bskyPostRef ?? null,
    description: value.description ?? null,
    publishedAt: new Date(value.publishedAt),
    textContent: value.textContent ?? null,
    contributors: value.contributors ?? [],
  };
}
