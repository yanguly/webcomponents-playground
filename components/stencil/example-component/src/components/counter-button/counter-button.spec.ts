import { newSpecPage } from '@stencil/core/testing';
import { CounterButton } from './counter-button';

describe('counter-button', () => {
  it('renders with defaults', async () => {
    const page = await newSpecPage({
      components: [CounterButton],
      html: `<counter-button></counter-button>`,
    });

    expect(page.root).toEqualHtml(`
      <counter-button initial="0">
        <mock:shadow-root>
          <button type="button" aria-live="polite">
            <span class="label">Clicked</span>
            <span class="count">0</span>
          </button>
        </mock:shadow-root>
      </counter-button>
    `);
  });

  it('emits countChange when clicked', async () => {
    const page = await newSpecPage({
      components: [CounterButton],
      html: `<counter-button initial="2"></counter-button>`,
    });

    const spy = jest.fn();
    page.root?.addEventListener('countChange', spy);

    const button = page.root?.shadowRoot?.querySelector('button');
    button?.click();
    button?.click();

    expect(page.rootInstance.count).toBe(4);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenLastCalledWith(expect.objectContaining({ detail: 4 }));
  });
});
