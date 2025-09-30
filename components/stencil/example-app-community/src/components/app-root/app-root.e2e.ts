import { newE2EPage } from '@stencil/core/testing';

describe('app-root', () => {
  it.skip('renders', async () => {
    const page = await newE2EPage({ url: '/' });

    const element = await page.find('app-root');
    expect(element).toHaveClass('hydrated');
  });

  it.skip('renders the title', async () => {
    const page = await newE2EPage({ url: '/' });

    const element = await page.find('app-root >>> h1');
    expect(element.textContent).toEqual('Stencil App Starter');
  });
});
