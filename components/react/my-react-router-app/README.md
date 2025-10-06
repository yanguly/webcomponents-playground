# React Router Web Components Demo

This React Router app shows how to blend framework-agnostic Web Components with a modern React UI. It includes two themed pages:

- **Web Components** – renders a `wc-greeting-card` element to demonstrate a simple custom element inside JSX.
- **React Custom Elements** – walks through two richer examples (`react-badge-pill` and `react-callout-card`) including dark-mode styling, slot usage, and SSR guards.

## Quick Start

Install dependencies and launch the dev server:

```bash
npm install
npm run dev
```

Then visit `http://localhost:5173` and use the welcome page links to explore both demos.

## Scripts

```bash
npm run dev       # Vite-powered dev server with HMR
npm run build     # React Router build output (client + server bundles)
npm run start     # Serve the built app with @react-router/serve
npm run typecheck # Generate route types and run TypeScript
```

## Key Concepts

- **Registration helpers** live under `app/web-components/` (`ensureGreetingElement`, `ensureReactCustomElements`). They guard against duplicate definitions and skip DOM work during SSR.
- **TypeScript support** is provided via `app/types/custom-elements.d.ts`, which augments React’s JSX typing so custom tags can be used without `TS2339` errors.
- **Dark theme aware styles** are embedded directly in each Shadow DOM template using `prefers-color-scheme` media queries.
- **SSR safety**: templates and constructors check for `document`/`HTMLElement` before accessing browser-only APIs, preventing `ReferenceError` when the server bundle imports the modules.

## Production Build & Deploy

```bash
npm run build
npm run start  # starts the server on port 3000 by default
```

The build command emits `build/client` (static assets) and `build/server` (Node entry). Deploy both directories plus `package.json` to your host of choice, or containerize using the provided `Dockerfile`.

---

Built with ❤️ on top of React Router.
