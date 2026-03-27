<script lang="ts">
  import { game } from '$lib/store.svelte.js';
  import {
    POSITIONS,
    POSITION_LABELS,
    TACTIC_CARDS,
    evaluateSynergies,
    type Position,
    type PlayerCard,
    type TacticCard,
  } from '$lib/game.js';
  import PlayerCardComp from '../PlayerCard.svelte';

  // Players not yet assigned to any slot
  const unassigned = $derived(
    game.roster.filter(p =>
      !POSITIONS.some(pos => game.chain.slots[pos]?.id === p.id)
    )
  );

  const synergies = $derived(evaluateSynergies(game.chain));

  const slotsFilledCount = $derived(
    POSITIONS.filter(pos => game.chain.slots[pos] !== null).length
  );

  const canPlay = $derived(slotsFilledCount >= 5);

  // Which tactic is in each tactic slot
  let tacticsOpen = $state<0 | 1 | null>(null);

  function assignToSlot(pos: Position, player: PlayerCard) {
    game.assignToSlot(pos, player);
  }

  function clearSlot(pos: Position) {
    game.assignToSlot(pos, null);
  }

  function pickTactic(index: 0 | 1, tactic: TacticCard) {
    // Toggle off if same tactic
    if (game.chain.tactics[index]?.id === tactic.id) {
      game.assignTactic(index, null);
    } else {
      game.assignTactic(index, tactic);
    }
    tacticsOpen = null;
  }

  // Present tags across all filled slots
  const presentTags = $derived(() => {
    const tags = new Set<string>();
    for (const pos of POSITIONS) {
      game.chain.slots[pos]?.tags.forEach(t => tags.add(t));
    }
    return tags;
  });

  let selectedUnassigned = $state<string | null>(null);
</script>

<div class="screen">
  <!-- Top bar -->
  <div class="top-bar">
    <div>
      <h1>Tactic Chain</h1>
      <p class="subtitle">
        Season {game.season} · {game.record.wins}W–{game.record.losses}L
      </p>
    </div>
    <div class="chem-badge" title="Team chemistry">
      <span class="chem-label">CHEM</span>
      <span class="chem-val" style="color: {game.chemistry >= 60 ? 'var(--green)' : game.chemistry >= 40 ? 'var(--yellow)' : 'var(--red)'}">
        {game.chemistry}
      </span>
    </div>
  </div>

  <!-- Position slots -->
  <div class="chain-section">
    <h2>Lineup</h2>
    <div class="slots">
      {#each POSITIONS as pos (pos)}
        {@const player = game.chain.slots[pos]}
        <div class="slot" class:filled={!!player}>
          <div class="slot-label">{POSITION_LABELS[pos]}</div>
          {#if player}
            <div class="slot-player">
              <PlayerCardComp {player} compact />
              <button class="clear-btn" onclick={() => clearSlot(pos)} aria-label="Remove">✕</button>
            </div>
          {:else}
            <div class="slot-empty">
              {#if selectedUnassigned}
                <button
                  class="assign-btn"
                  onclick={() => {
                    const p = game.roster.find(p => p.id === selectedUnassigned);
                    if (p) assignToSlot(pos, p);
                    selectedUnassigned = null;
                  }}
                >
                  Assign here
                </button>
              {:else}
                <span class="slot-hint">— empty —</span>
              {/if}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <!-- Bench (unassigned players) -->
  {#if unassigned.length > 0}
    <div class="bench-section">
      <h2>Bench</h2>
      <div class="bench">
        {#each unassigned as player (player.id)}
          <button
            class="bench-item"
            class:selected={selectedUnassigned === player.id}
            onclick={() => {
              selectedUnassigned = selectedUnassigned === player.id ? null : player.id;
            }}
          >
            <PlayerCardComp {player} compact />
          </button>
        {/each}
      </div>
      {#if selectedUnassigned}
        <p class="assign-hint">↑ Tap a slot above to assign</p>
      {:else}
        <p class="assign-hint">Tap a player to select, then tap an empty slot</p>
      {/if}
    </div>
  {/if}

  <!-- Tactic cards -->
  <div class="tactics-section">
    <h2>Tactics</h2>
    <div class="tactic-slots">
      {#each [0, 1] as i}
        {@const tactic = game.chain.tactics[i as 0|1]}
        <div class="tactic-slot" class:has-tactic={!!tactic}>
          {#if tactic}
            <div class="tactic-filled">
              <div class="tactic-name">{tactic.name}</div>
              <div class="tactic-tags">
                {#each tactic.requiresTags as tag}
                  <span class="tag" class:fired={presentTags().has(tag)}>{tag}</span>
                {/each}
              </div>
              <button class="clear-btn small" onclick={() => game.assignTactic(i as 0|1, null)}>✕</button>
            </div>
          {:else}
            <button class="tactic-add" onclick={() => tacticsOpen = i as 0|1}>
              + Add Tactic {i + 1}
            </button>
          {/if}
        </div>
      {/each}
    </div>

    <!-- Synergy readout -->
    {#if synergies.length > 0}
      <div class="synergy-list">
        {#each synergies as syn}
          <div class="synergy-row" class:active={syn.fullyActivated}>
            <span class="syn-name">{syn.tactic.name}</span>
            <span class="syn-status">
              {#if syn.fullyActivated}
                <span style="color: var(--green)">✓ +{syn.bonus}</span>
              {:else if syn.bonus > 0}
                <span style="color: var(--yellow)">½ +{syn.bonus}</span>
              {:else}
                <span style="color: var(--red)">✗ inactive</span>
              {/if}
            </span>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Tactic picker overlay -->
  {#if tacticsOpen !== null}
    <div class="overlay" onclick={() => tacticsOpen = null} role="presentation">
      <!-- svelte-ignore a11y_interactive_supports_focus a11y_click_events_have_key_events -->
      <div class="overlay-panel" onclick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" tabindex="-1">
        <div class="overlay-header">
          <h2>Choose Tactic {tacticsOpen + 1}</h2>
          <button class="btn-ghost" onclick={() => tacticsOpen = null}>✕</button>
        </div>
        <div class="tactic-list">
          {#each TACTIC_CARDS as tactic}
            {@const isSelected = game.chain.tactics[tacticsOpen as 0|1]?.id === tactic.id}
            {@const reqTags = tactic.requiresTags}
            {@const tagsPresent = reqTags.filter(t => presentTags().has(t))}
            {@const isActive = tagsPresent.length === reqTags.length}
            <button
              class="tactic-option"
              class:selected={isSelected}
              onclick={() => pickTactic(tacticsOpen as 0|1, tactic)}
            >
              <div class="tactic-opt-name">{tactic.name}</div>
              <div class="tactic-opt-desc">{tactic.description}</div>
              <div class="tactic-opt-tags">
                {#each reqTags as tag}
                  <span class="tag" class:fired={presentTags().has(tag)}>{tag}</span>
                {/each}
                <span class="tactic-bonus" style="color: {isActive ? 'var(--green)' : tagsPresent.length > 0 ? 'var(--yellow)' : 'var(--text-dim)'}">
                  +{isActive ? tactic.activationBonus : tagsPresent.length > 0 ? tactic.partialBonus : 0}
                </span>
              </div>
            </button>
          {/each}
        </div>
      </div>
    </div>
  {/if}

  <!-- Footer CTA -->
  <div class="footer">
    <button class="btn-ghost small" onclick={() => game.screen = 'draft'}>← Draft</button>
    <button
      class="btn-primary proceed"
      disabled={!canPlay}
      onclick={() => game.runMatch()}
    >
      {canPlay ? 'Play Match →' : `Fill ${5 - slotsFilledCount} more slot${5 - slotsFilledCount !== 1 ? 's' : ''}`}
    </button>
  </div>
</div>

<style>
  .subtitle {
    font-size: 0.8rem;
    color: var(--text-dim);
    margin-top: 2px;
  }

  .chem-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1px;
  }
  .chem-label { font-size: 0.6rem; font-weight: 700; color: var(--text-dim); letter-spacing: 0.08em; }
  .chem-val { font-size: 1.3rem; font-weight: 800; }

  /* Chain slots */
  .chain-section, .bench-section, .tactics-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .slots {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .slot {
    background: var(--bg-slot);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    transition: border-color 0.15s;
  }
  .slot.filled { border-color: var(--border-active); }

  .slot-label {
    font-size: 0.65rem;
    font-weight: 700;
    color: var(--text-dim);
    letter-spacing: 0.06em;
    padding: 0.3rem 0.75rem 0;
    text-transform: uppercase;
  }

  .slot-player {
    display: flex;
    align-items: center;
  }

  .slot-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    min-height: 3rem;
  }

  .slot-hint {
    font-size: 0.8rem;
    color: var(--text-dim);
  }

  .assign-btn {
    background: color-mix(in srgb, var(--accent) 15%, transparent);
    color: var(--accent);
    border: 1px dashed var(--accent);
    border-radius: var(--radius-sm);
    padding: 0.4rem 1rem;
    font-size: 0.85rem;
    width: 100%;
  }

  .clear-btn {
    background: transparent;
    color: var(--text-dim);
    border: none;
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
    flex-shrink: 0;
  }
  .clear-btn:hover { color: var(--red); }
  .clear-btn.small { font-size: 0.75rem; padding: 0.25rem 0.5rem; }

  /* Bench */
  .bench {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .bench-item {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0;
    text-align: left;
    overflow: hidden;
    transition: border-color 0.15s;
  }
  .bench-item.selected {
    border-color: var(--accent);
    background: var(--bg-card-hover);
  }

  .assign-hint {
    font-size: 0.75rem;
    color: var(--text-dim);
    text-align: center;
  }

  /* Tactics */
  .tactic-slots {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }

  .tactic-slot {
    background: var(--bg-slot);
    border: 1px dashed var(--border);
    border-radius: var(--radius);
    min-height: 5rem;
    display: flex;
    align-items: stretch;
  }
  .tactic-slot.has-tactic {
    border-style: solid;
    border-color: var(--border-active);
  }

  .tactic-add {
    background: transparent;
    color: var(--text-dim);
    border: none;
    width: 100%;
    height: 100%;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tactic-add:hover { color: var(--accent); }

  .tactic-filled {
    padding: 0.6rem;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    width: 100%;
    position: relative;
  }

  .tactic-name {
    font-size: 0.85rem;
    font-weight: 700;
    padding-right: 1.5rem;
  }

  .tactic-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 3px;
  }

  .tactic-filled .clear-btn {
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    padding: 0.2rem 0.4rem;
  }

  /* Synergy readout */
  .synergy-list {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .synergy-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--bg-slot);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 0.4rem 0.6rem;
    font-size: 0.82rem;
  }
  .synergy-row.active { border-color: color-mix(in srgb, var(--green) 40%, transparent); }

  .syn-name { font-weight: 600; }
  .syn-status { font-weight: 700; font-size: 0.8rem; }

  /* Tactic picker overlay */
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.7);
    z-index: 100;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  .overlay-panel {
    background: var(--bg-card);
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    width: 100%;
    max-width: 480px;
    max-height: 75dvh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .overlay-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1rem 0.75rem;
    border-bottom: 1px solid var(--border);
  }

  .tactic-list {
    overflow-y: auto;
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .tactic-option {
    background: var(--bg-slot);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0.7rem;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    transition: border-color 0.15s;
  }
  .tactic-option.selected {
    border-color: var(--accent);
    background: var(--bg-card-hover);
  }

  .tactic-opt-name { font-size: 0.9rem; font-weight: 700; }
  .tactic-opt-desc { font-size: 0.75rem; color: var(--text-dim); }
  .tactic-opt-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    align-items: center;
  }
  .tactic-bonus { font-size: 0.75rem; font-weight: 700; margin-left: auto; }

  /* Footer */
  .footer {
    display: flex;
    gap: 0.5rem;
    padding-bottom: env(safe-area-inset-bottom, 0.5rem);
    margin-top: auto;
  }

  .footer .small {
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
    flex-shrink: 0;
  }

  .proceed {
    flex: 1;
    padding: 0.75rem;
    font-size: 1rem;
  }
</style>
