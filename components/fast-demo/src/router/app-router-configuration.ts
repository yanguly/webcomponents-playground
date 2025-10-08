import { RouterConfiguration } from "@microsoft/fast-router";

export class AppRouterConfiguration extends RouterConfiguration {
  public configure(): void {
    this.title = "FAST Demo";
    // Route definitions point straight to the custom element tag names registered elsewhere.
    this.routes.map(
      { path: "", redirect: "home" },
      { path: "home", title: "Home", element: "demo-home-page", name: "home" },
      {
        path: "showcase",
        title: "Showcase",
        element: "demo-showcase-page",
        name: "showcase",
      },
      {
        path: "not-found",
        title: "Not Found",
        element: "demo-not-found",
        name: "not-found",
      },
    );

    this.routes.fallback({ redirect: "not-found" });
  }
}
