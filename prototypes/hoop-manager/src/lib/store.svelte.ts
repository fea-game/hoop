// ---------------------------------------------------------------------------
// Global game state using Svelte 5 runes
// ---------------------------------------------------------------------------

import {
  type PlayerCard,
  type TacticCard,
  type TacticChain,
  type MatchResult,
  type Position,
  POSITIONS,
  generatePlayerPool,
  simulateMatch,
  TACTIC_CARDS,
} from './game.js';

export type Screen = 'draft' | 'chain' | 'match' | 'summary';

function makeChain(): TacticChain {
  return {
    slots: Object.fromEntries(POSITIONS.map(p => [p, null])) as Record<Position, PlayerCard | null>,
    tactics: [null, null],
  };
}

class GameStore {
  // ── Navigation ──────────────────────────────────────────────────────────
  screen = $state<Screen>('draft');

  // ── Season state ─────────────────────────────────────────────────────────
  season = $state(1);
  playerPool = $state<PlayerCard[]>([]);
  roster = $state<PlayerCard[]>([]);
  chemistry = $state(50);
  chain = $state<TacticChain>(makeChain());
  matchResult = $state<MatchResult | null>(null);
  matchSeed = $state(0);

  // ── Match record (wins/losses this season) ────────────────────────────
  record = $state({ wins: 0, losses: 0 });

  // ── Opponent strength escalates through the season ───────────────────
  opponentStrength = $derived(Math.min(9, 3 + this.record.wins + this.record.losses));

  constructor() {
    this.newSeason();
  }

  newSeason() {
    const seed = Date.now();
    this.playerPool = generatePlayerPool(seed, 12);
    this.roster = [];
    this.chain = makeChain();
    this.matchResult = null;
    this.chemistry = 50;
    this.matchSeed = seed + 1;
    this.record = { wins: 0, losses: 0 };
    this.screen = 'draft';
  }

  draftPlayer(player: PlayerCard) {
    if (this.roster.length >= 8) return;
    if (this.roster.find(p => p.id === player.id)) return;
    this.roster = [...this.roster, player];
  }

  undraftPlayer(player: PlayerCard) {
    this.roster = this.roster.filter(p => p.id !== player.id);
    // Remove from chain slots too
    for (const pos of POSITIONS) {
      if (this.chain.slots[pos]?.id === player.id) {
        this.chain = {
          ...this.chain,
          slots: { ...this.chain.slots, [pos]: null },
        };
      }
    }
  }

  assignToSlot(pos: Position, player: PlayerCard | null) {
    // Remove player from any existing slot first
    const currentSlots = { ...this.chain.slots };
    if (player) {
      for (const p of POSITIONS) {
        if (currentSlots[p]?.id === player.id) currentSlots[p] = null;
      }
    }
    currentSlots[pos] = player;
    this.chain = { ...this.chain, slots: currentSlots };
  }

  assignTactic(index: 0 | 1, tactic: TacticCard | null) {
    const tactics: [TacticCard | null, TacticCard | null] = [...this.chain.tactics];
    tactics[index] = tactic;
    this.chain = { ...this.chain, tactics };
  }

  runMatch() {
    this.matchResult = simulateMatch(
      this.chain,
      this.chemistry,
      this.opponentStrength,
      this.matchSeed,
    );
    this.screen = 'match';
  }

  confirmResult() {
    if (!this.matchResult) return;

    // Apply chemistry delta
    this.chemistry = Math.max(0, Math.min(100, this.chemistry + this.matchResult.chemistryDelta));

    // Apply familiarity gains to player cards in-place
    const gains = this.matchResult.familiarityGains;
    this.roster = this.roster.map(p => {
      const updated = { ...p, familiarity: { ...p.familiarity } };
      for (const g of gains) {
        if (g.a === p.id) {
          updated.familiarity[g.b] = Math.min(100, (updated.familiarity[g.b] ?? 0) + g.gain);
        }
        if (g.b === p.id) {
          updated.familiarity[g.a] = Math.min(100, (updated.familiarity[g.a] ?? 0) + g.gain);
        }
      }
      return updated;
    });

    // Sync updated roster players into chain slots
    const newSlots = { ...this.chain.slots };
    for (const pos of POSITIONS) {
      const slotPlayer = newSlots[pos];
      if (slotPlayer) {
        newSlots[pos] = this.roster.find(p => p.id === slotPlayer.id) ?? slotPlayer;
      }
    }
    this.chain = { ...this.chain, slots: newSlots };

    // Update record
    if (this.matchResult.won) {
      this.record = { ...this.record, wins: this.record.wins + 1 };
    } else {
      this.record = { ...this.record, losses: this.record.losses + 1 };
    }

    this.matchSeed = this.matchSeed + 37;
    this.screen = 'chain';
  }

  get availableTactics(): TacticCard[] {
    return TACTIC_CARDS;
  }
}

export const game = new GameStore();
