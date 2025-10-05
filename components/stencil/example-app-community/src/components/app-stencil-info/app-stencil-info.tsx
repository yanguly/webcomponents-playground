import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-stencil-info',
  styleUrl: 'app-stencil-info.css',
  shadow: true,
})
export class AppStencilInfo {
  render() {
    return (
      <article class="app-stencil-info">
        <h2>Why Stencil?</h2>
        <p>Stencil compiles typed, JSX-based components into native Web Components, so your UI works with any framework or without one entirely.</p>
        <p>The compiler ships features like lazy loading, prerendering, and SSR support, helping teams ship fast, accessible experiences with minimal runtime overhead.</p>
        <p>Use Stencil when you want framework-agnostic design systems, shareable widgets, or performant standalone apps powered by web standards.</p>
      </article>
    );
  }
}
