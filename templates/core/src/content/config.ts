import { defineCollection } from "astro:content";
import { client } from "../../client";
import { nodePageSchema } from "@lib/schemas/nodePageSchema";
import { nodeArticleWithImageSchema } from "@/lib/schemas/nodeArticleWithImageSchema.ts";

const page = defineCollection({
  loader: async () => {
    const pages: any = await client.getCollection("node--page");
    return pages.map((page: any) => ({
      id: page.id,
      ...page,
    }));
  },
  // TODO - is there a way to derive the schema dynamically?
  schema: nodePageSchema.element,
});

const article = defineCollection({
  loader: async () => {
    const articles: any = await client.getCollection("node--article", {
      queryString: "include=field_image",
    });
    return articles.map((article: any) => ({
      id: article.id,
      ...article,
    }));
  },
  // TODO - is there a way to derive the schema dynamically?
  schema: nodeArticleWithImageSchema.element,
});

export const collections = { page, article };
