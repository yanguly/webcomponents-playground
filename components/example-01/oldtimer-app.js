/**
 * OldtimerApp
 *
 * Lightweight container custom element <oldtimer-app> that composes an
 * <oldtimer-filter> and an <oldtimer-list> inside its shadow DOM. It holds an
 * internal catalog of car objects, forwards filter queries to the list, and
 * updates a small summary (count and favorites) using aria-live announcements.
 *
 * @class OldtimerApp
 * @extends HTMLElement
 *
 * Lifecycle:
 * - constructor(): creates shadow DOM, renders static template, initializes
 *   internal state and event handlers.
 * - connectedCallback(): assigns cars to the child list, triggers an initial
 *   render, and registers listeners for child events.
 * - disconnectedCallback(): removes registered listeners.
 *
 * Properties (internal/private, prefixed with `_`):
 * @property {Array<{id:string,model:string,year:number,tagline:string}>} _cars - internal catalog of car objects.
 * @property {HTMLElement} _filter - reference to the <oldtimer-filter> in shadow DOM.
 * @property {HTMLElement} _list - reference to the <oldtimer-list> in shadow DOM.
 * @property {HTMLElement} _summary - summary container element (aria-live="polite").
 *
 * Internal handlers:
 * @property {Function} _onFilter - listens for "filter-change" events. Expects event.detail = { query: string }.
 *   Sets `this._list.query` and calls `this._list.render()` to update visible items.
 * @property {Function} _onRendered - listens for "list-rendered" events. Expects event.detail = { count: number }.
 *   Updates `_filter.resultCount`, reads `this._list.favorites.size`, and updates the summary text
 *   (e.g. "12 items — 3 favorites").
 *
 * Events listened:
 * @listens filter-change - dispatched by <oldtimer-filter>, detail: { query: string }.
 * @listens list-rendered - dispatched by <oldtimer-list>, detail: { count: number }.
 *
 * Accessibility:
 * - The summary element uses `aria-live="polite"` to announce changes in count/favorites.
 *
 * Registration:
 * - Defined as a custom element via `customElements.define("oldtimer-app", OldtimerApp)`.
 */

class OldtimerApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        .panel { background: var(--card, #fff); border: 1px solid var(--border, #e6e8eb); border-radius: 12px; padding: 16px; }
        header { display: grid; gap: 8px; margin-bottom: 12px; }
        .summary { color: var(--muted, #687076); font-size: 13px; }
      </style>
      <section class="panel">
        <header>
          <oldtimer-filter></oldtimer-filter>
          <div class="summary" aria-live="polite"></div>
        </header>
        <oldtimer-list></oldtimer-list>
      </section>
    `;

    this._cars = [
      {
        id: "w198-300sl",
        model: "300 SL Gullwing",
        year: 1954,
        tagline: "Iconic doors, racing pedigree.",
      },
      {
        id: "w100-600",
        model: "600 (W100)",
        year: 1963,
        tagline: "The Grand Mercedes — ultimate luxury.",
      },
      {
        id: "w113-280sl",
        model: "280 SL Pagoda",
        year: 1967,
        tagline: "Elegant roadster with distinctive roof.",
      },
      {
        id: "r121-190sl",
        model: "190 SL",
        year: 1955,
        tagline: "Stylish little sibling to the 300 SL.",
      },
      {
        id: "w123",
        model: "W123",
        year: 1976,
        tagline: "Beloved, bulletproof executive saloon.",
      },
      {
        id: "w111-220se",
        model: "220 SE (W111)",
        year: 1959,
        tagline: "Styling pioneer with graceful fins.",
      },
      {
        id: "w112-300se-coupe",
        model: "300 SE Coupe (W112)",
        year: 1962,
        tagline: "Handsome coupe with refined comfort.",
      },
      {
        id: "w108-280se",
        model: "280 SE (W108)",
        year: 1969,
        tagline: "Executive saloon with solid manners.",
      },
      {
        id: "r107-sl",
        model: "SL (R107)",
        year: 1973,
        tagline: "Durable roadster that defined an era.",
      },
      {
        id: "w186-300s",
        model: "300 S (W186)",
        year: 1952,
        tagline: "Exquisite hand-built grand tourer.",
      },
      {
        id: "w187-300sl-roadster",
        model: "300 SL Roadster (W187)",
        year: 1957,
        tagline: "Open-top icon with racing roots.",
      },
      {
        id: "w136-170s",
        model: "170 S",
        year: 1949,
        tagline: "Post-war elegance with simple charm.",
      },
      {
        id: "w188-300sc",
        model: "300 Sc (W188)",
        year: 1955,
        tagline: "Rare coupe combining luxury and sport.",
      },
      {
        id: "w07-770",
        model: "Grosser 770",
        year: 1930,
        tagline: "Opulent pre-war flagship.",
      },
      {
        id: "w136-170v",
        model: "170 V",
        year: 1936,
        tagline: "Popular pre-war everyday classic.",
      },
    ];

    this._filter = this.shadowRoot.querySelector("oldtimer-filter");
    this._list = this.shadowRoot.querySelector("oldtimer-list");
    this._summary = this.shadowRoot.querySelector(".summary");

    this._onFilter = (e) => {
      const q = e.detail?.query ?? "";
      this._list.query = q;
      this._list.render();
    };
    this._onRendered = (e) => {
      const count = e.detail?.count ?? 0;
      this._filter.resultCount = count;
      const favs = this._list.favorites.size;
      this._summary.textContent = `${count} item${count === 1 ? "" : "s"} — ${favs} favorite${favs === 1 ? "" : "s"}`;
    };
  }

  connectedCallback() {
    this._list.cars = this._cars.slice();
    this._list.render();
    this.addEventListener("filter-change", this._onFilter);
    this.addEventListener("list-rendered", this._onRendered);
  }

  disconnectedCallback() {
    this.removeEventListener("filter-change", this._onFilter);
    this.removeEventListener("list-rendered", this._onRendered);
  }
}

customElements.define("oldtimer-app", OldtimerApp);
