---
title: Hoop Dynasty - Roles
---

Role tags define a player's declared function within the team's offensive and defensive system. They are a **sub-category of the tag system** — sitting alongside Specialisation, IQ, Behavioral, and Durability tags on the player dossier.

Role tags serve two functions:
1. **Simulation input** — they bias the scoring function toward the play types or defensive responses associated with the role
2. **Morale input** — when actual touch/assignment volume falls below role expectation for long enough, a morale pressure signal fires

For the full tag vocabulary see [reference/2-tag-vocabulary.md](../5-reference/2-tag-vocabulary.md). For the scoring functions that consume role tags see [mechanics/1-simulation-model.md](../4-mechanics/1-simulation-model.md).

**Related docs:**
- [mechanics/1-simulation-model.md](../4-mechanics/1-simulation-model.md) — how role tags feed into `player_fit` and `defender_fit`
- [reference/3-scheme-vocabulary.md](../5-reference/3-scheme-vocabulary.md) — defensive schemes and their `scheme_weight` values
- [loops/3-off-season.md](../3-loops/3-off-season.md) — Chapter 5 (Roster Construction) where roles are assigned
- [mechanics/2-player-model.md](../4-mechanics/2-player-model.md) — tag system overview and mutability rules

---

## General Rules

- Discrete labels attached to a player card
- No cap — a player can hold any number of role tags their attributes and archetype justify
- Assigned automatically in V1; manually overridable in a later phase
- Mutable: added or removed via Development Card, or when attributes shift significantly
- The boost is a **soft bias**, not a hard assignment — the scoring function resolves the best option each possession/action

> **Open:** Role tag manual override UX (how the coach interacts with role tags mid-season) is not yet designed. See backlog item Q27.

---

## 1. Offensive Roles

### 1.1 Offensive Role Tag Vocabulary

| Role Tag | Primary play type(s) | Key attribute cluster |
|---|---|---|
| `ball-handler` | Isolation, drive-and-kick, transition initiation | Ball Handling, Passing, Speed |
| `pick-and-roll-handler` | Pick-and-roll (ball side) | Ball Handling, Passing, Three-Point / Finishing |
| `pick-and-roll-screener` | Pick-and-roll → roll to rim | Strength, Finishing, Offensive Rebounding |
| `pick-and-pop-screener` | Pick-and-roll → pop to perimeter | Strength, Three-Point, `catch-and-shoot` tag |
| `handoff-screener` | Handoff actions | Speed, Strength, Ball Handling |
| `isolation-scorer` | Isolation | Mid-Range, Ball Handling, Finishing |
| `post-anchor` | Post-up | Strength, Close Range, Finishing |
| `floor-spacer` | Catch-and-shoot, spot-up | Three-Point; `catch-and-shoot` or `spot-up-shooter` specialisation tag |
| `cutter` | Off-ball cut, drive-and-kick recipient | Speed, Finishing |
| `transition-initiator` | Fast break, push-pace | Speed, Ball Handling, Passing |

### 1.2 Simulation Effect

The role tag boost is applied inside `player_fit` in the possession scoring function:

```
option_score(play_type) =
  scheme_weight(play_type)
  + play_type_recency_score(...)
  + player_fit(primary_candidate, play_type)   // includes role tag boost
  + heat_modifier(primary_candidate)
  - fatigue_penalty(primary_candidate)
  + matchup_exploit(primary_candidate, defender)
```

> **Open:** Offensive scheme vocabulary (`scheme_weight` values per play type) is not yet defined. See backlog item H8 and NS1.

### 1.3 Auto-Assignment (V1)

```
assign_role_tags(
  player,              // attributes, archetype, specialisation tags
  roster,              // all players on the roster
  scheme               // active offensive scheme (biases role priority)
) → role_tag_set
```

- A role tag is assigned if the player scores above a threshold on the relevant attribute cluster
- Multiple role tags can be assigned — no cap
- Conflicts (e.g. two `ball-handler` tags on a 5-player roster) are flagged as a **scheme fit warning** during Roster Construction but not prevented

> **Open:** When two players share a primary role, should the simulation penalise scheme fit score? See backlog item Q28.

### 1.4 Morale Mismatch — Offensive

A player whose touch volume falls significantly below role expectation accumulates morale pressure:

```
role_mismatch(
  player,
  touches_this_game,         // possessions where this player was the primary candidate
  role_touch_expectation,    // expected touch floor from role tags (see table below)
  games_left_until_crisis,   // from previous evaluation (starts at null)
  streak_length,             // consecutive games below expectation
  morale_current
) → updated_games_left_until_crisis
```

**Role touch expectation:**

| Priority tier | Role tags | Expected touches/game (floor) |
|---|---|---|
| Primary | `ball-handler`, `isolation-scorer`, `post-anchor`, `pick-and-roll-handler` | 6+ |
| Supporting | `pick-and-roll-screener`, `pick-and-pop-screener`, `handoff-screener`, `cutter`, `transition-initiator` | 3+ |
| Spacing | `floor-spacer` | 2+ |

A player with multiple role tags uses the expectation of their highest-priority role.

**Behavioral tag modulation:**

| Tag | Effect |
|---|---|
| `high-maintenance` | `games_left_until_crisis` decrements faster |
| `team-first` | `games_left_until_crisis` decrements slower |
| `veteran-leader` | Mismatch function suspended while morale ≥ 10 |
| `confidence-dependent` | Decrements faster; morale cost on trigger amplified |

> **Conflict:** `veteran-leader` morale floor of 10 falls in the Frustrated range (7–11), not Stable (12–16). See backlog item H3.

---

## 2. Defensive Roles

### 2.1 Defensive Role Tag Vocabulary

| Role Tag | Primary responses boosted | Key attribute cluster |
|---|---|---|
| `perimeter-stopper` | `stay-with-ball-handler`, `deny` | Perimeter Defense, Speed |
| `ball-hawk` | `deny`, `double-team`, `press` (Later) | Steal, Speed |
| `rim-protector` | `drop`, block probability on drives and post actions | Block, Inside Defense |
| `post-defender` | `stay-with-ball-handler` (post context), `deny` (entry pass) | Inside Defense, Strength |
| `help-defender` | `hedge-and-recover`, `help-and-rotate` | Speed, Perimeter Defense / Inside Defense |
| `switchable-defender` | `switch`, `hedge-and-recover` | Perimeter Defense, Inside Defense (both solid) |
| `transition-stopper` | `get-back`, transition containment bonus | Speed |

**Tag notes:**

- **`perimeter-stopper`** — Contains rather than gambles. Stays in front of their man and denies space.
- **`ball-hawk`** — Disrupts rather than contains. Attacks the ball actively via steal attempts, interception reads, tip attempts. Pairs naturally with `defensive-gambler` IQ tag.
- **`rim-protector`** — Deters and contests at the rim through verticality and timing. Not about Strength — about positioning and elevation. Strength is the `post-defender`'s domain.
- **`post-defender`** — Fronts the post, denies entry, holds position against physical scorers. A player can hold both `rim-protector` and `post-defender` if their attributes justify both.
- **`help-defender`** — Reads rotations and covers teammates' mistakes. Does not need positional versatility — a specialist big can be an elite help defender with the Speed to rotate.
- **`switchable-defender`** — Versatile enough to hold credible assignments across positions. Not about Speed — about reliable coverage across multiple situations. Solid `Perimeter Defense` and `Inside Defense` without necessarily peaking in either.
- **`transition-stopper`** — Disciplined at retreating and containing fast breaks. Buys time; slows the advance long enough for the defense to recover.

### 2.2 Defensive IQ Tag

The gambling behavior that cuts across multiple defensive contexts is an **IQ tag**, not a role tag:

| Node | Positive tag | Negative tag |
|---|---|---|
| Defensive decision node (steal attempt, interception read, shot block attempt) | `defensive-gambler` | `defensive-conservative` |

- **`defensive-gambler`** — amplifies the attempt rate at all three gamble nodes. Outcome resolved by the relevant attribute (`Steal`, `Block`). Pairs naturally with `ball-hawk`.
- **`defensive-conservative`** — actively avoids high-upside defensive risks even when well-positioned. Not the neutral baseline — it is the negative tag.

### 2.3 Simulation Effect

The role tag boost is applied inside `defender_fit` in the defensive scoring function:

```
option_score(defensive_response) =
  scheme_weight(defensive_response)
  + defender_fit(primary_defender, offensive_action)   // includes role tag boost
  + scouting_knowledge(primary_defender, ball_handler)
  + heat_modifier(primary_defender)
  - fatigue_penalty(primary_defender)
  + help_defender_availability(defensive_response)
```

For the full defensive scoring function and defensive response vocabulary see [mechanics/1-simulation-model.md](../4-mechanics/1-simulation-model.md) §7.

For scheme `scheme_weight` values see [reference/3-scheme-vocabulary.md](../5-reference/3-scheme-vocabulary.md).

### 2.4 Auto-Assignment (V1)

```
assign_defensive_role_tags(
  player,
  roster,
  scheme,
  opponent_scheme      // future-proofing hook; flat neutral value in V1
) → role_tag_set
```

- A role tag is assigned if the player scores above a threshold on the relevant attribute cluster
- Multiple role tags can be assigned — no cap
- `opponent_scheme` is present so the function signature does not need to change when opponent scouting is introduced
- Conflicts (e.g. no `switchable-defender` running `switch-everything`) are flagged as a **scheme fit warning** but not prevented

> **Open:** When should `opponent_scheme` begin receiving real input? Tied to scouting system depth. See backlog item Q29.

### 2.5 Morale Mismatch — Defensive

Same function as offensive, applied to on-ball defensive assignments:

```
role_mismatch(
  player,
  assignments_this_game,       // possessions where this player was the primary defender
  role_assignment_expectation, // expected assignment floor from role tags
  games_left_until_crisis,
  streak_length,
  morale_current
) → updated_games_left_until_crisis
```

**Role assignment expectation:**

| Priority tier | Role tags | Expected on-ball assignments/game (floor) |
|---|---|---|
| Primary | `perimeter-stopper`, `rim-protector`, `ball-hawk` | 4+ |
| Supporting | `help-defender`, `switchable-defender`, `post-defender` | 2+ |
| Suppression | `transition-stopper` | 1+ |

Behavioral tag modulation is identical to the offensive mismatch function.

> **Conflict:** The offensive mismatch function uses parameter names `touches_this_game` / `role_touch_expectation`; the defensive uses `assignments_this_game` / `role_assignment_expectation`. If this is one shared function it needs unified naming. See backlog item L5.
> **Open:** Scheme fit scoring — global `scheme_weight` penalty vs. individual response level when the roster lacks rewarded role tags. See backlog item Q26.
> **Open:** Zone role tags (`zone-anchor` and zone-specific role binding) not defined. Belongs to a dedicated zone design session. See backlog item Q25.
