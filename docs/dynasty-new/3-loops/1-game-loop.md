---
title: Hoop Dynasty - The Exhibition Game Loop
---

The exhibition game is the core session unit. It is a live simulation with two active layers: a **background planning layer** (ongoing, low-urgency) and a **foreground crisis layer** (triggered, high-urgency). The player watches the simulation unfold and manages both layers simultaneously.

For the simulation internals (service architecture, scoring functions, action chain, fatigue math) see [mechanics/1-simulation-model.md](../4-mechanics/1-simulation-model.md).

**Related docs:**
- [loops/2-between-games.md](./between-games.md) — what happens before and after each game
- [mechanics/1-simulation-model.md](../4-mechanics/1-simulation-model.md) — how the simulation works internally
- [mechanics/3-roles.md](../4-mechanics/3-roles.md) — how offensive and defensive roles bias the simulation
- [reference/3-scheme-vocabulary.md](../5-reference/3-scheme-vocabulary.md) — the named coaching schemes
- [structure/1-card-systems.md](../2-structure/1-card-systems.md) — situation cards and Identity Cards

---

## 1. Overview

**Game length is emergent, not fixed.** Determined by the quality gap between the two teams:

| Game type | Approximate length | Crisis density |
|---|---|---|
| Blowout (large skill differential) | 2–4 minutes | Few crisis windows |
| Competitive regular season game | 4–7 minutes | Moderate |
| Playoff game | 6–10 minutes | Higher base density |
| Finals | 8–12 minutes | Maximum density; more situation cards available |

There is no skip and no auto-resolve. Every game is played. Blowouts are fast, not absent.

---

## 2. The Heat System

Heat is the primary per-player performance indicator. It is a rolling signal of recent in-game performance.

### Signal production

Heat is fed by the **Attribution Engine**. After each possession, the Attribution Engine computes a chained delta score for every player on the floor. Each player's possession score feeds their Heat rolling window — computed across the **last 5 possessions**. For the full delta table see [mechanics/1-simulation-model.md](../4-mechanics/1-simulation-model.md) §4.

### Heat states

The rolling score maps to three visible states on the player card:

| State | Indicator | Meaning |
|---|---|---|
| **Hot** | Warm glow on card | Performing above expectation in recent possessions |
| **Neutral** | No indicator | Baseline performance |
| **Cold** | Cool muted tint on card | Underperforming or making poor decisions |

> **Conflict:** The morale delta table uses five states (Hot / Warm / Neutral / Cool / Cold) but the Heat state definition has only three. "Warm" and "Cool" are never defined. See backlog item H2.

### In-game consequences

Heat state modifies the **probability weights** in possession resolution — not fixed stat bonuses. A hot player gets a positive skew on shot quality and defensive positioning rolls. A cold player gets a negative skew.

The opponent AI reads Heat states and reacts: plays are routed away from hot defenders and toward cold defenders. Visible in matchup line changes on the court display.

### Between-game consequences (via Morale)

Heat feeds into each player's **Morale** stat (range 0–20), which persists between games:

| Game-end Heat state | Morale delta |
|---|---|
| Hot | +2 |
| Warm | +1 |
| Neutral | 0 |
| Cool | -1 |
| Cold | -2 |

Morale thresholds gate several post-game effects:

| Morale range | Player state | Effects |
|---|---|---|
| 17–20 | Engaged | Bonus development point available; contract retention leverage |
| 12–16 | Stable | Baseline behaviour |
| 7–11 | Frustrated | Narrative event risk fires; minutes expectation pressure activates |
| 3–6 | Checked out | Trade demand risk; development points locked |
| 0–2 | Crisis | Trade demand fires unless an intervention situation card is played |

**Minutes expectation pressure:** A player at Engaged morale (17+) who is significantly benched the following game takes an additional -1 morale cost.

### Player tags affecting Morale dynamics

See [reference/2-tag-vocabulary.md](../5-reference/2-tag-vocabulary.md) for full tag definitions.

| Tag | Effect |
|---|---|
| `resilient` | Halves negative morale deltas from Heat |
| `streaky` | Doubles Heat-driven morale deltas in both directions |
| `veteran-leader` | Morale floor of 10 — never drops below Stable |
| `high-maintenance` | Minimum morale drain of -1 per game regardless of Heat |
| `team-first` | Morale partially driven by team win/loss, not just personal Heat |
| `confidence-dependent` | Hot → +3 morale; Cold → -3 morale (heightened sensitivity) |

> **Conflict:** `veteran-leader` morale floor of 10 falls in the Frustrated range (7–11), not Stable (12–16). See backlog item H3.

### Season-level consequences

- **Contract value** — hot players command higher contracts; cold players are cheaper to retain
- **Permanent stat growth or regression** — a hot season can produce a permanent attribute increase; sustained cold can cause regression
- **Free agency attractiveness** — hot seasons attract rival interest; cold seasons reduce leverage
- **Narrative tag changes** — breakout hot season can unlock tags; sustained cold risks losing positive tags
- **Coach reputation contribution** — developing a consistently hot player contributes to the coach's reputation score

> **Open:** `breakout-star` and `clutch-performer` are referenced here as unlockable tags but are not defined in the tag vocabulary. See backlog item M9.

---

## 3. The Court Display

The primary visual surface is a **static 5v5 card formation**:
- Ten player cards (5 per side), in a slightly tilted/rotated layout
- Cards face each other; matchup lines connect directly opposed players
- The formation reflects the **active scheme** of each team
- Only indicators animate; the display is a permanent coaching panel

**Live indicators on each card:**
- Fatigue bar (bleeds into card border)
- Foul count
- Heat state
- Matchup line pulse (activates when a matchup is being exploited or a mismatch is active)
- Crisis indicator (glows when a crisis event is tied to that player)

**Ball indicator:** A glowing marker rests on the attacking side's formation. Possession changes flip the indicator.

---

## 4. The Background Planning Layer

Always available during the game.

**Phase 1 — Rotation queue:**
- A live coaching panel shows the 5 active players and the bench
- The player can adjust the intended rotation at any time
- The simulation auto-rotates based on the queue as fatigue accumulates, but never at a worse time than intended unless a crisis forces it (foul trouble, injury)
- Fatigue and Heat bars give the signal to act before a crisis window fires

**Phase 2 — Scheme selection** (added once Phase 1 is mechanically proven):
- A set of named coaching schemes — see [reference/3-scheme-vocabulary.md](../5-reference/3-scheme-vocabulary.md)
- Scheme changes have a lag — players need a possession or two to adjust
- The active scheme changes the card formation layout on the court display

> **Conflict:** Scheme names used here ("protect the three-point line," "zone press") differ from canonical names in `reference/3-scheme-vocabulary.md`. See backlog item M6.

---

## 5. The Crisis Layer

Crisis windows are evaluated by the Crisis Engine after every action — not on a fixed cadence. They fire when a trigger condition is met. Crisis windows cannot stack; if two triggers fire simultaneously, one fires and the other is queued FIFO. End-of-period windows always jump the queue.

**Trigger conditions:**

| Trigger | Condition |
|---|---|
| Momentum swing | Opponent scores N consecutive possessions without reply |
| Foul trouble | Key player reaches 3 fouls in first half, or 5 fouls in second |
| Hot hand | Any player reaches Hot state and is being actively exploited |
| Cold hand | Key player reaches Cold state and opponent is routing plays at them |
| Injury / health scare | Fatigue threshold exceeded + contact action fires |
| End of quarter | Final action before quarter boundary |
| End of half | Final action before half boundary |
| Late game close score | Inside 2 minutes, score within 5 points |
| Shot clock desperation | Shot clock under 4 seconds, no terminal event yet |

**What the window looks like:** A visual and audio signal marks the opening. The window has a timing component — it closes if the player doesn't respond, just as a real coaching opportunity closes when the possession ends. An experienced coach (higher reputation, specific Identity Cards) can see signals one possession earlier.

**What the player does:**
The player responds using their **situation card hand** (5 cards selected pre-game from their season pool of ~15–20). Options:
- Play a situation card (tactical response specific to the crisis type)
- Call a timeout (limited resource — forces a pause, allows a rotation adjustment)
- Make a free rotation adjustment without spending a card (always available, lower impact)

Timeouts are a limited economy. Burning one early saves a crisis, but reaching the fourth quarter with none left is a real consequence.

---

## 6. Blowouts as a Distinct Mode

Blowouts are not lesser games — they are a different mode:

- **Garbage time signal:** Visual indication that the coach can safely experiment
- **Star resting:** Resting stars costs nothing; they recharge faster and reduce injury risk
- **Bench development:** Extended garbage-time minutes accumulate development opportunities
- **Opponent bench scouting:** The opponent's bench rotation becomes visible, revealing intel unavailable in tight games
- **Elevated story event probability:** Chemistry moments, breakout performances by secondary players, and milestone events are more likely during garbage time

Blowouts are when secondary characters get their stories.

> **Open:** The injury system (severity, games-missed model, emergency signing flow) is not defined. See backlog items H9 and NS2.
