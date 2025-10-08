import { FASTElement, css, customElement, html } from "@microsoft/fast-element";

const template = html<HomePage>`
  <section class="hero">
    <div class="hero__copy">
      <p class="eyebrow">Welcome aboard</p>
      <h1>Build polished web components with FAST.</h1>
      <p class="lede">
        This playground stitches together Microsoft FAST Element, the official
        router, and a handful of custom widgets so you can see the pieces
        working in concert.
      </p>
      <div class="hero__actions">
        <a class="cta" href="/showcase">Open showcase</a>
        <a
          class="ghost"
          href="https://fast.design"
          target="_blank"
          rel="noreferrer"
        >
          FAST docs ↗
        </a>
      </div>
    </div>

    <ul class="feature-grid" role="list">
      <li>
        <h2>Reactive templates</h2>
        <p>
          Observe how <code>@observable</code> and property bindings keep state
          and DOM in sync without manual updates.
        </p>
      </li>
      <li>
        <h2>Router-first shell</h2>
        <p>
          Navigate between pages powered by
          <code>@microsoft/fast-router</code> and watch nav pills update
          automatically.
        </p>
      </li>
      <li>
        <h2>Composable widgets</h2>
        <p>
          Slot together banners, counters, and toggles inside the
          <code>hello-card</code> to craft richer experiences.
        </p>
      </li>
    </ul>
  </section>
`;

const styles = css`
  :host {
    display: block;
    width: 100%;
  }

  .hero {
    display: grid;
    gap: 2.5rem;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    justify-items: center;
  }

  .hero__copy {
    display: grid;
    gap: 1.1rem;
    text-align: center;
  }

  .eyebrow {
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-weight: 600;
    font-size: 0.75rem;
    color: rgba(15, 23, 42, 0.6);
  }

  h1 {
    margin: 0;
    font-size: clamp(2.4rem, 4vw, 3.1rem);
    line-height: 1.1;
  }

  .lede {
    margin: 0;
    font-size: 1.1rem;
    line-height: 1.7;
    color: rgba(15, 23, 42, 0.72);
  }

  .hero__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
  }

  .cta,
  .ghost {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.6rem;
    border-radius: 999px;
    font-weight: 600;
    text-decoration: none;
    transition:
      transform 120ms ease,
      box-shadow 120ms ease;
  }

  .cta {
    background: #3665ff;
    color: white;
    box-shadow: 0 18px 36px rgba(54, 101, 255, 0.3);
  }

  .cta:hover {
    transform: translateY(-1px);
    box-shadow: 0 22px 42px rgba(54, 101, 255, 0.35);
  }

  .ghost {
    color: #0f172a;
    background: rgba(15, 23, 42, 0.05);
    box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
  }

  .ghost:hover {
    transform: translateY(-1px);
    box-shadow: 0 16px 28px rgba(15, 23, 42, 0.12);
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.4rem;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .feature-grid li {
    display: grid;
    gap: 0.6rem;
    padding: 1.4rem;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 18px 48px rgba(15, 23, 42, 0.12);
    justify-items: center;
    text-align: center;
  }

  .feature-grid h2 {
    margin: 0;
    font-size: 1.2rem;
  }

  .feature-grid p {
    margin: 0;
    line-height: 1.6;
    color: rgba(15, 23, 42, 0.7);
  }

  code {
    padding: 0.1rem 0.3rem;
    border-radius: 6px;
    background: rgba(15, 23, 42, 0.08);
  }

  @media (max-width: 640px) {
    .feature-grid li {
      text-align: left;
      justify-items: start;
    }
  }
`;

@customElement({ name: "demo-home-page", template, styles })
export class HomePage extends FASTElement {}
