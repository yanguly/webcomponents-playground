import type { JSX as ReactJSX } from "react/jsx-runtime";

type CustomElementProps = ReactJSX.IntrinsicElements["div"] &
  Record<string, unknown>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "wc-greeting-card": CustomElementProps;
      "react-badge-pill": CustomElementProps;
      "react-callout-card": CustomElementProps;
    }
  }
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "wc-greeting-card": CustomElementProps;
      "react-badge-pill": CustomElementProps;
      "react-callout-card": CustomElementProps;
    }
  }
}
