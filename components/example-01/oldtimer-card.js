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

class OldtimerCard extends HTMLElement {
  static get observedAttributes() {
    return ["model", "year", "favorite"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        .card { border: 1px solid var(--border, #e6e8eb); border-radius: 10px; background: var(--card, #fff); padding: 14px 16px; display: grid; grid-template-columns: 48px 1fr auto; gap: 12px; align-items: center; box-shadow: 0 1px 0 rgba(0,0,0,0.03); }
        .avatar { width: 48px; height: 48px; border-radius: 8px; display: grid; place-items: center; background: var(--accent-weak, #e0fbff); color: var(--accent, #0b7285); font-size: 22px; }
        .title { font-weight: 700; }
        .meta { color: var(--muted, #687076); font-size: 13px; }
        button { font: inherit; border: 1px solid var(--border, #e6e8eb); background: #fff; color: inherit; padding: 6px 10px; border-radius: 8px; cursor: pointer; }
        button[aria-pressed="true"] { background: var(--accent, #0b7285); color: #fff; border-color: var(--accent, #0b7285); }
      </style>
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
