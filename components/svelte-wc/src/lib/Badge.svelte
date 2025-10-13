<svelte:options customElement="sv-badge" />

<script module lang="ts">
  export type BadgeKind = 'neutral' | 'success' | 'danger'
</script>

<script lang="ts">
  let {
    kind: providedKind = 'neutral',
    pill: providedPill = false,
  } = $props<{
    kind?: BadgeKind | string
    pill?: boolean | string
  }>()

  let buttonEl = $state<HTMLButtonElement | null>(null)
  let hostElement = $state<HTMLElement | null>(null)
  let currentKind = $state<BadgeKind>('neutral')
  let pillFlag = $state(false)

  function normalizeKind(value: unknown): BadgeKind {
    return value === 'success' || value === 'danger' ? value : 'neutral'
  }

  function coerceBoolean(value: unknown): boolean {
    if (typeof value === 'boolean') return value
    if (value === '') return true
    if (value == null) return false
    if (typeof value === 'string') return value.toLowerCase() !== 'false'
    return Boolean(value)
  }

  // Normalise incoming props so the badge always drives a known theme.
  $effect(() => {
    currentKind = normalizeKind(providedKind)
  })

  $effect(() => {
    pillFlag = coerceBoolean(providedPill)
  })

  // Locate the shadow host so we can mirror state as :host attributes.
  $effect(() => {
    if (buttonEl) {
      const root = buttonEl.getRootNode?.()
      hostElement =
        root instanceof ShadowRoot ? (root.host as HTMLElement) : null
    } else {
      hostElement = null
    }
  })

  // Reflect the current kind to drive the CSS custom properties.
  $effect(() => {
    hostElement?.setAttribute('kind', currentKind)
  })

  // Keep the pill host attribute aligned with the boolean flag.
  $effect(() => {
    if (!hostElement) return
    if (pillFlag) {
      hostElement.setAttribute('pill', '')
    } else {
      hostElement.removeAttribute('pill')
    }
  })

  function handleClick(event: MouseEvent) {
    event.stopPropagation()
    hostElement?.dispatchEvent(
      new CustomEvent('svl-click', {
        detail: { kind: currentKind },
      }),
    )
  }
</script>

<style>
  :host {
    color-scheme: light dark;
    --sv-radius: 999px;

    /* Neutral defaults */
    --sv-bg: #334155;
    --sv-border: #475569;
    --sv-fg: #f8fafc;
    --sv-dot: #38bdf8;

    display: inline-flex;
    font: 600 0.75rem/1.1 system-ui, sans-serif;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  @media (prefers-color-scheme: light) {
    :host {
      --sv-bg: #e2e8f0;
      --sv-border: #94a3b8;
      --sv-fg: #0f172a;
      --sv-dot: #0284c7;
    }
  }

  :host([kind="success"]) {
    --sv-bg: #166534;
    --sv-border: #16a34a;
    --sv-fg: #ecfdf5;
    --sv-dot: #4ade80;
  }

  @media (prefers-color-scheme: light) {
    :host([kind="success"]) {
      --sv-bg: #bbf7d0;
      --sv-border: #16a34a;
      --sv-fg: #14532d;
      --sv-dot: #16a34a;
    }
  }

  :host([kind="danger"]) {
    --sv-bg: #7f1d1d;
    --sv-border: #f87171;
    --sv-fg: #fee2e2;
    --sv-dot: #fca5a5;
  }

  @media (prefers-color-scheme: light) {
    :host([kind="danger"]) {
      --sv-bg: #fecaca;
      --sv-border: #dc2626;
      --sv-fg: #7f1d1d;
      --sv-dot: #dc2626;
    }
  }

  .badge {
    align-items: center;
    appearance: none;
    background-color: var(--sv-bg);
    border-radius: var(--sv-radius);
    border: 1px solid var(--sv-border);
    box-shadow:
      inset 0 0 0 1px rgba(255, 255, 255, 0.04),
      0 6px 14px rgba(15, 23, 42, 0.2);
    color: var(--sv-fg);
    cursor: pointer;
    display: inline-flex;
    gap: 0.5rem;
    padding: 0.42rem 0.9rem;
    user-select: none;
    font: inherit;
    transition:
      transform 140ms ease,
      box-shadow 140ms ease,
      border-color 140ms ease;
  }

  .badge::before {
    content: '';
    flex-shrink: 0;
    height: 0.55rem;
    width: 0.55rem;
    border-radius: 999px;
    background: var(--sv-dot);
    box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.3);
  }

  .badge:hover {
    transform: translateY(-1.5px);
    box-shadow:
      inset 0 0 0 1px rgba(255, 255, 255, 0.06),
      0 10px 20px rgba(15, 23, 42, 0.25);
  }

  .badge:focus-visible {
    outline: 2px solid var(--sv-border);
    outline-offset: 2px;
  }

  .badge--pill {
    border-radius: 999px;
  }
</style>

<button
  type="button"
  class="badge"
  class:badge--pill={pillFlag}
  onclick={handleClick}
  bind:this={buttonEl}
>
  <slot />
</button>
