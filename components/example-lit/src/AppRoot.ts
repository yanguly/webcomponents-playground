import { LitElement, html, css } from "lit";
import "./components/TodoList";

export class AppRoot extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: sans-serif;
      padding: 2rem;
    }
  `;

  render() {
    return html`
      <h1>My Lit App</h1>
      <todo-list></todo-list>
    `;
  }
}

customElements.define("app-root", AppRoot);
