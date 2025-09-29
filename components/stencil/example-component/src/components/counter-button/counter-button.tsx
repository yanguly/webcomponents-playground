import { Component, Event, EventEmitter, Host, Prop, State, Watch, h } from '@stencil/core';

/**
 * CounterButton exposes a pressable control that tracks a count internally and notifies consumers
 * whenever it changes. The component is self-contained yet easy to wire into analytics or state stores
 * via the `countChange` event.
 */
@Component({
  tag: 'counter-button',
  styleUrl: 'counter-button.css',
  shadow: true,
})
export class CounterButton {
  /** Initial value used when the component connects. */
  @Prop({ reflect: true }) initial = 0;

  /** Optional description text rendered below the button. */
  @Prop() description?: string;

  /** Emitted every time the counter changes. */
  @Event({ eventName: 'countChange' }) countChange!: EventEmitter<number>;

  @State() private count = 0;

  componentWillLoad() {
    this.count = this.#sanitize(this.initial);
  }

  @Watch('initial')
  protected onInitialChange(newValue: number) {
    this.count = this.#sanitize(newValue);
  }

  render() {
    return (
      <Host>
        <button type="button" onClick={this.#increment} aria-live="polite">
          <span class="label">Clicked</span>
          <span class="count">{this.count}</span>
        </button>
        {this.description ? <span class="description">{this.description}</span> : null}
      </Host>
    );
  }

  #increment = () => {
    this.count += 1;
    this.countChange.emit(this.count);
  };

  #sanitize(value: number): number {
    return Number.isFinite(value) ? Math.max(0, Math.trunc(value)) : 0;
  }
}
