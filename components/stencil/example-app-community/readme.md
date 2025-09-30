# Stencil App Starter

Stencil is a compiler for building fast web apps using Web Components.

## Getting Started

To start a new project using Stencil, clone this repo to a new directory:

```bash
npm init stencil app
```

and run:

```bash
npm start
```

To build the app for production, run:

```bash
npm run build
```

## App Structure

The starter now ships with a lightweight `universal-router` setup defined in `src/router/router.ts`. It includes routes for the home page, a `/profile/:name` view, and a simple `/about` page that demonstrates navigating between multiple top-level components.

To run the unit tests once, run:

```bash
npm test
```

To run the unit tests and watch for file changes during development, run:

```bash
npm run test.watch
```
