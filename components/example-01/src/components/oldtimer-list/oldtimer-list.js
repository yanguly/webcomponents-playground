/**
 * <oldtimer-list>
 * List renderer for <oldtimer-card> items.
 *
 * @property {Array<{id:string, model:string, year:number, tagline:string}>} cars
 * @property {Set<string>} favorites
 * @property {string} query
 * @property {Array<object>} filteredCars
 * @fires list-rendered {detail:{count:number}}
 * @listens toggle-favorite
 */
const OLDTIMER_LIST_CSS = new URL(
  "./oldtimer-list.css",
  (document.currentScript && document.currentScript.src) || location.href,
).href;

class OldtimerList extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = OLDTIMER_LIST_CSS;
    root.append(link);

    this.shadowRoot.innerHTML += `
      <div class="grid" part="grid"></div>
      <div class="empty" hidden>No results. Try a different search.</div>
    `;
    this._grid = this.shadowRoot.querySelector(".grid");
    this._empty = this.shadowRoot.querySelector(".empty");

    this.cars = [];
    this.favorites = new Set();
    this.query = "";

    this.addEventListener("toggle-favorite", this._onToggleFavorite.bind(this));
  }

  get filteredCars() {
    const q = (this.query || "").toLowerCase();
    if (!q) return this.cars;
    return this.cars.filter(
      (c) => c.model.toLowerCase().includes(q) || String(c.year).includes(q),
    );
  }

  render() {
    const list = this.filteredCars;
    this._updateEmptyState(list.length);
    this._renderGrid(list);
    this._emitRendered(list.length);
  }

  // ===== Private helpers =====
  _onToggleFavorite(e) {
    const id = e.detail?.id;
    if (!id) return;
    const wasFav = this.favorites.has(id);
    if (wasFav) this.favorites.delete(id);
    else this.favorites.add(id);

    const card = this._findCardFromEvent(e);
    if (card) card.toggleAttribute("favorite", !wasFav);

    this._emitRendered(this.filteredCars.length);
  }

  _findCardFromEvent(e) {
    const path = typeof e.composedPath === "function" ? e.composedPath() : [];
    return path.find(
      (n) => n && n.nodeType === 1 && n.tagName === "OLDTIMER-CARD",
    );
  }

  _renderGrid(list) {
    const html = list.map((car) => this._cardHTML(car)).join("");
    this._grid.innerHTML = html;
  }

  _cardHTML(car) {
    const favAttr = this.favorites.has(car.id) ? "favorite" : "";
    const title = escapeHTML(`${car.model} (${car.year})`);
    const meta = escapeHTML(car.tagline);
    return `
      <oldtimer-card data-id="${escapeAttr(car.id)}" model="${escapeAttr(car.model)}" year="${escapeAttr(String(car.year))}" ${favAttr}>
        <span slot="title">${title}</span>
        <span slot="meta">${meta}</span>
      </oldtimer-card>
    `;
  }

  _updateEmptyState(count) {
    this._empty.hidden = count > 0;
  }

  _emitRendered(count) {
    this.dispatchEvent(
      new CustomEvent("list-rendered", {
        bubbles: true,
        composed: true,
        detail: { count },
      }),
    );
  }
}

// Escaping helpers used by the declarative renderer
function escapeHTML(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
function escapeAttr(s) {
  return escapeHTML(s);
}

customElements.define("oldtimer-list", OldtimerList);
