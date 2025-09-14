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
class OldtimerList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        .grid { display: grid; gap: 12px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .empty { color: var(--muted, #687076); padding: 24px; text-align: center; }
        @media (max-width: 640px) {
          .grid { grid-template-columns: 1fr; }
        }
      </style>
      <div class="grid" part="grid"></div>
      <div class="empty" hidden>No results. Try a different search.</div>
    `;
    this._grid = this.shadowRoot.querySelector(".grid");
    this._empty = this.shadowRoot.querySelector(".empty");

    this.cars = [];
    this.favorites = new Set();
    this.query = "";

    this.addEventListener("toggle-favorite", (e) => {
      const id = e.detail?.id;
      if (!id) return;
      if (this.favorites.has(id)) this.favorites.delete(id);
      else this.favorites.add(id);
      this.render();
    });
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
    this._empty.hidden = list.length > 0;

    const html = list
      .map((car) => {
        const fav = this.favorites.has(car.id) ? "favorite" : "";
        const title = escapeHTML(`${car.model} (${car.year})`);
        const meta = escapeHTML(car.tagline);
        return `
          <oldtimer-card data-id="${escapeAttr(car.id)}" model="${escapeAttr(car.model)}" year="${escapeAttr(String(car.year))}" ${fav}>
            <span slot="title">${title}</span>
            <span slot="meta">${meta}</span>
          </oldtimer-card>
        `;
      })
      .join("");

    this._grid.innerHTML = html;

    this.dispatchEvent(
      new CustomEvent("list-rendered", {
        bubbles: true,
        composed: true,
        detail: { count: list.length },
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
