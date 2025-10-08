import {
  FASTElement,
  attr,
  css,
  html,
  customElement,
} from "@microsoft/fast-element";

// Converter keeps the public attribute API string-based while exposing numbers to the component.
const numberConverter = {
  fromView(value: string | null): number {
    return value === null ? 0 : Number(value);
  },
  toView(value: number): string {
    return String(Number.isFinite(value) ? value : 0);
  },
};

const template = html<CounterBadge>`
  <article>
    <span>${(x) => x.label}</span>
    <strong>${(x) => x.count}</strong>
    <button @click=${(x) => x.increment()}>${(x) => x.buttonLabel}</button>
  </article>
`;

const styles = css`
  :host {
    display: inline-block;
    font: inherit;
  }
  article {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.45rem 0.75rem;
    border-radius: 999px;
    background: rgba(54, 132, 255, 0.12);
    border: 1px solid rgba(54, 132, 255, 0.35);
  }
  strong {
    font-variant-numeric: tabular-nums;
    min-width: 2ch;
    text-align: right;
  }
  button {
    padding: 0.25rem 0.65rem;
    border-radius: 12px;
    cursor: pointer;
  }
`;

@customElement({ name: "counter-badge", template, styles })
export class CounterBadge extends FASTElement {
  @attr label = "Count";
  @attr({ attribute: "button-label" }) buttonLabel = "+1";
  @attr({ converter: numberConverter }) count = 0;

  increment() {
    const base = Number.isFinite(this.count) ? this.count : 0;
    const nextCount = base + 1;
    this.count = nextCount;
    console.info("counter-badge: increment", { nextCount, label: this.label });
    // Bubble an event so host components can stay in sync with the badge.
    this.$emit(
      "count-change",
      { count: nextCount },
      { bubbles: true, composed: true },
    );
  }
}
