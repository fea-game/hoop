---
title: Hoop Dynasty - Simulation Model
---

This document covers the internal mechanics of the exhibition game simulation: service architecture, the game loop, scoring functions, the action chain, fatigue, and the defensive model.

For the player-facing game loop (Heat system, court display, crisis layer, blowout mode) see [loops/1-game-loop.md](../3-loops/1-game-loop.md).

**Related docs:**
- [loops/1-game-loop.md](../3-loops/1-game-loop.md) — the player-facing game experience
- [mechanics/3-roles.md](../4-mechanics/3-roles.md) — how role tags bias the scoring functions
- [reference/3-scheme-vocabulary.md](../5-reference/3-scheme-vocabulary.md) — scheme definitions and their `scheme_weight` values
- [reference/1-attribute-tables.md](../5-reference/1-attribute-tables.md) — the 15 attributes and their simulation roles
- [reference/2-tag-vocabulary.md](../5-reference/2-tag-vocabulary.md) — tags referenced in scoring functions

---

## 1. Architecture

The game uses an **action-driven simulation** coordinated by a central controller. Possessions are logical groupings of actions — each possession runs an interleaved chain of offensive and defensive micro-decisions until a terminal event fires or the shot clock expires.

### Six services

| Service | Role |
|---|---|
| **Controller** | Owns the game loop and game state. Evaluates crisis triggers after each action. Routes player input. The only service with mutation rights over game state. |
| **Simulation** | Pure producer. Takes game state and parameters, returns action results. No UI awareness, no side effects. |
| **Presentation** | Pure consumer. Receives events from the controller, updates the display, controls pacing. Signals player input back to the controller. No simulation awareness. |
| **Crisis Engine** | Evaluates trigger conditions after each action. Returns an active crisis window or null. Read-only access to game state. |
| **Attribution Engine** | Computes per-player chained delta scores from completed action chains. Feeds the Heat Engine and Recency Tracker. |
| **Heat Engine** | Maintains rolling per-player Heat scores. Updated after each possession. Exposes Heat state to the simulation as an input parameter. |
| **Recency Tracker** | Maintains a 6–8 possession rolling window per play type. Updated after each possession. Exposes recency scores to the simulation. |

---

## 2. Game Loop

Action-driven. One iteration per action, not per possession:

```
loop:
  simulation produces next action_result
  controller receives action_result

  attribution engine updates from action_result
  controller applies immediate parameter changes
  crisis engine evaluates triggers

  match action_result.type:

    in_possession_action:
      presentation logs event         // near-zero hold, simulation released immediately

    possession_end:
      heat engine updates
      recency tracker updates
      presentation updates display
      controller flushes next_possession change queue
      simulation released

    crisis_trigger:
      presentation blocks
      player response collected
      controller flushes immediate change queue
      simulation released

    quarter_end:
      controller flushes next_quarter change queue
      possession_end sequence runs

    game_end:
      controller flushes next_game change queue
      final attribution computed
```

### Parameter change timing

Every change to simulation parameters carries an `effective_when` attribute. The controller flushes each tier's change queue at the appropriate boundary. Player-driven background layer changes (rotation, scheme) are always queued — never applied mid-action.

| `effective_when` | Flush condition | Examples |
|---|---|---|
| `immediate` | Before next action | Crisis response, timeout called |
| `next_dead_ball` | Next stoppage | Substitution |
| `next_possession` | Possession boundary | Rotation queue, scheme change |
| `next_quarter` | Quarter boundary | Structural lineup change |
| `next_game` | Game end | Development card, off-season decision |

### Presentation contract

The simulation and presentation are synchronous. The controller produces one action result at a time; the presentation acquires it and releases the simulation as quickly as possible:

- **In-possession action** — presentation logs the event and releases immediately
- **Possession end** — presentation updates display, controller flushes queued parameter changes, simulation released
- **Crisis trigger** — presentation blocks, player response collected, controller applies response, simulation released

---

## 3. Offensive Possession Generator

The scheme is the full possession generator. It co-determines play type and all role assignments via a single weighted scoring function evaluated over all valid options. The highest-scoring option wins most of the time; a tight weighted-random draw from the top N prevents perfect predictability.

```
option_score(play_type) =
  scheme_weight(play_type)
  + play_type_recency_score(play_type, last_6_to_8_possessions)
  + player_fit(primary_candidate, play_type)
  + heat_modifier(primary_candidate)
  - fatigue_penalty(primary_candidate)
  + matchup_exploit(primary_candidate, defender)
```

- **`scheme_weight`** — the active offensive scheme pre-weights play types. See [reference/3-scheme-vocabulary.md](../5-reference/3-scheme-vocabulary.md) for the offensive scheme vocabulary (NS1 — not yet written).
- **`play_type_recency_score`** — rolling window score for this play type over the last 6–8 possessions (see §3.1)
- **`player_fit`** — derived from archetype, tags, and attributes. Includes role tag boost from [mechanics/3-roles.md](../4-mechanics/3-roles.md). Cached; reactively recalculated on permanent changes only.
- **`heat_modifier`** — Heat state of the primary candidate. Hot → positive skew; Cold → negative skew.
- **`fatigue_penalty`** — cumulative fatigue of the primary candidate (see §6).
- **`matchup_exploit`** — positive when the primary candidate has a favorable matchup against their defender.

Secondary roles (screener, spacers, assister) are assigned from remaining on-court players by the same scheme logic after the primary play type is determined.

> **Open:** Offensive scheme vocabulary (`scheme_weight` values per play type) is not yet defined. See backlog item H8 and NS1.
> **Open:** Play type action budgets (base shot clock budget per play type) are not yet calibrated. See backlog item Q7.
> **Open:** `synergy_modifier` term is absent from this function but is implied by the relationships system. See backlog item H10 and NS6.

### 3.1 Play type recency

Uses a symmetric possession value scale over a 6–8 possession rolling window per play type:

| Outcome | Possession value |
|---|---|
| Shot made | +1.0 |
| Foul drawn | +0.8 |
| Offensive rebound off miss | +0.3 |
| Shot missed, defensive rebound | -0.5 |
| Turnover | -1.0 |
| Flagrant / technical | -1.2 |

A play type that has been failing accumulates a negative recency score and is naturally deprioritised without a hard rule.

---

## 4. Action Chain and Attribution

### Action chain

Each possession is a chain of interleaved offensive and defensive micro-decisions. Each node:

```
action_node {
  actor              // performing player
  side               // offense | defense
  options[]          // available branches
  selected_option    // chosen branch
  deltas{}           // per-player attribution contributions from this action
}
```

The chain terminates on a terminal event or shot clock exhaustion.

### Full possession attribution

Every player on the floor receives a chained delta score per possession. Deltas compound additively — multiple contributions in a single possession chain. There is no designated primary player; the highest scorer in `player_scores{}` is derived on demand for narration or Heat purposes.

**Active contribution deltas:**

| Event | Delta |
|---|---|
| Good screen set | +0.5 |
| Poor screen | -0.3 |
| Ball handler — good decision | +0.5 |
| Ball handler — poor decision | -0.3 |
| Good pass | +0.5 |
| Shot attempt — good look | +0.5 |
| Shot attempt — bad look | -0.5 |
| Shot made | +1.0 |
| Shot missed | -0.5 |
| Offensive rebound | +0.8 |
| Good pass after offensive rebound | +0.3 |
| Foul drawn | +0.8 |
| Turnover | -1.0 |
| Flagrant / technical | -1.2 |

**Passive contribution deltas** (player affects the play without touching the ball):

| Event | Delta |
|---|---|
| Gravity — spacing created lane for drive | +0.4 |
| Gravity — spacing created kick-out opportunity | +0.3 |
| Good off-ball cut | +0.4 |
| Poor spacing — clogged lane | -0.3 |
| Defensive attention drawn | +0.2 |

Gravity is tag-driven. Opponent scouting knowledge modulates gravity magnitude — a shooter the opponent has not scouted exerts reduced gravity because the defense has not learned to respect them.

**Example — pick-and-roll, corner kick-out, shot made:**

| Player | Deltas | Total |
|---|---|---|
| Ball handler | good decision +0.5, good pass +0.5 | +1.0 |
| Screener | good screen +0.5 | +0.5 |
| Corner shooter | gravity +0.3, good look +0.5, shot made +1.0 | +1.8 |
| Other wing | spacing maintained +0.2 | +0.2 |

The corner shooter receives the largest score despite not initiating the play.

### Terminal events

| Event | V1 | Later |
|---|---|---|
| Shot attempt | Yes | — |
| Turnover — shot clock violation | Yes | — |
| Turnover — bad pass | Yes | — |
| Defensive foul | Yes | — |
| Turnover — stolen | Approximated (low-probability branch) | Full attribute check |
| Turnover — out of bounds | No | Yes |
| Offensive foul — charge | No | Yes |
| Offensive foul — illegal screen | No | Yes |
| Technical / flagrant | No | Yes |

---

## 5. Time Economy

Each action consumes real seconds from the shot clock:

```
time_cost_function(
  shot_clock_remaining,        // current shot clock in seconds
  current_action,              // action being executed
  actor,                       // performing player (attributes, tags, fatigue)
  defender,                    // defending player (attributes, tags, fatigue)
  defensive_scheme_pressure,   // scheme-level time compression scalar
  previous_action_result       // rhythm context from prior action
) → seconds_consumed
```

External unit is always real seconds. Shot clock resets (14 seconds after an offensive rebound, runoffs, out-of-bounds) are applied by the controller before the next action.

### Shot clock exhaustion branch

```
if shot_clock_remaining critically_low and no terminal event:
  evaluate shot_clock_awareness(actor)
    high IQ / shot-clock-savvy tag  → hurried shot (bad look, penalised)
    mid IQ                          → coin flip: hurried shot or violation
    low IQ / ball-stopper tag       → shot clock violation (turnover)
```

> **Conflict:** The tag used here is `shot-clock-savvy`; `mechanics/2-player-model.md` names the same tag `late-clock-savvy`. Pick one. See backlog item H4.
> **Conflict:** `ball-stopper` tag is referenced here but not defined in the tag vocabulary. See backlog item H5.

---

## 6. Fatigue Model

Fatigue is a cumulative in-game value on each player's state, starting at 0 and climbing. It feeds directly into the possession generator (`fatigue_penalty`), the time cost function, and the proximity function as a scalar.

### Accumulation

```
fatigue_delta(
  player,                  // attributes, tags (e.g. `high-motor`, `injury-prone`)
  action,                  // what the player just did
  current_fatigue,         // current cumulative fatigue score
  minutes_played           // total floor time this game in seconds
) → fatigue_delta
```

Action intensity drives accumulation independently of role — a hard-hedge or a drive costs more than a catch-and-shoot. `current_fatigue` allows diminishing recovery and steepening accumulation as the game progresses. `minutes_played` provides a continuous baseline drain.

**V1:** Fixed delta per action type (high/low intensity buckets), plus a flat per-second drain. Tag interactions (`high-motor`, `injury-prone`, `iron-man`) deferred.

**Later:** Per-action intensity weights at the individual action level; full tag interaction model.

### Recovery

Recovery is discrete — calculated at possession boundaries for benched players, with a larger batch at quarter breaks.

| Recovery event | Delta |
|---|---|
| Possession boundary (benched) | Flat recovery per possession |
| Quarter break (benched) | Larger flat batch |
| Quarter break (on floor) | Smaller flat batch |
| Timeout | Flat recovery delta to all five players on the floor |

Recovery rate is modulated by `minutes_played` — a player with heavy minutes recovers more slowly. Accumulated fatigue has a stubborn floor that does not fully clear mid-game.

**V1:** Flat rates for all events. Minutes-played modulation and tag interactions later.

### Display and thresholds

Fatigue is displayed as a continuous bar on each player card (bleeds into the card border). The bar is a direct readout of the cumulative score, not a discrete state system.

| Threshold | Level | Effect |
|---|---|---|
| **Warning** | ~60% fatigue | Bar changes colour. Crisis Engine begins monitoring this player for injury risk. Coaching signal only — no hard consequence yet. |
| **Critical** | ~85% fatigue | Injury risk spike activates. Performance penalties in scoring functions are steepest here. Crisis Engine can fire an injury/health scare window on a contact action. |

**V1:** Two thresholds, continuous bar, colour change at warning. Injury risk at critical is stubbed in the crisis trigger list.

---

## 7. Defensive Simulation

The defensive side of the action chain uses a **mirror model** — the same weighted scoring function pattern as the offensive generator, applied to defensive response options. The defense is an active decision-making system, not a passive resistance layer.

### Defensive response vocabulary

| Response | Situation | V1 |
|---|---|---|
| `stay-with-ball-handler` | Ball handler action — primary defender fights through or around screen | Yes |
| `switch` | Ball handler action — defenders trade assignments | Yes |
| `hedge-and-recover` | Ball handler action — help defender steps up, recovers back | Yes |
| `hard-hedge` | Ball handler action — help defender fully commits, leaves man open | Yes |
| `drop` | Ball handler action — help defender sags to protect the paint | Yes |
| `double-team` | Ball handler action — secondary defender traps ball handler | Yes |
| `deny` | Perimeter / off-ball — cuts off passing lane aggressively | Yes |
| `sag-off` | Perimeter / off-ball — gives space, dares player to shoot | Yes |
| `help-and-rotate` | Perimeter / off-ball — off-ball defender covers for beaten teammate | Yes |
| `get-back` | Transition — prioritise retreating to half-court | Yes |
| `press` | Transition — full-court pressure | Later |
| `face-guard` | Perimeter — extreme denial, follows player everywhere | Later |

### Defensive scoring function

```
option_score(defensive_response) =
  scheme_weight(defensive_response)
  + defender_fit(primary_defender, offensive_action)
  + scouting_knowledge(primary_defender, ball_handler)
  + heat_modifier(primary_defender)
  - fatigue_penalty(primary_defender)
  + help_defender_availability(defensive_response)
```

- **`scheme_weight`** — the active defensive scheme pre-weights responses. See [reference/3-scheme-vocabulary.md](../5-reference/3-scheme-vocabulary.md).
- **`defender_fit`** — mirrors `player_fit` on offense. Includes defensive role tag boost from [mechanics/3-roles.md](../4-mechanics/3-roles.md).
- **`scouting_knowledge`** — how well the defender knows the ball handler's tendencies. High knowledge boosts the correct response; unknown opponents receive a flat neutral contribution.
- **`heat_modifier`** — Cold defender → less likely to select the optimal response.
- **`fatigue_penalty`** — Fatigued defender → defaults toward lower-effort responses (`sag-off`, `drop`).
- **`help_defender_availability`** — responses requiring a second defender are penalised if the nearest help defender is fatigued, in foul trouble, or already committed. Determined by the proximity function.

> **Conflict:** `scouting_knowledge` is required as a continuous numeric value here, but the scouting system produces card reveals with no defined conversion to a number. See backlog item H6 and NS8.

### Proximity function

Decouples defensive availability from rigid 1-on-1 matchup assignment. Works for man-to-man and zone.

```
proximity(
  defender,
  offensive_actor,
  defensive_scheme,
  primary_assignment,
  ball_position,
  previous_action,
  fatigue
) → proximity_score   // 0.0 (unreachable) to 1.0 (right there)
```

- **`primary_assignment`** — in man-to-man: a player reference; in zone: a floor area.
- **`defensive_scheme`** — governs how `primary_assignment` is interpreted.
- **`ball_position`** — help defense availability depends on where the ball is relative to the defender's assignment.
- **`previous_action`** — a defender who just executed `hard-hedge` is out of position. Prevents the defense from teleporting between responses.
- **`fatigue`** — fatigued defenders recover position more slowly.

**V1 implementation:** A lookup table — `primary_assignment × ball_position → base_proximity_score`, with a flat penalty if `previous_action` was a committing response (`hard-hedge`, `double-team`), and a fatigue scalar.

**Later:** A floor-position model with spatial coordinates per scheme, enabling realistic zone coverage gaps and rotation chains.
