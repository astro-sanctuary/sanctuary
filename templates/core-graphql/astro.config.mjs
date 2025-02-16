import { loadEnv } from "vite";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import node from "@astrojs/node";
import toolbarDrupal from "@astro-sanctuary/toolbar-drupal";

const { IMAGE_DOMAIN, NODE_TLS_REJECT_UNAUTHORIZED } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  "",
);
process.env.NODE_TLS_REJECT_UNAUTHORIZED = NODE_TLS_REJECT_UNAUTHORIZED;

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap(), icon(), toolbarDrupal],
  image: {
    domains: [IMAGE_DOMAIN],
  },
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
