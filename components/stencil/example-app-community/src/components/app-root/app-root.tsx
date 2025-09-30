import { Component, State, h } from '@stencil/core';
import { Router, RouterState } from '../../';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  @State() currentRoute?: RouterState;

  private unsubscribe?: () => void;

  componentWillLoad() {
    this.unsubscribe = Router.subscribe(state => {
      this.currentRoute = state;
    });

    if (!Router.current) {
      Router.start();
    }
  }

  disconnectedCallback() {
    this.unsubscribe?.();
  }

  render() {
    const content = this.currentRoute?.result.render() ?? h('p', null, 'Loading...');

    return (
      <div>
        <header>
          <h1 onClick={() => Router.push('/')}>Stencil App Starter</h1>
        </header>

        <main>{content}</main>
      </div>
    );
  }
}
