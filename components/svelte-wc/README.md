# Example — Svelte Custom Elements

Svelte 5 project that compiles straight to custom elements. The Vite dev app doubles as a playground for `<sv-counter>` and `<sv-badge>`.

Quick start

- `npm install`
- `npm run dev` (opens on http://localhost:5173)
- `npm run build` (outputs `dist/svelte-wc.js`)
- `npm run preview` to inspect the production build locally

What’s inside

- `src/lib/Counter.svelte` — accessible counter component emitting `value-change` with the current number.
- `src/lib/Badge.svelte` — status badge built around CSS custom properties, fires `svl-click` on interaction.
- `src/entries/elements.ts` — registers both components as custom elements for the library build.
- `src/App.svelte` — demo page that imports the bundle once and renders the registered tags, mirroring the event payloads in the UI.

Custom elements
| Tag | Attributes / props | Emits |
| ---------- | ------------------------------------------------- | ------------------------- |
| `sv-counter` | `step` (number), `value` (number) | `value-change { detail: number }` |
| `sv-badge` | `kind` (`neutral` \| `success` \| `danger`), `pill` | `svl-click { detail: { kind } }` |

## Sharing with the rest of the playground

This project lives alongside the Angular-based `components/kxl-wc` demo, which now features Material Web controls. After running `npm run build` here, the generated `dist/svelte-wc.js` can be dropped into that demo (or any other playground in this repo) to prove out mixed-framework scenarios: import the script once, and the `sv-counter` / `sv-badge` tags behave like any other third-party web component.

Notes

- Components use `<svelte:options customElement>` so styles rely on `:host` selectors and CSS variables; the badge reflects the normalised state back onto the host to keep the theme in sync.
- Built with the Svelte 5 runes API (`$props`, `$state`, `$effect`, `$bindable`) to avoid deprecated helpers and keep props/reactivity predictable inside custom elements.
- To embed elsewhere, copy `dist/svelte-wc.js` into a script tag (module or classic) and the elements self-register when the file loads.
