<script lang="ts">
  let { children } = $props();
</script>

<svelte:head>
  <title>Hoop Manager</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
</svelte:head>

{@render children()}

<style>
  :global(*) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :global(body) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    background: #0f1117;
    color: #e8eaf0;
    min-height: 100dvh;
    overscroll-behavior: none;
  }

  :global(:root) {
    --bg: #0f1117;
    --bg-card: #1a1d27;
    --bg-card-hover: #22263a;
    --bg-slot: #13161f;
    --accent: #38bdf8;
    --accent-dim: #0ea5e9;
    --green: #4ade80;
    --red: #f87171;
    --yellow: #fbbf24;
    --text: #e8eaf0;
    --text-dim: #7c8599;
    --border: #2a2f42;
    --border-active: #38bdf8;
    --radius: 10px;
    --radius-sm: 6px;
  }

  :global(h1) { font-size: 1.4rem; font-weight: 700; }
  :global(h2) { font-size: 1.1rem; font-weight: 600; }
  :global(h3) { font-size: 0.9rem; font-weight: 600; }

  :global(button) {
    cursor: pointer;
    border: none;
    border-radius: var(--radius-sm);
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: 600;
    padding: 0.5rem 1rem;
    transition: opacity 0.15s, transform 0.1s;
  }
  :global(button:active) { transform: scale(0.97); }
  :global(button:disabled) { opacity: 0.4; cursor: not-allowed; }

  :global(.btn-primary) {
    background: var(--accent);
    color: #0f1117;
  }
  :global(.btn-ghost) {
    background: transparent;
    color: var(--text-dim);
    border: 1px solid var(--border);
  }
  :global(.btn-danger) {
    background: transparent;
    color: var(--red);
    border: 1px solid var(--red);
  }

  :global(.tag) {
    display: inline-block;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 99px;
    background: #1e3a4a;
    color: var(--accent);
    letter-spacing: 0.02em;
    white-space: nowrap;
  }

  :global(.tag.fired) {
    background: #1a3a1a;
    color: var(--green);
  }

  :global(.screen) {
    max-width: 480px;
    margin: 0 auto;
    padding: 1rem;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  :global(.top-bar) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }

  :global(.card) {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0.75rem;
  }

  :global(.divider) {
    height: 1px;
    background: var(--border);
    margin: 0.25rem 0;
  }
</style>
