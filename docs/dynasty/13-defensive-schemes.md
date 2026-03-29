---
title: Hoop Dynasty - Defensive Schemes & Role Assignment
---

Defensive roles define a player's declared function within the team's defensive system. Like offensive role tags (see [11-role-assignment.md](./11-role-assignment.md)), they are implemented as **role tags** — a sub-category of the tag system that sits alongside Specialisation, IQ, Behavioral, and Durability tags on the player dossier.

Defensive role tags serve two functions:
1. **Simulation input** — they bias the defensive scoring function's `defender_fit` term toward the defensive responses associated with the role.
2. **Morale input** — when a player's actual on-ball defensive assignments fall below their role expectation for long enough, a morale pressure signal fires.

---

## 1. Role Tags as a Tag Sub-Category

Defensive role tags follow the same model as offensive role tags and all other tag categories (see [6-player-attributes-and-tags.md](./6-player-attributes-and-tags.md)):
- Discrete labels attached to a player card
- No cap — a player can hold any number of role tags their attributes and archetype justify
- Assigned automatically in V1; manually overridable in a later phase
- Mutable: a role tag can be added or removed (e.g. via a Development Card, or when a player's attributes shift significantly)

---

## 2. Defensive Role Tag Vocabulary

The vocabulary is derived from the defensive response vocabulary the simulation supports (see §1.2 in [3-game-loop.md](./3-game-loop.md)). Each role tag is the declaration that this player is a **primary candidate** for the associated defensive response family.

| Role Tag | Primary responses boosted | Key attribute cluster |
|---|---|---|
| `perimeter-stopper` | `stay-with-ball-handler`, `deny` | Perimeter Defense, Speed |
| `ball-hawk` | `deny`, `double-team`, `press` (Later) | Steal, Speed |
| `rim-protector` | `drop`, block probability on drives and post actions | Block, Inside Defense |
| `post-defender` | `stay-with-ball-handler` (post context), `deny` (entry pass) | Inside Defense, Strength |
| `help-defender` | `hedge-and-recover`, `help-and-rotate` | Speed, Perimeter Defense / Inside Defense |
| `switchable-defender` | `switch`, `hedge-and-recover` | Perimeter Defense, Inside Defense (both solid) |
| `transition-stopper` | `get-back`, transition containment bonus | Speed |

### Tag notes

**`perimeter-stopper`** — A disciplined on-ball defender who stays in front of their man and denies space. Does not require elite Steal — this player contains rather than gambles. Their value is restricting movement, not creating turnovers.

**`ball-hawk`** — Attacks the ball actively: on-ball steal attempts, interception reads in passing lanes, tip attempts. Pairs naturally with `defensive-gambler` IQ tag (see §2.1 below). Does not require elite Perimeter Defense — this player disrupts rather than contains.

**`rim-protector`** — Deters and contests shots at the rim through verticality and timing. Does not require high Strength — the contest is about positioning and elevation, not physicality. Strength is the `post-defender`'s domain.

**`post-defender`** — Fronts the post, denies entry, and holds position against physical post scorers. Strength is the primary separator from `rim-protector`. A player can hold both tags if their attribute cluster justifies both.

**`help-defender`** — Reads rotations, covers teammates' mistakes, and strengthens the current defensive possession. Does not need to be versatile across positions — a specialist big can be an elite help defender if they have the Speed to rotate and the defensive attributes to hold when they arrive. Help can come from the perimeter or the interior.

**`switchable-defender`** — Versatile enough to hold credible defensive assignments across a range of positions and offensive actions. The tag biases the scoring function toward selecting `switch` and `hedge-and-recover` because the resulting coverage is reliable. Speed is not required — versatility is the quality, not athleticism. Attribute cluster: solid `Perimeter Defense` and `Inside Defense` without necessarily peaking in either.

**`transition-stopper`** — Disciplined at retreating and containing fast breaks. Their value is buying time: slowing the opponent's advance long enough for the defense to recover, preventing the shot from being taken rather than necessarily blocking it. Speed is the core attribute; the behavioral declaration (gets back, doesn't gamble in transition) is what the tag adds on top.

### 2.1 Defensive IQ tag

The gambling behavior that cuts across multiple defensive role contexts is expressed as an **IQ tag**, not a role tag. It fires at discrete simulation decision nodes — the same model as offensive IQ tags in [6-player-attributes-and-tags.md](./6-player-attributes-and-tags.md).

| Node | Positive tag | Negative tag |
|---|---|---|
| Defensive decision node (steal attempt, interception read, shot block attempt) | `defensive-gambler` | `defensive-conservative` |

- **`defensive-gambler`** — amplifies the attempt rate at all three gamble nodes. Outcome is still resolved by the relevant attribute (`Steal`, `Block`). A low-`Block` gambler attempts blocks he cannot make. A high-`Steal` gambler is genuinely dangerous. Pairs naturally with `ball-hawk`.
- **`defensive-conservative`** — the negative tag. Never takes the right gamble even when the situation calls for it. Not the absence of gambling (that is the neutral baseline) — this player actively avoids high-upside defensive risks even when well-positioned to succeed.

Players with neither tag resolve at a neutral baseline — sound positional defense without exceptional risk instincts in either direction.

---

## 3. Simulation Effect

Defensive role tags add a weight bonus to the defensive scoring function's `defender_fit` term for their associated responses:

```
option_score(defensive_response) =
  scheme_weight(defensive_response)
  + defender_fit(primary_defender, offensive_action)   // includes role tag boost
  + scouting_knowledge(primary_defender, ball_handler)
  + heat_modifier(primary_defender)
  - fatigue_penalty(primary_defender)
  + help_defender_availability(defensive_response)
```

The role tag boost is applied inside `defender_fit`. It is a positive scalar added when the evaluated defensive response matches one of the player's role tags. The boost does not lock the response to that player — the scoring function resolves the best available option each action node.

This is a **soft bias**, not a hard assignment. The role declares intent; the scoring function resolves it each possession. A fatigued `perimeter-stopper` with a high `fatigue_penalty` may still resolve to `drop` rather than fight over a screen — the tag biases but does not override.

---

## 4. Defensive Schemes

The active defensive scheme sets `scheme_weight` values across the defensive response vocabulary. It is the team-level declaration of defensive identity — which responses are prioritised, which are deprioritised, and which role tags the system rewards.

Scheme changes have a lag — players need a possession or two to adjust. The active scheme is visible on the court display formation (see §4 in [3-game-loop.md](./3-game-loop.md)).

### Scheme vocabulary

**`protect-the-paint`**
Concede the perimeter. Protect the rim at all costs. Defenders sag off perimeter players and funnel everything toward the paint where the interior protection is strongest. Dares the opponent to beat you with threes.

| | |
|---|---|
| Responses weighted up | `drop`, `help-and-rotate`, `sag-off` |
| Responses weighted down | `deny`, `hard-hedge`, `press` |
| Role tags rewarded | `rim-protector`, `help-defender`, `post-defender` |

---

**`protect-the-arc`**
Concede the interior. Lock down the perimeter and deny three-point looks. Defenders close out hard on shooters and stay attached on the ball. Dares the opponent to drive and finish at the rim.

| | |
|---|---|
| Responses weighted up | `deny`, `stay-with-ball-handler`, `sag-off` (interior) |
| Responses weighted down | `drop`, `sag-off` (perimeter) |
| Role tags rewarded | `perimeter-stopper`, `ball-hawk`, `transition-stopper` |

---

**`pressure`**
Aggressive on-ball. Force turnovers, disrupt rhythm, accept transition risk as the cost of doing business. High-energy scheme that fatigues defenders faster.

| | |
|---|---|
| Responses weighted up | `hard-hedge`, `deny`, `double-team` |
| Responses weighted down | `drop`, `sag-off`, `get-back` |
| Role tags rewarded | `perimeter-stopper`, `ball-hawk` |

---

**`drop-and-contain`**
Containment-first. The primary defender stays attached and forces the ball handler to make a decision; the help defender drops as a safety rather than committing aggressively. Disciplined scheme that minimises breakdown risk.

| | |
|---|---|
| Responses weighted up | `drop`, `stay-with-ball-handler`, `get-back` |
| Responses weighted down | `hard-hedge`, `double-team` |
| Role tags rewarded | `transition-stopper`, `rim-protector` |

---

**`switch-everything`**
Switch all screens. Eliminate pick-and-roll advantages by trading assignments rather than hedging. Demands versatile defenders — the scheme is only viable if the resulting matchups are credible.

| | |
|---|---|
| Responses weighted up | `switch`, `stay-with-ball-handler` |
| Responses weighted down | `hard-hedge`, `drop`, `double-team` |
| Role tags rewarded | `switchable-defender`, `perimeter-stopper` |

---

**`zone`**
Area-based coverage. Defenders guard regions rather than specific players. Protects against dribble penetration, disrupts timing-dependent offenses, and masks individual matchup weaknesses. Full zone implementation is Later — proximity function supports zone from day one via the `defensive_scheme` parameter.

| | |
|---|---|
| Responses weighted up | `help-and-rotate`, `drop`, `hedge-and-recover` |
| Responses weighted down | `stay-with-ball-handler`, `deny` (individual) |
| Role tags rewarded | `help-defender`, `switchable-defender`, `rim-protector` |

---

## 5. Auto-Assignment (V1)

In V1, defensive role tags are assigned automatically at Roster Construction (see [9-off-season.md](./9-off-season.md)).

**Assignment function:**

```
assign_defensive_role_tags(
  player,              // attributes, archetype, specialisation tags
  roster,              // all players currently on the roster
  scheme,              // active defensive scheme (biases role priority)
  opponent_scheme      // scouting profile of typical opposition (future-proofing hook)
) → role_tag_set       // set of defensive role tags assigned to this player
```

- The function evaluates each role tag against the player's attribute cluster and existing tags.
- A role tag is assigned if the player scores above a threshold on the relevant attribute cluster for that role.
- Multiple role tags can be assigned — there is no cap.
- The `opponent_scheme` parameter is a future-proofing hook for V1. In V1 it receives a flat neutral value — no opponent-driven bias yet. The parameter is present so the function signature does not need to change when opponent scouting is introduced.
- Conflicts (e.g. a roster with no `switchable-defender` running `switch-everything`) are flagged as a **scheme fit warning** visible during Roster Construction, but not prevented.

**Manual override (later phase):** The coach will be able to manually assign or remove defensive role tags during Roster Construction and at the between-game decision slot. The assignment function result is the starting point.

---

## 6. Morale Mismatch

A player whose actual on-ball defensive assignments fall significantly below their role expectation for long enough accumulates morale pressure. Detected by the same **role mismatch function** used for offensive roles, evaluated after each game.

```
role_mismatch(
  player,                    // defensive role tags, behavioral tags
  assignments_this_game,     // possessions where this player was the primary defender
  role_assignment_expectation, // expected assignment floor derived from role tags (see below)
  games_left_until_crisis,   // from previous evaluation (starts at null)
  streak_length,             // consecutive games below expectation
  morale_current             // current morale value
) → updated_games_left_until_crisis
```

### Role assignment expectation

Each defensive role tag carries a **priority tier** that sets the expected on-ball assignment floor:

| Priority tier | Role tags | Expected on-ball assignments/game (floor) |
|---|---|---|
| Primary | `perimeter-stopper`, `rim-protector`, `ball-hawk` | 4+ |
| Supporting | `help-defender`, `switchable-defender`, `post-defender` | 2+ |
| Suppression | `transition-stopper` | 1+ (presence and discipline is the value — one transition held is enough) |

A player with multiple role tags uses the expectation of their highest-priority role.

### Behavioral tag modulation

Behavioral tags modify the function's sensitivity identically to the offensive role mismatch function:

| Tag | Effect on mismatch function |
|---|---|
| `high-maintenance` | `games_left_until_crisis` decrements faster |
| `team-first` | `games_left_until_crisis` decrements slower |
| `veteran-leader` | Mismatch function suspended while morale ≥ 10 (Stable or above) |
| `confidence-dependent` | `games_left_until_crisis` decrements faster; morale cost on trigger is amplified |

---

## 7. Open Questions

| Question | Notes |
|---|---|
| Zone role tags | `zone-anchor` and zone-scheme-specific role binding are not defined. The proximity function's `defensive_scheme` parameter is the hook. Belongs to a dedicated zone scheme design session. |
| Defensive role tag manual override UX | How the coach interacts with defensive role tags mid-season (between-game decision slot). Mirrors the offensive equivalent — not yet designed. |
| Scheme fit scoring | When a roster lacks the role tags a scheme rewards (e.g. no `switchable-defender` in `switch-everything`), should the simulation penalise `scheme_weight` globally, or only at the individual response level? Deferred. |
| `opponent_scheme` parameter activation | At what phase does the auto-assignment function begin receiving real opponent scouting input rather than the flat neutral value? Tied to scouting system depth. See [7-draft-and-scouting.md](./7-draft-and-scouting.md). |
