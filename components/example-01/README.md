# Example 01 — Mercedes Oldtimers (Because it's my hobby)

A small demo made with plain Web Components (no build tools, no libs).

What’s inside

- Simple page: `index.html` and `styles.css`.
- Four custom elements in separate files:
  - `oldtimer-card.js` — one car card with a "Favorite" button.
  - `oldtimer-filter.js` — text box that sends filter changes.
  - `oldtimer-list.js` — shows a list of cards, supports favorites.
  - `oldtimer-app.js` — connects filter and list, holds the data.
- Each component has its own CSS file.

How to run it

- Just open `index.html` in your browser.
- It uses classic `<script>` tags, so it works with `file://`.

What you can try

- Type in the filter box (model or year).
- Click "Favorite" on any car and see the counter update.
