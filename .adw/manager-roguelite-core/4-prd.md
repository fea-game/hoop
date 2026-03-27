# PRD: manager-roguelite-core

## Goal

Produce a shippable, minimal web game — a basketball manager roguelite — in which the
player acts as a persistent RPG manager who assembles a team each season, constructs a
tactic chain before each match, and watches matches resolve automatically. The game must
run on mobile and desktop browsers, require no install, and be free to play. The scope
of this PRD is the **core prototype loop** already scaffolded in
`prototypes/hoop-manager/`: Draft → Chain → Match → Summary → next Draft. It resolves
the open design questions from the brainstorming doc across the three core systems
(tactic chain, chemistry/familiarity, nemesis) to a level of specificity that the Plan
phase can decompose into implementable tickets.

---

## End state

A player opens the game in a mobile browser (390 px viewport) or desktop browser and
can complete a full season in one sitting:

1. **Draft screen** — choose 5–8 players from a procedurally generated pool of 12,
   with each player's position, 5 attributes (SCR/PLY/DEF/AST/IQ), tags, and trait
   visible. Knowledge track is present on each card (filling in as the player drafts
   or plays the player).
2. **Chain screen** — assign players to 5 NBA position slots (PG/SG/SF/PF/C), attach 2
   tactic cards, and read active synergy state in real time before locking in.
3. **Match screen** — match resolves automatically in a possession-by-possession
   narrative (40 possessions, 4 quarters). 2–3 mid-match decision pauses interrupt the
   summary and require the player to make a choice (substitution, adjustment, or
   late-game call). Match ends with a box score, "why you won/lost" card, chemistry
   delta, and familiarity gains per pair.
4. **Season loop** — after each match the player returns to the Chain screen to
   re-assemble for the next game, carrying accumulated familiarity/chemistry. After
   enough matches a playoff bracket appears; elimination ends the run.
5. **Post-run evaluation** — a screen surfacing what synergy was one activation away,
   which familiarity pair fired, and what the nemesis origin moment was (if one formed).

A developer standing in front of the finished product can:
- Play a complete 10-match regular season followed by a 3-match playoff bracket without
  hitting a dead end, crash, or undefined state.
- Read every tactic card and player trait without needing external documentation.
- See chemistry and familiarity change after every match.
- Encounter at least one mid-match decision pause per game.
- See a nemesis form after a qualifying loss and carry into the next season.

---

## Resolved design decisions

These close the open questions from the brainstorming doc. They are decisions, not
preferences — the implementation must follow them.

### System 1: Tactic Chain

**Time economy** — No per-possession time budget. Complexity cost is expressed as
slot requirements: a Simple tactic card requires 0 specific tags; an Advanced card
requires 2 matching tags; a Specialist card requires 3 matching tags plus a named
trait on a specific role slot. Running an Advanced/Specialist card with missing
requirements reduces the card's contribution to zero (not a partial — a full
deactivation). This makes mismatches unambiguous.

**Card categories (4 total):**
- **Spacing** — affects floor balance and open-shot frequency.
- **Pressure** — affects turnover rate and fast-break opportunities.
- **Screen Actions** — activates pick-and-roll or screen-and-roll bonuses, requires
  specific tag combos.
- **Late-Game Sets** — activates only in Q4, overrides base tactic for final 10
  possessions.

**Complexity constraint** — Tactic chain depth is fixed at 2 tactic cards per match
(as in the prototype). Cards can be swapped between matches but not mid-match. The
2-card limit is the Monster Train–style cap that keeps the in-run evaluation space
tractable.

**Chain/playbook persistence** — The tactic chain is a **run resource**: the cards
accumulated across the season reset at season end. The manager's unlocked card
archetypes (which categories appear in the pool) persist as meta-progression. This
preserves roguelite impermanence while letting the manager feel more sophisticated each
season.

**Dominant-strategy prevention** — Each tactic card carries a **hard counter tag**:
a specific opponent synergy combination that suppresses the card's effect. Opponent
teams are generated with partially visible synergy profiles (revealed as opponent
knowledge accumulates). A card that is always strong regardless of context does not
exist in the pool.

**Playbook card / player card interaction** — Tactic cards declare required player
tags in their card text. A Screen Actions card might read: "Requires Playmaker in
PG slot and Rim Protector in PF slot." The player can read this before assembling.
No hidden compatibility tables.

**Execution observability** — The match summary's possession log marks every
possession where a tactic card contributed with a coloured tag label. If a card
contributed zero possessions (requirement unmet), the log shows it as "inactive"
at the first possession in Q1 and does not repeat. Mis-built chains are legible
immediately.

### System 2: Chemistry and Familiarity

**Momentum representation** — Momentum is expressed as a **narrative achievement**,
not a mechanical bar. When a team achieves a run of 3+ unanswered possessions in a
match, the possession log displays a "Run" marker with a flavour label (e.g.
"Defensive shutdown run" or "Three straight assists into the paint"). No gameplay
modifier attaches. The run is recorded as a season achievement at match end; it is
never directly gameable.

**Familiarity thresholds (specific numbers):**

| Threshold | Effect |
|---|---|
| 0 | No bonus |
| 25 | +5% synergy tag efficiency for this pair |
| 50 | +10% efficiency; synergy tag combo unlocks advanced activation |
| 75 | +15% efficiency; pair is counted as "core pairing" for chem multiplier |
| 100 | +20% efficiency; pair generates 1 bonus possession per match |

Familiarity accrues at 8 points per match the pair both play. Pair bars are visible
on the Chain screen at all times.

**Chemistry floor and ceiling:** Base chemistry starts at 50 per season. Win adds
+3; loss subtracts 2; key synergy fire adds +2; trade/new signing subtracts 8.
Chemistry above 70 unlocks a team-wide 5% efficiency multiplier. Chemistry below 30
suppresses the highest-OVR player's SCR by 10%. These are the only two threshold
effects; chemistry is not a continuous multiplier.

**Forced engagement levers (prevent never-substituting / never-trading):**
- Every 3 matches, a random player accumulates a **fatigue token**. A fatigued player
  has SCR and DEF reduced by 15%. Fatigue clears when the player sits out a match
  (removed from the starting 5 for one game). This forces rotation decisions; the
  manager cannot field the same 5 indefinitely.
- **Trade windows** appear as season node events (3 per season). During a trade window
  the manager receives 1–2 offers. Declining all offers in all 3 windows applies a
  −5 reputation penalty. Reputation is a meta-resource; this creates a soft forcing
  function without blocking the player.

**Chemistry fit / scouting signal:** Each player card carries a hidden **Culture Fit**
value (Good / Neutral / Bad). Scouting a player reveals it. An un-scouted player shows
a question-mark culture badge. Bad culture fit applies a one-time −5 chemistry on
signing; Good fit applies +3. The badge is visible on the player card before and after
signing; the manager can see what they did or didn't know.

**Chemistry downfall legibility:** When chemistry falls below 30 and the team loses,
the "why you lost" card shows "Chemistry collapse" as a named contributing factor with
the specific chemistry value. No ambiguity.

### System 3: Nemesis

**Counter-trait resolution:** A rival's counter-trait raises the cost of a specific
tactic card — it does not invalidate it. Specifically: a counter-trait reduces the
card's activation probability by 30% and adds the "countered" marker to the possession
log. The manager can still use the card; they are pushed toward creativity, not a
single hard-counter answer. The counter-trait is visible on the rival's player card
before the match.

**Narrative text approach:** Origin moments are stored as a short 2-sentence
fill-in-the-blank string with 3 placeholders: `{game_context}` (e.g. "Game 7,
playoffs"), `{failed_decision}` (the tactic card played or adjustment chosen), and
`{player_name}`. The template reads: "Season {N} — {game_context}. Your {failed_decision}
was read perfectly. {player_name} remembered." This is surfaced verbatim on
re-encounter. No procedural grammar; no authored line pool. Template + data = personal
enough, cheap to produce.

**Emotional attachment vs. roguelite impermanence:** Players are run resources;
rivalries are meta resources. Rival players and rival teams persist across seasons
(carried in the manager dossier). Player cards within a run are impermanent.
Rivalry with a specific player — their growth, counter-trait evolution, and the
eventual resolution — is the persistent emotional thread. This mirrors Hades: the
recurring cast (rivals) is permanent; the run assets (teammates) are not.

---

## Acceptance criteria

### Core loop

- **AC-01:** A player can complete the full Draft → Chain → Match sequence without
  encountering an undefined state, runtime error, or dead navigation path.
- **AC-02:** A player can complete a 10-match regular season followed by a 3-match
  playoff bracket (13 matches total) in a single session without the game state
  becoming inconsistent.
- **AC-03:** The game runs without layout overflow or interactive element overlap on a
  390 px wide mobile viewport (Chrome, Safari) and on a 1280 px desktop viewport.

### Tactic chain

- **AC-04:** Every tactic card displays its category, required player tags, hard
  counter tag, and effect text in plain language on the card face — no tooltips or
  external references required.
- **AC-05:** When a tactic card's tag requirements are unmet, the chain screen shows
  the card as inactive (greyed, labelled "inactive") before the match is locked in.
- **AC-06:** In the match possession log, every possession where a tactic card
  contributed is labelled with the card's tag; every match where a card was inactive
  shows an "inactive" notice at possession 1.
- **AC-07:** Swapping a tactic card between matches (before locking the chain) takes
  no more than 3 taps on mobile.

### Chemistry and familiarity

- **AC-08:** Pair-familiarity bars for all active roster pairs are visible on the
  Chain screen before the chain is locked.
- **AC-09:** After each match, chemistry and familiarity deltas are shown on the match
  summary screen with the specific change value (+N / −N) and the reason (e.g.
  "Win +3", "Trade −8", "Shared playing time +8").
- **AC-10:** When chemistry drops below 30, the match summary "why you lost" card
  explicitly names "Chemistry collapse" as a factor.
- **AC-11:** A fatigued player (holding a fatigue token) displays a visible fatigue
  indicator on their player card and has SCR/DEF reduced by 15% in simulation; the
  "why you lost" card names fatigue as a factor if it affected the outcome.
- **AC-12:** Culture Fit badge is visible on every player card; un-scouted players
  show a question-mark badge; scouted players show Good/Neutral/Bad.

### Mid-match decisions

- **AC-13:** Every match contains 2–3 decision pauses. Each pause presents a choice
  with at least 2 options; each option shows its mechanical implication (e.g.
  "Substituting fatigued player clears fatigue but lowers starting-5 familiarity for
  this match").
- **AC-14:** The outcome of each mid-match decision is referenced in the possession
  log for the possessions that immediately follow.

### Nemesis

- **AC-15:** After a qualifying loss (playoff elimination or a dominant loss where a
  rival player scores 30% of opponent points), a rivalry origin moment is created and
  stored, containing the game context, the failed tactic card or adjustment, and the
  rival player's name.
- **AC-16:** On re-encountering a rival player in a future match, their card displays
  the stored origin moment text verbatim.
- **AC-17:** A rival player's counter-trait is visible on their card before the match
  begins; the possession log marks possessions where the counter-trait fired.
- **AC-18:** A decisive win (outscoring the rival player by ≥20% of total match
  points, and winning the match) reduces rivalry tier by 1 and is surfaced on the
  match summary screen.

### Post-run evaluation

- **AC-19:** After playoff elimination (or completing all 13 matches), a post-run
  evaluation screen shows: the highest-familiarity pair achieved, the synergy
  activations that contributed most possessions, the nemesis origin moment (if one
  formed), and the final chemistry value.

### Build and code quality

- **AC-20:** `npm run build` in `prototypes/hoop-manager/` produces zero errors
  (a11y warnings are acceptable).
- **AC-21:** All new code uses Svelte 5 runes (`$state`, `$derived`, `$props`);
  no Svelte 4 reactive declarations (`$:`) are introduced.

---

## Out of scope

- **Manager RPG layer** — manager attributes, skills, reputation, manager-level
  unlocks, and the manager dossier are all out of scope. The PRD targets the team
  layer (single season loop); the manager layer is a Phase 2 milestone.
- **Opponent knowledge system** — preparation bonus cards, opponent knowledge profiles,
  and surprise events are out of scope. These require the full season node graph,
  which is not yet built.
- **Player knowledge visualisation** — knowledge tracks, tendency overlays, and the
  full player dossier are out of scope beyond the Culture Fit badge (AC-12).
- **Item cards** — item card attachment and item-tactic interactions are out of scope.
- **Season node graph** — training, scout, shop, and event nodes are out of scope.
  The season loop is match-to-match with no intermediate nodes.
- **Multi-year deal / player retention** — no players carry across seasons in this
  milestone. Full roster reset each run.
- **Procedural commentary / public feedback layer** — media nicknames, pundit lines,
  and public narrative layer are out of scope.
- **Cross-season player knowledge** — archived familiarity baselines and the returning
  player draft-pool mechanic are out of scope.
- **Native app** — iOS or Android packaging, PWA manifest, or offline mode are out
  of scope.
- **Multiplayer / leaderboard** — all game state is local; no server-side persistence.
