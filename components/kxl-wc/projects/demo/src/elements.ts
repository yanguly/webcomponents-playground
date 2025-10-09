import { provideZonelessChangeDetection } from '@angular/core';
import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { CounterComponent, MetricCardComponent } from 'ui-widgets';

(async () => {
  const appRef = await createApplication({
    providers: [provideZonelessChangeDetection()],
  });
  const injector = appRef.injector;

  const definitions = [
    { tag: 'kxl-counter', component: CounterComponent },
    { tag: 'kxl-metric-card', component: MetricCardComponent },
  ];

  for (const { tag, component } of definitions) {
    if (!customElements.get(tag)) {
      const element = createCustomElement(component, { injector });
      customElements.define(tag, element);
    }
  }
})();
