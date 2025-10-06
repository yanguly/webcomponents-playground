import {
  FASTElement,
  attr,
  css,
  html,
  customElement,
} from "@microsoft/fast-element";

const template = html<ToggleSwitch>`
  <label>
    <input
      type="checkbox"
      :checked=${(x) => x.on}
      @change=${(x, c) => x.handleChange(c.event as Event)}
    />
    <span class="track" part="track">
      <span class="thumb" part="thumb"></span>
    </span>
    <slot></slot>
  </label>
`;

const styles = css`
  :host {
    display: inline-block;
    font: inherit;
  }
  label {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }
  input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
  .track {
    position: relative;
    width: 2.5rem;
    height: 1.25rem;
    border-radius: 999px;
    background: rgba(54, 132, 255, 0.3);
    transition: background 140ms ease;
    display: inline-flex;
    align-items: center;
    padding: 0 0.15rem;
  }
  .thumb {
    width: 0.95rem;
    height: 0.95rem;
    border-radius: 50%;
    background: white;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    transform: translateX(0);
    transition: transform 140ms ease;
  }
  :host([on]) .track {
    background: rgba(54, 132, 255, 0.85);
  }
  :host([on]) .thumb {
    transform: translateX(1.55rem);
  }
`;

@customElement({ name: "toggle-switch", template, styles })
export class ToggleSwitch extends FASTElement {
  @attr({ mode: "boolean" }) on = false;

  handleChange(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.on = checked;
    console.info("toggle-switch: change", { on: checked });
    this.$emit(
      "toggle-change",
      { on: checked },
      { bubbles: true, composed: true },
    );
  }
}
