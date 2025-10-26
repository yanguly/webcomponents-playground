import { showcases } from "@/data/showcases";

const accentStyles = [
  "from-indigo-500/25 via-slate-950 to-slate-950 border-indigo-400/50",
  "from-sky-500/25 via-slate-950 to-slate-950 border-sky-400/50",
  "from-emerald-500/25 via-slate-950 to-slate-950 border-emerald-400/50",
  "from-violet-500/25 via-slate-950 to-slate-950 border-violet-400/50",
];

function StackBadge({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-slate-700/70 bg-slate-800/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-300">
      {label}
    </span>
  );
}

function CodeBlock({
  language,
  snippet,
}: {
  language: string;
  snippet: string;
}) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/75">
      <figcaption className="flex items-center justify-between border-b border-slate-800/70 bg-slate-900/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        <span>{language.toUpperCase()}</span>
      </figcaption>
      <pre className="overflow-x-auto p-4 text-sm text-slate-100">
        <code>{snippet}</code>
      </pre>
    </figure>
  );
}

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="mx-auto max-w-6xl px-6 pb-12 pt-16 sm:pt-24">
        <div className="flex flex-col gap-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Web Components Playground
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Component showcase powered by Next.js
          </h1>
          <p className="max-w-3xl text-lg text-slate-300 sm:text-xl">
            Explore how each example in this repository wires components
            together—vanilla custom elements, Lit, Stencil, FAST, Angular
            Elements, and React Router demos all in one highlight reel.
          </p>
          <p className="text-sm text-slate-400">
            Browse the sections below to inspect component hierarchies, see how
            events flow between custom elements, and grab ready-to-share code
            snippets.
          </p>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-24">
        {showcases.map((entry, index) => {
          const accent =
            accentStyles[index % accentStyles.length] ??
            accentStyles[accentStyles.length - 1];
          return (
            <section
              key={entry.id}
              id={entry.id}
              className="scroll-mt-24"
              aria-labelledby={`${entry.id}-title`}
            >
              <div
                className={`rounded-3xl border bg-gradient-to-br ${accent} p-8 shadow-xl transition hover:border-slate-100/50 sm:p-10`}
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-3">
                      <h2
                        id={`${entry.id}-title`}
                        className="text-2xl font-semibold tracking-tight sm:text-3xl"
                      >
                        {entry.title}
                      </h2>
                      <p className="max-w-2xl text-base text-slate-200 sm:text-lg">
                        {entry.tagline}
                      </p>
                      <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                        <span className="text-slate-300">Repository path:</span>{" "}
                        <code>{entry.repoPath}</code>
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {entry.stack.map((item) => (
                        <StackBadge key={item} label={item} />
                      ))}
                    </div>
                  </div>

                  <p className="max-w-3xl text-sm leading-relaxed text-slate-100 sm:text-base">
                    {entry.description}
                  </p>

                  <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-10">
                    <div className="space-y-8">
                      <div className="space-y-3">
                        <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                          Highlights
                        </h3>
                        <ul className="space-y-2 text-sm text-slate-100 sm:text-base">
                          {entry.highlights.map((highlight) => (
                            <li
                              key={highlight}
                              className="flex items-start gap-3 leading-relaxed"
                            >
                              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-200" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                          Component communication
                        </h3>
                        <ul className="space-y-2 text-sm text-slate-100 sm:text-base">
                          {entry.interactions.map((interaction) => (
                            <li
                              key={interaction.title}
                              className="flex flex-col gap-1 rounded-xl border border-slate-800/80 bg-slate-900/70 px-4 py-3"
                            >
                              <span className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">
                                {interaction.title}
                              </span>
                              <span className="text-slate-100">
                                {interaction.detail}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                          Code examples
                        </h3>
                        <div className="grid gap-4 md:grid-cols-2">
                          {entry.codeSnippets.map((snippet) => (
                            <div
                              className="flex flex-col gap-2"
                              key={snippet.title}
                            >
                              <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                                {snippet.title}
                              </p>
                              <CodeBlock
                                language={snippet.language}
                                snippet={snippet.snippet}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <aside className="space-y-8">
                      <div className="space-y-3">
                        <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                          Key components
                        </h3>
                        <ul className="space-y-3 text-sm text-slate-100 sm:text-base">
                          {entry.components.map((component) => (
                            <li
                              key={component.file}
                              className="rounded-lg border border-slate-800/70 bg-slate-900/60 p-4"
                            >
                              <p className="text-sm font-semibold text-slate-100">
                                {component.name}
                              </p>
                              <p className="text-xs text-slate-300">
                                {component.description}
                              </p>
                              <p className="mt-2 text-[11px] uppercase tracking-[0.26em] text-slate-500">
                                <code>{component.file}</code>
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {entry.resources && entry.resources.length > 0 && (
                        <div className="space-y-3">
                          <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                            Resources
                          </h3>
                          <ul className="space-y-2 text-sm text-slate-200">
                            {entry.resources.map((resource) => (
                              <li key={resource.path}>
                                <a
                                  href={`https://github.com/yanguly/webcomponents-playground/tree/main/${resource.path}`}
                                  target="_blank"
                                  rel="noreferrer noopener"
                                  className="inline-flex items-center gap-2 text-sky-300 transition hover:text-sky-200"
                                >
                                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-200/80">
                                    {resource.label}
                                  </span>
                                  <code className="rounded bg-slate-900/70 px-2 py-1 text-[11px] uppercase tracking-[0.22em] text-slate-400">
                                    {resource.path}
                                  </code>
                                </a>
                                {resource.note && (
                                  <p className="mt-1 text-xs text-slate-400">
                                    {resource.note}
                                  </p>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </aside>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </main>

      <footer className="border-t border-slate-900/70 bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Built with Next.js to surface every web component example in this
            workspace.
          </p>
          <p>
            Run{" "}
            <code className="rounded bg-slate-900/70 px-2 py-1">
              npm run dev
            </code>{" "}
            inside <code>showcase</code> to explore locally.
          </p>
        </div>
      </footer>
    </div>
  );
}
