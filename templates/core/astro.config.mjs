import { loadEnv } from "vite";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import node from "@astrojs/node";
import sanctuaryToolbar from "sanctuary-toolbar";
const { IMAGE_DOMAIN } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap(), icon(), sanctuaryToolbar],
  image: {
    domains: [IMAGE_DOMAIN],
  },
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
