import { FASTElement, css, customElement, html } from "@microsoft/fast-element";

const template = html<NotFoundPage>`
  <section class="missing">
    <h2>Route not found</h2>
    <p>
      The page you were looking for does not exist. Use the navigation to return
      home.
    </p>
  </section>
`;

const styles = css`
  :host {
    display: block;
    width: 100%;
  }

  .missing {
    display: grid;
    gap: 0.75rem;
    max-width: 420px;
    text-align: center;
  }

  h2 {
    margin: 0;
  }

  p {
    margin: 0;
    color: rgba(15, 23, 42, 0.68);
  }
`;

@customElement({ name: "demo-not-found", template, styles })
export class NotFoundPage extends FASTElement {}
