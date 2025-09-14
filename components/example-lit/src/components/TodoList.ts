// src/components/TodoList.ts
import { LitElement, html, css } from 'lit';
import { state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import './TodoItem';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export class TodoList extends LitElement {
  static styles = css`
    .controls {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    .controls input[type="text"] {
      flex: 1;
      padding: 0.5rem 0.75rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font: inherit;
    }
    .controls button {
      padding: 0.5rem 0.75rem;
      border: 1px solid #ccc;
      background: #fff;
      border-radius: 4px;
      cursor: pointer;
      font: inherit;
    }
    .list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  `;

  @state() private todos: Todo[] = [
    { id: 1, text: 'Learn Lit', done: false },
    { id: 2, text: 'Build component', done: false },
    { id: 3, text: 'Profit!', done: true },
  ];

  @state() private newText: string = '';
  @state() private query: string = '';
  #nextId: number = 4;

  render() {
    const visible = this.#filteredTodos();
    return html`
      <form class="controls" @submit=${this.#onSubmit}>
        <input
          type="text"
          placeholder="Add a todo…"
          .value=${this.newText}
          @input=${this.#onNewInput}
          aria-label="New todo"
        />
        <button type="submit">Add</button>
        <input
          type="text"
          placeholder="Filter…"
          .value=${this.query}
          @input=${this.#onFilterInput}
          aria-label="Filter todos"
        />
      </form>

      <div class="list">
        ${repeat(
          visible,
          (t) => t.id,
          (todo) => html`
            <todo-item
              .text=${todo.text}
              .done=${todo.done}
              @toggle=${() => this.#toggle(todo.id)}
            ></todo-item>
          `,
        )}
      </div>
    `;
  }

  // Toggle a todo by id with an immutable update
  #toggle(id: number) {
    this.todos = this.todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  }

  #onNewInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    this.newText = target.value;
  };

  #onFilterInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    this.query = target.value;
  };

  #onSubmit = (e: Event) => {
    e.preventDefault();
    const text = this.newText.trim();
    if (!text) return;
    const todo: Todo = { id: this.#nextId++, text, done: false };
    this.todos = [todo, ...this.todos];
    this.newText = '';
  };

  #filteredTodos(): Todo[] {
    const q = this.query.trim().toLowerCase();
    if (!q) return this.todos;
    return this.todos.filter((t) => t.text.toLowerCase().includes(q));
  }
}

customElements.define('todo-list', TodoList);
