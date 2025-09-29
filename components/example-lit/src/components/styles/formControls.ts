import { css } from "lit";

/**
 * Reusable tokens and rules for text inputs and buttons used in Todo components
 */
export const formControlStyles = css`
  :host {
    --todo-control-padding: 0.5rem 0.75rem;
    --todo-control-radius: 4px;
    --todo-control-border: 1px solid #ccc;
    --todo-control-background: #fff;
    --todo-control-font: inherit;
    --todo-control-transition: border-color 120ms ease, box-shadow 120ms ease;
    --todo-focus-ring: 0 0 0 3px rgba(33, 150, 243, 0.35);
  }

  .text-field,
  .button {
    padding: var(--todo-control-padding);
    border-radius: var(--todo-control-radius);
    border: var(--todo-control-border);
    font: var(--todo-control-font);
    background: var(--todo-control-background);
    transition: var(--todo-control-transition);
  }

  .button {
    cursor: pointer;
  }

  .text-field:focus-visible,
  .button:focus-visible {
    outline: none;
    box-shadow: var(--todo-focus-ring);
    border-color: #2196f3;
  }
`;
