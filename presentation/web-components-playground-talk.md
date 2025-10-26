# Web Components Playground — Slide Deck

Ten-minute walkthrough of the playground repo and how different web component stacks feel in real use.

---

## Slide 1 — Welcome

**Subtitle**: One repo, many custom element stories

**Key points**

- Web Components are now stable and can be used everywhere.
- This repo lets us compare seven real-world setups.
- Goal: know when to go native and when to bring a helper library.

**Image placeholder**

- `[Hero image idea: collage of project folder icons with a big <web-component> tag in the middle]`

**What to say**

- Welcome everyone, set the tone: “We are looking at one repo that gathers many styles of web components.”
- Call out that teams need UI that survives across frameworks.

**What to show**

- Display the repo root in the IDE or file explorer.
- Point cursor at the `components/` folder to tease what is coming.

---

## Slide 2 — Agenda & Standards Check

**Subtitle**: Seven stops plus a wrap-up

**Key points**

- Quick refresh: Custom Elements, Shadow DOM, HTML Templates, ES Modules.
- Follow a tour of each folder using those tools in a different way.
- Finish with a pros/cons scoreboard and current ecosystem news.

**Image placeholder**

- `[Slide graphic idea: simple timeline with icons for each stop (Native, Lit, Stencil, FAST, Svelte, Angular, React)]`

**What to say**

- Keep definitions light: “You already know the APIs, we just name them so we share the same language.”
- Promise real examples and not just theory slides.

**What to show**

- Open the README highlight that lists the examples.
- Zoom briefly on the “Folder structure” section.

---

## Slide 3 — Playground Map

**Subtitle**: Who lives where?

**Key points**

- `example-01`: Plain JS Oldtimer demo with zero build tooling.
- `example-lit`: Lit + Vite todo playground with TypeScript.
- `stencil/*`: Stencil starter plus a simple component bundle.
- `svelte-wc`: Svelte 5 runes compiled to `<sv-counter>` and `<sv-badge>` custom elements.
- `kxl-wc`: Angular widgets shipped as custom elements, paired with a Preact demo.
- `fast-demo`: FAST router app with interactive card components.
- `react/my-react-router-app`: React Router experience that consumes custom elements safely.

**Image placeholder**

- `[Map image idea: folder tree screenshot with colored labels per stack]`

**What to say**

- Stress that every folder runs alone so you can compare honestly.
- Mention that it is easy to test bundle sizes and DX per project.
- Call out the Svelte folder as the newest stop, showing how runes-based components compile to ready-to-embed custom elements.

**What to show**

- Expand the `components/` folder in the IDE side panel.
- Point at each folder while you mention it.
- Pause on `svelte-wc` and open its README to highlight `sv-counter` / `sv-badge` and their emitted events.

---

## Slide 4 — Native Oldtimer Components

**Subtitle**: Raw Custom Elements in the wild

**Key points**

- `<oldtimer-app>` holds `<oldtimer-filter>` and `<oldtimer-list>`; cards bubble up `toggle-favorite`.
- Filter raises `filter-change`; list emits `list-rendered`; summary updates via `aria-live`.
- Lighting fast load: no framework, no build, just browser features.
- Cost: we hand-write templating, escaping, and state updates.

**Image placeholder**

- `[Screenshot idea: Oldtimer list page with filter box and cards visible]`

**What to say**

- Explain the event flow in plain words: filter → list → summary.
- Share the CSS trick with `document.currentScript` so even `file://` works.

**What to show**

- Open `oldtimer-app.js` and highlight the event listeners.
- If time allows, run the demo in a browser tab to show instant load.

---

## Slide 5 — Lit Todo Playground

**Subtitle**: When you want helpers but not a full framework

**Key points**

- `TodoList` uses `@state` and the `repeat` directive to keep updates tidy.
- `<todo-filter>` sends `filter-change` events; no manual DOM diffing required.
- Lit updates only the changed nodes and works great with Vite dev server.
- Need a build step for TS/ESM, but developer speed jumps up.

**Image placeholder**

- `[Screenshot idea: Lit todo app showing add form, filter, checked and unchecked items]`

**What to say**

- Mention the HTML template literal: “We write UI as readable template strings.”
- Celebrate small bundle sizes compared to big frameworks.

**What to show**

- Highlight `TodoList.ts` around the `render()` method.
- Show the live reload experience if possible.

---

## Slide 6 — Stencil, FAST & Svelte Builders

**Subtitle**: Compilers that output pure web components

**Key points**

- **Stencil** bundles TypeScript + JSX, lazy loads routes, ships SSR-ready output.
- Router config in `src/router/router.ts` proves you can do more than flat pages.
- **FAST demo**: `hello-card` controls state; talks to `counter-badge` and `toggle-switch`.
- FAST bindings (`:prop`, `@event`) keep data and events flowing with little code.
- **Svelte custom elements**: `components/svelte-wc` builds with `<svelte:options customElement>` and the runes API, shipping `sv-counter` / `sv-badge` with native events.
- Trade-off: more tooling layers, but you get optimized builds and design system features.

**Image placeholder**

- `[Composite image idea: Stencil app screenshot, FAST card, and Svelte badge counter preview]`

**What to say**

- Position Stencil as “design system heavy lifter,” FAST as “observable component toolkit.”
- Highlight that Svelte’s runes syntax keeps reactivity ergonomic while still compiling to native custom elements.
- Call out all three still ship standard custom elements that work anywhere.

**What to show**

- Briefly open Stencil `app-root.tsx` to show JSX output.
- Jump to FAST `hello-card.ts` to show observable properties.
- Open `src/lib/Counter.svelte` to show `$state` / `$props` runes and the emitted events.

---

## Slide 7 — Angular Elements + Preact Consumer

**Subtitle**: Sharing Angular craft beyond Angular apps

**Key points**

- Angular workspace builds `kxl-counter` and `kxl-metric-card` via `npm run build:elements`.
- Output lives in `dist/elements/browser/main.js`, ready for any host.
- Preact demo loads that bundle and listens for `valueChange` events like native DOM.
- More build work and larger bundle, but teams reuse Angular know-how.

**Image placeholder**

- `[Diagram idea: Angular logo on left, arrow to custom elements box, arrow to Preact page screenshot]`

**What to say**

- Describe the value: “One codebase feeds Angular app and external consumers.”
- Mention zoneless change detection helps keep runtime weight lower.

**What to show**

- Open `projects/demo/src/elements.ts` to highlight the `createCustomElement` calls.
- Show the Preact page reacting to counter clicks.

---

## Slide 8 — React Router + Custom Elements

**Subtitle**: Staying SSR-safe while using web components

**Key points**

- Helpers like `ensureGreetingElement` register components only in the browser.
- `<wc-greeting-card>` styles itself inside Shadow DOM; React just renders the tag.
- React route for “Custom Elements” loads richer cards with slots and dark-mode CSS.
- Need TypeScript definitions (`custom-elements.d.ts`) and smart prop → attribute mapping.

**Image placeholder**

- `[Screenshot idea: React route showing greeting card custom element inside React layout]`

**What to say**

- Warn about duplicate registration errors and how the helpers avoid them.
- Remind everyone that server rendering needs guards before touching `document`.

**What to show**

- Highlight `registerGreetingElement.ts` in the editor.
- Switch to React router page in browser to prove it works.

---

## Slide 9 — Approaches at a Glance

**Subtitle**: Pick the right tool for the job

| Approach               | Bright spots                                                 | Watch-outs                                                             |
| ---------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------- |
| Native (example-01)    | Zero build, tiny payload, total control                      | Manual DOM work, more boilerplate                                      |
| Lit                    | Declarative templates, small bundles, good DX                | Build tooling required, client-first                                   |
| Stencil                | Compiler optimizations, SSR support, routing                 | Opinionated setup, heavier tooling                                     |
| FAST                   | Strong bindings, design system focus, event helpers          | Learning curve, relies on FAST runtime                                 |
| Svelte custom elements | Runes-based reactivity, tiny bundles, CSS scoping by default | Requires compile step, limited official guidance for advanced patterns |
| Angular Elements       | Reuse Angular talent, share widgets anywhere                 | Bigger bundles, complex pipeline                                       |
| React/Preact consumer  | Works with existing React apps, SSR guards                   | Extra typings, attribute/property juggling                             |

**Image placeholder**

- `[Table styling idea: simple scoreboard graphic with green and orange markers]`

**What to say**

- Encourage teams to choose based on skills, release needs, and target hosts.
- Remind them mixing patterns is fine—this repo proves it.

**What to show**

- Keep the comparison table on screen.
- Optionally flash Lighthouse or bundle stats if you have them ready.

---

## Slide 10 — State of Web Components & Next Steps

**Subtitle**: Solid today, getting better tomorrow

**Key points**

- All evergreen browsers ship Custom Elements v1 support.
- Tooling releases: Lit 3, Stencil 4, FAST updates, Angular signals, React custom element RFCs.
- Cool specs coming: Scoped Registries, Declarative Shadow DOM, Constructable Stylesheets.
- Takeaway: start simple with native pieces, add libraries when they boost delivery speed.
- Call to action: clone repo, run demos, compare DX, measure performance, send feedback.

**Image placeholder**

- `[Closing image idea: browser logos around a custom element icon with upward arrows]`

**What to say**

- Thank the audience, invite questions or ideas for more demos (Solid/Qwik?).
- Mention any upcoming release plans or contributions you would love to see.

**What to show**

- End on the repo README or the comparison slide, depending on questions.
- Keep contact info or QR code handy if you share the deck later.

---
