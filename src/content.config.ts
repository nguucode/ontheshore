import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    role: z.string(),
    year: z.string(),
    client: z.string().optional(),
    summary: z.string(),
    cover: z.string().optional(), // đường dẫn ảnh trong public/, bỏ trống thì hiện placeholder
    order: z.number().default(99),
    draft: z.boolean().default(false),
  }),
});

const articles = defineCollection({
  loader: glob({ base: "./src/content/articles", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, articles };
