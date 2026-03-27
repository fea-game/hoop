<script lang="ts">
  import type { PlayerCard } from '$lib/game.js';

  let { player, compact = false }: { player: PlayerCard; compact?: boolean } = $props();

  const POSITION_COLOR: Record<string, string> = {
    PG: '#38bdf8',
    SG: '#a78bfa',
    SF: '#fbbf24',
    PF: '#f87171',
    C:  '#4ade80',
  };

  const posColor = $derived(POSITION_COLOR[player.position] ?? '#7c8599');

  // Overall rating (average of all 5 attributes)
  const ovr = $derived(
    Math.round((player.scoring + player.playmaking + player.defense + player.athleticism + player.iq) / 5)
  );

  // Average familiarity across all known partners
  const famValues = $derived(Object.values(player.familiarity));
  const avgFam = $derived(
    famValues.length > 0 ? Math.round(famValues.reduce((a, b) => a + b, 0) / famValues.length) : 0
  );
</script>

<div class="player-card" class:compact style="--pos-color: {posColor}">
  <div class="pos-badge">{player.position}</div>

  <div class="info">
    <div class="name">{player.name}</div>

    {#if !compact}
      <div class="trait">{player.trait}</div>
    {/if}

    <div class="tags">
      {#each player.tags as tag}
        <span class="tag">{tag}</span>
      {/each}
    </div>
  </div>

  <div class="stats">
    <div class="ovr">{ovr}</div>
    {#if !compact}
      <div class="stat-grid">
        <span title="Scoring">SCR {player.scoring}</span>
        <span title="Playmaking">PLY {player.playmaking}</span>
        <span title="Defense">DEF {player.defense}</span>
        <span title="Athleticism">ATH {player.athleticism}</span>
        <span title="Basketball IQ" class="iq-stat">IQ {player.iq}</span>
      </div>
    {:else}
      <div class="mini-stats">
        <span class="mini-stat"><abbr title="Scoring">S</abbr>{player.scoring}</span>
        <span class="mini-sep">·</span>
        <span class="mini-stat"><abbr title="Playmaking">P</abbr>{player.playmaking}</span>
        <span class="mini-sep">·</span>
        <span class="mini-stat"><abbr title="Defense">D</abbr>{player.defense}</span>
        <span class="mini-sep">·</span>
        <span class="mini-stat"><abbr title="Athleticism">A</abbr>{player.athleticism}</span>
        <span class="mini-sep">·</span>
        <span class="mini-stat"><abbr title="IQ">Q</abbr>{player.iq}</span>
      </div>
    {/if}

    {#if famValues.length > 0}
      <div class="fam-bar" title="Avg familiarity: {avgFam}">
        <div class="fam-fill" style="width: {avgFam}%"></div>
      </div>
    {/if}
  </div>
</div>

<style>
  .player-card {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.6rem 0.75rem;
    width: 100%;
  }

  .player-card.compact {
    padding: 0.5rem 0.6rem;
  }

  .pos-badge {
    width: 2rem;
    height: 2rem;
    border-radius: 6px;
    background: color-mix(in srgb, var(--pos-color) 15%, transparent);
    border: 1px solid color-mix(in srgb, var(--pos-color) 40%, transparent);
    color: var(--pos-color);
    font-size: 0.6rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    letter-spacing: 0.02em;
  }

  .info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .name {
    font-size: 0.9rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .trait {
    font-size: 0.72rem;
    color: var(--text-dim);
    font-style: italic;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tags {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
  }

  .stats {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 3px;
    flex-shrink: 0;
  }

  .ovr {
    font-size: 1.3rem;
    font-weight: 800;
    color: var(--pos-color);
    line-height: 1;
  }

  .stat-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px 8px;
    font-size: 0.65rem;
    color: var(--text-dim);
    text-align: right;
  }

  .iq-stat {
    grid-column: 1 / -1;
    text-align: right;
  }

  .mini-stats {
    display: flex;
    align-items: baseline;
    gap: 1px;
    font-size: 0.68rem;
    color: var(--text-dim);
    font-variant-numeric: tabular-nums;
  }

  .mini-stat abbr {
    font-size: 0.55rem;
    font-weight: 700;
    text-decoration: none;
    opacity: 0.6;
    letter-spacing: 0;
  }

  .mini-sep {
    opacity: 0.35;
    font-size: 0.6rem;
    padding: 0 1px;
  }

  .fam-bar {
    width: 3rem;
    height: 3px;
    background: var(--border);
    border-radius: 99px;
    overflow: hidden;
  }

  .fam-fill {
    height: 100%;
    background: var(--yellow);
    border-radius: 99px;
    transition: width 0.3s;
  }
</style>
