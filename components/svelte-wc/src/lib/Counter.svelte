<svelte:options customElement="sv-counter" />

<script lang="ts">
  let {
    step: providedStep = 1,
    value: boundValue = $bindable<number | string>(0),
  } = $props<{
    step?: number | string
    value?: number | string
  }>()

  let counterEl = $state<HTMLElement | null>(null)
  let hostElement = $state<HTMLElement | null>(null)
  let stepAmount = $state(1)
  let numericValue = $state(0)

  // Coerce attribute/prop inputs so the counter survives string values.
  function toNumber(input: unknown, fallback = 0) {
    const coerced = Number(input)
    return Number.isFinite(coerced) ? coerced : fallback
  }

  // Keep the derived step/value in sync with incoming props.
  $effect(() => {
    stepAmount = toNumber(providedStep, 1)
  })

  $effect(() => {
    numericValue = toNumber(boundValue, 0)
  })

  // Locate the shadow host so we can dispatch DOM events without runes helpers.
  $effect(() => {
    if (counterEl) {
      const root = counterEl.getRootNode?.()
      hostElement =
        root instanceof ShadowRoot ? (root.host as HTMLElement) : null
    } else {
      hostElement = null
    }
  })

  // Emit every time the internal value updates.
  function updateValue(next: number) {
    numericValue = next
    boundValue = next
    hostElement?.dispatchEvent(
      new CustomEvent('value-change', {
        detail: next,
      }),
    )
  }

  function increment(event?: MouseEvent) {
    event?.stopPropagation()
    updateValue(numericValue + stepAmount)
  }

  function decrement(event?: MouseEvent) {
    event?.stopPropagation()
    updateValue(numericValue - stepAmount)
  }
</script>

<style>
  :host {
    display: inline-flex;
  }

  .counter {
    align-items: center;
    border-radius: 0.75rem;
    border: 1px solid #d1d5db;
    display: inline-flex;
    gap: 0.75rem;
    padding: 0.5rem 0.75rem;
  }

  button {
    align-items: center;
    background-color: transparent;
    border: none;
    border-radius: 0.5rem;
    color: inherit;
    cursor: pointer;
    display: inline-flex;
    font-size: 1rem;
    height: 2rem;
    justify-content: center;
    transition: background-color 120ms ease, color 120ms ease;
    width: 2rem;
  }

  button:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }

  button:hover {
    background-color: rgba(37, 99, 235, 0.08);
  }

  .value {
    font: 600 1rem/1.2 system-ui, sans-serif;
    min-width: 2ch;
    text-align: center;
  }
</style>

<div
  class="counter"
  role="group"
  aria-label="Counter"
  bind:this={counterEl}
>
  <button type="button" onclick={decrement} aria-label="Decrease">
    −
  </button>
  <span class="value" aria-live="polite">{numericValue}</span>
  <button type="button" onclick={increment} aria-label="Increase">
    +
  </button>
</div>
