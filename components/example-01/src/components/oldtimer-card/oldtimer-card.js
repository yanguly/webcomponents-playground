/**
 * OldtimerCard web component: compact card UI for an "oldtimer" with a favorite toggle.
 *
 * @class OldtimerCard
 * @extends HTMLElement
 * @description Displays model/year content via slots and exposes a favorite toggle.
 *
 * @attribute {string} model    - model name (prefers slot "title")
 * @attribute {string} year     - year or meta info (prefers slot "meta")
 * @attribute {boolean} favorite - presence indicates item is favorited
 *
 * @fires toggle-favorite - Dispatched when the favorite button is clicked. event.detail = { id: string } (reads data-id attribute)
 */

// Resolve CSS URL at script evaluation time (document.currentScript is available here)
const OLDTIMER_CARD_CSS = new URL(
  "./oldtimer-card.css",
  (document.currentScript && document.currentScript.src) || location.href,
).href;

class OldtimerCard extends HTMLElement {
  static get observedAttributes() {
    return ["model", "year", "favorite"];
  }

  constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });

    // Build CSS URL relative to this script file (works with classic scripts)
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = OLDTIMER_CARD_CSS;

    root.append(link);
    this.shadowRoot.innerHTML += `
      <article class="card" part="card">
        <div class="avatar" aria-hidden="true">🚗</div>
        <div class="content">
          <div class="title"><slot name="title"></slot></div>
          <div class="meta"><slot name="meta"></slot></div>
        </div>
        <button part="favorite" type="button" aria-pressed="false" title="Toggle favorite" aria-label="Toggle favorite">☆ Favorite</button>
      </article>
    `;
    this._btn = this.shadowRoot.querySelector("button");
    this._onToggle = this._onToggle.bind(this);
  }

  connectedCallback() {
    this._btn.addEventListener("click", this._onToggle);
    this._render();
  }
  disconnectedCallback() {
    this._btn.removeEventListener("click", this._onToggle);
  }
  attributeChangedCallback() {
    this._render();
  }

  get model() {
    return this.getAttribute("model") ?? "";
  }
  get year() {
    return this.getAttribute("year") ?? "";
  }
  get favorite() {
    return this.hasAttribute("favorite");
  }
  set favorite(v) {
    v ? this.setAttribute("favorite", "") : this.removeAttribute("favorite");
  }

  _onToggle() {
    const id = this.getAttribute("data-id");
    this.dispatchEvent(
      new CustomEvent("toggle-favorite", {
        bubbles: true,
        composed: true,
        detail: { id },
      }),
    );
  }

  _render() {
    this._btn.setAttribute("aria-pressed", String(this.favorite));
    this._btn.textContent = this.favorite ? "★ Favorited" : "☆ Favorite";
    const label = `Toggle favorite for ${this.model || "this car"}`;
    this._btn.setAttribute("aria-label", label);
  }
}

customElements.define("oldtimer-card", OldtimerCard);
