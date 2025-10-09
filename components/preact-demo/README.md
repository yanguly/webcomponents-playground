# Preact Widgets Demo

This lightweight Vite + Preact app consumes the Angular custom elements generated from the `kxl-wc` workspace. It showcases how the `kxl-counter` and `kxl-metric-card` web components can be embedded in a non-Angular UI.

## Prerequisites

- Node.js 20+
- Angular elements bundle built from `components/kxl-wc`

## Setup

```bash
cd components/kxl-wc
npm run build:elements

cd ../preact-demo
npm install
```

## Development server

```bash
npm run dev
```

The dev server listens on `http://localhost:4300`. A status message at the top of the page confirms whether the Angular elements bundle was successfully loaded.

## Production build

```bash
npm run build
npm run preview
```

The build output is written to `dist/`. `npm run preview` serves the static bundle for validation.

## Custom element typings

JSX typings for the custom elements live in `src/custom-elements.d.ts`. Update that file when new Angular elements are added to ensure TypeScript understands their attributes.

## File structure

```
src/
  app.tsx             # Loads the Angular elements bundle and renders the demo
  custom-elements.d.ts# JSX type definitions for custom elements
  main.tsx            # Preact render entry point
  styles.css          # Demo styling
vite.config.ts        # Vite + Preact preset configuration (includes cross-workspace access)
```
