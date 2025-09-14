# webcomponents-playground

Just a playground for pure web components and web components libraries

Folder structure:

- `components/` — each component in its own folder.
- `.gitignore` — ignores node_modules, build output, editor files, etc.

## Examples

### components/example-01 — Mercedes Oldtimers
- Goal: show a small, interactive app using pure Web Components without build tools. Pure JS.
- Components:
  - `oldtimer-card` — one car card with Favorite toggle.
  - `oldtimer-filter` — text box that emits `filter-change`.
  - `oldtimer-list` — renders cards, supports filtering and favorites.
  - `oldtimer-app` — ties everything together, holds demo data.
- How to run: open `components/example-01/index.html` in your browser.
- Notes: uses classic `<script>` tags so it works over `file://`. Each component has its own CSS file.

See more details in `components/example-01/README.md`.
