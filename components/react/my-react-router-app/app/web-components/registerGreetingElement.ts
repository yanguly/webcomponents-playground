let greetingTemplate: HTMLTemplateElement | null = null;

function getGreetingTemplate() {
  if (greetingTemplate) {
    return greetingTemplate;
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
        color: inherit;
      }

      .card {
        border-radius: 16px;
        background: linear-gradient(135deg, #5851ff, #7f53ac);
        color: white;
        padding: 1.5rem;
        box-shadow:
          0 12px 24px rgba(88, 81, 255, 0.25),
          0 6px 12px rgba(88, 81, 255, 0.2);
        display: grid;
        gap: 0.5rem;
        max-width: 360px;
      }

      .card h3 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 600;
      }

      .card p {
        margin: 0;
        font-size: 1rem;
        opacity: 0.9;
        line-height: 1.6;
      }
    </style>
    <div class="card">
      <h3></h3>
      <p></p>
    </div>
  `;

  greetingTemplate = template;
  return template;
}

const HTMLElementCtor: typeof HTMLElement =
  typeof HTMLElement === "undefined"
    ? (class {} as unknown as typeof HTMLElement)
    : HTMLElement;

class GreetingElement extends HTMLElementCtor {
  static get observedAttributes() {
    return ["headline", "message"] as const;
  }

  private headlineEl?: HTMLHeadingElement;
  private messageEl?: HTMLParagraphElement;

  constructor() {
    super();
    const template = getGreetingTemplate();
    if (!template) {
      return;
    }

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
    this.headlineEl = shadow.querySelector("h3") ?? undefined;
    this.messageEl = shadow.querySelector("p") ?? undefined;
  }

  connectedCallback() {
    this.updateContent();
  }

  attributeChangedCallback() {
    this.updateContent();
  }

  private updateContent() {
    if (this.headlineEl) {
      this.headlineEl.textContent =
        this.getAttribute("headline") ?? "Hello from Web Components";
    }

    if (this.messageEl) {
      this.messageEl.textContent =
        this.getAttribute("message") ??
        "This custom element is rendered inside a React route.";
    }
  }
}

function defineGreetingElement() {
  if (!customElements.get("wc-greeting-card")) {
    customElements.define("wc-greeting-card", GreetingElement);
  }
}

export function ensureGreetingElement() {
  if (typeof window === "undefined" || typeof customElements === "undefined") {
    return;
  }

  defineGreetingElement();
}
