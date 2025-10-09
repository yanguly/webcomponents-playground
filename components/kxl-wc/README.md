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
- A quick summary of what the workspace exports and how the elements build can be consumed.

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
