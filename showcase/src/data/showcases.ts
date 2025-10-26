export type ComponentSummary = {
  name: string;
  description: string;
  file: string;
};

export type Interaction = {
  title: string;
  detail: string;
};

export type CodeSnippet = {
  title: string;
  language: "ts" | "js" | "html" | "tsx";
  snippet: string;
};

export type ResourceLink = {
  label: string;
  path: string;
  note?: string;
};

export type ShowcaseEntry = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  repoPath: string;
  stack: string[];
  highlights: string[];
  components: ComponentSummary[];
  interactions: Interaction[];
  codeSnippets: CodeSnippet[];
  resources?: ResourceLink[];
};

export const showcases: ShowcaseEntry[] = [
  {
    id: "oldtimer-app",
    title: "Mercedes Oldtimers",
    tagline: "Vanilla custom elements with shadow DOM and zero build tooling.",
    description:
      "A fully static demo that wires together four plain custom elements. The app component owns the car catalog, coordinates the filter and list, and keeps an accessible summary in sync with favorites.",
    repoPath: "components/example-01",
    stack: ["Custom Elements", "Shadow DOM", "Static HTML/CSS"],
    highlights: [
      "Each widget lives in its own folder with co-located CSS loaded at runtime.",
      "Events bubble across shadow boundaries via composed custom events.",
      "The host element aggregates state and forwards updates to its children.",
    ],
    components: [
      {
        name: "<oldtimer-app>",
        description:
          "App shell that renders the filter, list, and summary, and stores the master car dataset.",
        file: "components/example-01/src/components/oldtimer-app/oldtimer-app.js",
      },
      {
        name: "<oldtimer-filter>",
        description:
          "Search input that emits `filter-change` with the current query and reveals the live result count.",
        file: "components/example-01/src/components/oldtimer-filter/oldtimer-filter.js",
      },
      {
        name: "<oldtimer-list>",
        description:
          "Declarative renderer that creates `<oldtimer-card>` nodes and raises `list-rendered` with the visible count.",
        file: "components/example-01/src/components/oldtimer-list/oldtimer-list.js",
      },
      {
        name: "<oldtimer-card>",
        description:
          "Display component that toggles a favorite badge and dispatches `toggle-favorite` when clicked.",
        file: "components/example-01/src/components/oldtimer-card/oldtimer-card.js",
      },
    ],
    interactions: [
      {
        title: "<oldtimer-filter> → <oldtimer-app>",
        detail:
          "`filter-change` carries `{ query }`; the app caches the value and forwards it to the list.",
      },
      {
        title: "<oldtimer-list> ↔ <oldtimer-app>",
        detail:
          "The list dispatches `list-rendered` with a count so the app can update the summary and reflect favorites.",
      },
      {
        title: "<oldtimer-card> → <oldtimer-list>",
        detail:
          "`toggle-favorite` bubbles through the shadow boundary; the list updates its internal `Set` before re-emitting the new totals.",
      },
    ],
    codeSnippets: [
      {
        title: "Forwarding the filter query",
        language: "js",
        snippet: `this._filter.addEventListener("filter-change", (event) => {
  this._list.query = event.detail.query;
  this._list.render();
});`,
      },
      {
        title: "List announces render completion",
        language: "js",
        snippet: `this.dispatchEvent(
  new CustomEvent("list-rendered", {
    bubbles: true,
    composed: true,
    detail: { count },
  }),
);`,
      },
    ],
    resources: [
      {
        label: "README",
        path: "components/example-01/README.md",
      },
      {
        label: "Entry HTML",
        path: "components/example-01/index.html",
      },
    ],
  },
  {
    id: "lit-todo",
    title: "Lit Todo List",
    tagline: "Reactive Lit components orchestrated with Vite and TypeScript.",
    description:
      "The todo list exposes a reactive state container that fans out updates to `todo-item` instances and keeps a filter input in sync. Everything is wired through Lit's declarative templates.",
    repoPath: "components/example-lit",
    stack: ["Lit", "TypeScript", "Vite"],
    highlights: [
      "Lit `@state` fields drive render cycles without manual DOM work.",
      "Child components emit semantic events (`toggle`, `filter-change`) that bubble to the host.",
      "Templates use `repeat` to efficiently reconcile list changes.",
    ],
    components: [
      {
        name: "<app-root>",
        description:
          "Bootstraps the todo list component; acts as the single entry point for the Vite bundle.",
        file: "components/example-lit/src/AppRoot.ts",
      },
      {
        name: "<todo-list>",
        description:
          "Owns todos state, adds new items, filters them, and renders `<todo-item>` elements with Lit directives.",
        file: "components/example-lit/src/components/TodoList.ts",
      },
      {
        name: "<todo-item>",
        description:
          "Accessible row that emits `toggle` on click or keyboard activation and reflects its `done` state.",
        file: "components/example-lit/src/components/TodoItem.ts",
      },
      {
        name: "<todo-filter>",
        description:
          "Presentation component that wraps an input and emits `filter-change` with the current value.",
        file: "components/example-lit/src/components/TodoFilter.ts",
      },
    ],
    interactions: [
      {
        title: "<todo-item> → <todo-list>",
        detail:
          "`toggle` events bubble; the list flips the matching todo immutably which retriggers Lit's render pass.",
      },
      {
        title: "<todo-filter> → <todo-list>",
        detail:
          "`filter-change` carries `{ value }`; the list stores it in a `@state` field and recomputes the derived collection.",
      },
      {
        title: "<todo-list> → children",
        detail:
          "State updates flow down via property bindings (`.text`, `.done`) so DOM stays in sync with the reactive array.",
      },
    ],
    codeSnippets: [
      {
        title: "Bubbling Lit event from <todo-item>",
        language: "js",
        snippet: `this.dispatchEvent(
  new CustomEvent("toggle", { bubbles: true, composed: true }),
);`,
      },
      {
        title: "Immutable toggle inside <todo-list>",
        language: "ts",
        snippet: `#toggle(id: number) {
  this.todos = this.todos.map((todo) =>
    todo.id === id ? { ...todo, done: !todo.done } : todo,
  );
}`,
      },
    ],
    resources: [
      {
        label: "README",
        path: "components/example-lit/README.md",
      },
      {
        label: "Entry point",
        path: "components/example-lit/src/AppRoot.ts",
      },
    ],
  },
  {
    id: "stencil-app",
    title: "Stencil Community App",
    tagline:
      "A routed mini-site where every view and layout is a Stencil-generated component.",
    description:
      "Universal Router feeds Stencil state to render multiple page components. The shell listens to navigation updates and forwards route props down the tree.",
    repoPath: "components/stencil/example-app-community",
    stack: ["Stencil", "Universal Router", "TypeScript"],
    highlights: [
      "Router updates are bridged into components via subscription helpers.",
      "Shadow DOM keeps each page's styles encapsulated while sharing global tokens.",
      "Props generated by the router feed dynamic views such as `app-profile`.",
    ],
    components: [
      {
        name: "<app-root>",
        description:
          "App shell that renders navigation and subscribes to router state to highlight the active route.",
        file: "components/stencil/example-app-community/src/components/app-root/app-root.tsx",
      },
      {
        name: "<app-stencil-info>",
        description:
          "One of several routed views; rendered when the router resolves `/stencil-info`.",
        file: "components/stencil/example-app-community/src/components/app-stencil-info/app-stencil-info.tsx",
      },
      {
        name: "router configuration",
        description:
          "Universal Router map that resolves URLs and provides props to each view component.",
        file: "components/stencil/example-app-community/src/router/router.ts",
      },
    ],
    interactions: [
      {
        title: "Router → <app-root>",
        detail:
          "Subscriptions push `RouterState` objects into `@State() currentRoute`, triggering re-render of navigation links.",
      },
      {
        title: "<app-root> → routed views",
        detail:
          "Slots the active page component into the layout while passing route params as props (e.g. `name` for `<app-profile>`).",
      },
      {
        title: "Routed views → Router",
        detail:
          "Invoke `Router.push('/path')` from event handlers to navigate without full reloads.",
      },
    ],
    codeSnippets: [
      {
        title: "Tracking router state inside <app-root>",
        language: "ts",
        snippet: `@State() currentRoute?: RouterState;

async connectedCallback() {
  this.currentRoute = await Router.start();
  Router.subscribe((state) => (this.currentRoute = state));
}`,
      },
      {
        title: "Routing table definition",
        language: "ts",
        snippet: `export const routes: Route[] = [
  { path: "/", action: () => <app-home /> },
  { path: "/profile/:name", action: ({ params }) => (
      <app-profile name={params?.name ?? ""} />
    ),
  },
];`,
      },
    ],
    resources: [
      {
        label: "README",
        path: "components/stencil/example-app-community/readme.md",
      },
      {
        label: "Router setup",
        path: "components/stencil/example-app-community/src/router/router.ts",
      },
    ],
  },
  {
    id: "stencil-library",
    title: "Stencil Component Library",
    tagline:
      "Reusable Stencil elements built for distribution with both loader and custom-elements builds.",
    description:
      "Counter and greeting components demonstrate how to author Shadow DOM widgets that emit events and reflect properties for downstream consumers.",
    repoPath: "components/stencil/example-component",
    stack: ["Stencil", "Shadow DOM", "Docs generator"],
    highlights: [
      "Multiple output targets cover app demos, docs, and library bundles.",
      "`counter-button` reflects attributes so it can hydrate with existing DOM.",
      "Custom events cross the shadow boundary with structured payloads.",
    ],
    components: [
      {
        name: "<counter-button>",
        description:
          "Self-contained button that tracks click count, exposes an `initial` prop, and emits `countChange`.",
        file: "components/stencil/example-component/src/components/counter-button/counter-button.tsx",
      },
      {
        name: "<my-component>",
        description:
          "Simple greeting element useful for demonstrating prop formatting and shared utilities.",
        file: "components/stencil/example-component/src/components/my-component/my-component.tsx",
      },
    ],
    interactions: [
      {
        title: "<counter-button> → Consumers",
        detail:
          "`countChange` events bubble with the latest number, making it trivial to bind to analytics or other state stores.",
      },
      {
        title: "Attributes ↔ Internal state",
        detail:
          "`initial` is reflected; Stencil keeps the class property and DOM attribute aligned for hydration safety.",
      },
    ],
    codeSnippets: [
      {
        title: "Emitting the counter update",
        language: "ts",
        snippet: `@Event({ bubbles: true, composed: true })
countChange!: EventEmitter<number>;

private handleClick() {
  this.count++;
  this.countChange.emit(this.count);
}`,
      },
      {
        title: "Using the custom element",
        language: "html",
        snippet: `<counter-button initial="3" description="Tracks conversions"></counter-button>`,
      },
    ],
    resources: [
      {
        label: "README",
        path: "components/stencil/example-component/readme.md",
      },
      {
        label: "Counter styles",
        path: "components/stencil/example-component/src/components/counter-button/counter-button.css",
      },
    ],
  },
  {
    id: "fast-playground",
    title: "FAST Playground",
    tagline:
      "Microsoft FAST components composed into a routed micro-app with reactive bindings.",
    description:
      "The `hello-card` element orchestrates child controls, listens for their custom events, and emits its own analytics signal while routing is handled by FAST Router.",
    repoPath: "components/fast-demo",
    stack: ["FAST", "FAST Router", "TypeScript", "Vite"],
    highlights: [
      "Property bindings (`:prop`) keep primitive values flowing into children without string coercion.",
      "Custom events bubble through shadow DOM via `{ bubbles: true, composed: true }`.",
      "Router configuration pairs views with custom elements and keeps navigation state in sync.",
    ],
    components: [
      {
        name: "<hello-card>",
        description:
          "Host component that tracks click counts, syncs a toggle switch, and emits `hello-click` when the CTA fires.",
        file: "components/fast-demo/src/hello-card.ts",
      },
      {
        name: "<counter-badge>",
        description:
          "FAST badge that exposes a `count` property and raises `count-change` when its internal button is used.",
        file: "components/fast-demo/src/counter-badge.ts",
      },
      {
        name: "Router configuration",
        description:
          "Maps `/home` and `/showcase` to custom elements with the FAST router.",
        file: "components/fast-demo/src/router/app-router-configuration.ts",
      },
    ],
    interactions: [
      {
        title: "Child events → <hello-card>",
        detail:
          "`count-change` and `toggle-change` bubble; `hello-card` updates local `@observable` fields and re-renders templates.",
      },
      {
        title: "<hello-card> → Children",
        detail:
          "Property bindings (`:count`, `:on`) push reactive fields into FAST child components.",
      },
      {
        title: "CTA Button → Analytics",
        detail:
          "`hello-click` custom event emits `{ clicks, at }` enabling consumers to listen from outside the shadow tree.",
      },
    ],
    codeSnippets: [
      {
        title: "Binding child state in FAST",
        language: "ts",
        snippet: `<counter-badge
  :count=\${(x) => x.clickCount}
  @count-change=\${(x, c) =>
    x.handleCountChange(c.event as CustomEvent<CountChangeDetail>)}
></counter-badge>`,
      },
      {
        title: "Raising the hello-click analytics event",
        language: "ts",
        snippet: `this.$emit("hello-click", {
  at: Date.now(),
  clicks: this.clickCount,
});`,
      },
    ],
    resources: [
      {
        label: "README",
        path: "components/fast-demo/README.md",
      },
      {
        label: "hello-card.ts",
        path: "components/fast-demo/src/hello-card.ts",
      },
    ],
  },
  {
    id: "angular-elements",
    title: "Angular Elements Workspace",
    tagline: "Angular widgets compiled to custom elements ready for any host.",
    description:
      "The Angular workspace exposes `kxl-counter` and `kxl-metric-card` as standalone elements. Build once and drop them into runtime environments without shipping the Angular runtime.",
    repoPath: "components/kxl-wc",
    stack: ["Angular 20", "Angular Elements"],
    highlights: [
      "Angular signals power the widgets while `ControlValueAccessor` keeps them form-friendly.",
      "The elements build outputs a `dist/elements` bundle ready for any host framework.",
      "Type declarations document the custom elements for any consuming TypeScript project.",
    ],
    components: [
      {
        name: "<kxl-counter>",
        description:
          "Angular counter component surfaced as a custom element; exposes `step` input and `valueChange` event.",
        file: "components/kxl-wc/projects/ui-widgets/src/lib/counter/counter.component.ts",
      },
      {
        name: "<kxl-metric-card>",
        description:
          "Metric display card reflecting positive/negative trends with accessible labelling.",
        file: "components/kxl-wc/projects/ui-widgets/src/lib/metric-card/metric-card.component.ts",
      },
    ],
    interactions: [
      {
        title: "Angular signals → Custom element API",
        detail:
          "Component state flows through `@Input()`s and `@Output()`s which Angular Elements bridges to attributes and custom events.",
      },
      {
        title: "Host frameworks → Custom elements",
        detail:
          "Consumers treat the elements as standard DOM nodes—set properties or attributes and listen for custom events.",
      },
      {
        title: "Shared typings",
        detail:
          "`custom-elements.d.ts` documents the tag names and event signatures for TypeScript-aware hosts.",
      },
    ],
    codeSnippets: [
      {
        title: "Loading the Angular elements bundle",
        language: "js",
        snippet: `import("/assets/angular-elements/browser/main.js")
  .then(() => console.log("Angular elements ready"))
  .catch(() => console.error("Angular elements bundle missing"));`,
      },
      {
        title: "Listening for valueChange events",
        language: "js",
        snippet: `const counter = document.querySelector("kxl-counter");
counter?.addEventListener("valueChange", (event) => {
  const nextValue = event.detail ?? 0;
  console.log("Angular counter emitted:", nextValue);
});`,
      },
    ],
    resources: [
      {
        label: "Angular workspace README",
        path: "components/kxl-wc/README.md",
      },
    ],
  },
  {
    id: "react-router-wc",
    title: "React Router + Custom Elements",
    tagline:
      "Hybrid React pages that register and consume framework-agnostic elements.",
    description:
      "The React Router app registers web components on demand so they work with SSR and client navigation. Dedicated helpers guard against duplicate definitions while JSX typings keep TypeScript happy.",
    repoPath: "components/react/my-react-router-app",
    stack: ["React Router", "TypeScript", "Custom Elements"],
    highlights: [
      "Registration utilities make sure custom elements exist before components render.",
      "Dark-mode aware CSS is encapsulated inside each custom element's shadow tree.",
      "Slots demonstrate projecting React children into shadow DOM content.",
    ],
    components: [
      {
        name: "registerGreetingElement.ts",
        description:
          "Ensures `wc-greeting-card` is defined only once; safe to call during SSR fallbacks.",
        file: "components/react/my-react-router-app/app/web-components/registerGreetingElement.ts",
      },
      {
        name: "<wc-greeting-card>",
        description:
          "Simple greeting element that renders slotted title/description and emits a `cta-click` event.",
        file: "components/react/my-react-router-app/app/web-components/registerGreetingElement.ts",
      },
      {
        name: "<react-callout-card>",
        description:
          "Rich custom element with slots and theme-aware styling, registered via `registerReactCustomElements`.",
        file: "components/react/my-react-router-app/app/web-components/registerReactCustomElements.ts",
      },
    ],
    interactions: [
      {
        title: "React routes → Custom element guards",
        detail:
          "Each route calls `ensureGreetingElement` / `ensureReactCustomElements` inside `useEffect` so SSR hydration never double-defines elements.",
      },
      {
        title: "React props ↔ Custom element attributes",
        detail:
          "JSX props like `headline`, `message`, and `tone` map directly onto observed attributes in the custom elements.",
      },
      {
        title: "Slots ↔ React children",
        detail:
          "Routes project content through JSX slots, so React text and nodes end up inside the custom element templates.",
      },
    ],
    codeSnippets: [
      {
        title: "Registration guard for custom elements",
        language: "ts",
        snippet: `if (typeof window !== "undefined" && !customElements.get("wc-greeting-card")) {
  customElements.define("wc-greeting-card", GreetingCardElement);
}`,
      },
      {
        title: "React consuming the custom element",
        language: "tsx",
        snippet: `<wc-greeting-card
  headline="Welcome to the playground"
  message="This custom element renders inside a React Router view."
></wc-greeting-card>`,
      },
    ],
    resources: [
      {
        label: "README",
        path: "components/react/my-react-router-app/README.md",
      },
      {
        label: "Custom element typings",
        path: "components/react/my-react-router-app/app/types/custom-elements.d.ts",
      },
    ],
  },
];
