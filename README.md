# webcomponents-playground

Just a playground for pure web components and web components libraries

Folder structure:

- `components/` — each component in its own folder.
- `.gitignore` — ignores node_modules, build output, editor files, etc.

## Examples

### components/example-01 — Mercedes Oldtimers

- Goal: small, interactive app using pure Web Components. No build tools.
- Structure:
  - Page: `components/example-01/index.html`, `styles.css`
  - Components live under `components/example-01/src/components/<name>/`
    - Each has `*.js` + matching `*.css`
- How to run: open `components/example-01/index.html` in a browser.
- Notes:
  - Classic `<script>` tags keep it working over `file://`.
  - Components compute CSS URLs relative to their own files, so styles load correctly without a server.

See more details in `components/example-01/README.md`.

### components/example-lit — Lit + Vite + TS
- Goal: demonstrate Web Components built with Lit and Vite dev server.
- Structure:
  - Page: `components/example-lit/index.html`
  - Source: `components/example-lit/src/*` (TypeScript, ESM)
  - Components: `AppRoot`, `TodoList`, `TodoItem`
- Features:
  - Reactive state (add todos, toggle done, live filter)
  - Keyboard accessible items (Enter/Space) with proper ARIA
  - Efficient keyed rendering via Lit’s `repeat` directive
- How to run:
  - `cd components/example-lit`
  - `npm i`
  - `npm run dev`

See more details in `components/example-lit/README.md`.
