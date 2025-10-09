import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
  numberAttribute,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'kxl-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CounterComponent),
      multi: true,
    },
  ],
})
export class CounterComponent implements ControlValueAccessor {
  private readonly _value = signal(0);
  readonly value = this._value;

  @Input({ transform: numberAttribute }) step = 1;
  @Output() valueChange = new EventEmitter<number>();

  disabled = false;

  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: number): void {
    const numeric = Number.isFinite(value) ? value : 0;
    this._value.set(numeric);
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  inc(): void {
    if (this.disabled) {
      return;
    }
    this.touch();
    this.set(this.value() + this.resolveStep());
  }

  dec(): void {
    if (this.disabled) {
      return;
    }
    this.touch();
    this.set(this.value() - this.resolveStep());
  }

  private set(value: number): void {
    this._value.set(value);
    this.onChange(value);
    this.valueChange.emit(value);
  }

  private resolveStep(): number {
    const numeric = Number(this.step);
    return Number.isFinite(numeric) && numeric !== 0 ? numeric : 1;
  }

  private touch(): void {
    this.onTouched();
  }
}
