import {
  FASTElement,
  attr,
  css,
  html,
  customElement,
} from "@microsoft/fast-element";

const template = html<InfoBanner>`
  <section role="status" class="${(x) => x.variant}">
    <strong>${(x) => x.heading}</strong>
    <p>${(x) => x.message}</p>
  </section>
`;

const styles = css`
  :host {
    display: block;
    font: inherit;
  }
  section {
    border-radius: 12px;
    padding: 0.75rem 1rem;
    display: grid;
    gap: 0.35rem;
  }
  section.info {
    background: rgba(54, 132, 255, 0.12);
    color: #164c96;
  }
  section.success {
    background: rgba(19, 207, 133, 0.14);
    color: #0b7a4a;
  }
  section.warning {
    background: rgba(255, 170, 0, 0.18);
    color: #8a5d00;
  }
  strong {
    font-weight: 600;
  }
  p {
    margin: 0;
  }
`;

@customElement({ name: "info-banner", template, styles })
export class InfoBanner extends FASTElement {
  @attr heading = "Notice";
  @attr message = "Something noteworthy just happened.";
  @attr variant: "info" | "success" | "warning" = "info";
}
