import { Component, Input, numberAttribute } from '@angular/core';

@Component({
  selector: 'kxl-metric-card',
  standalone: true,
  templateUrl: './metric-card.component.html',
  styleUrls: ['./metric-card.component.css'],
})
export class MetricCardComponent {
  @Input() label = 'Metric';
  @Input() value = '0';
  @Input({ transform: numberAttribute }) change = 0;
  @Input() annotation = '';

  get trend(): 'up' | 'down' | 'neutral' {
    if (this.change > 0) {
      return 'up';
    }
    if (this.change < 0) {
      return 'down';
    }
    return 'neutral';
  }

  get changeLabel(): string {
    const absolute = Math.abs(this.change);
    const precision = absolute >= 10 ? 0 : absolute >= 1 ? 1 : 2;
    const rounded = parseFloat(absolute.toFixed(precision)).toString();
    const prefix = this.change > 0 ? '+' : this.change < 0 ? '-' : '';
    return this.change === 0 ? '0%' : `${prefix}${rounded}%`;
  }

  get trendIcon(): string {
    switch (this.trend) {
      case 'up':
        return '^';
      case 'down':
        return 'v';
      default:
        return '~';
    }
  }

  get trendAriaLabel(): string {
    switch (this.trend) {
      case 'up':
        return 'Positive change';
      case 'down':
        return 'Negative change';
      default:
        return 'No change';
    }
  }
}
