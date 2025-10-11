# Web Components Showcase

This Next.js app lives in `showcase/` and acts as a single entry point for exploring every demo inside the **webcomponents-playground** repository. The landing page highlights each sample project, while the **Live Examples** route mounts the original custom elements side by side—no rewrites, the components are imported straight from their source folders.

## Development

```bash
cd showcase
npm install     # once
npm run dev     # launches http://localhost:3000 (overview)
```

Then open `/examples` to interact with the Oldtimer vanilla components, the Lit todo list, FAST’s `hello-card`, Stencil’s counter-button, the React-registered custom elements, and the Angular Elements + Preact mashup. Run `npm run build` to produce an optimized bundle or `npm run lint` to validate TypeScript + ESLint rules.

## Structure

- `src/data/showcases.ts` &mdash; declarative catalogue for each demo (name, interactions, code snippets, and resource links).
- `src/app/page.tsx` &mdash; renders the overview hero, section cards, code blocks, and supporting metadata from the catalogue.
- `src/app/examples/page.tsx` &mdash; client-side gallery that dynamically imports the Lit, FAST, React, Stencil, and Angular demos while streaming vanilla assets via a simple file route.
- `src/app/assets/[...slug]/route.ts` &mdash; thin file-server that streams the original Example 01 assets so they can be consumed without copying files.
- `next.config.ts` &mdash; enables `externalDir` and pins `outputFileTracingRoot` so the app plays nicely inside the monorepo.

Customize the showcase by editing `src/data/showcases.ts`; the UI will automatically reflect any additions (e.g., new frameworks or updated component descriptions).
