import type { JSX } from "preact";

declare global {
  namespace preact.JSX {
    interface IntrinsicElements {
      "kxl-counter": JSX.HTMLAttributes<HTMLElement> & {
        step?: number | string;
      };
      "kxl-metric-card": JSX.HTMLAttributes<HTMLElement> & {
        label?: string;
        value?: string;
        change?: number | string;
        annotation?: string;
      };
    }
  }
}
