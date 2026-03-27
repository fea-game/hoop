// ---------------------------------------------------------------------------
// Core game types and simulation logic
// ---------------------------------------------------------------------------

// NBA standard positions
export type Position = 'PG' | 'SG' | 'SF' | 'PF' | 'C';
export const POSITIONS: Position[] = ['PG', 'SG', 'SF', 'PF', 'C'];

export const POSITION_LABELS: Record<Position, string> = {
  PG: 'Point Guard',
  SG: 'Shooting Guard',
  SF: 'Small Forward',
  PF: 'Power Forward',
  C:  'Center',
};

export type Tag =
  | 'Playmaker'
  | 'Floor Spacer'
  | 'Rim Protector'
  | 'Screen Setter'
  | 'Hustle Player'
  | 'Slasher'
  | 'Shot Creator'
  | 'Anchor';

export type TacticId =
  | 'pick-and-roll'
  | 'motion-offense'
  | 'zone-defense'
  | 'fast-break'
  | 'post-iso'
  | 'three-point-barrage';

// ---------------------------------------------------------------------------
// Player attributes — each rated 1–10
//
//  SCR  Scoring    — how well the player puts the ball in the basket
//  PLY  Playmaking — passing, decision-making, running the offense
//  DEF  Defense    — on-ball and help defense, contest quality
//  ATH  Athleticism — speed, explosiveness, endurance
//  IQ   Basketball IQ — reading plays, positioning, clutch execution
// ---------------------------------------------------------------------------
export interface PlayerCard {
  id: string;
  name: string;
  position: Position;
  tags: Tag[];
  // Attributes 1–10
  scoring: number;      // SCR
  playmaking: number;   // PLY
  defense: number;      // DEF
  athleticism: number;  // ATH
  iq: number;           // IQ
  // Runtime state
  familiarity: Record<string, number>; // partner id → 0-100
  fatigue: number; // 0-100, accumulates through season
  trait: string; // flavour line
}

export interface TacticCard {
  id: TacticId;
  name: string;
  description: string;
  requiresTags: Tag[];
  activationBonus: number;
  partialBonus: number;
}

export interface TacticChain {
  slots: Record<Position, PlayerCard | null>;
  tactics: [TacticCard | null, TacticCard | null];
}

// ---------------------------------------------------------------------------
// Possession-level simulation types
// ---------------------------------------------------------------------------

export type PossessionOutcome =
  | '2pt_made'
  | '2pt_missed'
  | '3pt_made'
  | '3pt_missed'
  | 'free_throws'
  | 'turnover'
  | 'blocked';

export interface Possession {
  /** Which team has the ball: 'us' | 'them' */
  team: 'us' | 'them';
  quarter: number;
  /** Running score AFTER this possession */
  scoreUs: number;
  scoreThem: number;
  outcome: PossessionOutcome;
  points: number; // points scored this possession (0 if miss/TO)
  /** Primary actor — name for us, 'Opponent' for them */
  actor: string;
  /** Which tactic was used (if any) */
  tacticUsed: string | null;
  /** Which player attribute was the deciding factor */
  decidingAttr: string | null;
  /** Human-readable description */
  description: string;
  /** Was this a synergy activation moment? */
  synergyFired: boolean;
  /** Was this a familiarity moment? */
  familiarityMoment: boolean;
}

export interface MatchResult {
  won: boolean;
  ourScore: number;
  theirScore: number;
  possessions: Possession[];
  synergysFired: string[];
  chemistryDelta: number;
  familiarityGains: { a: string; b: string; gain: number }[];
  // Breakdown for the summary
  stats: {
    ourFGPct: number;
    theirFGPct: number;
    ourTurnovers: number;
    theirTurnovers: number;
    synergyBonusPts: number;
    familiarityBonusPts: number;
    chemistryMultiplier: number;
  };
}

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

export const TACTIC_CARDS: TacticCard[] = [
  {
    id: 'pick-and-roll',
    name: 'Pick & Roll',
    description: 'PG uses a screen from the big to attack the paint or kick to a spacer.',
    requiresTags: ['Playmaker', 'Screen Setter'],
    activationBonus: 14,
    partialBonus: 6,
  },
  {
    id: 'motion-offense',
    name: 'Motion Offense',
    description: 'Continuous movement and cutting creates open looks across the roster.',
    requiresTags: ['Floor Spacer', 'Playmaker'],
    activationBonus: 10,
    partialBonus: 5,
  },
  {
    id: 'zone-defense',
    name: 'Zone Defense',
    description: 'Protect the paint. Force the opponent into difficult perimeter shots.',
    requiresTags: ['Rim Protector', 'Anchor'],
    activationBonus: 12,
    partialBonus: 4,
  },
  {
    id: 'fast-break',
    name: 'Fast Break',
    description: 'Push the pace relentlessly. Punish every missed shot in transition.',
    requiresTags: ['Slasher', 'Hustle Player'],
    activationBonus: 11,
    partialBonus: 5,
  },
  {
    id: 'post-iso',
    name: 'Post Isolation',
    description: 'Dominant big works from the post. Everyone else clears out.',
    requiresTags: ['Screen Setter', 'Rim Protector'],
    activationBonus: 13,
    partialBonus: 6,
  },
  {
    id: 'three-point-barrage',
    name: 'Three-Point Barrage',
    description: 'Space the floor and rain threes. Volume and spacing beats everything.',
    requiresTags: ['Floor Spacer', 'Shot Creator'],
    activationBonus: 15,
    partialBonus: 5,
  },
];

// ---------------------------------------------------------------------------
// Player pool generator
// ---------------------------------------------------------------------------

function seededRand(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return ((s >>> 0) / 0xffffffff);
  };
}

const FIRST_NAMES = [
  'Marcus', 'DeShawn', 'Jaylen', 'Trevon', 'Andre', 'Elijah', 'Damien',
  'Jordan', 'Kyle', 'Malik', 'Terrence', 'Isaiah', 'Nate', 'Corey', 'Darius',
  'Lonzo', 'Tyrese', 'Cam', 'Scottie', 'Jalen',
];
const LAST_NAMES = [
  'Brooks', 'Williams', 'Carter', 'Johnson', 'Davis', 'Mitchell', 'Harris',
  'Thomas', 'Moore', 'Jackson', 'Martin', 'White', 'Thompson', 'Robinson',
  'Lewis', 'Walker', 'Allen', 'Young', 'King', 'Hill',
];

const TRAITS: Record<Position, string[]> = {
  PG: [
    'Fades in the 4th quarter.',
    'Ice cold in clutch moments.',
    'Elevates against rivals.',
    'Reads defenses a beat too slow.',
  ],
  SG: [
    'Catches fire from the corner.',
    'Disappears when the team is up big.',
    'Relentless off-ball mover.',
    'Shoots threes like they owe him money.',
  ],
  SF: [
    'Takes over in transition.',
    'Elite in secondary actions.',
    'Quiet until the game is on the line.',
    'Draws the toughest defensive assignment.',
  ],
  PF: [
    'Sets the hardest screens in the league.',
    'Slow to rotate on help defense.',
    'Chemistry magnet — everyone plays better around him.',
    'Struggles against quick guards in space.',
  ],
  C: [
    'Unstoppable at the rim.',
    'Disruptive presence in the paint.',
    'Anchors the defense by instinct.',
    'Fouls too much under pressure.',
  ],
};

const POSITION_TAGS: Record<Position, Tag[]> = {
  PG: ['Playmaker', 'Shot Creator'],
  SG: ['Floor Spacer', 'Slasher'],
  SF: ['Slasher', 'Floor Spacer'],
  PF: ['Screen Setter', 'Hustle Player'],
  C:  ['Rim Protector', 'Anchor'],
};

function pickTags(position: Position, rand: () => number): Tag[] {
  const pool = POSITION_TAGS[position];
  const tags: Tag[] = [pool[0]];
  if (rand() < 0.6) tags.push(pool[1]);
  return tags;
}

function attr(rand: () => number, base: number): number {
  return Math.min(10, Math.max(1, Math.round(base + (rand() * 4 - 2))));
}

const POSITION_BASES: Record<Position, { scoring: number; playmaking: number; defense: number; athleticism: number; iq: number }> = {
  PG: { scoring: 7, playmaking: 8, defense: 5, athleticism: 6, iq: 8 },
  SG: { scoring: 8, playmaking: 5, defense: 5, athleticism: 7, iq: 6 },
  SF: { scoring: 7, playmaking: 5, defense: 6, athleticism: 8, iq: 6 },
  PF: { scoring: 5, playmaking: 5, defense: 7, athleticism: 7, iq: 6 },
  C:  { scoring: 6, playmaking: 3, defense: 8, athleticism: 7, iq: 5 },
};

export function generatePlayerPool(seed: number, count = 12): PlayerCard[] {
  const rand = seededRand(seed);
  // Two of each position + 2 extras (SF, PF)
  const positions: Position[] = ['PG', 'PG', 'SG', 'SG', 'SF', 'SF', 'PF', 'PF', 'C', 'C', 'SF', 'PF'];
  const usedNames = new Set<string>();

  return Array.from({ length: count }, (_, i) => {
    const position = positions[i % positions.length];
    let name = '';
    while (!name || usedNames.has(name)) {
      const fn = FIRST_NAMES[Math.floor(rand() * FIRST_NAMES.length)];
      const ln = LAST_NAMES[Math.floor(rand() * LAST_NAMES.length)];
      name = `${fn} ${ln}`;
    }
    usedNames.add(name);

    const bases = POSITION_BASES[position];
    const traitPool = TRAITS[position];

    return {
      id: `p${i}`,
      name,
      position,
      tags: pickTags(position, rand),
      scoring: attr(rand, bases.scoring),
      playmaking: attr(rand, bases.playmaking),
      defense: attr(rand, bases.defense),
      athleticism: attr(rand, bases.athleticism),
      iq: attr(rand, bases.iq),
      familiarity: {},
      fatigue: 0,
      trait: traitPool[Math.floor(rand() * traitPool.length)],
    };
  });
}

// ---------------------------------------------------------------------------
// Synergy evaluation
// ---------------------------------------------------------------------------

export interface SynergyState {
  tactic: TacticCard;
  activeTags: Tag[];
  fullyActivated: boolean;
  bonus: number;
}

export function evaluateSynergies(chain: TacticChain): SynergyState[] {
  const presentTags = new Set<Tag>();
  for (const pos of POSITIONS) {
    const p = chain.slots[pos];
    if (p) p.tags.forEach(t => presentTags.add(t));
  }

  return chain.tactics
    .filter((t): t is TacticCard => t !== null)
    .map(tactic => {
      const activeTags = tactic.requiresTags.filter(t => presentTags.has(t));
      const fullyActivated = activeTags.length === tactic.requiresTags.length;
      return {
        tactic,
        activeTags,
        fullyActivated,
        bonus: fullyActivated ? tactic.activationBonus : activeTags.length > 0 ? tactic.partialBonus : 0,
      };
    });
}

// ---------------------------------------------------------------------------
// Possession-by-possession simulation
// ---------------------------------------------------------------------------

// Pick a weighted random index
function weightedPick(weights: number[], rand: () => number): number {
  const total = weights.reduce((a, b) => a + b, 0);
  let r = rand() * total;
  for (let i = 0; i < weights.length; i++) {
    r -= weights[i];
    if (r <= 0) return i;
  }
  return weights.length - 1;
}

// Opponent possession description templates
const OPP_MADE_2 = [
  'drives baseline for the lay-up.',
  'hits the mid-range jumper.',
  'converts in the paint over the defense.',
  'gets to the line after contact — makes both.',
  'back-cuts for the easy two.',
];
const OPP_MADE_3 = [
  'drains the corner three.',
  'steps back — nails the long two. Wait, that\'s a three!',
  'swing pass, catch-and-shoot — good!',
];
const OPP_MISS = [
  'forces a tough shot — rolls out.',
  'long two bounces off the back iron.',
  'three-pointer short.',
  'blocked at the rim.',
];
const OPP_TO = [
  'telegraphed pass — intercepted.',
  'steps out of bounds under pressure.',
  'sloppy handle — turnover.',
];

interface PossessionContext {
  players: PlayerCard[];
  tactics: TacticCard[];
  synergies: SynergyState[];
  chemistry: number;
  quarter: number;
  rand: () => number;
}

function simulateOurPossession(
  ctx: PossessionContext,
  scoreUs: number,
  scoreThem: number,
  synergyFiredNames: Set<string>,
  familiarityBonusPts: { value: number },
): Possession {
  const { players, tactics, synergies, chemistry, quarter, rand } = ctx;

  // Pick a primary ball-handler weighted by playmaking + iq
  const weights = players.map(p => p.playmaking + p.iq);
  const actorIdx = weightedPick(weights, rand);
  const actor = players[actorIdx];

  // Determine if a tactic fires this possession
  const activeSynergies = synergies.filter(s => s.fullyActivated);
  let tacticUsed: TacticCard | null = null;
  let synergyFired = false;
  let tacticBoostPct = 0; // probability boost when tactic fires

  if (activeSynergies.length > 0 && rand() < 0.4) {
    tacticUsed = activeSynergies[Math.floor(rand() * activeSynergies.length)].tactic;
    if (!synergyFiredNames.has(tacticUsed.name)) {
      synergyFiredNames.add(tacticUsed.name);
      synergyFired = true;
    }
    tacticBoostPct = 0.12;
  }

  // Familiarity between actor and a random teammate
  let famBoost = 0;
  let familiarityMoment = false;
  const teammates = players.filter(p => p.id !== actor.id);
  if (teammates.length > 0) {
    const partner = teammates[Math.floor(rand() * teammates.length)];
    const fam = actor.familiarity[partner.id] ?? 0;
    famBoost = fam * 0.001; // up to +0.1 on fam=100
    if (fam >= 40 && rand() < 0.3) {
      familiarityMoment = true;
      familiarityBonusPts.value += 2;
    }
  }

  // Chemistry effect
  const chemEffect = (chemistry - 50) / 200; // −0.25 to +0.25

  // Base make probability from actor attributes
  // Decide shot type first
  const threePtAttemptChance = 0.1 + (actor.tags.includes('Floor Spacer') ? 0.15 : 0)
    + (tacticUsed?.id === 'three-point-barrage' ? 0.2 : 0);
  const isThree = rand() < threePtAttemptChance;

  // Turnover chance
  const toChance = Math.max(0.05, 0.18 - actor.playmaking * 0.01 - chemEffect - tacticBoostPct);
  if (rand() < toChance) {
    return {
      team: 'us',
      quarter,
      scoreUs,
      scoreThem,
      outcome: 'turnover',
      points: 0,
      actor: actor.name,
      tacticUsed: tacticUsed?.name ?? null,
      decidingAttr: 'PLY',
      description: buildTurnoverDesc(actor, tacticUsed, chemistry),
      synergyFired: false,
      familiarityMoment: false,
    };
  }

  // Shot make probability
  const baseHit = isThree
    ? 0.28 + (actor.scoring * 0.025) + (actor.iq * 0.01)
    : 0.42 + (actor.scoring * 0.03) + (actor.iq * 0.01);

  const hitChance = Math.min(0.85, baseHit + chemEffect + tacticBoostPct + famBoost);
  const made = rand() < hitChance;
  const points = made ? (isThree ? 3 : 2) : 0;

  // Deciding attribute: what mattered most this possession
  const decidingAttr = tacticUsed
    ? (tacticUsed.id === 'pick-and-roll' || tacticUsed.id === 'motion-offense' ? 'PLY' : 'SCR')
    : (isThree ? 'SCR' : (rand() < 0.5 ? 'ATH' : 'IQ'));

  const description = buildOurDesc(actor, made, isThree, tacticUsed, synergyFired, familiarityMoment, quarter);

  return {
    team: 'us',
    quarter,
    scoreUs: scoreUs + points,
    scoreThem,
    outcome: made ? (isThree ? '3pt_made' : '2pt_made') : (isThree ? '3pt_missed' : '2pt_missed'),
    points,
    actor: actor.name,
    tacticUsed: tacticUsed?.name ?? null,
    decidingAttr,
    description,
    synergyFired,
    familiarityMoment,
  };
}

function simulateTheirPossession(
  defPlayers: PlayerCard[],
  oppStrength: number,
  quarter: number,
  scoreUs: number,
  scoreThem: number,
  rand: () => number,
  zoneDef: boolean,
): Possession {
  const avgDef = defPlayers.reduce((s, p) => s + p.defense, 0) / Math.max(defPlayers.length, 1);
  const anchorBonus = defPlayers.some(p => p.tags.includes('Anchor')) ? 0.05 : 0;
  const zoneBonus = zoneDef ? 0.07 : 0;

  // Opponent base make chance scales with strength
  const oppBase = 0.35 + oppStrength * 0.03;
  const defReduction = avgDef * 0.015 + anchorBonus + zoneBonus;
  const isThree = rand() < 0.25;
  const toChance = 0.1 + defPlayers.reduce((s, p) => s + p.iq, 0) / defPlayers.length * 0.008;

  if (rand() < toChance) {
    const idx = Math.floor(rand() * OPP_TO.length);
    return {
      team: 'them',
      quarter,
      scoreUs,
      scoreThem,
      outcome: 'turnover',
      points: 0,
      actor: 'Opponent',
      tacticUsed: null,
      decidingAttr: 'DEF',
      description: `Opponent ${OPP_TO[idx]}`,
      synergyFired: false,
      familiarityMoment: false,
    };
  }

  const hitChance = Math.max(0.15, Math.min(0.75, oppBase - defReduction + (isThree ? -0.05 : 0)));
  const made = rand() < hitChance;

  // Blocked?
  const rimProtector = defPlayers.find(p => p.tags.includes('Rim Protector'));
  const blocked = !isThree && !made && rimProtector && rand() < 0.25;

  const points = made ? (isThree ? 3 : 2) : 0;

  let desc: string;
  if (blocked && rimProtector) {
    desc = `${rimProtector.name} rises to block the attempt — DEF + ATH do their job.`;
  } else if (made) {
    if (isThree) {
      desc = `Opponent ${OPP_MADE_3[Math.floor(rand() * OPP_MADE_3.length)]}`;
    } else {
      desc = `Opponent ${OPP_MADE_2[Math.floor(rand() * OPP_MADE_2.length)]}`;
    }
  } else {
    desc = `Opponent ${OPP_MISS[Math.floor(rand() * OPP_MISS.length)]}`;
  }

  return {
    team: 'them',
    quarter,
    scoreUs,
    scoreThem: scoreThem + points,
    outcome: blocked ? 'blocked' : made ? (isThree ? '3pt_made' : '2pt_made') : (isThree ? '3pt_missed' : '2pt_missed'),
    points,
    actor: 'Opponent',
    tacticUsed: null,
    decidingAttr: blocked ? 'DEF' : null,
    description: desc,
    synergyFired: false,
    familiarityMoment: false,
  };
}

function buildTurnoverDesc(actor: PlayerCard, tactic: TacticCard | null, chemistry: number): string {
  if (chemistry < 35) return `${actor.name} loses the handle — the team is out of sync. Chemistry (${chemistry}) is hurting PLY.`;
  if (tactic) return `${actor.name} tries to force the play through the ${tactic.name} set — sloppy execution, turnover. PLY under pressure.`;
  return `${actor.name} telegraphs the pass — intercepted. PLY read the defense too late.`;
}

function buildOurDesc(
  actor: PlayerCard,
  made: boolean,
  isThree: boolean,
  tactic: TacticCard | null,
  synFired: boolean,
  famMoment: boolean,
  quarter: number,
): string {
  const clutch = quarter === 4 ? ' (Q4 pressure)' : '';

  if (synFired && tactic && made) {
    if (tactic.id === 'pick-and-roll')
      return `${actor.name} runs the ${tactic.name} — PLY + Screen Setter in sync. Open look, scores${clutch}.`;
    if (tactic.id === 'three-point-barrage')
      return `${actor.name} in the ${tactic.name} system — Floor Spacer kicks, he buries the three. SCR activated.`;
    if (tactic.id === 'fast-break')
      return `${actor.name} pushes in transition — Slasher + Hustle tags fire the Fast Break. Easy bucket.`;
    return `${actor.name} executes the ${tactic.name} perfectly — synergy activates. Points scored.`;
  }

  if (famMoment && made)
    return `${actor.name} finds the open man on instinct — familiarity pays off. Ball moves, scores.`;

  if (made && isThree)
    return `${actor.name} drills the three${clutch}. SCR ${actor.scoring} + IQ ${actor.iq} doing work.`;

  if (made && !isThree) {
    if (actor.tags.includes('Slasher'))
      return `${actor.name} attacks the paint — ATH ${actor.athleticism} wins at the rim. Scores.`;
    if (actor.position === 'C' || actor.position === 'PF')
      return `${actor.name} seals position and converts in the post. SCR ${actor.scoring} dominant.`;
    return `${actor.name} hits the mid-range. IQ ${actor.iq} — perfect shot selection${clutch}.`;
  }

  // Missed
  if (isThree)
    return `${actor.name} fires the three — off the back iron. SCR ${actor.scoring} not enough this time.`;
  if (actor.tags.includes('Slasher'))
    return `${actor.name} drives hard — contested at the rim, no good. ATH ${actor.athleticism} vs their DEF.`;
  return `${actor.name} forces the shot — off the mark. Better shot selection needed.`;
}

// ---------------------------------------------------------------------------
// Main match entry point
// ---------------------------------------------------------------------------

export function simulateMatch(
  chain: TacticChain,
  chemistry: number,
  opponentStrength: number,
  seed: number,
): MatchResult {
  const rand = seededRand(seed);
  const synergies = evaluateSynergies(chain);
  const players = POSITIONS.map(p => chain.slots[p]).filter((p): p is PlayerCard => p !== null);

  const hasZone = chain.tactics.some(t => t?.id === 'zone-defense');
  const synergyFiredNames = new Set<string>();
  const familiarityBonusPts = { value: 0 };

  const possessions: Possession[] = [];
  let scoreUs = 0;
  let scoreThem = 0;

  // ~24 possessions per quarter per team → 96 total each side over 4 quarters
  // We'll simulate 40 total possessions (20 each) for readability
  const TOTAL_POSSESSIONS = 40;
  const POSSESSIONS_PER_QUARTER = TOTAL_POSSESSIONS / 4;

  let ourFGAttempts = 0;
  let ourFGMade = 0;
  let theirFGAttempts = 0;
  let theirFGMade = 0;
  let ourTurnovers = 0;
  let theirTurnovers = 0;

  for (let i = 0; i < TOTAL_POSSESSIONS; i++) {
    const quarter = Math.floor(i / POSSESSIONS_PER_QUARTER) + 1;

    // Alternate possessions: us, them, us, them...
    if (i % 2 === 0) {
      // Our possession
      const poss = simulateOurPossession(
        { players, tactics: chain.tactics.filter(Boolean) as TacticCard[], synergies, chemistry, quarter, rand },
        scoreUs,
        scoreThem,
        synergyFiredNames,
        familiarityBonusPts,
      );
      scoreUs = poss.scoreUs;
      scoreThem = poss.scoreThem;
      possessions.push(poss);
      if (poss.outcome !== 'turnover') ourFGAttempts++;
      if (poss.outcome === '2pt_made' || poss.outcome === '3pt_made') ourFGMade++;
      if (poss.outcome === 'turnover') ourTurnovers++;
    } else {
      // Their possession
      const poss = simulateTheirPossession(
        players, opponentStrength, quarter, scoreUs, scoreThem, rand, hasZone,
      );
      scoreUs = poss.scoreUs;
      scoreThem = poss.scoreThem;
      possessions.push(poss);
      if (poss.outcome !== 'turnover') theirFGAttempts++;
      if (poss.outcome === '2pt_made' || poss.outcome === '3pt_made') theirFGMade++;
      if (poss.outcome === 'turnover') theirTurnovers++;
    }
  }

  const won = scoreUs > scoreThem;

  // Familiarity gains
  const familiarityGains: MatchResult['familiarityGains'] = [];
  for (let i = 0; i < players.length; i++) {
    for (let j = i + 1; j < players.length; j++) {
      const gain = Math.round(4 + rand() * 6);
      familiarityGains.push({ a: players[i].id, b: players[j].id, gain });
    }
  }

  const synergyBonusPts = [...synergyFiredNames].length * 4; // rough estimate for summary

  return {
    won,
    ourScore: scoreUs,
    theirScore: scoreThem,
    possessions,
    synergysFired: [...synergyFiredNames],
    chemistryDelta: won ? 5 : -3,
    familiarityGains,
    stats: {
      ourFGPct: ourFGAttempts > 0 ? Math.round((ourFGMade / ourFGAttempts) * 100) : 0,
      theirFGPct: theirFGAttempts > 0 ? Math.round((theirFGMade / theirFGAttempts) * 100) : 0,
      ourTurnovers,
      theirTurnovers,
      synergyBonusPts,
      familiarityBonusPts: familiarityBonusPts.value,
      chemistryMultiplier: Math.round((0.8 + (chemistry / 100) * 0.4) * 100) / 100,
    },
  };
}
