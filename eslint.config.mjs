import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";

export default [
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

  {
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "script",
      globals: {
        window: "readonly",
        document: "readonly",
        location: "readonly",
        URL: "readonly",
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
      "prettier/prettier": "off",
    },
  },

  prettier,
];
