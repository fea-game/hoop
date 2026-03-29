---
title: Hoop Dynasty - Role Assignment
---

Roles define a player's declared function within the team's offensive system. They are implemented as **role tags** — a sub-category of the tag system that sits alongside Specialisation, IQ, Behavioral, and Durability tags on the player dossier.

Role tags serve two functions:
1. **Simulation input** — they bias the possession generator's scoring function toward the play types associated with the role.
2. **Morale input** — when a player's actual touch volume falls below their role expectation for long enough, a morale pressure signal fires.

---

## 1. Role Tags as a Tag Sub-Category

Role tags follow the same model as other tag categories (see [6-player-attributes-and-tags.md](./6-player-attributes-and-tags.md)):
- Discrete labels attached to a player card
- No cap — a player can hold any number of role tags their attributes and archetype justify
- Assigned automatically in V1; manually overridable in a later phase
- Mutable: a role tag can be added or removed (e.g. via a Development Card, or when a player's attributes shift significantly)

---

## 2. Offensive Role Tag Vocabulary

The vocabulary is derived from the offensive play types the simulation supports. Each role tag is the declaration that this player is a **primary candidate** for the associated play type family.

| Role Tag | Primary play type(s) | Key attribute cluster |
|---|---|---|
| `ball-handler` | Isolation, drive-and-kick, transition initiation — general primary handler | Ball Handling, Passing, Speed |
| `pick-and-roll-handler` | Pick-and-roll (ball side) | Ball Handling, Passing, Three-Point / Finishing |
| `pick-and-roll-screener` | Pick-and-roll → roll to rim | Strength, Finishing, Offensive Rebounding |
| `pick-and-pop-screener` | Pick-and-roll → pop to perimeter | Strength, Three-Point, `catch-and-shoot` tag |
| `handoff-screener` | Handoff actions | Speed, Strength, Ball Handling |
| `isolation-scorer` | Isolation | Mid-Range, Ball Handling, Finishing |
| `post-anchor` | Post-up | Strength, Close Range, Finishing |
| `floor-spacer` | Catch-and-shoot, spot-up | Three-Point; `catch-and-shoot` or `spot-up-shooter` specialisation tag |
| `cutter` | Off-ball cut, drive-and-kick recipient | Speed, Finishing |
| `transition-initiator` | Fast break, push-pace | Speed, Ball Handling, Passing |

**Note:** Defensive roles are not defined here. Defensive role assignment belongs to a dedicated defensive scheme design session.

---

## 3. Simulation Effect

Role tags add a weight bonus to the possession generator's scoring function for their associated play types:

```
option_score(play_type) =
  scheme_weight(play_type)
  + play_type_recency_score(...)
  + player_fit(primary_candidate, play_type)   // includes role tag boost
  + heat_modifier(primary_candidate)
  - fatigue_penalty(primary_candidate)
  + matchup_exploit(primary_candidate, defender)
```

The role tag boost is applied inside `player_fit`. It is a positive scalar added when the evaluated play type matches one of the player's role tags. The boost does not lock the play type to that player — other players can still score higher on the same play type if their attributes, Heat, and matchup advantages outweigh the role boost.

This is a **soft bias**, not a hard assignment. The role declares intent; the scoring function resolves it each possession.

---

## 4. Auto-Assignment (V1)

In V1, role tags are assigned automatically at Roster Construction (Chapter 5 of the off-season — see [9-off-season.md](./9-off-season.md)).

**Assignment function:**

```
assign_role_tags(
  player,              // attributes, archetype, specialisation tags
  roster,              // all players currently on the roster
  scheme               // active offensive scheme (biases role priority)
) → role_tag_set       // set of role tags assigned to this player
```

- The function evaluates each role tag against the player's attribute cluster and existing specialisation tags.
- A role tag is assigned if the player scores above a threshold on the relevant attribute cluster for that role.
- Multiple role tags can be assigned — there is no cap.
- Conflicts (two players assigned the same primary role, e.g. two `ball-handler` tags on a 5-player roster) are flagged as a **scheme fit warning** visible during Roster Construction, but not prevented. The coach is informed; the decision is theirs.

**Manual override (later phase):** The coach will be able to manually assign or remove role tags during Roster Construction and at the between-game decision slot. The assignment function result is the starting point; the coach can edit from it. This requires no structural change to the tag model.

---

## 5. Morale Mismatch

A player whose actual touch volume falls significantly below their role expectation for long enough accumulates morale pressure. This is detected by the **role mismatch function**, evaluated after each game.

### Mismatch function

```
role_mismatch(
  player,                    // role tags, behavioral tags (high-maintenance, team-first, etc.)
  touches_this_game,         // possessions where this player was the primary candidate
  role_touch_expectation,    // expected touch floor derived from role tags (see below)
  games_left_until_crisis,   // from previous evaluation (starts at null)
  streak_length,             // consecutive games below expectation
  morale_current             // current morale value
) → updated_games_left_until_crisis
```

The function returns an updated `games_left_until_crisis` value. When `games_left_until_crisis` reaches 0, a morale pressure narrative event fires (see `3-game-loop.md` morale system).

### Role touch expectation

Each role tag carries a **priority tier** that sets the expected touch floor:

| Priority tier | Role tags | Expected touches/game (floor) |
|---|---|---|
| Primary | `ball-handler`, `isolation-scorer`, `post-anchor`, `pick-and-roll-handler` | 6+ |
| Supporting | `pick-and-roll-screener`, `pick-and-pop-screener`, `handoff-screener`, `cutter`, `transition-initiator` | 3+ |
| Spacing | `floor-spacer` | 2+ (touch floor is lower; spacing value is presence, not initiation) |

A player with multiple role tags uses the expectation of their highest-priority role.

### Behavioral tag modulation

Behavioral tags modify the function's sensitivity:

| Tag | Effect on mismatch function |
|---|---|
| `high-maintenance` | `games_left_until_crisis` decrements faster — less patient |
| `team-first` | `games_left_until_crisis` decrements slower — more patient |
| `veteran-leader` | Mismatch function suspended while morale ≥ 10 (Stable or above) |
| `confidence-dependent` | `games_left_until_crisis` decrements faster; morale cost on trigger is amplified |

### V1 implementation note

V1 uses a simple linear decrement: `games_left_until_crisis` starts at a fixed value (e.g. 5) when the first below-expectation game occurs, decrements by 1 per consecutive game below expectation (modified by behavioral tags), and resets to null when a game meets expectation. The "patience" value becoming compounded (incorporating morale history, season context, relationship tags) is an explicit later-phase improvement — the function signature supports it from day one.

---

## 6. Open Questions

| Question | Notes |
|---|---|
| Defensive role tags | Resolved. See [13-defensive-schemes.md](./13-defensive-schemes.md). |
| Role tag manual override UX | How the coach interacts with role tags mid-season (between-game decision slot). Not yet designed. |
| Role conflict resolution | When two players share a primary role (e.g. two `ball-handler` tags), the scheme fit warning is shown. Should the simulation penalise the scheme fit score? Deferred. |
| Touch counting method | What counts as a touch? Primary candidate in a possession? Ball handler in the action chain? Definition needs to be consistent with the attribution engine. |
