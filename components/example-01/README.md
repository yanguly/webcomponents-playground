# Example 01 — Mercedes Oldtimers

Small demo with plain Web Components (no build tools, no libs).

What’s inside

- Page shell: `index.html` and `styles.css`.
- Components (each in its own folder):
  - `src/components/oldtimer-card/oldtimer-card.js` (+ `oldtimer-card.css`)
  - `src/components/oldtimer-filter/oldtimer-filter.js` (+ `oldtimer-filter.css`)
  - `src/components/oldtimer-list/oldtimer-list.js` (+ `oldtimer-list.css`)
  - `src/components/oldtimer-app/oldtimer-app.js` (+ `oldtimer-app.css`)
- Classic `<script>` tags in `index.html` load the components, so `file://` works.

How to run

- Open `index.html` in a browser.
- No server needed. It’s all static files.

Notes on CSS loading

- Each component links its CSS from JS. The CSS URL is built relative to the component file, so paths still work when opened via `file://`.

Try it

- Type in the filter box (model or year) to search.
- Click “Favorite” on a car; the summary updates.

Add your own component

- Copy any folder under `src/components/*`, rename it, and include its JS file in `index.html`.
