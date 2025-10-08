# FAST Demo Playground

This package shows a miniature playground for [Microsoft FAST](https://www.fast.design/).
It contains a composed `hello-card` element that embeds three smaller FAST web components
to demonstrate data binding, custom events, and property/attribute syncing.

## Getting Started

- Install dependencies once: `npm install`
- Start Vite dev server: `npm run dev`
- Build for production: `npm run build`

The app now boots into a home page with navigation powered by the official
`@microsoft/fast-router`. Use the top links to jump between the welcome screen and the interactive
showcase while Vite live reloads changes from `src/`.

## Custom Elements

| Element         | File                   | Attributes / Properties                                            | Emits                                                 |
| --------------- | ---------------------- | ------------------------------------------------------------------ | ----------------------------------------------------- |
| `hello-card`    | `src/hello-card.ts`    | `title`, `description`, `cta`                                      | `hello-click { clicks: number, at: number }`          |
| `info-banner`   | `src/info-banner.ts`   | `heading`, `message`, `variant` (`info` \| `success` \| `warning`) | none                                                  |
| `counter-badge` | `src/counter-badge.ts` | `label`, `button-label`, `count:number`                            | `count-change { count: number }` (bubbles & composed) |
| `toggle-switch` | `src/toggle-switch.ts` | `on:boolean`                                                       | `toggle-change { on: boolean }` (bubbles & composed)  |

All elements are registered globally when their files are imported.

## Binding Cheatsheet

FAST templates use binding prefixes to control how data flows between the host element and its
children. The patterns we rely on in this project:

- `:prop=${value}` &mdash; property binding. Assigns directly to the DOM property (no string
  coercion). Use this for booleans, numbers, objects, etc.
- `?attr=${boolean}` &mdash; boolean attribute binding. Adds/removes the attribute based on truthiness.
  Useful when the attribute controls built-in browser behaviour.
- `@event=${handler}` &mdash; event binding. Subscribes to DOM events such as `@click` or the custom
  events emitted from the child elements.
- `ref=${fn}` &mdash; optional helper to grab a reference to an element instance.

Structural helpers worth exploring:

- `when(condition, html\`...\`)` &mdash; render a template when a predicate is true.
- `repeat(items, template)` &mdash; loop over arrays.
- `slotted(slotName, template)` &mdash; observe slotted content.

## Routing

- `src/app-shell.ts` hosts `<fast-router>` and renders the primary navigation with active-pill styling.
- `src/router/app-router-configuration.ts` maps the routes:
  - `/home` → `demo-home-page`
  - `/showcase` → `demo-showcase-page`
  - fallback → `demo-not-found`
- `NavigationHandler` keeps the active link in sync as the router pushes history entries.

## Interaction Flow

`hello-card` keeps local state (`clickCount` and `toggled`) using FAST `@observable` properties. It
passes the current values down to the child components using property bindings (`:count`, `:on`)
and listens for the bubbled custom events to keep itself in sync. The CTA button also increments
the counter and fires `hello-click`, demonstrating a host element emitting its own events. On the
showcase page, the auxiliary counter button is powered by component state rather than DOM
mutations to highlight FAST’s reactive update loop, while the redesigned home hero links straight
into the showcase and FAST documentation.

## Tips

- Boolean/number attributes should generally be passed via property bindings (`:foo=${value}`) if you
  expect the child to treat them as real booleans/numbers.
- When you emit custom events in FAST, include `{ bubbles: true, composed: true }` if you want the
  parent component (or outside DOM) to hear them through shadow boundaries.
- The styling in `src/style.css` focuses on centering the card; tweak it to integrate the demo into
  another layout.
