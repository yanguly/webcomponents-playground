import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";

export class TodoItem extends LitElement {
  static styles = css`
    .item {
      padding: 0.5rem 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: #f9f9f9;
    }

    .done {
      text-decoration: line-through;
      color: #888;
    }
  `;

  @property({ type: String }) text = "";
  @property({ type: Boolean }) done = false;

  render() {
    return html`
      <div
        class="item ${this.done ? "done" : ""}"
        role="checkbox"
        aria-checked=${this.done ? "true" : "false"}
        tabindex="0"
        @click=${this.#onActivate}
        @keydown=${this.#onKeyDown}
      >
        ${this.text}
      </div>
    `;
  }

  #emitToggle() {
    this.dispatchEvent(
      new CustomEvent("toggle", { bubbles: true, composed: true })
    );
  }

  #onActivate = () => {
    this.#emitToggle();
  };

  #onKeyDown = (e: KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      this.#emitToggle();
    }
  };
}

customElements.define("todo-item", TodoItem);
