import {
  FASTElement,
  attr,
  css,
  html,
  customElement,
  observable,
} from "@microsoft/fast-element";

import "./info-banner";
import "./counter-badge";
import "./toggle-switch";

type CountChangeDetail = { count: number };
type ToggleChangeDetail = { on: boolean };

const template = html<HelloCard>`
  <article>
    <header>
      <p class="eyebrow">Playground Showcase</p>
      <h2>${(x) => x.title}</h2>
      <p class="description">${(x) => x.description}</p>
    </header>

    <section class="preview">
      <info-banner
        variant="success"
        heading="FAST components wired up"
        message="Toggle the controls below to see live updates."
      ></info-banner>

      <div class="widgets">
        <counter-badge
          label="CTA clicks"
          button-label="Add click"
          :count=${(x) => x.clickCount}
          @count-change=${(x, c) =>
            x.handleCountChange(c.event as CustomEvent<CountChangeDetail>)}
        ></counter-badge>
        <toggle-switch
          class="just-toggle"
          :on=${(x) => x.toggled}
          @toggle-change=${(x, c) =>
            x.handleToggleChange(c.event as CustomEvent<ToggleChangeDetail>)}
        >
          Just toggle
        </toggle-switch>
      </div>
    </section>

    <footer>
      <button class="cta" @click=${(x) => x.handleClick()}>
        ${(x) => x.cta}
      </button>
      <p class="status">
        Clicks recorded: ${(x) => x.clickCount}
        <span aria-hidden="true">•</span>
        Toggle is ${(x) => (x.toggled ? "enabled" : "disabled")}
      </p>
    </footer>

    <slot></slot>
  </article>
`;

const styles = css`
  :host {
    display: block;
    font: inherit;
  }

  article {
    display: grid;
    gap: 1.25rem;
    padding: 2rem;
    border-radius: 18px;
    background: linear-gradient(
      135deg,
      rgba(54, 132, 255, 0.18),
      rgba(54, 132, 255, 0.04)
    );
    border: 1px solid rgba(54, 132, 255, 0.25);
    box-shadow: 0 20px 45px rgba(15, 23, 42, 0.18);
    color: inherit;
    max-width: 640px;
  }

  header {
    display: grid;
    gap: 0.35rem;
    text-align: left;
  }

  .eyebrow {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 0;
    color: rgba(15, 23, 42, 0.6);
  }

  h2 {
    margin: 0;
    font-size: 1.6rem;
  }

  .description {
    margin: 0;
    color: rgba(15, 23, 42, 0.72);
  }

  .hint {
    margin: 0;
    color: rgba(15, 23, 42, 0.7);
  }

  .preview {
    display: grid;
    gap: 1rem;
  }

  .widgets {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: center;
  }

  .just-toggle {
    font-weight: 500;
  }

  footer {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: space-between;
    align-items: center;
  }

  .cta {
    padding: 0.75rem 1.4rem;
    border-radius: 12px;
    border: none;
    background: #3665ff;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition:
      transform 120ms ease,
      box-shadow 120ms ease;
    box-shadow: 0 14px 28px rgba(54, 101, 255, 0.32);
  }

  .cta:hover {
    transform: translateY(-1px);
    box-shadow: 0 18px 32px rgba(54, 101, 255, 0.38);
  }

  .status {
    margin: 0;
    font-size: 0.95rem;
    color: rgba(15, 23, 42, 0.65);
  }

  slot::slotted(*) {
    margin-top: 0.5rem;
    display: block;
  }

  @media (max-width: 540px) {
    article {
      padding: 1.5rem;
    }

    footer {
      flex-direction: column;
      align-items: flex-start;
    }

    .cta {
      width: 100%;
      text-align: center;
    }
  }
`;

@customElement({ name: "hello-card", template, styles })
export class HelloCard extends FASTElement {
  @attr title = "FAST Hello";
  @attr description =
    "A composed card that nests multiple FAST-based web components.";
  @attr cta = "Trigger hello";

  @observable clickCount = 0;
  @observable toggled = false;

  handleClick() {
    // Emit a custom "hello-click" once the CTA increments the local counter.
    this.clickCount += 1;
    console.info("hello-card: cta click", { clicks: this.clickCount });
    this.$emit("hello-click", { at: Date.now(), clicks: this.clickCount });
  }

  handleCountChange(event: CustomEvent<CountChangeDetail>) {
    if (typeof event.detail?.count === "number") {
      // Sync the badge's counter back into the host component state.
      this.clickCount = event.detail.count;
      console.info("hello-card: count-change", { count: this.clickCount });
    }
  }

  handleToggleChange(event: CustomEvent<ToggleChangeDetail>) {
    if (typeof event.detail?.on === "boolean") {
      // Mirror the toggle child component so templates react to the boolean.
      this.toggled = event.detail.on;
      console.info("hello-card: toggle-change", { toggled: this.toggled });
    }
  }
}
