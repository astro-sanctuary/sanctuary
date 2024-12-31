import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getSettings } from "@lib/settings";

const settings = await getSettings();

export async function GET(context) {
  const posts = await getCollection("blog");
  return rss({
    title: settings.sanctuarySiteTitle,
    description: settings.sanctuarySiteDescription,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/blog/${post.slug}/`,
    })),
  });
}
