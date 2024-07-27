import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";

export default {
  name: "sanctuary-toolbar",
  hooks: {
    "astro:config:setup": ({ addDevToolbarApp }) => {
      addDevToolbarApp({
        id: "sanctuary-toolbar-app",
        name: "Drupal Sanctuary Toolbar",
        icon: "💧",
        entrypoint: fileURLToPath(new URL("./app.ts", import.meta.url)),
      });
    },
  },
} satisfies AstroIntegration;
