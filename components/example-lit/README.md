# Example — Lit + Vite + TS

A tiny Lit app with a todo list. Uses Vite for dev/build and TypeScript with strict settings.

Quick start
- `npm i`
- `npm run dev` (opens on localhost)

What’s inside
- `src/AppRoot.ts` — app shell; renders `<todo-list>`.
- `src/components/TodoList.ts` — holds todos as reactive state and renders items with Lit’s `repeat` directive.
- `src/components/TodoItem.ts` — clickable/keyboard-accessible item; emits `toggle` events.
- `index.html` — simple page that loads `src/main.ts`.

Features / interactions
- Add a todo via the input, press Enter or click Add.
- Filter todos live by text in the right input.
- Click a todo, or press Enter/Space when focused, to toggle done.
- State updates immutably in `TodoList`, which triggers re-render.

Notes
- Components use `static styles` for scoped CSS.
- Strict TS config; decorators enabled. No server code here — it’s a Vite SPA.
