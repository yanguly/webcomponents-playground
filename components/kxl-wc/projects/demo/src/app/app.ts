import { Component, signal } from '@angular/core';
import { CounterComponent, MetricCardComponent } from 'ui-widgets';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CounterComponent, MetricCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: {
    class: 'app-root',
  },
})
export class App {
  readonly v = signal(0);
  readonly title = 'Angular Web Components Playground';
  readonly subtitle =
    'Experiment with the shared library and Angular Elements build in a single workspace.';
}
