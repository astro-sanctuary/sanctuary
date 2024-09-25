import { defineCollection } from "astro:content";
import { client } from "../../client";
import { nodeArticleWithImageSchema } from "@/lib/schemas/nodeArticleWithImageSchema.ts";

const articles = defineCollection({
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

export const collections = { articles };
