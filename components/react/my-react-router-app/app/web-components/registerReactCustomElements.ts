let badgeTemplate: HTMLTemplateElement | null = null;

function getBadgeTemplate() {
  if (badgeTemplate) {
    return badgeTemplate;
  }

  if (typeof document === "undefined") {
    return null;
  }

  const template = document.createElement("template");
  template.innerHTML = `
    <style>
      :host {
        display: inline-block;
        font-family: var(--font-sans, "Inter", sans-serif);
        color: inherit;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        letter-spacing: 0.01em;
        border-radius: 9999px;
        padding: 0.35rem 0.85rem;
        background: linear-gradient(135deg, #2563eb, #7c3aed);
        color: white;
        box-shadow: 0 10px 25px rgba(76, 29, 149, 0.28);
        white-space: nowrap;
      }

      .count {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 1.5rem;
        padding: 0.15rem 0.5rem;
        border-radius: 9999px;
        background: rgba(255, 255, 255, 0.2);
        font-size: 0.85rem;
      }

      @media (prefers-color-scheme: dark) {
        .badge {
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          box-shadow:
            0 16px 35px rgba(30, 64, 175, 0.45),
            0 6px 18px rgba(30, 64, 175, 0.35);
        }

        .count {
          background: rgba(255, 255, 255, 0.28);
        }
      }
    </style>
    <span class="badge">
      <span class="label"></span>
      <span class="count"></span>
    </span>
  `;

  badgeTemplate = template;
  return template;
}

const HTMLElementCtor: typeof HTMLElement =
  typeof HTMLElement === "undefined"
    ? (class {} as unknown as typeof HTMLElement)
    : HTMLElement;

class ReactBadgePillElement extends HTMLElementCtor {
  static get observedAttributes() {
    return ["label", "count"] as const;
  }

  private labelEl?: HTMLSpanElement;
  private countEl?: HTMLSpanElement;

  constructor() {
    super();
    const template = getBadgeTemplate();
    if (!template) {
      return;
    }

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
    this.labelEl = shadow.querySelector(".label") ?? undefined;
    this.countEl = shadow.querySelector(".count") ?? undefined;
  }

  connectedCallback() {
    this.updateContent();
  }

  attributeChangedCallback() {
    this.updateContent();
  }

  private updateContent() {
    if (this.labelEl) {
      this.labelEl.textContent =
        this.getAttribute("label") ?? "New subscribers";
    }

    if (this.countEl) {
      this.countEl.textContent = this.getAttribute("count") ?? "0";
    }
  }
}

let calloutTemplate: HTMLTemplateElement | null = null;

function getCalloutTemplate() {
  if (calloutTemplate) {
    return calloutTemplate;
  }

  if (typeof document === "undefined") {
    return null;
  }

  const template = document.createElement("template");
  template.innerHTML = `
    <style>
      :host {
        display: block;
        font-family: var(--font-sans, "Inter", sans-serif);
        border-radius: 16px;
        border: 1px solid;
        background: white;
        color: #1f2937;
        box-shadow: 0 8px 30px rgba(15, 23, 42, 0.06);
      }

      article {
        margin: 0;
        padding: 1.25rem 1.5rem;
        border-radius: inherit;
        background: transparent;
      }

      :host([tone="info"]) {
        border-color: #3b82f6;
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(59, 130, 246, 0.04));
      }

      :host([tone="success"]) {
        border-color: #10b981;
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(16, 185, 129, 0.04));
      }

      :host([tone="warning"]) {
        border-color: #f59e0b;
        background: linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(245, 158, 11, 0.04));
      }

      header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0.75rem;
      }

      h3 {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 600;
      }

      .indicator {
        width: 0.65rem;
        height: 0.65rem;
        border-radius: 999px;
        background: currentcolor;
        opacity: 0.7;
      }

      :host([tone="info"]) .indicator {
        color: #2563eb;
      }

      :host([tone="success"]) .indicator {
        color: #047857;
      }

      :host([tone="warning"]) .indicator {
        color: #b45309;
      }

      p {
        margin: 0;
        line-height: 1.6;
        color: inherit;
      }

      @media (prefers-color-scheme: dark) {
        :host {
          border-color: #334155;
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.75));
          color: #e2e8f0;
          box-shadow:
            0 18px 38px rgba(2, 6, 23, 0.55),
            0 6px 24px rgba(2, 6, 23, 0.4);
        }

        :host([tone="info"]) {
          border-color: #60a5fa;
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.4), rgba(37, 99, 235, 0.16));
        }

        :host([tone="success"]) {
          border-color: #34d399;
          background: linear-gradient(135deg, rgba(5, 150, 105, 0.4), rgba(5, 150, 105, 0.16));
        }

        :host([tone="warning"]) {
          border-color: #facc15;
          background: linear-gradient(135deg, rgba(202, 138, 4, 0.4), rgba(202, 138, 4, 0.16));
        }

        .indicator {
          opacity: 0.9;
        }
      }
    </style>
    <article>
      <header>
        <span class="indicator" aria-hidden="true"></span>
        <h3></h3>
      </header>
      <p><slot></slot></p>
    </article>
  `;

  calloutTemplate = template;
  return template;
}

class ReactCalloutCardElement extends HTMLElementCtor {
  static get observedAttributes() {
    return ["heading", "tone"] as const;
  }

  private headingEl?: HTMLHeadingElement;

  constructor() {
    super();
    const template = getCalloutTemplate();
    if (!template) {
      return;
    }

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
    this.headingEl = shadow.querySelector("h3") ?? undefined;
  }

  connectedCallback() {
    this.updateHeading();
  }

  attributeChangedCallback() {
    this.updateHeading();
  }

  private updateHeading() {
    if (this.headingEl) {
      this.headingEl.textContent = this.getAttribute("heading") ?? "Heads up";
    }

    if (!this.hasAttribute("tone")) {
      this.setAttribute("tone", "info");
    }
  }
}

function defineReactBadgePill() {
  if (!customElements.get("react-badge-pill")) {
    customElements.define("react-badge-pill", ReactBadgePillElement);
  }
}

function defineReactCalloutCard() {
  if (!customElements.get("react-callout-card")) {
    customElements.define("react-callout-card", ReactCalloutCardElement);
  }
}

export function ensureReactCustomElements() {
  if (typeof window === "undefined" || typeof customElements === "undefined") {
    return;
  }

  defineReactBadgePill();
  defineReactCalloutCard();
}
