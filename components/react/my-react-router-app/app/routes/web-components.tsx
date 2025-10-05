import type { Route } from "./+types/web-components";
import { useEffect } from "react";
import { Link } from "react-router";
import { ensureGreetingElement } from "../web-components/registerGreetingElement";

export const meta: Route.MetaFunction = () => [
  { title: "Web Components in React" },
  {
    name: "description",
    content: "Demo of using a custom element inside a React Router page.",
  },
];

export default function WebComponentsPage() {
  useEffect(() => {
    ensureGreetingElement();
  }, []);

  return (
    <main className="container mx-auto px-4 py-16 max-w-4xl">
      <header className="space-y-2 mb-10">
        <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wide">
          Web Components
        </p>
        <h1 className="text-4xl font-bold">
          Mixing Stencil-style elements with React
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-200 max-w-2xl">
          React renders HTML elements the same way it renders custom elements.
          This page registers a
          <code className="mx-1 rounded bg-gray-100 px-2 py-1 text-sm dark:bg-gray-800">
            wc-greeting-card
          </code>
          element and then uses it directly inside JSX.
        </p>
      </header>

      <section className="grid gap-12 md:grid-cols-[minmax(0,1fr)_auto] items-start">
        <article className="space-y-6">
          <h2 className="text-2xl font-semibold">Why it works</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              Custom elements use the DOM API, so React simply hands off
              rendering once the element is defined.
            </li>
            <li>
              You can share design system components across frameworks by
              defining them once and consuming them in React, Stencil, Vue, or
              elsewhere.
            </li>
            <li>
              Render props, attributes, and events work with the standard Web
              Components APIs.
            </li>
          </ul>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Tip: register your elements in a module that guards against SSR and
            double registration, just like this example&apos;s{" "}
            <code>ensureGreetingElement</code> helper.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring"
          >
            ← Back home
          </Link>
        </article>

        <div className="sticky top-20">
          <wc-greeting-card
            headline="Stencil-ready Web Component"
            message="React Router renders this card while the custom element handles styling with Shadow DOM."
          ></wc-greeting-card>
        </div>
      </section>
    </main>
  );
}
