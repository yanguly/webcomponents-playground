import type { DetailedHTMLProps, HTMLAttributes } from "react";

type CustomElement<Props = Record<string, unknown>, T = HTMLElement> =
  DetailedHTMLProps<HTMLAttributes<T>, T> & Props;

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      "oldtimer-app": CustomElement;
      "app-root": CustomElement;
      "hello-card": CustomElement<{
        title?: string;
        description?: string;
        cta?: string;
      }>;
      "counter-button": CustomElement<{
        initial?: string;
        description?: string;
      }>;
      "my-component": CustomElement<{
        first?: string;
        middle?: string;
        last?: string;
      }>;
      "wc-greeting-card": CustomElement<{
        headline?: string;
        message?: string;
      }>;
      "react-callout-card": CustomElement<{
        heading?: string;
        tone?: string;
      }>;
      "kxl-counter": CustomElement<{
        step?: string;
        value?: number;
      }>;
      "kxl-metric-card": CustomElement<{
        label?: string;
        value?: string;
        change?: string;
        annotation?: string;
      }>;
    }
  }
}

export {};
