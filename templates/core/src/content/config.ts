import { defineCollection } from "astro:content";
import { drupalLoader } from "@/lib/loader";
import { nodePageSchema } from "@lib/schemas/nodePageSchema";
import { nodeArticleWithImageSchema } from "@/lib/schemas/nodeArticleWithImageSchema.ts";

const page = defineCollection({
  loader: drupalLoader({
    type: "node--page",
  }),
  schema: nodePageSchema.element,
});

const article = defineCollection({
  loader: drupalLoader({
    type: "node--article",
    queryString: "include=field_image",
  }),
  schema: nodeArticleWithImageSchema.element,
});

export const collections = { page, article };
