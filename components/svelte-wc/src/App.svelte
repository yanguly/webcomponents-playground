<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import './entries/elements'

  let counterValue = 0
  let lastBadgeKind = ''

  function handleCounterChange(event: CustomEvent<number>) {
    counterValue = event.detail
  }

  function handleBadgeClick(event: CustomEvent<{ kind: string }>) {
    lastBadgeKind = event.detail.kind
  }
</script>

<main>
  <div>
    <a href="https://vite.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Vite + Svelte</h1>

  <section class="card">
    <h2>Counter demo</h2>
    <sv-counter
      step={2}
      value={counterValue}
      on:value-change={handleCounterChange}
    ></sv-counter>
    <p class="counter-value">Value: {counterValue}</p>
  </section>

  <section class="card">
    <h2>Badge demos</h2>
    <div class="badge-grid">
      <sv-badge kind="neutral" on:svl-click={handleBadgeClick}>Neutral</sv-badge>
      <sv-badge kind="success" on:svl-click={handleBadgeClick}>Success</sv-badge>
      <sv-badge kind="danger" on:svl-click={handleBadgeClick}
        >Danger</sv-badge
      >
    </div>
    {#if lastBadgeKind}
      <p class="badge-message">Last badge click: {lastBadgeKind}</p>
    {/if}
  </section>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">
    Click on the Vite and Svelte logos to learn more
  </p>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }

  .card {
    margin: 1.5rem 0;
    padding: 1.75rem;
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    display: grid;
    gap: 1.25rem;
  }

  .card h2 {
    margin: 0;
    font-size: 1.4rem;
  }

  .badge-grid {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: center;
  }

  .counter-value {
    margin: 0;
    font: 500 1rem/1.2 system-ui, sans-serif;
  }

  .badge-message {
    margin: 0;
    color: #94a3b8;
    font: 0.9rem/1.2 system-ui, sans-serif;
  }
</style>
