<script lang="ts">
  import { game } from '$lib/store.svelte.js';
  import { onMount } from 'svelte';
  import type { Possession } from '$lib/game.js';

  const result = $derived(game.matchResult);

  // Animate score reveal
  let revealed = $state(false);
  let showLog = $state(false);

  onMount(() => {
    setTimeout(() => (revealed = true), 300);
    setTimeout(() => (showLog = true), 900);
  });

  const ourScore = $derived(result?.ourScore ?? 0);
  const opposingScore = $derived(result?.theirScore ?? 0);
  const won = $derived(result?.won ?? false);

  // Group possessions by quarter
  const byQuarter = $derived<Map<number, Possession[]>>(() => {
    const map = new Map<number, Possession[]>();
    if (!result) return map;
    for (const poss of result.possessions) {
      if (!map.has(poss.quarter)) map.set(poss.quarter, []);
      map.get(poss.quarter)!.push(poss);
    }
    return map;
  });

  // Win/loss reason summary
  const winReason = $derived(() => {
    if (!result) return '';
    const s = result.stats;
    const lines: string[] = [];
    if (won) {
      if (s.synergyBonusPts >= 8) lines.push(`Synergies added ~${s.synergyBonusPts} pts — the chain paid off.`);
      if (s.ourFGPct >= 55) lines.push(`Shot ${s.ourFGPct}% FG — dominant offense.`);
      if (s.theirTurnovers >= 4) lines.push(`Forced ${s.theirTurnovers} turnovers — defense disrupted their flow.`);
      if (s.familiarityBonusPts >= 4) lines.push(`Familiarity generated ${s.familiarityBonusPts} bonus pts — chemistry showing.`);
      if (lines.length === 0) lines.push(`Solid execution — outscored them ${ourScore}–${opposingScore}.`);
    } else {
      if (s.ourTurnovers >= 4) lines.push(`${s.ourTurnovers} turnovers killed possessions — PLY needs work.`);
      if (s.ourFGPct <= 40) lines.push(`Only ${s.ourFGPct}% FG — low SCR or missing synergies.`);
      if (s.synergyBonusPts === 0) lines.push('No synergies activated — check your tactic tag coverage.');
      if (s.theirFGPct >= 60) lines.push(`Opponent hit ${s.theirFGPct}% — boost DEF or add a Rim Protector.`);
      if (lines.length === 0) lines.push(`Outscored ${ourScore}–${opposingScore}. Opponent strength is rising.`);
    }
    return lines;
  });

  function outcomeIcon(poss: Possession): string {
    if (poss.team === 'them') {
      if (poss.outcome === 'turnover') return '🔵';
      if (poss.outcome === 'blocked') return '✋';
      if (poss.points > 0) return '❌';
      return '🔵';
    }
    if (poss.outcome === 'turnover') return '⚠';
    if (poss.points === 3) return '🔥';
    if (poss.points === 2) return '✓';
    return '·';
  }
</script>

<div class="screen">
  <div class="top-bar">
    <h1>Match Result</h1>
    <span class="season-tag">Season {game.season}</span>
  </div>

  {#if result}
    <!-- Score board -->
    <div class="scoreboard card" class:won class:lost={!won}>
      <div class="team-score">
        <span class="team-name">Your Team</span>
        <span class="score" class:revealed>{revealed ? ourScore : '—'}</span>
      </div>
      <div class="vs">vs</div>
      <div class="team-score opp">
        <span class="team-name">Opponent</span>
        <span class="score" class:revealed>{revealed ? opposingScore : '—'}</span>
      </div>
      <div class="outcome-label" class:revealed>
        {#if revealed}
          {won ? '🏆 Victory' : '💀 Defeat'}
        {/if}
      </div>
    </div>

    <!-- Why you won/lost -->
    {#if revealed}
      <div class="card reason-card" class:won class:lost={!won}>
        <h3>{won ? 'Why you won' : 'Why you lost'}</h3>
        <ul class="reason-list">
          {#each winReason() as line}
            <li>{line}</li>
          {/each}
        </ul>
      </div>
    {/if}

    <!-- Box score stats -->
    {#if revealed}
      <div class="card box-score">
        <h3>Box Score</h3>
        <table class="stats-table">
          <thead>
            <tr>
              <th></th>
              <th>Us</th>
              <th>Them</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>FG%</td>
              <td class:good={result.stats.ourFGPct >= 50}>{result.stats.ourFGPct}%</td>
              <td class:bad={result.stats.theirFGPct >= 55}>{result.stats.theirFGPct}%</td>
            </tr>
            <tr>
              <td>Turnovers</td>
              <td class:bad={result.stats.ourTurnovers >= 4}>{result.stats.ourTurnovers}</td>
              <td class:good={result.stats.theirTurnovers >= 4}>{result.stats.theirTurnovers}</td>
            </tr>
            <tr>
              <td>Synergy pts</td>
              <td class:good={result.stats.synergyBonusPts > 0} colspan="2">~{result.stats.synergyBonusPts}</td>
            </tr>
            <tr>
              <td>Familiarity pts</td>
              <td class:good={result.stats.familiarityBonusPts > 0} colspan="2">+{result.stats.familiarityBonusPts}</td>
            </tr>
            <tr>
              <td>Chem multiplier</td>
              <td colspan="2">{result.stats.chemistryMultiplier}x</td>
            </tr>
          </tbody>
        </table>
      </div>
    {/if}

    <!-- Synergies that fired -->
    {#if result.synergysFired.length > 0}
      <div class="card synergy-fired">
        <h3>Synergies activated</h3>
        <div class="fired-list">
          {#each result.synergysFired as name}
            <span class="tag fired">{name}</span>
          {/each}
        </div>
      </div>
    {:else}
      <div class="card synergy-fired none">
        <h3>No synergies activated</h3>
        <p>Adjust your tactic chain to unlock combination bonuses.</p>
      </div>
    {/if}

    <!-- Possession-by-possession log -->
    {#if showLog}
      <div class="card possession-log">
        <h3>Play-by-Play</h3>
        <div class="log-scroll">
          {#each [1, 2, 3, 4] as q}
            {#if byQuarter().has(q)}
              <div class="quarter-divider">Q{q}</div>
              {#each byQuarter().get(q)! as poss}
                <div
                  class="poss-row"
                  class:us={poss.team === 'us'}
                  class:them={poss.team === 'them'}
                  class:scored={poss.points > 0}
                  class:turnover={poss.outcome === 'turnover'}
                >
                  <span class="poss-icon">{outcomeIcon(poss)}</span>
                  <span class="poss-desc">{poss.description}</span>
                  <span class="poss-score">{poss.scoreUs}–{poss.scoreThem}</span>
                </div>
              {/each}
            {/if}
          {/each}
        </div>
      </div>
    {/if}

    <!-- Chemistry delta -->
    <div class="card chem-delta">
      <div class="chem-row">
        <span>Team Chemistry</span>
        <span class:positive={result.chemistryDelta > 0} class:negative={result.chemistryDelta < 0}>
          {result.chemistryDelta > 0 ? '+' : ''}{result.chemistryDelta}
          → <strong>{Math.max(0, Math.min(100, game.chemistry + result.chemistryDelta))}</strong>
        </span>
      </div>
      <div class="chem-bar-bg">
        <div
          class="chem-bar-fill"
          style="width: {Math.max(0, Math.min(100, game.chemistry + result.chemistryDelta))}%"
        ></div>
      </div>
    </div>

    <!-- Familiarity gains summary -->
    {#if result.familiarityGains.length > 0}
      <div class="card fam-gains">
        <h3>Familiarity built</h3>
        <p class="fam-note">
          {result.familiarityGains.length} player pair{result.familiarityGains.length !== 1 ? 's' : ''}
          gained shared time.
          Keep them together to unlock synergy bonuses.
        </p>
      </div>
    {/if}
  {/if}

  <!-- CTA -->
  <div class="footer">
    <button class="btn-primary proceed" onclick={() => game.confirmResult()}>
      Continue →
    </button>
  </div>
</div>

<style>
  .season-tag {
    font-size: 0.8rem;
    color: var(--text-dim);
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 99px;
    padding: 3px 10px;
  }

  /* Scoreboard */
  .scoreboard {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 1.25rem 1rem;
    border-width: 2px;
    flex-wrap: wrap;
    position: relative;
    overflow: hidden;
  }

  .scoreboard::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.05;
    pointer-events: none;
  }

  .scoreboard.won { border-color: var(--green); }
  .scoreboard.won::before { background: var(--green); }
  .scoreboard.lost { border-color: var(--red); }
  .scoreboard.lost::before { background: var(--red); }

  .team-score {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    flex: 1;
  }
  .team-score.opp { opacity: 0.7; }

  .team-name {
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--text-dim);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .score {
    font-size: 2.8rem;
    font-weight: 900;
    color: var(--text-dim);
    transition: color 0.4s, transform 0.3s;
  }
  .score.revealed {
    color: var(--text);
    transform: scale(1.05);
  }

  .vs {
    font-size: 0.9rem;
    color: var(--text-dim);
    font-weight: 700;
  }

  .outcome-label {
    width: 100%;
    text-align: center;
    font-size: 1.1rem;
    font-weight: 800;
    opacity: 0;
    transition: opacity 0.4s;
    margin-top: 0.25rem;
  }
  .outcome-label.revealed { opacity: 1; }

  /* Reason card */
  .reason-card {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    border-left-width: 3px;
  }
  .reason-card.won { border-left-color: var(--green); }
  .reason-card.lost { border-left-color: var(--red); }

  .reason-list {
    margin: 0;
    padding: 0 0 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  .reason-list li {
    font-size: 0.82rem;
    line-height: 1.45;
    color: var(--text);
  }

  /* Box score */
  .box-score { display: flex; flex-direction: column; gap: 0.5rem; }

  .stats-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.8rem;
  }
  .stats-table th {
    text-align: right;
    font-size: 0.65rem;
    font-weight: 700;
    color: var(--text-dim);
    letter-spacing: 0.05em;
    padding-bottom: 0.25rem;
  }
  .stats-table th:first-child { text-align: left; }
  .stats-table td {
    text-align: right;
    padding: 0.2rem 0;
    color: var(--text-dim);
  }
  .stats-table td:first-child {
    text-align: left;
    color: var(--text-dim);
    font-size: 0.75rem;
  }
  .stats-table .good { color: var(--green); font-weight: 700; }
  .stats-table .bad  { color: var(--red);   font-weight: 700; }

  /* Synergy fired */
  .synergy-fired {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .fired-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .synergy-fired.none { opacity: 0.6; }
  .synergy-fired.none p {
    font-size: 0.8rem;
    color: var(--text-dim);
    margin-top: 0.2rem;
  }

  /* Possession log */
  .possession-log {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .log-scroll {
    display: flex;
    flex-direction: column;
    gap: 2px;
    max-height: 40dvh;
    overflow-y: auto;
  }

  .quarter-divider {
    font-size: 0.65rem;
    font-weight: 800;
    color: var(--text-dim);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.4rem 0 0.1rem;
    border-bottom: 1px solid var(--border);
    margin-bottom: 2px;
  }

  .poss-row {
    display: grid;
    grid-template-columns: 1.2rem 1fr auto;
    gap: 0.35rem;
    align-items: start;
    padding: 0.25rem 0.35rem;
    border-radius: 4px;
    font-size: 0.77rem;
    line-height: 1.4;
  }

  .poss-row.us { background: transparent; }
  .poss-row.us.scored {
    background: color-mix(in srgb, var(--green) 6%, transparent);
  }
  .poss-row.us.turnover {
    background: color-mix(in srgb, var(--yellow) 8%, transparent);
  }
  .poss-row.them {
    opacity: 0.65;
    font-size: 0.72rem;
  }
  .poss-row.them.scored {
    opacity: 0.8;
    background: color-mix(in srgb, var(--red) 6%, transparent);
  }

  .poss-icon {
    font-size: 0.7rem;
    padding-top: 1px;
    flex-shrink: 0;
  }

  .poss-desc {
    color: var(--text);
    min-width: 0;
  }

  .poss-score {
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--text-dim);
    flex-shrink: 0;
    font-variant-numeric: tabular-nums;
  }

  /* Chemistry */
  .chem-delta { display: flex; flex-direction: column; gap: 0.4rem; }

  .chem-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.85rem;
  }

  .positive { color: var(--green); }
  .negative { color: var(--red); }

  .chem-bar-bg {
    height: 6px;
    background: var(--border);
    border-radius: 99px;
    overflow: hidden;
  }

  .chem-bar-fill {
    height: 100%;
    background: var(--accent);
    border-radius: 99px;
    transition: width 0.5s ease;
  }

  /* Familiarity */
  .fam-gains { display: flex; flex-direction: column; gap: 0.3rem; }
  .fam-note { font-size: 0.8rem; color: var(--text-dim); line-height: 1.5; }

  /* Footer */
  .footer {
    margin-top: auto;
    padding-bottom: env(safe-area-inset-bottom, 0.5rem);
  }

  .proceed {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
  }
</style>
