// ESLint flat config (ESM) for this repo
// Using .mjs so Node treats this file as ESM without changing package.json

import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";

export default [
  // Ignore generated and vendor folders (also covered by .gitignore)
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.vite/**",
      "**/.parcel-cache/**",
      "**/.cache/**",
      "**/coverage/**",
    ],
  },

  // Base recommended JS rules
  js.configs.recommended,

  // Project settings and light rule tweaks
  {
    languageOptions: {
      ecmaVersion: 2023,
      // Source files in examples use classic scripts (file:// friendly)
      sourceType: "script",
      globals: {
        window: "readonly",
        document: "readonly",
        CustomEvent: "readonly",
        customElements: "readonly",
        HTMLElement: "readonly",
        console: "readonly",
      },
    },
    plugins: { prettier: pluginPrettier },
    rules: {
      "no-unused-vars": "warn",
      "prefer-const": "warn",
      // Enable if you want formatting feedback from Prettier in ESLint
      "prettier/prettier": "off",
    },
  },

  // Disable stylistic rules that conflict with Prettier
  prettier,
];

