# Stencil Community App

This example shows how to build a small multi-page experience using nothing but Stencil-generated Web Components. Every view, router outlet, and layout element is a custom element compiled by Stencil, so you can treat the whole app as a standards-based design system.

## What you get out of the box

- **App shell (`app-root`)** with Shadow DOM styles and a header that reacts to router navigation.
- **Universal Router integration** (`src/router/router.ts`) that keeps the current route in reactive Stencil state and renders the right page component.
- **Feature pages** implemented as custom elements:
  - `app-home` — landing screen with navigation buttons.
  - `app-about` — explains the starter and why routing matters.
  - `app-profile` — demonstrates route params by greeting `/profile/:name`.
  - `app-stencil-info` — shares the “why Stencil” story using simple markup.
- **Global styles and scripts** (`src/global/`) for application-wide CSS variables and startup hooks.

## Run the demo

```bash
cd components/stencil/example-app-community
npm install          # once
npm start            # dev server with live reload on http://localhost:3333
```

Build a production bundle (served from the `www/` output target) with:

```bash
npm run build
```

Run the full test suite with:

```bash
npm test
npm run test.watch   # watch mode during development
```

## How the routing works

- `Router.start()` resolves the current URL and stores a `RouterState` object.
- Components subscribe via `Router.subscribe`, giving you automatic updates inside `@State` fields.
- Call `Router.push('/path')` from any component to navigate without a full page refresh.
- Unknown routes fall back to a simple “Page not found” message—customise the last route in `router.ts` to improve the UX.

## Working with the components

- Components are written in TypeScript + JSX and compiled into Shadow DOM-backed custom elements.
- Use `@State()` for local reactive data (see `app-root` and its current route).
- Pass data between components with `@Prop()`s (example: `app-profile` reads the `name` prop provided by the router).
- Styles live next to each component (`*.css`) and are scoped to the component’s shadow tree.

## Sharing or extending the app

- This starter currently outputs a Stencil `www` build (static site). If you need to publish a component library, add `dist` or `dist-custom-elements` targets in `stencil.config.ts`.
- Generate new components with `npm run generate`, then add them to the router or compose them inside existing views.
- Because everything is a Web Component, you can copy/paste features into other Stencil projects or reuse them in any framework after adding the proper output target.

## Useful links

- [Stencil documentation](https://stenciljs.com/docs/introduction)
- [Universal Router docs](https://github.com/kriasoft/universal-router)
- [Web Components at MDN](https://developer.mozilla.org/docs/Web/Web_Components)
