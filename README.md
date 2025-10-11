# webcomponents-playground

A playground for experimenting with native Web Components and frameworks that can generate or consume them. Each example lives in `components/` with its own tooling and README.

## Folder structure

- `components/` – all sample projects (Angular workspace, Lit app, pure Web Components, React integration, etc.).
- `.gitignore` – excludes `node_modules`, build outputs, editor configs, etc.

## Highlights

### components/example-01 — Mercedes Oldtimers
- Pure Web Components with zero build tooling.
- Open `components/example-01/index.html` directly in a browser.
- Components live under `src/components/*` with matching CSS files.

### components/example-lit — Lit + Vite + TypeScript
- Lit-based todo playground using Vite.
- `npm install && npm run dev` inside `components/example-lit`.
- Demonstrates reactive state, accessible interactions, and efficient keyed rendering.

### components/react/my-react-router-app — React Router + Custom Elements
- Shows how to mix custom elements inside a React Router app.
- Includes SSR-safe registration and TypeScript typings for custom tags.
- Run with `npm install && npm run dev` inside the project folder.

### components/stencil/example-app-community
- Stencil-generated component showcase mirroring the official community starter.
- Explore additional Stencil examples under `components/stencil/`.

### components/kxl-wc — Angular workspace + Angular Elements
- Angular workspace with a standalone component library (`ui-widgets`) and demo app.
- Widgets:
  - `kxl-counter`: ControlValueAccessor with signal-based state, emits `valueChange`.
  - `kxl-metric-card`: Metric summary card with trend indicator and annotation.
- `npm run dev` (from `components/kxl-wc`) serves the zoneless Angular playground with both widgets rendered in cards.
- `npm run build:elements` produces `components/kxl-wc/dist/elements/browser/main.js`, registering both `kxl-counter` and `kxl-metric-card` as custom elements.

#### Preact companion (components/preact-demo)
- Demonstrates consuming the Angular Elements bundle inside a Preact app.
- Workflow:
  1. Build elements: `cd components/kxl-wc && npm run build:elements`.
  2. Install/run Preact app: `cd ../preact-demo && npm install && npm run dev` (served on `http://localhost:4300`).
- The page loads `kxl-counter` and `kxl-metric-card`, displays a status banner if the bundle isn’t available, and uses a light UI theme.

### showcase — Next.js overview
- Located in `showcase/`; visual index of every example in this repo.
- Install dependencies once: `cd showcase && npm install`.
- Start the overview site with `npm run dev`, then browse `http://localhost:3000` to explore component interactions, code snippets, and links back to each project. Jump to `/examples` to see the real components mounted in-place (vanilla Oldtimer app, Lit todo list, FAST composite card, Stencil counter-button, React-registered custom elements, and Angular Elements feeding a Preact embed).

## Getting started

Clone the repo, then work inside any of the `components/*` directories according to their individual instructions. Each example is intentionally standalone so you can explore different ways to author or consume Web Components.
