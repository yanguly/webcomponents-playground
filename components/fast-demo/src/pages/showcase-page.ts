import {
  FASTElement,
  css,
  customElement,
  html,
  observable,
} from "@microsoft/fast-element";
import "../hello-card";

const template = html<ShowcasePage>`
  <section class="showcase">
    <div class="panel">
      <header class="panel__header">
        <h1>Interactive Showcase</h1>
        <p>
          Toggle state, emit custom events, and increment counters to see how
          composed FAST elements talk to each other.
        </p>
      </header>

      <div class="panel__content">
        <hello-card
          title="FAST Playground"
          description="Experiment with a composed web component that nests other FAST elements."
          cta="Send hello"
          @hello-click=${(x, c) => x.handleHello(c.event as CustomEvent)}
        >
          <p class="hint">
            <strong>Tip:</strong> Use the toggle and counter to see how child
            components bubble events back up.
          </p>
        </hello-card>

        <aside class="panel__aside">
          <div class="stat">
            <p class="stat__label">Manual counter</p>
            <button type="button" @click=${(x) => x.incrementCounter()}>
              count is ${(x) => x.counter}
            </button>
          </div>
          <div class="stat">
            <p class="stat__label">Last hello event</p>
            <output class="event-log" aria-live="polite">
              ${(x) =>
                x.lastHello
                  ? new Date(x.lastHello).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })
                  : "—"}
            </output>
          </div>
          <p class="footnote">
            The classic counter demo below mirrors the Vite starter so you can
            compare imperative vs. reactive approaches.
          </p>
        </aside>
      </div>
    </div>
  </section>
`;

const styles = css`
  :host {
    display: block;
    width: 100%;
  }

  .showcase {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .panel {
    width: 100%;
    max-width: 960px;
    display: grid;
    gap: 1.75rem;
  }

  .panel__header {
    display: grid;
    gap: 0.6rem;
    text-align: center;
  }

  .panel__header h1 {
    margin: 0;
    font-size: clamp(2rem, 3vw, 2.6rem);
  }

  .panel__header p {
    margin: 0;
    color: rgba(15, 23, 42, 0.7);
  }

  .panel__content {
    display: grid;
    gap: 1.5rem;
    align-items: start;
    grid-template-columns: minmax(0, 2fr) minmax(220px, 1fr);
  }

  .panel__aside {
    display: grid;
    gap: 1rem;
    padding: 1.4rem;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.75);
    box-shadow: 0 16px 40px rgba(15, 23, 42, 0.14);
  }

  .stat {
    display: grid;
    gap: 0.4rem;
  }

  .stat__label {
    margin: 0;
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(15, 23, 42, 0.55);
  }

  .hint,
  .footnote {
    margin: 0;
    color: rgba(15, 23, 42, 0.7);
  }

  button {
    border-radius: 999px;
    border: none;
    padding: 0.6em 1.4em;
    font-size: 1rem;
    font-weight: 600;
    font-family: inherit;
    background: rgba(54, 132, 255, 0.15);
    color: #0f172a;
    cursor: pointer;
    transition:
      transform 120ms ease,
      box-shadow 120ms ease;
    box-shadow: 0 12px 26px rgba(54, 132, 255, 0.18);
  }

  button:hover {
    transform: translateY(-1px);
    box-shadow: 0 18px 34px rgba(54, 132, 255, 0.24);
  }

  button:focus,
  button:focus-visible {
    outline: 2px solid rgba(54, 101, 255, 0.6);
    outline-offset: 3px;
  }

  .event-log {
    font-size: 1.1rem;
    font-weight: 600;
  }

  @media (max-width: 860px) {
    .panel__content {
      grid-template-columns: 1fr;
    }

    .panel__aside {
      order: -1;
    }
  }
`;

@customElement({ name: "demo-showcase-page", template, styles })
export class ShowcasePage extends FASTElement {
  @observable lastHello: number | null = null;
  @observable counter = 0;

  handleHello(event: CustomEvent) {
    this.lastHello = event.detail?.at ?? Date.now();
  }

  incrementCounter() {
    // Keep the counter reactive so the label updates without touching the DOM manually.
    this.counter += 1;
  }
}
