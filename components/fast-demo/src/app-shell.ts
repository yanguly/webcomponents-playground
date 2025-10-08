import {
  FASTElement,
  css,
  customElement,
  html,
  observable,
} from "@microsoft/fast-element";
import {
  FASTRouter,
  NavigationHandler,
  NavigationMessage,
} from "@microsoft/fast-router";

import { AppRouterConfiguration } from "./router/app-router-configuration";
import "./pages/home-page";
import "./pages/showcase-page";
import "./pages/not-found-page";

FASTRouter;

const template = html<AppShell>`
  <main class="page">
    <div class="nav-wrapper">
      <nav class="nav" aria-label="Main navigation">
        <a
          href="/home"
          data-link
          aria-current=${(x) => (x.isActive("/home") ? "page" : null)}
          class=${(x) => `link ${x.navClass("/home")}`}
        >
          Home
        </a>
        <a
          href="/showcase"
          data-link
          aria-current=${(x) => (x.isActive("/showcase") ? "page" : null)}
          class=${(x) => `link ${x.navClass("/showcase")}`}
        >
          Showcase
        </a>
        <a
          href="https://fast.design"
          target="_blank"
          rel="noreferrer"
          router-ignore
          class="external"
        >
          FAST Docs ↗
        </a>
      </nav>
    </div>

    <section class="outlet">
      <fast-router :config=${(x) => x.routerConfiguration}></fast-router>
    </section>
  </main>
`;

const styles = css`
  :host {
    display: block;
    width: 100%;
  }

  .page {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: clamp(2.5rem, 4vw, 3.25rem);
    text-align: center;
    position: relative;
  }

  .nav-wrapper {
    position: sticky;
    top: max(0px, env(safe-area-inset-top));
    z-index: 10;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-inline: auto;
    padding: clamp(0.6rem, 2vw, 1rem) clamp(1rem, 3vw, 1.8rem);
    max-width: min(100%, 780px);
    border-radius: clamp(16px, 4vw, 22px);
    background: var(--nav-bg);
    border: 1px solid var(--nav-border);
    box-shadow: 0 12px 32px rgba(15, 23, 42, 0.12);
    backdrop-filter: blur(12px);
  }

  .nav {
    display: inline-flex;
    align-items: center;
    gap: clamp(0.4rem, 2vw, 0.8rem);
    padding: 0;
  }

  .nav .link,
  .nav a.external {
    font-weight: 600;
    text-decoration: none;
    padding: 0.4rem 0.9rem;
    border-radius: 999px;
    transition:
      background 160ms ease,
      color 160ms ease,
      box-shadow 160ms ease;
  }

  .nav .link {
    color: var(--nav-link);
  }

  .nav .link:hover,
  .nav .link.active,
  .nav .link[aria-current="page"] {
    background: rgba(15, 23, 42, 0.08);
    color: var(--nav-link-active);
    box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.08);
  }

  .nav a.external {
    color: var(--nav-link-muted);
  }

  .nav a.external:hover {
    background: rgba(15, 23, 42, 0.08);
    color: var(--nav-link-active);
    box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.06);
  }

  .outlet {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: clamp(2.5rem, 4.5vw, 3.5rem);
  }

  fast-router {
    display: block;
    width: 100%;
  }

  @media (max-width: 720px) {
    .nav-wrapper {
      max-width: 100%;
      margin-inline: 0;
      padding: clamp(0.55rem, 5vw, 0.85rem) clamp(0.7rem, 6vw, 1.1rem);
      border-radius: 16px;
      box-shadow: 0 10px 28px rgba(15, 23, 42, 0.12);
    }

    .nav {
      flex-wrap: wrap;
      gap: 0.55rem;
      justify-content: center;
    }
  }
`;

@customElement({ name: "app-shell", template, styles })
export class AppShell extends FASTElement {
  routerConfiguration = new AppRouterConfiguration();

  @observable currentPath = window.location.pathname;

  // Subscribe to router navigation so the nav pills stay in sync with history pushes.
  private navigationSubscription = {
    enqueue: (message: NavigationMessage) => {
      const [path] = message.path.split("?");
      this.currentPath = path;
    },
  };

  connectedCallback(): void {
    super.connectedCallback();
    NavigationHandler.register(this.navigationSubscription);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    NavigationHandler.unregister(this.navigationSubscription);
  }

  isActive(path: string): boolean {
    // Treat the bare root as home to keep the initial load highlighted.
    if (path === "/home") {
      return this.currentPath === "/home" || this.currentPath === "/";
    }
    return this.currentPath === path;
  }

  navClass(path: string): string {
    return this.isActive(path) ? "active" : "";
  }
}
