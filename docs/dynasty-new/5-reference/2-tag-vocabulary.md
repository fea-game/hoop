---
title: Hoop Dynasty - Tag Vocabulary
---

The canonical list of all player tags, organized by category. Tags are discrete labels attached to a player that fire at specific simulation nodes, narrative triggers, or out-of-game decision points.

For the tag system overview, mutability rules, and IQ indicator derivation see [mechanics/2-player-model.md](../4-mechanics/2-player-model.md). For role tags see [mechanics/3-roles.md](../4-mechanics/3-roles.md) (they are a tag sub-category not listed here to avoid duplication).

---

## 1. Specialisation Tags

Amplify or constrain attribute effectiveness in a specific context:

| Tag | Effect |
|---|---|
| `catch-and-shoot` | Amplifies `Three-Point` in off-ball catch-and-shoot possessions |
| `dunker` | Unlocks the dunk action branch; amplifies crowd heat on made attempts; slightly increases block risk from elite shot-blockers |
| `crafty-finisher` | Reduces block risk on `Finishing` attempts; more forgiving vs. length; no crowd heat bonus |
| `physical-screener` | Amplifies `Strength` in screen-setting resolution |
| `spot-up-shooter` | Amplifies `Three-Point` from stationary catch-and-shoot position |

---

## 2. IQ Tags

Context-specific tags that fire at discrete simulation decision nodes. At any node where a player has no relevant IQ tag, they resolve at a **neutral baseline** — average decision-making is the absence of a tag.

| Situation / Node | Positive Tag | Negative Tag |
|---|---|---|
| Shot clock expiring | `late-clock-savvy` | `panic-chucker` |
| Double-team triggered | `pass-first-instinct` | `force-it` |
| Foul trouble | `foul-aware` | `foul-magnet` |
| Fatigue at critical threshold | `self-manager` | `overplays` |
| End-of-quarter possession | `late-clock-savvy` | — |
| Press break | `press-resistant` | — |
| Post-up decision node | `high-post-iq` | — |
| Defensive decision node (steal/interception/block attempt) | `defensive-gambler` | `defensive-conservative` |

> **Conflict:** `late-clock-savvy` is the canonical name here; `mechanics/1-simulation-model.md` uses `shot-clock-savvy` for the same tag. Pick one and apply consistently. See backlog item H4.
> **Conflict:** `ball-stopper` is referenced in the shot clock exhaustion branch of `mechanics/1-simulation-model.md` but is not defined here. Either add it or replace the reference. See backlog item H5.
> **Open:** This list covers known simulation nodes. New IQ tags are added as new decision nodes are designed. See backlog item Q12.

---

## 3. Behavioral / Morale Tags

Interact with the morale and Heat systems between and during games. For the full morale effects see [loops/1-game-loop.md](../3-loops/1-game-loop.md) §2.

| Tag | Effect summary |
|---|---|
| `resilient` | Halves negative morale deltas from Heat |
| `streaky` | Doubles Heat-driven morale deltas in both directions |
| `veteran-leader` | Morale floor of 10 — never drops below Stable |
| `high-maintenance` | Minimum morale drain of -1 per game regardless of Heat |
| `team-first` | Morale partially driven by team win/loss, not just personal Heat |
| `confidence-dependent` | Hot → +3 morale; Cold → -3 morale (heightened sensitivity) |

> **Conflict:** `veteran-leader` morale floor of 10 falls in the Frustrated range (7–11), not Stable (12–16). See backlog item H3.

---

## 4. Durability Tags

Express injury risk and stamina behavior. Interact with the fatigue accumulation function and injury risk threshold. For the fatigue model see [mechanics/1-simulation-model.md](../4-mechanics/1-simulation-model.md) §6.

| Tag | Effect |
|---|---|
| `injury-prone` | Increased injury risk at the fatigue critical threshold |
| `iron-man` | Reduced fatigue accumulation; lower injury risk |
| `high-motor` | High fatigue accumulation rate (plays hard, tires faster) |

---

## 5. Narrative / Earned Tags

Tags unlocked through play rather than assigned. Emerge from season-long performance patterns. Effects defined in the narrative system (`../brainstorming/3-storyline.md`).

| Tag | Unlock condition |
|---|---|
| `breakout-star` | Breakout hot season |
| `clutch-performer` | Sustained positive performance in high-crisis moments |

> **Open:** `breakout-star` and `clutch-performer` are referenced in `loops/1-game-loop.md` but their simulation effects are not defined here or in the narrative tag system. See backlog item M9.
> **Open:** Narrative tag vocabulary is defined in an out-of-scope document (`../brainstorming/3-storyline.md`). Either inline the relevant vocabulary here or document the dependency explicitly. See backlog item M7 and NS7.

---

## 6. Open Items

> **Open:** Is there a cap on how many tags a player can hold? See backlog item Q13.
