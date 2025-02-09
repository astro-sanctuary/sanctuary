import { defineConfig } from "vitest/config";

// Use dynamic import for preact preset
export default defineConfig(async () => {
  const preact = (await import("@preact/preset-vite")).default;

  return {
    plugins: [preact()],
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: "./test/setup.ts",
      coverage: {
        provider: "v8",
        reporter: ["text", "html"],
        exclude: ["node_modules/**", "test/**"],
      },
    },
  };
});
