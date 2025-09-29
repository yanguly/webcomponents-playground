import { newE2EPage } from '@stencil/core/testing';

describe('counter-button (e2e)', () => {
  it('increments on click and reflects count via event detail', async () => {
    const page = await newE2EPage();

    await page.setContent('<counter-button initial="5"></counter-button>');

    const eventSpy = await page.spyOnEvent('countChange');
    const button = await page.find('counter-button >>> button');

    await button.click();
    await button.click();

    expect(eventSpy).toHaveReceivedEventDetail(7);
    const count = await button.find('.count');
    expect(count.textContent).toBe('7');
  });
});
