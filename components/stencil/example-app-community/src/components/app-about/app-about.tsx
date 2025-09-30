import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-about',
  styleUrl: 'app-about.css',
  shadow: true,
})
export class AppAbout {
  render() {
    return (
      <section class="app-about">
        <h2>About This Starter</h2>
        <p>
          This example app is powered by Stencil components and the universal-router integration. Use it as a playground to explore routing, component composition, and data flow.
        </p>
      </section>
    );
  }
}
