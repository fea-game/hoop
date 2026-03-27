<script lang="ts">
  import { game } from '$lib/store.svelte.js';
  import type { PlayerCard } from '$lib/game.js';
  import PlayerCardComp from '../PlayerCard.svelte';
  import CardLegend from '../CardLegend.svelte';

  function isDrafted(p: PlayerCard) {
    return game.roster.some(r => r.id === p.id);
  }

  function toggle(p: PlayerCard) {
    if (isDrafted(p)) {
      game.undraftPlayer(p);
    } else {
      game.draftPlayer(p);
    }
  }

  const canProceed = $derived(game.roster.length >= 5);
  let showLegend = $state(false);
</script>

<div class="screen">
  <div class="top-bar">
    <div>
      <h1>Pre-Season Draft</h1>
      <p class="subtitle">Season {game.season} · Pick 5–8 players</p>
    </div>
    <div class="top-right">
      <button class="btn-ghost info-btn" onclick={() => showLegend = true} aria-label="How to read a card">?</button>
      <div class="counter" class:ready={game.roster.length >= 5}>
        {game.roster.length}/8
      </div>
    </div>
  </div>

  <div class="pool">
    <!-- Inline legend: maps every visible number on the cards below -->
    <div class="card-key">
      <div class="key-section">
        <span class="key-label">Big number</span>
        <span class="key-desc">OVR — overall (avg of all 5 stats, 1–10)</span>
      </div>
      <div class="key-section key-stats">
        <span class="key-label">Small numbers</span>
        <div class="key-stats-row">
          <span class="ks"><abbr title="Scoring">S</abbr> = Scoring</span>
          <span class="ks"><abbr title="Playmaking">P</abbr> = Playmaking</span>
          <span class="ks"><abbr title="Defense">D</abbr> = Defense</span>
          <span class="ks"><abbr title="Athleticism">A</abbr> = Athleticism</span>
          <span class="ks"><abbr title="Basketball IQ">Q</abbr> = IQ</span>
        </div>
      </div>
      <div class="key-section">
        <span class="key-label">Badges</span>
        <span class="key-desc">Tags unlock tactic synergies — match them to your tactics</span>
      </div>
    </div>

    {#each game.playerPool as player (player.id)}
      {@const drafted = isDrafted(player)}
      <button
        class="pool-item"
        class:drafted
        onclick={() => toggle(player)}
        aria-pressed={drafted}
      >
        <PlayerCardComp {player} compact />
        <span class="pick-indicator">{drafted ? '✓' : '+'}</span>
      </button>
    {/each}
  </div>

  <div class="footer">
    {#if game.roster.length > 0}
      <div class="roster-chips">
        {#each game.roster as p (p.id)}
          <span class="chip">{p.name.split(' ')[1]}</span>
        {/each}
      </div>
    {/if}
    <button
      class="btn-primary proceed"
      disabled={!canProceed}
      onclick={() => game.screen = 'chain'}
    >
      Build Tactic Chain →
    </button>
  </div>
</div>

{#if showLegend}
  <CardLegend onclose={() => showLegend = false} />
{/if}

<style>
  .subtitle {
    font-size: 0.8rem;
    color: var(--text-dim);
    margin-top: 2px;
  }

  .top-right {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .info-btn {
    width: 2rem;
    height: 2rem;
    border-radius: 99px;
    border: 1px solid var(--border);
    font-size: 0.9rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    color: var(--text-dim);
  }
  .info-btn:hover { color: var(--accent); border-color: var(--accent); }

  .counter {
    font-size: 1.4rem;
    font-weight: 800;
    color: var(--text-dim);
    min-width: 2.5rem;
    text-align: right;
    transition: color 0.2s;
  }
  .counter.ready { color: var(--green); }

  .pool {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
    overflow-y: auto;
  }

  /* Inline legend banner */
  .card-key {
    background: color-mix(in srgb, var(--accent) 6%, transparent);
    border: 1px solid color-mix(in srgb, var(--accent) 20%, transparent);
    border-radius: var(--radius);
    padding: 0.6rem 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    flex-shrink: 0;
  }

  .key-section {
    display: grid;
    grid-template-columns: 4.5rem 1fr;
    gap: 0.4rem;
    align-items: start;
    font-size: 0.75rem;
  }

  .key-label {
    font-size: 0.62rem;
    font-weight: 700;
    color: var(--accent);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding-top: 1px;
  }

  .key-desc {
    color: var(--text-dim);
    line-height: 1.4;
  }

  .key-stats { align-items: start; }

  .key-stats-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 0.75rem;
  }

  .ks {
    font-size: 0.72rem;
    color: var(--text-dim);
    white-space: nowrap;
  }

  .ks abbr {
    font-weight: 800;
    color: var(--text);
    text-decoration: none;
  }

  .pool-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0;
    text-align: left;
    transition: border-color 0.15s, background 0.15s;
    overflow: hidden;
  }
  .pool-item.drafted {
    border-color: var(--accent);
    background: var(--bg-card-hover);
  }

  .pick-indicator {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-dim);
    padding: 0 0.75rem;
    flex-shrink: 0;
  }
  .pool-item.drafted .pick-indicator { color: var(--green); }

  .footer {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-bottom: env(safe-area-inset-bottom, 0.5rem);
  }

  .roster-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
  }

  .chip {
    font-size: 0.75rem;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 99px;
    padding: 2px 8px;
    color: var(--text-dim);
  }

  .proceed {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
  }
</style>
