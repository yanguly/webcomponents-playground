import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [preact()],
  server: {
    port: 4300,
    fs: {
      allow: [
        resolve(__dirname, ".."),
        resolve(__dirname, "../kxl-wc/dist/elements"),
      ],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
