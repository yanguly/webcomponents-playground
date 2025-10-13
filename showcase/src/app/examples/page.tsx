"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Script from "next/script";

const OLD_TIMER_SCRIPTS = [
  "/assets/example-01/src/components/oldtimer-card/oldtimer-card.js",
  "/assets/example-01/src/components/oldtimer-filter/oldtimer-filter.js",
  "/assets/example-01/src/components/oldtimer-list/oldtimer-list.js",
  "/assets/example-01/src/components/oldtimer-app/oldtimer-app.js",
];

const STENCIL_BUNDLE =
  "/assets/stencil-example-component/build/example-component.esm.js";
const ANGULAR_BUNDLE = "/assets/angular-elements/browser/main.js";

type AngularStatus = "loading" | "ready" | "missing";

type SnippetProps = {
  title: string;
  language: string;
  children: string;
};

function CodeSnippet({ title, language, children }: SnippetProps) {
  return (
    <figure className="mt-6 overflow-hidden rounded-2xl border border-slate-200/20 bg-slate-900/80">
      <figcaption className="flex items-center justify-between border-b border-slate-200/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">
        <span>{title}</span>
        <span>{language.toUpperCase()}</span>
      </figcaption>
      <pre className="overflow-x-auto p-4 text-sm text-slate-100">
        <code>{children}</code>
      </pre>
    </figure>
  );
}

export default function ExamplesPage() {
  const [fastReady, setFastReady] = useState(false);
  const [stencilReady, setStencilReady] = useState(false);
  const [angularStatus, setAngularStatus] = useState<AngularStatus>("loading");
  const [reactReady, setReactReady] = useState(false);

  const [greetingClicks, setGreetingClicks] = useState(0);
  const [fastCtaClicks, setFastCtaClicks] = useState(0);
  const [fastBadgeCount, setFastBadgeCount] = useState(0);
  const [fastToggleOn, setFastToggleOn] = useState(false);
  const [stencilCount, setStencilCount] = useState(2);
  const [angularCounter, setAngularCounter] = useState(0);

  const greetingRef = useRef<HTMLElement | null>(null);
  const helloCardRef = useRef<HTMLElement | null>(null);
  const stencilCounterRef = useRef<HTMLElement | null>(null);
  const angularCounterRef = useRef<HTMLElement | null>(null);

  const setGreetingNode = useCallback((node: HTMLElement | null) => {
    greetingRef.current = node;
  }, []);

  const setHelloCardNode = useCallback((node: HTMLElement | null) => {
    helloCardRef.current = node;
  }, []);

  const setStencilCounterNode = useCallback((node: HTMLElement | null) => {
    stencilCounterRef.current = node;
  }, []);

  const setAngularCounterNode = useCallback((node: HTMLElement | null) => {
    angularCounterRef.current = node;
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function bootstrapLitAndReactElements() {
      try {
        await Promise.all([
          import("../../../../components/example-lit/src/AppRoot.ts"),
          import("../../../../components/example-lit/src/main.ts"),
        ]);

        const [{ ensureGreetingElement }, { ensureReactCustomElements }] =
          await Promise.all([
            import(
              "../../../../components/react/my-react-router-app/app/web-components/registerGreetingElement.ts"
            ),
            import(
              "../../../../components/react/my-react-router-app/app/web-components/registerReactCustomElements.ts"
            ),
          ]);

        if (cancelled) return;

        ensureGreetingElement();
        ensureReactCustomElements();

        await Promise.all([
          customElements.whenDefined("wc-greeting-card"),
          customElements.whenDefined("react-callout-card"),
        ]);

        if (!cancelled) {
          setReactReady(true);
        }
      } catch (error) {
        console.error("Failed to load Lit/React custom elements", error);
      }
    }

    bootstrapLitAndReactElements();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    import("../../../../components/fast-demo/src/hello-card.ts")
      .then(() => {
        if (!cancelled) {
          setFastReady(true);
        }
      })
      .catch((error) => {
        console.error("Failed to load FAST components", error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!reactReady || !greetingRef.current) {
      return;
    }

    const node = greetingRef.current;
    const handleClick = (event: Event) => {
      const detail = (event as CustomEvent<{ clicks?: number }>).detail;
      setGreetingClicks((count) => detail?.clicks ?? count + 1);
    };

    node.addEventListener("cta-click", handleClick as EventListener);
    return () => {
      node.removeEventListener("cta-click", handleClick as EventListener);
    };
  }, [reactReady]);

  useEffect(() => {
    if (!fastReady || !helloCardRef.current) {
      return;
    }

    const node = helloCardRef.current;
    const handleHelloClick = (event: Event) => {
      const detail = (event as CustomEvent<{ clicks?: number }>).detail;
      setFastCtaClicks(detail?.clicks ?? 0);
    };
    const handleBadgeCount = (event: Event) => {
      const detail = (event as CustomEvent<{ count?: number }>).detail;
      setFastBadgeCount(detail?.count ?? 0);
    };
    const handleToggle = (event: Event) => {
      const detail = (event as CustomEvent<{ on?: boolean }>).detail;
      setFastToggleOn(Boolean(detail?.on));
    };

    node.addEventListener("hello-click", handleHelloClick as EventListener);
    node.addEventListener("count-change", handleBadgeCount as EventListener);
    node.addEventListener("toggle-change", handleToggle as EventListener);

    return () => {
      node.removeEventListener("hello-click", handleHelloClick as EventListener);
      node.removeEventListener("count-change", handleBadgeCount as EventListener);
      node.removeEventListener("toggle-change", handleToggle as EventListener);
    };
  }, [fastReady]);

  useEffect(() => {
    if (!stencilReady || !stencilCounterRef.current) {
      return;
    }

    const node = stencilCounterRef.current;
    const handleCountChange = (event: Event) => {
      const detail = (event as CustomEvent<number>).detail;
      setStencilCount(detail ?? 0);
    };

    node.addEventListener("countChange", handleCountChange as EventListener);
    return () => {
      node.removeEventListener("countChange", handleCountChange as EventListener);
    };
  }, [stencilReady]);

  useEffect(() => {
    if (angularStatus !== "ready" || !angularCounterRef.current) {
      return;
    }

    const node = angularCounterRef.current;
    const handleValueChange = (event: Event) => {
      const detail = (event as CustomEvent<number>).detail;
      setAngularCounter(detail ?? 0);
    };

    node.addEventListener("valueChange", handleValueChange as EventListener);
    return () => {
      node.removeEventListener("valueChange", handleValueChange as EventListener);
    };
  }, [angularStatus]);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/assets/example-01/styles.css";
    document.head.append(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-12">
      <section className="space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Live component gallery
          </h1>
          <p className="text-slate-300">
            Each block below mounts the original custom elements from the
            playground projects—no rewrites, just real components running inside
            this Next.js shell.
          </p>
        </header>
      </section>

      <section className="space-y-4 rounded-3xl border border-slate-800/70 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/40">
        <header className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
            components/example-01
          </p>
          <h2 className="text-2xl font-semibold text-slate-50">
            Mercedes Oldtimers (vanilla custom elements)
          </h2>
          <p className="text-sm text-slate-300">
            Scripts load straight from the original folder and the component tree
            renders alongside this page.
          </p>
        </header>
        {OLD_TIMER_SCRIPTS.map((src, index) => (
          <Script
            key={src}
            id={`oldtimer-script-${index}`}
            src={src}
            strategy="afterInteractive"
          />
        ))}
        <div className="rounded-2xl border border-slate-800/80 bg-white/95 p-6 text-slate-900 shadow-inner">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Demo
          </p>
          <oldtimer-app></oldtimer-app>
          <CodeSnippet title="Usage" language="html">
            {`<oldtimer-app></oldtimer-app>`}
          </CodeSnippet>
        </div>
      </section>

      <section className="space-y-4 rounded-3xl border border-purple-500/30 bg-purple-500/10 p-6 shadow-lg shadow-purple-500/20">
        <header className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-purple-200/70">
            components/example-lit
          </p>
          <h2 className="text-2xl font-semibold text-purple-50">
            Lit todo list
          </h2>
          <p className="text-sm text-purple-100/80">
            Imported directly from the TypeScript sources and mounted in place.
          </p>
        </header>
        <div className="rounded-2xl border border-purple-500/30 bg-white/95 p-6 text-slate-900 shadow-inner">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-purple-500/80">
            Demo
          </p>
          <app-root></app-root>
          <CodeSnippet title="Usage" language="html">
            {`<todo-list></todo-list>`}
          </CodeSnippet>
        </div>
      </section>

      <section className="space-y-4 rounded-3xl border border-amber-500/30 bg-amber-500/10 p-6 shadow-lg shadow-amber-500/20">
        <header className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-100/80">
            components/fast-demo
          </p>
          <h2 className="text-2xl font-semibold text-amber-50">
            FAST composite card
          </h2>
          <p className="text-sm text-amber-100/80">
            The FAST Hello Card orchestrates child components and emits analytics
            events you can see reflected in the live stats.
          </p>
        </header>
        <div className="grid gap-4 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="rounded-2xl border border-amber-500/40 bg-white/95 p-6 text-slate-900 shadow-inner">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-500/80">
              Demo
            </p>
            {fastReady ? (
              <hello-card
                ref={setHelloCardNode}
                title="FAST hello-card"
                description="Composes info-banner, counter-badge, and toggle-switch from the FAST demo."
                cta="Trigger hello"
              ></hello-card>
            ) : (
              <p className="text-sm text-slate-500">Loading FAST components…</p>
            )}
            <CodeSnippet title="Usage" language="html">
              {`<hello-card
  title="FAST hello-card"
  description="Composes info-banner, counter-badge, and toggle-switch."
  cta="Trigger hello"
></hello-card>`}
            </CodeSnippet>
          </div>
          <div className="rounded-2xl border border-amber-500/40 bg-slate-950/40 p-6 text-amber-50">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-100/70">
              Interaction feed
            </p>
            <p className="text-sm">
              CTA clicks recorded: <span className="font-semibold">{fastCtaClicks}</span>
            </p>
            <p className="text-sm">
              Badge count: <span className="font-semibold">{fastBadgeCount}</span>
            </p>
            <p className="text-sm">
              Toggle status: <span className="font-semibold">{fastToggleOn ? "enabled" : "disabled"}</span>
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-3xl border border-fuchsia-500/30 bg-fuchsia-500/10 p-6 shadow-lg shadow-fuchsia-500/20">
        <header className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-fuchsia-100/80">
            components/stencil/example-component
          </p>
          <h2 className="text-2xl font-semibold text-fuchsia-50">
            Stencil counter button
          </h2>
          <p className="text-sm text-fuchsia-100/80">
            Loads the generated Stencil ESM bundle. Events bubble as documented,
            letting the host capture updates.
          </p>
        </header>
        <Script
          id="stencil-example-component"
          src={STENCIL_BUNDLE}
          type="module"
          strategy="afterInteractive"
          onLoad={() => setStencilReady(true)}
          onError={(error) => {
            console.error("Failed to load Stencil bundle", error);
          }}
        />
        <div className="grid gap-4 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="rounded-2xl border border-fuchsia-500/40 bg-white/95 p-6 text-slate-900 shadow-inner">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-fuchsia-500/80">
              Demo
            </p>
            {stencilReady ? (
              <counter-button
                ref={setStencilCounterNode}
                initial="2"
                description="Stencil element served from the example-component build."
              ></counter-button>
            ) : (
              <p className="text-sm text-slate-500">Loading Stencil bundle…</p>
            )}
            <div className="mt-4 rounded-xl border border-fuchsia-500/40 bg-fuchsia-500/20 p-4 text-sm text-fuchsia-50">
              Count from <code>countChange</code> events: <span className="font-semibold">{stencilCount}</span>
            </div>
            <CodeSnippet title="Usage" language="html">
              {`<counter-button initial="2"></counter-button>`}
            </CodeSnippet>
          </div>
          <div className="rounded-2xl border border-fuchsia-500/40 bg-white/90 p-6 text-slate-900 shadow-inner">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-fuchsia-500/80">
              Companion element
            </p>
            <my-component first="Stencil" middle="says" last="hello"></my-component>
            <p className="mt-3 text-sm text-slate-600">
              Both elements are rendered directly from <code>components/stencil/example-component</code>.
            </p>
            <CodeSnippet title="Usage" language="html">
              {`<my-component first="Stencil" middle="says" last="hello"></my-component>`}
            </CodeSnippet>
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-3xl border border-sky-500/30 bg-sky-500/10 p-6 shadow-lg shadow-sky-500/20">
        <header className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-200/70">
            components/react/my-react-router-app
          </p>
          <h2 className="text-2xl font-semibold text-sky-50">
            React registered custom elements
          </h2>
          <p className="text-sm text-sky-100/80">
            SSR-safe helpers from the React Router demo define these elements on
            demand. They’re the same modules the demo routes consume.
          </p>
        </header>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-sky-500/40 bg-white/95 p-6 text-slate-900 shadow-inner">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-500/80">
              Demo
            </p>
            {reactReady ? (
              <wc-greeting-card
                ref={setGreetingNode}
                headline="Reused custom element"
                message="Custom elements registered from the React demo."
              ></wc-greeting-card>
            ) : (
              <p className="text-sm text-slate-500">Loading custom elements…</p>
            )}
            <p className="mt-4 text-sm text-slate-500">
              CTA clicks captured: <span className="font-semibold text-slate-800">{greetingClicks}</span>
            </p>
            <CodeSnippet title="Usage" language="html">
              {`<wc-greeting-card
  headline="Reused custom element"
  message="Custom elements registered from the React demo."
></wc-greeting-card>`}
            </CodeSnippet>
          </div>
          <div className="rounded-2xl border border-sky-500/40 bg-white/95 p-6 text-slate-900 shadow-inner">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-500/80">
              Companion element
            </p>
            {reactReady ? (
              <react-callout-card heading="Slots & styling" tone="info">
                Shadow DOM CSS and slot content come straight from the React sample’s source.
              </react-callout-card>
            ) : (
              <p className="text-sm text-slate-500">Loading custom elements…</p>
            )}
            <CodeSnippet title="Usage" language="html">
              {`<react-callout-card heading="Slots & styling" tone="info">
  Content projected via slots goes here.
</react-callout-card>`}
            </CodeSnippet>
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-6 shadow-lg shadow-emerald-500/20">
        <header className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-100/80">
            components/kxl-wc
          </p>
          <h2 className="text-2xl font-semibold text-emerald-50">
            Angular Elements in isolation
          </h2>
          <p className="text-sm text-emerald-100/80">
            The Angular workspace registers custom elements that can be dropped into any host. Below we render them directly from the showcase app.
          </p>
        </header>
        <Script
          id="angular-elements-bundle"
          src={ANGULAR_BUNDLE}
          type="module"
          strategy="afterInteractive"
          onLoad={() => setAngularStatus("ready")}
          onError={() => setAngularStatus("missing")}
        />
        <div className="rounded-2xl border border-emerald-500/40 bg-white/95 p-6 text-slate-900 shadow-inner">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-500/80">
            Demo
          </p>
          {angularStatus === "ready" ? (
            <div className="space-y-4">
              <kxl-counter
                ref={setAngularCounterNode}
                step="2"
                value={angularCounter}
              ></kxl-counter>
              <kxl-metric-card
                label="Conversion rate"
                value="42%"
                change="5.4"
                annotation="Rolling 7-day"
              ></kxl-metric-card>
            </div>
          ) : angularStatus === "missing" ? (
            <p className="text-sm text-red-500">
              Angular elements bundle missing. Run <code>npm run build:elements</code> inside
              <code> components/kxl-wc</code> and reload.
            </p>
          ) : (
            <p className="text-sm text-slate-500">Loading Angular elements…</p>
          )}
          {angularStatus === "ready" && (
            <p className="mt-4 text-sm text-slate-600">
              Latest <code>valueChange</code> payload: <span className="font-semibold">{angularCounter}</span>
            </p>
          )}
          <CodeSnippet title="Usage" language="html">
            {`<kxl-counter step="2"></kxl-counter>`}
          </CodeSnippet>
        </div>
      </section>
    </div>
  );
}
