# kxl-wc Workspace

This repository is a mini Angular workspace that demonstrates how to share UI widgets between an Angular application and Angular Elements for use outside Angular. It contains:

- `projects/ui-widgets`: a standalone component library published through Angular package format.
- `projects/demo`: a zoneless Angular 20 application that consumes the shared widgets as a local playground.
- `projects/demo/src/elements.ts`: an Angular Elements entrypoint that exposes the widgets as custom elements for any framework.

## Prerequisites

- Node.js 18+
- npm 10+

Install dependencies once:

```bash
npm install
```

## Useful npm scripts

| Script                   | Description                                                                 |
| ------------------------ | --------------------------------------------------------------------------- |
| `npm run dev`            | Serve the demo application with live reload (`ng serve demo`).              |
| `npm run build:lib`      | Build the `ui-widgets` library with `ng build ui-widgets`.                  |
| `npm run build:elements` | Build the library and bundle the Angular Elements output (`dist/elements`). |
| `npm test`               | Run Karma unit tests.                                                       |

## Demo application

The playground (`projects/demo`) is configured for zoneless change detection. Launch it with:

```bash
npm run dev
```

Navigate to `http://localhost:4200/` to explore:

- **Counter playground** – the `kxl-counter` ControlValueAccessor with signal-based state, step control, and value change events.
- **Metric cards** – the `kxl-metric-card` component rendered twice to showcase positive and negative trends.
- **Material Web controls** – `@material/web`’s `md-filled-text-field` and `md-menu` wired up to Angular signals, showcasing how third-party web components slot into the playground with typography styles injected in `projects/demo/src/main.ts`.
- A quick summary of what the workspace exports and how the elements build can be consumed.

### Material Web quick reference

The demo now relies on Material Web for the text field and menu examples:

1. `@material/web` is already installed and imported from `projects/demo/src/main.ts`. The entry file attaches the Material typography stylesheet via `document.adoptedStyleSheets` (with a `<style>` fallback) before bootstrapping Angular, so no extra setup is required.
2. Components are used directly in `projects/demo/src/app/app.html` and work because the root component opts into `CUSTOM_ELEMENTS_SCHEMA`.
3. Theme tokens can be updated in `projects/demo/src/styles.css`. For instance:

   ```css
   :root {
     --md-sys-color-primary: #2563eb;
     --md-filled-text-field-container-color: #ffffff;
   }
   ```

4. Accessibility: the menu trigger syncs `aria-expanded`, `aria-controls`, and `aria-haspopup` while the helper text uses `aria-live="polite"` so screen readers announce the latest action.

## Library widgets

The `ui-widgets` library currently exports:

- `CounterComponent` (`kxl-counter`)
  - Standalone component that implements `ControlValueAccessor`, exposes a configurable `step`, and emits `valueChange` using Angular signals under the hood.
- `MetricCardComponent` (`kxl-metric-card`)
  - Standalone metric summary card with trend highlighting, accessible change labels, and customizable annotation.

Include these widgets from application code via:

```ts
import { CounterComponent, MetricCardComponent } from 'ui-widgets';
```

and in templates as `<kxl-counter>` / `<kxl-metric-card>`.

## Angular Elements build

The elements entrypoint (`projects/demo/src/elements.ts`) registers the same widgets as web components. Produce the bundle with:

```bash
npm run build:elements
```

The output in `dist/elements/` can be referenced from plain HTML, for example:

```html
<script type="module" src="./browser/main.js"></script>
<kxl-counter step="2"></kxl-counter>
<script>
  document.querySelector('kxl-counter').addEventListener('valueChange', (event) => {
    console.log(event.detail);
  });
</script>
```

## Preact companion demo

A lightweight Preact app in `components/preact-demo` consumes the custom elements generated above. To try it:

1. Build the Angular Elements bundle (once per change):

   ```bash
   cd components/kxl-wc
   npm run build:elements
   ```

2. Install and start the Preact dev server:

   ```bash
   cd ../preact-demo
   npm install
   npm run dev
   ```

3. Open the provided URL (defaults to `http://localhost:4300`) to interact with `<kxl-counter>` and `<kxl-metric-card>` rendered from the Angular elements bundle inside a Preact layout. The page displays a status banner if the bundle has not been built yet.

## Testing

Run the current unit tests with:

```bash
npm test
```

Add additional component tests under each project’s `src/app` or library spec directories as you expand functionality.

## Folder structure

```
projects/
  demo/          # Angular application playground and Angular Elements entry
  ui-widgets/    # Standalone component library (kxl-counter, kxl-metric-card)
preact-demo/      # Preact app showcasing the Angular Elements bundle
```

This setup is a solid foundation for experimenting with Angular UI widgets, distributing them as libraries, and consuming them outside Angular via custom elements.
