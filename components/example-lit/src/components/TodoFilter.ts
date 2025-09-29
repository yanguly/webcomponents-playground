import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import { formControlStyles } from "./styles/formControls";

/**
 * Search input element that notifies listeners
 */
export class TodoFilter extends LitElement {
  static styles = [
    formControlStyles,
    css`
      :host {
        display: block;
        margin-bottom: 1rem;
      }

      label {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        font: inherit;
        color: inherit;
      }

      .text-field {
        min-width: 0;
      }
    `,
  ];

  @property({ type: String }) value = "";
  @property({ type: String }) placeholder = "";
  @property({ type: String }) label = "Filter todos";

  render() {
    return html`
      <label>
        <span>${this.label}</span>
        <input
          class="text-field"
          type="text"
          .value=${this.value}
          placeholder=${this.placeholder}
          @input=${this.#onInput}
          aria-label=${this.label}
        />
      </label>
    `;
  }

  #onInput = (event: Event) => {
    const nextValue = (event.target as HTMLInputElement).value;
    this.value = nextValue;
    this.dispatchEvent(
      new CustomEvent("filter-change", {
        detail: { value: nextValue },
        bubbles: true,
        composed: true,
      })
    );
  };
}

customElements.define("todo-filter", TodoFilter);
