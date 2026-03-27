<script lang="ts">
  let { onclose }: { onclose: () => void } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events a11y_interactive_supports_focus -->
<div class="overlay" onclick={onclose} role="presentation">
  <!-- svelte-ignore a11y_interactive_supports_focus a11y_click_events_have_key_events -->
  <div class="panel" onclick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" tabindex="-1">
    <div class="panel-header">
      <h2>How to Read a Card</h2>
      <button class="btn-ghost" onclick={onclose}>✕</button>
    </div>

    <div class="panel-body">

      <!-- Annotated sample card -->
      <div class="annotated">
        <!-- The card itself -->
        <div class="sample-card">
          <div class="pos-badge">PG</div>
          <div class="card-mid">
            <div class="card-name">Marcus Carter</div>
            <div class="card-trait">"Ice cold in clutch moments."</div>
            <div class="card-tags">
              <span class="tag">Playmaker</span>
              <span class="tag">Shot Creator</span>
            </div>
          </div>
          <div class="card-right">
            <div class="ovr">7</div>
            <div class="mini-stats-row">
              <span class="ms"><span class="ms-l">S</span>7</span>
              <span class="dot">·</span>
              <span class="ms"><span class="ms-l">P</span>8</span>
              <span class="dot">·</span>
              <span class="ms"><span class="ms-l">D</span>5</span>
              <span class="dot">·</span>
              <span class="ms"><span class="ms-l">A</span>6</span>
              <span class="dot">·</span>
              <span class="ms"><span class="ms-l">Q</span>8</span>
            </div>
          </div>
        </div>

        <!-- Callout rows, each pointing at one element -->
        <div class="callouts">
          <div class="callout">
            <span class="callout-target pos-color">PG</span>
            <span class="callout-arrow">→</span>
            <span class="callout-text"><strong>Position</strong> — Point Guard. Sets stat biases. PG = high PLY + IQ.</span>
          </div>
          <div class="callout">
            <span class="callout-target">7</span>
            <span class="callout-arrow">→</span>
            <span class="callout-text"><strong>OVR</strong> — Overall (1–10). Average of all 5 stats. Quick power check.</span>
          </div>
          <div class="callout">
            <span class="callout-target tag-pill">Playmaker</span>
            <span class="callout-arrow">→</span>
            <span class="callout-text"><strong>Tag</strong> — unlocks tactic synergies. Pick tactics that need your players' tags.</span>
          </div>
          <div class="callout">
            <span class="callout-target dim">"Ice cold…"</span>
            <span class="callout-arrow">→</span>
            <span class="callout-text"><strong>Trait</strong> — flavour only. Hints at behaviour but doesn't affect stats directly.</span>
          </div>
        </div>
      </div>

      <!-- Stat reference table -->
      <div class="stat-table-wrap">
        <div class="stat-table-title">The 5 stats (each rated 1–10)</div>
        <div class="stat-table">
          <div class="stat-row header-row">
            <span>Label</span>
            <span>Full name</span>
            <span>What it does in-game</span>
          </div>
          <div class="stat-row">
            <span class="stat-abbr">S</span>
            <span class="stat-name">Scoring</span>
            <span class="stat-effect">Shot quality. High S = more makes per attempt.</span>
          </div>
          <div class="stat-row">
            <span class="stat-abbr">P</span>
            <span class="stat-name">Playmaking</span>
            <span class="stat-effect">Passing + decisions. Low P = more turnovers.</span>
          </div>
          <div class="stat-row">
            <span class="stat-abbr">D</span>
            <span class="stat-name">Defense</span>
            <span class="stat-effect">On-ball + help-D. High D lowers opponent FG%.</span>
          </div>
          <div class="stat-row">
            <span class="stat-abbr">A</span>
            <span class="stat-name">Athleticism</span>
            <span class="stat-effect">Speed + explosiveness. Powers slasher finishes.</span>
          </div>
          <div class="stat-row">
            <span class="stat-abbr">Q</span>
            <span class="stat-name">IQ</span>
            <span class="stat-effect">Shot selection + clutch. Boosts make chance every possession.</span>
          </div>
        </div>
      </div>

      <!-- Position colour key -->
      <div class="pos-key">
        <div class="pos-key-title">Position colours</div>
        <div class="pos-key-row">
          {#each [['PG','#38bdf8','Point Guard'],['SG','#a78bfa','Shooting Guard'],['SF','#fbbf24','Small Forward'],['PF','#f87171','Power Forward'],['C','#4ade80','Center']] as [pos, col, full]}
            <div class="pos-entry" title={full}>
              <span class="pos-chip" style="background: color-mix(in srgb, {col} 15%, transparent); border: 1px solid color-mix(in srgb, {col} 40%, transparent); color: {col}">{pos}</span>
              <span class="pos-full">{full}</span>
            </div>
          {/each}
        </div>
      </div>

      <!-- Familiarity bar note -->
      <div class="fam-note-box">
        <div class="fam-bar-demo">
          <div class="fam-fill-demo" style="width: 60%"></div>
        </div>
        <span class="fam-note-text">
          <strong>Familiarity bar</strong> (yellow, appears after games) — grows the more two players share the floor. Higher familiarity = bonus points each match.
        </span>
      </div>

    </div>
  </div>
</div>

<style>
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.78);
    z-index: 200;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  .panel {
    background: var(--bg-card);
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    width: 100%;
    max-width: 480px;
    max-height: 88dvh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1rem 0.75rem;
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }

  .panel-body {
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  /* ── Annotated card section ─────────────────────── */
  .annotated {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .sample-card {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.65rem 0.75rem;
    background: var(--bg-slot);
    border: 1px solid var(--border-active);
    border-radius: var(--radius);
  }

  .pos-badge {
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 6px;
    background: color-mix(in srgb, #38bdf8 15%, transparent);
    border: 1px solid color-mix(in srgb, #38bdf8 40%, transparent);
    color: #38bdf8;
    font-size: 0.6rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    letter-spacing: 0.02em;
  }

  .card-mid {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .card-name { font-size: 0.88rem; font-weight: 700; }
  .card-trait { font-size: 0.68rem; color: var(--text-dim); font-style: italic; }
  .card-tags { display: flex; gap: 4px; flex-wrap: wrap; }

  .card-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
    flex-shrink: 0;
  }

  .ovr {
    font-size: 1.4rem;
    font-weight: 900;
    color: #38bdf8;
    line-height: 1;
  }

  .mini-stats-row {
    display: flex;
    align-items: baseline;
    gap: 1px;
    font-size: 0.66rem;
    color: var(--text-dim);
  }

  .ms { display: inline-flex; align-items: baseline; gap: 1px; }

  .ms-l {
    font-size: 0.52rem;
    font-weight: 800;
    opacity: 0.6;
    letter-spacing: 0;
  }

  .dot { opacity: 0.3; padding: 0 1px; font-size: 0.6rem; }

  /* Callouts */
  .callouts {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .callout {
    display: grid;
    grid-template-columns: 5rem 1rem 1fr;
    gap: 0.3rem;
    align-items: start;
    font-size: 0.77rem;
  }

  .callout-target {
    text-align: right;
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--text-dim);
    padding-top: 1px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .callout-target.pos-color { color: #38bdf8; font-size: 0.8rem; }
  .callout-target.dim { font-style: italic; font-weight: 400; font-size: 0.66rem; }

  .callout-target.tag-pill {
    background: color-mix(in srgb, var(--accent) 15%, transparent);
    border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
    color: var(--accent);
    border-radius: 4px;
    padding: 1px 5px;
    font-size: 0.62rem;
    font-weight: 700;
    text-align: center;
  }

  .callout-arrow {
    color: var(--border-active);
    font-size: 0.75rem;
    padding-top: 1px;
    text-align: center;
  }

  .callout-text {
    color: var(--text-dim);
    line-height: 1.4;
  }

  .callout-text strong {
    color: var(--text);
    font-weight: 700;
  }

  /* ── Stat table ─────────────────────────────────── */
  .stat-table-wrap {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .stat-table-title {
    font-size: 0.62rem;
    font-weight: 700;
    color: var(--text-dim);
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }

  .stat-table {
    display: flex;
    flex-direction: column;
    gap: 0;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    overflow: hidden;
  }

  .stat-row {
    display: grid;
    grid-template-columns: 1.6rem 5.5rem 1fr;
    gap: 0.5rem;
    padding: 0.35rem 0.6rem;
    align-items: start;
    border-bottom: 1px solid var(--border);
    font-size: 0.77rem;
  }

  .stat-row:last-child { border-bottom: none; }

  .stat-row.header-row {
    background: var(--bg-slot);
    font-size: 0.6rem;
    font-weight: 700;
    color: var(--text-dim);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 0.3rem 0.6rem;
  }

  .stat-abbr {
    font-weight: 900;
    font-size: 0.82rem;
    color: var(--text);
  }

  .stat-name {
    font-weight: 600;
    color: var(--text);
  }

  .stat-effect {
    color: var(--text-dim);
    line-height: 1.35;
  }

  /* ── Position key ────────────────────────────────── */
  .pos-key {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .pos-key-title {
    font-size: 0.62rem;
    font-weight: 700;
    color: var(--text-dim);
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }

  .pos-key-row {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .pos-entry {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .pos-chip {
    font-size: 0.62rem;
    font-weight: 800;
    padding: 3px 8px;
    border-radius: 5px;
    letter-spacing: 0.02em;
    flex-shrink: 0;
    min-width: 2.2rem;
    text-align: center;
  }

  .pos-full {
    font-size: 0.75rem;
    color: var(--text-dim);
  }

  /* ── Familiarity note ─────────────────────────────── */
  .fam-note-box {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding: 0.6rem 0.75rem;
    background: var(--bg-slot);
    border: 1px solid var(--border);
    border-radius: var(--radius);
  }

  .fam-bar-demo {
    width: 100%;
    height: 4px;
    background: var(--border);
    border-radius: 99px;
    overflow: hidden;
  }

  .fam-fill-demo {
    height: 100%;
    background: var(--yellow);
    border-radius: 99px;
  }

  .fam-note-text {
    font-size: 0.77rem;
    color: var(--text-dim);
    line-height: 1.4;
  }

  .fam-note-text strong {
    color: var(--text);
    font-weight: 700;
  }
</style>
