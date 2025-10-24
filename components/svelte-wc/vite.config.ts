import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true,
      },
    }),
  ],
  server: {
    fs: {
      allow: [rootDir, resolve(rootDir, "../kxl-wc")],
    },
  },
  build: {
    lib: {
      entry: resolve(rootDir, "src/entries/elements.ts"),
      name: "svelte-wc",
      formats: ["es"],
      fileName: () => "svelte-wc.js",
    },
    rollupOptions: {
      external: [],
    },
  },
});
