# Stencil Component Playground

This package is a focused workshop for building reusable Web Components with Stencil. It bundles two demo elements—`counter-button` and `my-component`—and shows how to ship them as a library, a standalone bundle, or a simple demo site.

## What’s included
- **`counter-button`** — Shadow DOM button that tracks its own click count, reflects an `initial` value, and emits a `countChange` event every time the number increases.
- **`my-component`** — Friendly “Hello, World” example that formats `first`, `middle`, and `last` name props using a shared utility.
- **Multiple output targets** defined in `stencil.config.ts`:
  - `dist` + loader script for lazy, auto-registering bundles.
  - `dist-custom-elements` for framework-friendly, individually importable elements.
  - `www` so you can run a playground site locally.
  - `docs-readme` to generate component API docs.

## Quick start
```bash
cd components/stencil/example-component
npm install          # once
npm start            # dev server on http://localhost:3333
```

Stencil rebuilds on file save and refreshes the preview automatically. Update the components inside `src/components/*` and watch the page reload.

## Build & test
```bash
npm run build        # generates dist/, dist-custom-elements/, www/
npm test             # run spec + e2e suites once
npm run test -- --watchAll  # (optional) keep tests running while you iterate
```

### Publishing or consuming the library
- **Loader-based bundle (`dist/`)**  
  ```html
  <script type="module" src="/node_modules/example-component/dist/example-component/example-component.esm.js"></script>
  <counter-button initial="3"></counter-button>
  ```
  Use this when you want automatic lazy-loading and don’t mind registering all components at once.

- **Custom elements build (`dist-custom-elements/`)**  
  ```ts
  import 'example-component/dist/components/counter-button.js';

  document
    .querySelector('counter-button')
    ?.addEventListener('countChange', event => console.log(event.detail));
  ```
  Ideal for bundlers (Vite, Webpack, Next.js) because you import only the pieces you need.

- **Plain HTML demo (`www/`)**  
  After `npm run build`, open `www/index.html` or deploy the folder as static assets.

Remember to bump the version in `package.json` and run `npm publish` (or your workspace equivalent) if you plan to release the library.

## Component reference

### `<counter-button>`
- **Props**
  - `initial` (number, reflected) — starting value, negative numbers are clamped to `0`.
  - `description` (string) — optional helper text shown under the button.
- **Events**
  - `countChange` — emits the latest count as the event detail after every click.
- **Usage**
  ```html
  <counter-button initial="2" description="Tracks clicks for analytics"></counter-button>
  <script>
    document.querySelector('counter-button')?.addEventListener('countChange', e => {
      console.log('New count:', e.detail);
    });
  </script>
  ```

### `<my-component>`
- **Props**
  - `first`, `middle`, `last` — plain text values merged into the greeting.
- **Usage**
  ```html
  <my-component first="Web" middle="Components" last="Fan"></my-component>
  ```
- A lightweight example that shows how to share helpers (`src/utils/utils.ts`) across components.

## Tips for working with Stencil here
- Use `npm run generate component my-card` to scaffold new elements alongside the samples.
- Keep logic in TypeScript classes, and remember to decorate reactive pieces with `@Prop()`, `@State()`, `@Event()` or `@Watch()`.
- Because output targets already cover both app-style and library builds, you can focus on authoring components and leave bundling to Stencil.

For deeper guidance check the [Stencil docs](https://stenciljs.com/docs/introduction) and the generated component READMEs inside `dist/docs/` after a build.
