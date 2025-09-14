/**
 * OldtimerFilter web component: a search input with a live result count.
 *
 * @class OldtimerFilter
 * @extends {HTMLElement}
 * @fires filter-change - Dispatched on user input; event.detail = { query: string }
 * @property {string} query - Readonly trimmed input value.
 * @property {number|null} resultCount - Setter to update displayed result count; null clears it.
 */
const OLDTIMER_FILTER_CSS = new URL(
  "./oldtimer-filter.css",
  (document.currentScript && document.currentScript.src) || location.href,
).href;

class OldtimerFilter extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = OLDTIMER_FILTER_CSS;
    root.append(link);

    this.shadowRoot.innerHTML += `
      <div class="wrap">
        <input type="search" placeholder="Filter by model or year…" aria-label="Filter cars" />
        <div class="count" aria-live="polite"></div>
      </div>
    `;
    this._input = this.shadowRoot.querySelector("input");
    this._count = this.shadowRoot.querySelector(".count");
    this._onInput = this._onInput.bind(this);
  }
  connectedCallback() {
    this._input.addEventListener("input", this._onInput);
  }
  disconnectedCallback() {
    this._input.removeEventListener("input", this._onInput);
  }
  set resultCount(n) {
    this._count.textContent =
      n == null ? "" : `${n} result${n === 1 ? "" : "s"}`;
  }
  get query() {
    return this._input.value.trim();
  }
  _onInput() {
    this.dispatchEvent(
      new CustomEvent("filter-change", {
        bubbles: true,
        composed: true,
        detail: { query: this.query },
      }),
    );
  }
}

customElements.define("oldtimer-filter", OldtimerFilter);
