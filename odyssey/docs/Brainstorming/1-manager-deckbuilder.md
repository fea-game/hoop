---
title: "Deck builder: Team Manager"
---

## 1. Concept

The player takes the role of a **team manager** — a persistent RPG protagonist who accumulates skills, reputation, and tactical knowledge across multiple seasons. The team they manage is rebuilt each season using deck-building and collection mechanics. One season equals one run.

This structure resolves the tension between single-character RPG focus, collection/roster mechanics, and roguelite replayability by assigning each to a different layer:

| Layer | Protagonist | Scope | Persistence |
|---|---|---|---|
| Meta | The Manager | Across all seasons | Permanent |
| Run | The Team | One season | Reset each season |

The **manager** grows through attributes, skills, and reputation that carry over permanently. The **team** is assembled fresh each season via draft, free agents, and trades — consistent with how real sports seasons work. All on-court outcomes are driven by the manager's decisions; the player never controls a player directly.

The structural differentiator: **you are building a deck of players and tactics, managed by a character you are simultaneously levelling up as an RPG protagonist.** Existing basketball games (NBA 2K, Football Manager) simulate management without meaningful decision agency. Existing roguelite deck builders (Slay the Spire) lack the sports team abstraction. This game occupies the gap between them.

## 2. Constraints

- The game must run on mobile phones and computers (cross-platform).
- The release process must be free and require minimal effort and time.

## 3. The Manager

The manager has attributes, skills, and a narrative identity that develop permanently across seasons:

- **Attributes:** Tactical IQ, Scouting Range, Negotiation, Motivational Presence, Media Handling.
- **Skills & Perks:** Unlockable abilities that add passive bonuses or active options. Examples: "Zone Defense Expert" (unlocks zone coverage cards), "Talent Scout" (raises quality floor of recruitable players), "Chemistry Builder" (faster familiarity accumulation), "Settle the Score" (one-time tactic bonus when facing a Tier 2+ rival).
- **Reputation:** Gates access to higher-tier free agents, sponsorships, and elite mentors. Grows slowly across seasons; a catastrophic season damages but does not destroy it.
- **Manager Level:** XP-based; gates meta-unlock milestones (new card archetypes in the pool, harder league tiers, new player archetypes recruitable).
- **Background / Origin Story:** Chosen once at creation (former player, data analyst, street ball legend, European tactician). Provides a starting specialisation and can seed a pre-existing Tier 2 rivalry from the first season.

**What persists between seasons:** manager level, reputation, unlocked skill trees, a small set of discovered player archetypes (not specific players), tactical knowledge as manager IQ (widens card option ranges), and optionally one or two players retained on multi-year deals.

## 4. The Team and Card System

Within each season the manager assembles a roster through draft, scouting, and free-agent acquisition. The roster is the deck:

- **Player Cards:** Position, attributes, traits, and one or more synergy tags (e.g. "Playmaker", "Rim Protector", "Hustle Player", "Floor Spacer"). Synergy tags interact with other cards and with manager perks. Each player carries a trait or background note that gives them narrative texture beyond numbers.
- **Tactic Cards:** Plays and schemes that modify how player cards interact (pick-and-roll packages, defensive rotations, late-game sets). Available tactic cards are gated by manager level and skill tree.
- **Item Cards:** Gear, training regimes, medical staff, facility upgrades — applied to player cards to modify attributes or unlock conditional abilities.
- **Event Cards:** Contextual occurrences (trade offers, injuries, chemistry incidents, media controversies) that force reactive decisions during the season.

Deck composition evolves across the season via the waiver wire, trades, training, and item discoveries. At season end the deck resets; meta unlocks from the manager layer seed the next season's card pool quality.

## 5. The Season Structure

One season is one roguelite run:

1. **Pre-Season:** Draft from a procedurally generated player pool (Scouting Range determines stat visibility before selection). Acquire free agents within budget (Negotiation reduces cost). Choose a base offensive and defensive scheme from available tactic cards.
2. **Regular Season:** A series of game weeks, each presenting nodes on a branching path — Match, Training, Scout, Event, or Shop. Time per week is limited; not every node can be visited.
3. **Playoffs:** A bracket with higher stakes. Elimination ends the run.
4. **Season End:** Win or lose, meta-progression is applied. The next season begins with the same manager, a new seed, and a new team.

Each season seed generates a unique league, rival teams, player pool, and event calendar. Manager level shifts the game into harder league tiers over time.

## 6. Core Mechanics

### Chemistry and Familiarity

Chemistry and familiarity are two distinct resources that together determine how well the roster performs:

- **Chemistry** is a shared roster-wide value. It shifts after matches and events — wins and coordinated plays raise it, losses and disruptive decisions lower it. High chemistry unlocks combo synergies between player cards with compatible tags. The manager's Motivational Presence attribute raises the chemistry ceiling for a given roster composition.
- **Familiarity** is a per-player-pair value that accrues only through shared playing time. It cannot be trained or bought. When two players reach a familiarity threshold, their synergy tag combinations activate at higher efficiency — a pick-and-roll between a Playmaker and Rim Protector who have played together all season functions differently than the same pairing assembled mid-season.

**Roster changes — trades, signings, waiver acquisitions — damage both resources:**
- A new player arrives with zero familiarity toward every current roster member; threshold synergies are unavailable until shared time accumulates.
- A departure degrades familiarity for the players who remain; their history with the departed player is lost, and their synergy with the new arrival starts from zero.
- Trades cause an immediate chemistry drop (locker room disruption, adjusted roles); the drop scales with the prominence of the player traded and the timing — a mid-season trade hits harder than an early one, when familiarity was low anyway.
- A player signed from a rival or nemesis team carries an additional chemistry penalty on arrival.

Every roster change is therefore a meaningful trade-off, not a pure upgrade: a better player on paper may produce a weaker team in practice for several game weeks, at exactly the wrong point in the season. The manager must weigh talent gain against chemistry cost, familiarity rebuild time remaining, and proximity to high-stakes matches.

### Opponent Knowledge and Surprise

Teams in the same league are played multiple times across a season. Repeated matchups accumulate **opponent knowledge**: the manager's profile of each team's tendencies, synergy combinations, and key player traits fills in progressively with each encounter.

- **Preparation bonus** — before a match against a known opponent, a targeted game plan card becomes available (e.g. deny the pick-and-roll, shade toward their primary scorer). The more complete the knowledge, the stronger the preparation card and the tighter the probability ranges on in-game adjustments.
- **Surprise vulnerability** — opponent teams are not static. Between matchups they run training nodes and make trades, just as the manager does. A significant opponent change (a trade, a training block unlocking a new scheme) can partially or fully invalidate the prepared game plan.

Surprise events surface as a pre-match reveal: the game signals something has changed, but not specifically what. The manager decides whether to spend a scout node investigating or proceed and absorb the risk. Thorough preparation can become a liability if it breeds overconfidence. Scouting Range determines how early in the week large opponent changes are detected — a low-range manager may not learn of a major trade until game day.

### In-Game Match Layer

Matches are not played directly; the manager's decisions drive outcomes:

- **Lineup:** Select starters; composition triggers synergy bonuses when synergy tags align.
- **Tactic Card:** Choose an active scheme. Against a known opponent, a targeted game plan card amplifies the most relevant tactic — but is nullified if the opponent has shifted approach since the last encounter.
- **In-Game Adjustments:** 2–3 decision points per quarter (substitution, play call, defensive switch). Outcomes resolved probabilistically from player attributes, fatigue, tactic fit, and opponent knowledge state. A mid-game surprise (an unexpected lineup or scheme) surfaces an unplanned adjustment with narrower options and wider probability ranges.
- **Late-Game Situations:** Higher-stakes decision cards in close games; Tactical IQ widens available calls and improves success probability.

Outcome resolution is a brief match summary sequence, not turn-by-turn play-by-play, to keep mobile session length manageable.

### Failure States

- **Regular Season Record:** A poor record locks the team out of higher playoff seeds, forcing a harder bracket path.
- **Playoff Elimination:** Ends the run. A post-run evaluation surfaces what went wrong (synergy composition, tactic card choices, chemistry state).
- **Season Abandonment (Rebuild):** Accepting a very poor record mid-season yields a high draft pick for the next run at a reputation cost. This is the roguelite "cut losses" option — and an implicit decision to let chemistry and familiarity collapse deliberately.

### Nemesis Mechanic

Rivalries form organically from game results and carry over into future seasons as persistent, evolving threats.

**How rivalries form** — evaluated at match end and season end:
- A dominant loss (playoff elimination, repeatedly exposed tactical weakness).
- A humiliation marker (a specific player's exceptional performance directly against a manager decision that failed).
- Escalation — an existing rivalry that results in another loss intensifies.

A cap of 2–3 rival players and 1–2 rival teams is enforced. New rivals displace weaker existing ones. Each rivalry must feel named and personal.

**Rivalry tiers:**

| Tier | Label | How It Forms | Mechanical Effect |
|---|---|---|---|
| 1 | Opponent | Single notable loss | Rival appears in future seasons; slightly boosted attributes |
| 2 | Rival | Repeated losses or playoff elimination | Rival tracks the manager across seasons; targeted counter-strategies |
| 3 | Nemesis | Season-defining defeat or consistent humiliation | Adapts to manager's known playstyle; passive debuffs when matched up |

**Individual player rivals** carry across seasons:
- Attributes grow between seasons proportional to performance against the manager.
- Counter-traits develop tied to specific tactics the manager used when losing — a consistent pick-and-roll user faces a "Pick-and-Roll Killer" trait next season.
- At Nemesis tier the rival may appear in the manager's own draft pool: signing them collapses the rivalry and adds a powerful card, but at a chemistry and reputation cost.
- A decisive win reduces tier. Rivalries can be resolved.

**Rival teams** persist as opponent franchises:
- Their generated deck evolves to counter synergy patterns that worked against them previously.
- Rival team encounters are flagged visually on the season path.
- Beating a rival team in a high-stakes context yields a Rivalry Victory bonus: elevated manager XP, a tactic card upgrade, and a team chemistry boost.
- A Nemesis-tier rival team applies a passive chemistry debuff the week they are scheduled — the pressure creates internal friction before the match.

**Narrative layer** — rivalries accumulate a short history:
- An "origin moment" is recorded when a rivalry forms, referencing the specific decision that went wrong (e.g. "Season 3 — Game 7, your defensive switch failed. He hit the shot. He remembered.").
- This is surfaced on re-encounter in future seasons.

**Manager RPG interaction:**
- Each loss to a rival generates Rivalry IQ entries (tendencies, counter-trait triggers) — forced scouting; losses have educational value.
- Defeating a Tier 3 Nemesis decisively in a playoff game grants a permanent meta-unlock (new card archetype, manager attribute point, or reputation milestone), making rivalry resolution one of the highest rewards in the game.

## 7. Design Risks

### Roguelite

Based on [How to Fail at Making a Roguelike](https://youtu.be/TAcsYWGtUto), [What Makes a Good Roguelike](https://youtu.be/rcX9BDgvkws), [How to Design a Roguelike](https://youtu.be/y5DSSU_KsrQ), [Roguelike Progression Systems](https://youtu.be/yOfgUFx9RkU), and [rogueliker.com](https://rogueliker.com):

- **Generic stat bumps instead of synergies** — items must have unique identities tied to the core mechanic, not isolated percentage increases. Synergy interactions are the source of memorable moments.
- **Runs feel the same** — procedural generation must meaningfully vary the league, player pool, and event combinations each season, not just reskin the same structure.
- **Designing to fit a genre label** — fun comes first; roguelite mechanics serve the game, not the other way around.
- **Balance is the real challenge** — unfair randomness, overpowered combinations, and situationally irrelevant items all break the experience. This is where most effort will be spent.
- **No power fantasy moments** — the team must be capable of becoming genuinely dominant by late season. Feeling like you have "broken" the game is a reward, not a failure.
- **Meta-progression that invalidates skill** — manager unlocks must widen options, not unconditionally reduce difficulty. The run layer must remain challenging regardless of manager level.
- **Poor onboarding** — complexity must be introduced gradually; the entry barrier must stay low enough to reach beyond a hardcore audience.

### Deck Builder

Based on [What Makes a Great Deckbuilder?](https://youtu.be/d_gBRNAgBKQ), [What Makes A Good DECK BUILDING Roguelike?](https://youtu.be/UG_T3S6-qUw), and [Can Any Roguelike Deckbuilder Beat Slay the Spire?](https://youtu.be/LLeuofCTq5M):

- **Cards without distinct identities** — every card needs a unique use case and a constraint; generic equivalents collapse deck building into stat optimisation.
- **Complexity without depth** — parallel systems that don't change how you play add tracking burden without strategic value. Depth comes from non-obvious interactions, not more things to track.
- **Card illegibility** — card text must be readable as plain language (Slay the Spire benchmark). Symbols replacing text create friction without adding depth.
- **Slow pacing** — excessive per-card admin or slow resolution causes players to abandon runs mid-season. A season must feel fast even when long.
- **Out-of-combat layer treated as dead time** — the week nodes (training, scouting, events, shop) are where strategic stakes are set; they are not menus between matches.
- **No late-season power fantasy** — the roster must be capable of genuine dominance by the playoffs. Extravagant late-run power is a reward.
- **Players as tokens** — if player cards have no personality, the collection fantasy collapses. Each player card needs narrative texture (a trait, a background note) beyond numbers.

### Manager + Team Dual Path

- **Manager progress invisible during a run** — intra-season manager decisions (tactic calls, in-game adjustments) must produce visible, immediate consequence. Manager XP and unlocks that only manifest between seasons leave the RPG layer feeling absent mid-run.
- **Team reset undermining investment** — the multi-year contract meta-unlock exists to preserve one or two threads of continuity while resetting the rest. The sports season framing carries the narrative justification for the full reset.
- **Parallel paths creating analysis paralysis** — manager upgrades must be infrequent milestone events, not constant small choices. Card categories must be strictly distinct to limit cognitive load.
- **Manager attributes as a stat wall** — attributes must expand options and raise probability ceilings; they must never hard-block progress pathways regardless of manager level.

### Roster Changes

- **Consequence-free trades** — chemistry and familiarity costs must be visible and meaningfully timed. A familiarity reset three weeks before playoffs carries very different weight than one in the first week; both must feel real.
- **Invisible familiarity** — familiarity progress between pairs must be surfaced clearly so the manager can evaluate the cost of breaking it. If it accumulates silently until a threshold fires, it becomes ignored bookkeeping.

### Opponent Knowledge

- **Preparation trivialising repeat matchups** — the surprise system must fire at a meaningful rate with genuine consequences. If it rarely matters, late-season games against familiar opponents become formalities.
- **Surprises reading as unfair punishment** — the pre-match reveal and scout node option are the fairness valve. The player must always have agency to respond, even if it costs resources.
- **Early Scouting Range gap too punishing** — early-season surprises should have lower stakes (minor tactic shifts, not full scheme overhauls), scaling up as the season and manager level progress.
- **Knowledge profile as ignored UI** — the preparation cards unlocked by opponent knowledge must produce clear, desirable outcomes. Filling in the profile must feel rewarding, not like bookkeeping.

### Nemesis Mechanic

- **Rivalries feeling random** — the origin moment must be clearly surfaced as a direct consequence of a specific failed decision. Opaque trigger conditions undermine the mechanic's narrative core.
- **Nemesis as unavoidable difficulty tax** — resolution pathways (decisive win, signing the rival, outlasting them across seasons) must always exist and feel achievable. A Tier 3 Nemesis with no exit is a punishing modifier, not a story.
- **Too many rivalries** — the active cap must be enforced. Every rivalry must feel named and personal; a diluted registry produces noise.
- **Counter-traits with one solution** — counter-traits raise the cost of a strategy; they do not invalidate it. The manager must be pushed toward creativity, not a single "anti-rival" deck.
- **Generic narrative text** — origin moments must reference specific tactical decisions (the card played, the adjustment made) to feel personal. Templated text ("You lost a big game") loses resonance immediately.
