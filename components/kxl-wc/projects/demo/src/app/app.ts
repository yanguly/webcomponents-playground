import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild, signal } from '@angular/core';
import { CounterComponent, MetricCardComponent } from 'ui-widgets';
import type { MdMenu } from '@material/web/menu/menu.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CounterComponent, MetricCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: {
    class: 'app-root',
  },
})
export class App {
  readonly v = signal(0);
  readonly title = 'Angular Web Components Playground';
  readonly subtitle =
    'Experiment with the shared library and Angular Elements build in a single workspace.';
  readonly materialFieldValue = signal('');
  readonly lastMenuAction = signal('');
  readonly isMaterialMenuOpen = signal(false);

  @ViewChild('materialMenu', { read: ElementRef })
  private materialMenu?: ElementRef<MdMenu>;

  onTextFieldInput(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.materialFieldValue.set(target?.value ?? '');
  }

  openMaterialMenu(): void {
    const menu = this.materialMenu?.nativeElement;
    if (!menu) {
      return;
    }
    if (menu.open) {
      menu.close();
      this.isMaterialMenuOpen.set(false);
      return;
    }
    menu.show();
    this.isMaterialMenuOpen.set(true);
  }

  onMenuAction(action: string): void {
    this.lastMenuAction.set(action);
    this.materialMenu?.nativeElement.close();
    this.isMaterialMenuOpen.set(false);
  }

  onMenuOpened(): void {
    this.isMaterialMenuOpen.set(true);
  }

  onMenuClosed(): void {
    this.isMaterialMenuOpen.set(false);
  }
}
