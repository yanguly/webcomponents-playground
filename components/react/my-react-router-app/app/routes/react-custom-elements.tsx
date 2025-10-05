import type { Route } from "./+types/react-custom-elements";
import { useEffect } from "react";
import { Link } from "react-router";
import { ensureReactCustomElements } from "../web-components/registerReactCustomElements";

export const meta: Route.MetaFunction = () => [
  { title: "React Custom Elements" },
  {
    name: "description",
    content:
      "Examples that show how to register and render custom elements inside a React component tree.",
  },
];

export default function ReactCustomElementsPage() {
  useEffect(() => {
    ensureReactCustomElements();
  }, []);

  return (
    <main className="container mx-auto max-w-5xl px-4 py-16 space-y-16">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-purple-600 dark:text-purple-400">
          React & Web Components
        </p>
        <h1 className="text-4xl font-bold">
          Custom HTML elements inside React
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-200 max-w-3xl">
          Modern React is happy to render custom elements just like native tags.
          Once a web component is registered in the browser, JSX can reference
          it directly, pass props as attributes, and listen for DOM events
          without extra wrappers.
        </p>
      </header>

      <section className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(280px,320px)]">
        <article className="space-y-6">
          <h2 className="text-2xl font-semibold">Example 1 · Badge counter</h2>
          <p className="text-gray-700 dark:text-gray-300">
            This badge element exposes the <code>label</code> and{" "}
            <code>count</code> attributes. React renders it like any other
            component, and the element&apos;s Shadow DOM handles the
            presentation.
          </p>
          <pre className="overflow-auto rounded-xl bg-slate-900 p-4 text-sm text-slate-100">
            <code>
              {`import { useEffect } from "react";
import { ensureReactCustomElements } from "./web-components/registerReactCustomElements";

export function SubscribersBadge() {
  useEffect(() => {
    ensureReactCustomElements();
  }, []);

  return (
    <react-badge-pill label="Active subscribers" count="128" />
  );
}`}
            </code>
          </pre>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Tip: call your registration helper once (for example in a root
            layout or via lazy effect) so the element definitions run
            client-side only.
          </p>
        </article>
        <div className="flex items-center justify-center">
          <react-badge-pill label="Active subscribers" count="128" />
        </div>
      </section>

      <section className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
        <article className="space-y-6">
          <h2 className="text-2xl font-semibold">
            Example 2 · Callout card with slots
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Slots make it easy to project React children into a custom element.
            Here, React passes the body copy as children while the element
            controls its heading and tone via attributes.
          </p>
          <pre className="overflow-auto rounded-xl bg-slate-900 p-4 text-sm text-slate-100">
            <code>
              {`export function InfoCallout({ children }: { children: React.ReactNode }) {
  return (
    <react-callout-card heading="Deployment ready" tone="success">
      {children}
    </react-callout-card>
  );
}`}
            </code>
          </pre>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Custom events can be forwarded via <code>addEventListener</code> or
            refs if the element fires DOM events you want to consume in React.
          </p>
        </article>
        <div className="flex items-center justify-center">
          <react-callout-card heading="Deployment ready" tone="success">
            Ship the same component library to different frameworks by defining
            it once as a web component.
          </react-callout-card>
        </div>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-6 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-400">
        <Link
          to="/web-components"
          className="hover:text-blue-600 dark:hover:text-blue-400"
        >
          ← View the basic Web Components demo
        </Link>
        <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">
          Back to the welcome page
        </Link>
      </footer>
    </main>
  );
}
