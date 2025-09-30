import { h } from '@stencil/core';
import UniversalRouter, { Route } from 'universal-router';

export type RouteResult = {
  /**
   * Function that returns the component tree for the current route.
   */
  render: () => any;
};

export type RouterState = {
  path: string;
  result: RouteResult;
};

const routes: Route<RouteResult>[] = [
  {
    path: '/',
    action: () => ({
      render: () => h('app-home', null),
    }),
  },
  {
    path: '/about',
    action: () => ({
      render: () => h('app-about', null),
    }),
  },
  {
    path: '/profile/:name',
    action: ({ params }) => ({
      render: () => h('app-profile', { name: params.name }),
    }),
  },
  {
    path: '(.*)',
    action: () => ({
      render: () => h('p', null, 'Page not found'),
    }),
  },
];

/**
 * Lightweight client-side router backed by universal-router.
 */
export class RouterService {
  private router = new UniversalRouter<RouteResult>(routes);
  private listeners = new Set<(state: RouterState) => void>();
  private currentState: RouterState | undefined;

  constructor() {
    this.handlePopState = this.handlePopState.bind(this);

    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', this.handlePopState);
    }
  }

  get current(): RouterState | undefined {
    return this.currentState;
  }

  async push(path: string): Promise<RouterState | undefined> {
    if (typeof window === 'undefined') {
      return undefined;
    }

    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }

    return this.resolve(path);
  }

  async replace(path: string): Promise<RouterState | undefined> {
    if (typeof window === 'undefined') {
      return undefined;
    }

    window.history.replaceState({}, '', path);

    return this.resolve(path);
  }

  go(delta: number): void {
    if (typeof window === 'undefined') {
      return;
    }

    window.history.go(delta);
  }

  subscribe(callback: (state: RouterState) => void): () => void {
    this.listeners.add(callback);

    if (this.currentState) {
      callback(this.currentState);
    }

    return () => {
      this.listeners.delete(callback);
    };
  }

  async start(): Promise<RouterState | undefined> {
    if (typeof window === 'undefined') {
      return undefined;
    }

    return this.resolve(window.location.pathname);
  }

  private async handlePopState(): Promise<void> {
    if (typeof window === 'undefined') {
      return;
    }

    await this.resolve(window.location.pathname);
  }

  private async resolve(path: string): Promise<RouterState> {
    const result = await this.router.resolve(path);
    const state = { path, result } as RouterState;
    this.currentState = state;
    this.listeners.forEach(listener => listener(state));
    return state;
  }
}

export const Router = new RouterService();
