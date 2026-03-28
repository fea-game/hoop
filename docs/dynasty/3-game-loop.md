---
title: Hoop Dynasty - The Exhibition Game Loop
---

## 1. The Exhibition Game Loop

### 1.1 Overview

The exhibition game is the core session unit. It is a live simulation with two active layers: a **background planning layer** (ongoing, low-urgency) and a **foreground crisis layer** (triggered, high-urgency). The player watches the simulation unfold and manages both layers simultaneously.

**Game length is emergent, not fixed.** It is determined by the quality gap between the two teams:
- Blowout (large skill differential): 2–4 minutes, few crisis windows
- Competitive regular season game: 4–7 minutes, moderate crisis density
- Playoff game: 6–10 minutes, higher base crisis density due to better-prepared opponents
- Finals: 8–12 minutes, maximum crisis density, more situation cards available

There is no skip and no auto-resolve. Every game is played. Blowouts are fast, not absent.

### 1.2 The Simulation Model

The game uses an **action-driven simulation** coordinated by a central controller. Possessions are logical groupings of actions — each possession runs an interleaved chain of offensive and defensive micro-decisions until a terminal event fires or the shot clock expires. The presentation layer is a synchronous consumer of the simulation's output, paced by the controller.

#### Service architecture

The simulation is decomposed into six services:

- **Controller** — owns the game loop and game state. Evaluates crisis triggers after each action. Routes player input. The only service with mutation rights over game state.
- **Simulation** — pure producer. Takes game state and parameters, returns action results. No UI awareness, no side effects.
- **Presentation** — pure consumer. Receives events from the controller, updates the display, controls pacing. Signals player input back to the controller. No simulation awareness.
- **Crisis Engine** — evaluates trigger conditions after each action. Returns an active crisis window or null. Read-only access to game state.
- **Attribution Engine** — computes per-player chained delta scores from completed action chains. Feeds the Heat Engine and Recency Tracker.
- **Heat Engine** — maintains rolling per-player Heat scores. Updated after each possession. Exposes Heat state to the simulation as an input parameter.
- **Recency Tracker** — maintains a 6–8 possession rolling window per play type. Updated after each possession. Exposes recency scores to the simulation.

#### Game loop

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

#### Parameter change timing

Every change to simulation parameters carries an `effective_when` attribute. The controller flushes each timing tier's change queue at the appropriate boundary. Player-driven background layer changes (rotation, scheme) are queued — never applied mid-action.

| `effective_when` | Flush condition | Examples |
|---|---|---|
| `immediate` | Before next action | Crisis response, timeout called |
| `next_dead_ball` | Next stoppage | Substitution |
| `next_possession` | Possession boundary | Rotation queue, scheme change |
| `next_quarter` | Quarter boundary | Structural lineup change |
| `next_game` | Game end | Development card, off-season decision |

#### Possession generator

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

Secondary roles (screener, spacers, assister) are assigned from remaining on-court players by the same scheme logic after the primary play type is determined.

**Play type recency** uses a symmetric possession value scale over a 6–8 possession rolling window per play type:

| Outcome | Possession value |
|---|---|
| Shot made | +1.0 |
| Foul drawn | +0.8 |
| Offensive rebound off miss | +0.3 |
| Shot missed, defensive rebound | -0.5 |
| Turnover | -1.0 |
| Flagrant / technical | -1.2 |

A play type that has been failing accumulates a negative recency score and is naturally deprioritised without a hard rule.

#### Action chain

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

#### Time economy

Each action consumes real seconds from the shot clock via:

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

External unit is always real seconds. Internal representation is scalable from a simple action-count approximation to a full time economy. Shot clock resets (e.g. 14 seconds after an offensive rebound, runoffs, out-of-bounds) are applied by the controller before passing the updated value into the next action.

**Shot clock exhaustion branch:**

```
if shot_clock_remaining critically_low and no terminal event:
  evaluate shot_clock_awareness(actor)
    high IQ / shot-clock-savvy tag  → hurried shot (bad look, penalised)
    mid IQ                          → coin flip: hurried shot or violation
    low IQ / ball-stopper tag       → shot clock violation (turnover)
```

#### Full possession attribution

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

Gravity is tag-driven. Opponent scouting knowledge modulates gravity magnitude — a shooter the opponent has not yet scouted exerts reduced gravity because the defense has not learned to respect them.

**Example — pick-and-roll, corner kick-out, shot made:**

| Player | Deltas | Total |
|---|---|---|
| Ball handler | good decision +0.5, good pass +0.5 | +1.0 |
| Screener | good screen +0.5 | +0.5 |
| Corner shooter | gravity +0.3, good look +0.5, shot made +1.0 | +1.8 |
| Other wing | spacing maintained +0.2 | +0.2 |

The corner shooter receives the largest score despite not initiating the play. Their Heat compounds accordingly.

#### Fatigue model

Fatigue is a cumulative in-game value on each player's state, starting at 0 and climbing. It feeds directly into the possession generator (`fatigue_penalty`), the time cost function, and the proximity function as a scalar — no separate translation needed.

##### Accumulation function

```
fatigue_delta(
  player,                  // attributes, tags (e.g. `high-motor`, `injury-prone`)
  action,                  // what the player just did
  current_fatigue,         // current cumulative fatigue score
  minutes_played           // total floor time this game in seconds
) → fatigue_delta          // added to cumulative fatigue score
```

Action intensity drives accumulation independently of role — a hard-hedge or a drive to the rim costs more fatigue than a catch-and-shoot regardless of who initiated the possession. `current_fatigue` allows for diminishing recovery and steepening accumulation as the game progresses. `minutes_played` provides a continuous baseline drain on top of action costs.

**V1 implementation:** Fixed delta per action type (high-intensity vs. low-intensity buckets), plus a flat per-second minutes drain. `current_fatigue` used as a scalar cap only. Tag interactions (`high-motor`, `injury-prone`, `iron-man`) deferred to later.

**Later:** Per-action intensity weights differentiated at the individual action level; full tag interaction model.

##### Recovery

Recovery is discrete — calculated at possession boundaries for benched players, with a larger batch at quarter breaks. No continuous background tick.

| Recovery event | Delta |
|---|---|
| Possession boundary (benched) | Flat recovery per possession |
| Quarter break (benched) | Larger flat batch |
| Quarter break (on floor) | Smaller flat batch |
| Timeout | Flat recovery delta to all five players currently on the floor |

Recovery rate is modulated by `minutes_played` — a player who has played heavy minutes recovers more slowly even while resting. Accumulated fatigue has a stubborn floor that does not fully clear mid-game.

**V1:** Flat rates for all recovery events. Minutes-played modulation and tag interactions later.

##### Display and thresholds

Fatigue is displayed as a continuous bar on each player card (bleeds into the card border — see §1.4). The bar is a direct readout of the cumulative fatigue score, not a discrete state system.

Two thresholds sit on top of the continuous bar:

| Threshold | Level | Effect |
|---|---|---|
| **Warning** | ~60% fatigue | Bar changes colour. Crisis Engine begins monitoring this player for injury risk. No hard consequence yet — coaching signal only. |
| **Critical** | ~85% fatigue | Injury risk spike activates. Performance penalties in the scoring functions are steepest here. Crisis Engine can fire an injury/health scare window if a contact action occurs (see §1.6 crisis trigger table). |

**V1:** Two thresholds, continuous bar, colour change at warning. Injury risk at critical is already stubbed in the crisis trigger list.

#### Player fit

Derived from archetype, tags, and attributes. Cached as a value on the player card. Reactively recalculated when any relevant value changes (development card applied, tag added or removed, permanent attribute change). Stable mid-game — Heat and fatigue handle in-game variation on top of the stable fit base.

#### Defensive simulation

The defensive side of the action chain uses a **mirror model** — the same weighted scoring function pattern as the offensive possession generator, applied to defensive response options. The defense is not a passive resistance layer or a scheme lookup table; it is an active decision-making system evaluated per action node.

##### Defensive response vocabulary

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

##### Defensive scoring function

```
option_score(defensive_response) =
  scheme_weight(defensive_response)
  + defender_fit(primary_defender, offensive_action)
  + scouting_knowledge(primary_defender, ball_handler)
  + heat_modifier(primary_defender)
  - fatigue_penalty(primary_defender)
  + help_defender_availability(defensive_response)
```

- **`scheme_weight`** — the active defensive scheme pre-weights responses. A `protect-the-paint` scheme weights `drop` and `help-and-rotate` heavily; a `pressure` scheme weights `hard-hedge` and `deny`.
- **`defender_fit`** — mirrors `player_fit` on offense. Derived from archetype, tags, and attributes relative to the specific response. A `perimeter-stopper` tag boosts `stay-with-ball-handler` and `deny`; a `help-defender` tag boosts `hedge-and-recover` and `help-and-rotate`.
- **`scouting_knowledge`** — how well the defender and team know the ball handler's tendencies. High scouting knowledge boosts the score of the correct response for that ball handler (well-scouted shooter → `deny` weighted higher; well-scouted non-shooter → `sag-off` weighted higher). Unknown opponents receive a flat contribution — no boost, no penalty.
- **`heat_modifier`** — same as offense. A cold defender is less likely to select the optimal response.
- **`fatigue_penalty`** — same as offense. A fatigued defender defaults toward lower-effort responses (`sag-off`, `drop`).
- **`help_defender_availability`** — responses requiring a second defender (`hard-hedge`, `double-team`, `help-and-rotate`) are penalised if the nearest help defender is fatigued, in foul trouble, or already committed elsewhere. Determined by the proximity function (see below).

##### Proximity function

Proximity decouples defensive availability from rigid 1-on-1 matchup assignment. It works for both man-to-man and zone defense, where defenders guard areas rather than specific players. It is the input to `help_defender_availability` and any other system that needs to know whether a defender can realistically reach an action.

```
proximity(
  defender,                    // defending player (position, attributes, tags)
  offensive_actor,             // player performing the offensive action
  defensive_scheme,            // man-to-man vs. zone; zone type if applicable
  primary_assignment,          // who the defender is nominally guarding (man) or what area (zone)
  ball_position,               // where the ball currently is on the floor
  previous_action,             // what the defender just did (committed to a hedge, rotated, etc.)
  fatigue                      // fatigued defenders recover position more slowly
) → proximity_score            // 0.0 (unreachable) to 1.0 (right there)
```

- **`primary_assignment`** — in man-to-man, interpreted as a player reference; proximity to the ball handler is high if that is your man. In zone, interpreted as a floor area; proximity is determined by whether the offensive action is happening in your zone region.
- **`defensive_scheme`** — governs how `primary_assignment` is interpreted. Man schemes use player-to-player mapping; zone schemes use area-to-player mapping.
- **`ball_position`** — help defense availability depends on where the ball is relative to the defender's assignment. A wing defender is proximate to a wing action, far from a post action.
- **`previous_action`** — the most consequential term for sequencing. A defender who just executed `hard-hedge` is out of position; a defender who just rotated is committed elsewhere. Prevents the defense from teleporting between responses.
- **`fatigue`** — fatigued defenders recover position more slowly, reducing proximity on subsequent actions in the chain.

**V1 implementation:** A lookup table — `primary_assignment × ball_position → base_proximity_score`, with a flat penalty if `previous_action` was a committing response (`hard-hedge`, `double-team`), and a fatigue scalar. No geometry, no continuous space.

**Later:** A floor-position model with spatial coordinates per scheme, enabling realistic zone coverage gaps and rotation chains.

#### Terminal events

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

#### Presentation contract

The simulation and presentation are synchronous. The controller produces one action result at a time; the presentation acquires it and releases the simulation as quickly as possible:

- **In-possession action** — presentation logs the event and releases immediately (near-zero hold)
- **Possession end** — presentation updates the display, controller flushes queued parameter changes, simulation released (milliseconds)
- **Crisis trigger** — presentation blocks, player response is collected, controller applies the response, simulation released

Background layer changes (rotation, scheme) made by the player mid-possession are queued with `effective_when: next_possession` and applied cleanly at the possession boundary. The simulation never sees a mid-action state mutation.

### 1.3 Heat: Performance Indicator System

Heat is the primary per-player performance indicator. It is a rolling signal of recent in-game performance, displayed as three visible states: **Cold**, **Neutral**, and **Hot**.

#### Signal production

Heat is fed directly by the **Attribution Engine** output. After each possession is finalised, the Attribution Engine computes a chained delta score for every player on the floor (see §1.2 — Full possession attribution). Each player's possession score is the direct input to their Heat rolling window. There is no separate Heat delta table — the attribution model is the single source of per-player performance scoring, consumed by both Heat and the Recency Tracker.

Heat is computed as a rolling weighted score across the **last 5 possessions** for that player. Deltas chain additively within a possession: a player can accumulate multiple positive and negative contributions from a single possession depending on their role and what happened. This separation of action quality from outcome ensures a player is credited for a good shot that happened to miss, and penalised for a bad shot that happened to go in.

For the full delta table see §1.2 — Full possession attribution. Representative net examples:

- Good screen + ball handler good decision + shot made: **+2.0** (screener +0.5, handler +1.0, shooter +1.5)
- Corner shooter gravity held defender + good look + shot missed: **+0.3** (+0.3 gravity, +0.5 look, -0.5 miss)
- Turnover after poor decision: **-1.3** (-0.3 decision, -1.0 turnover)

#### Heat states and thresholds

The rolling 5-possession score maps to three visible states on the card:

| State | Indicator | Meaning |
|---|---|---|
| **Hot** | Warm glow on card | Player is performing above expectation in recent possessions |
| **Neutral** | No indicator | Baseline performance |
| **Cold** | Cool muted tint on card | Player is underperforming or making poor decisions |

#### In-game consequences

Heat state modifies the **probability weights** used in possession resolution — not fixed stat bonuses. A hot player gets a positive skew on shot quality rolls and defensive positioning rolls. A cold player gets a negative skew. This means Heat affects the *distribution* of outcomes, not guaranteed results.

The opponent AI reads Heat states and reacts visibly: plays are routed away from hot defenders and toward cold defenders. This is reflected in matchup line changes on the court display, making Heat a real tactical signal for both the player and the AI.

#### Between-game consequences (via Morale)

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

**Minutes expectation pressure:** A player at Engaged morale (17+) who is significantly benched the following game takes an additional -1 morale cost. Being hot and then sidelined stings.

#### Player tags affecting Morale dynamics

Player cards can carry tags that modify how their Morale responds to Heat:

| Tag | Effect |
|---|---|
| `resilient` | Halves negative morale deltas from Heat |
| `streaky` | Doubles Heat-driven morale deltas in both directions |
| `veteran-leader` | Morale floor of 10 — never drops below Stable |
| `high-maintenance` | Minimum morale drain of -1 per game regardless of Heat |
| `team-first` | Morale partially driven by team win/loss, not just personal Heat |
| `confidence-dependent` | Hot → +3 morale; Cold → -3 morale (heightened sensitivity) |

#### Season-level consequences

Sustained Heat history across a full season shapes macro outcomes:

- **Contract value and trade leverage** — a player who ran consistently hot commands a higher contract; one who ran cold is cheaper to retain or move
- **Permanent stat growth or regression** — a hot season can produce a permanent attribute increase carried into the next season; sustained cold can cause regression
- **Free agency attractiveness** — a hot season attracts rival team interest in free agency; a cold season may produce no outside offers, reducing the player's leverage
- **Narrative tag changes** — a breakout hot season can unlock tags (`breakout-star`, `clutch-performer`); sustained cold risks losing a positive tag or gaining a negative one
- **Coach reputation contribution** — developing a player who ran consistently hot contributes to the coach's reputation score, making it easier to attract similar talent in future seasons

### 1.4 The Court Display

The primary visual surface is a **static 5v5 card formation**:
- Ten player cards (5 per side), displayed in a slightly tilted/rotated layout to create an illusion of depth
- Cards face each other; matchup lines connect directly opposed players
- The formation reflects the **active scheme** of each team: a 5-out offense spaces the cards differently than a post-up set; a zone defense clusters the defensive cards differently than man-to-man
- The display is a permanent coaching panel, not an animation — only indicators animate

**Live indicators on each card:**
- Fatigue bar (bleeds into card border as the game progresses)
- Foul count
- Heat (performance indicator — see §1.3)
- Matchup line pulse (activates when a matchup is being exploited or a defensive mismatch is active)
- Crisis indicator (glows when a crisis event is tied to that player)

**Ball indicator:** A glowing marker rests on the attacking side's formation to indicate possession. Possession changes flip the indicator. No physical card movement is required.

### 1.5 The Background Planning Layer

Always available during the game. The player is not forced to interact, but informed players will:

**Phase 1 — Rotation queue:**
- A live coaching panel shows the 5 active players and the bench
- The player can adjust the intended rotation at any time — drag players in/out of the queue
- The simulation auto-rotates based on the queue as fatigue accumulates, but never at a worse time than the coach intended unless a crisis forces it (foul trouble, injury)
- Fatigue and heat bars on each player give the signal to act before a crisis window fires

**Phase 2 — Scheme selection** (added once Phase 1 is mechanically proven):
- A small set of named coaching schemes (push pace, half-court grind, zone press, hero ball, motion offense, protect the paint, protect the three-point line, etc.)
- Scheme changes have a lag — players need a possession or two to adjust
- The active scheme changes the card formation layout on the court display, giving the opponent the same visual feedback they'd get from their scouting

### 1.6 The Crisis Layer

**What triggers a crisis window:**

Crisis windows are evaluated by the Crisis Engine after every action — not on a fixed cadence. They fire when a specific trigger condition is met. Crisis windows cannot stack; if two triggers fire simultaneously, one window fires and the other is queued FIFO. End-of-period windows always jump the queue.

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

**What the window looks like:**
A visual and audio signal marks the opening of a crisis window. The window has a timing component — it closes if the player doesn't respond, just as a real coaching opportunity closes when the possession ends. The window is long enough for a deliberate player to always respond; its purpose is to keep engagement, not to punish reaction time. An experienced coach (higher reputation, specific Identity Cards) can see signals one possession earlier, effectively widening their response window.

**What the player does in a crisis:**
The player responds using their **situation card hand** (5 cards selected pre-game from their season pool of ~15–20). Options include:
- Playing a situation card (a tactical response specific to the crisis type)
- Calling a timeout (limited resource — forces a pause, allows a rotation adjustment, optionally lets the player select a replacement crisis card from a small reserve)
- Making a free rotation adjustment without spending a card (lower-impact, always available)

Timeouts are a limited economy: spending one early saves a crisis, but the fourth quarter with no timeouts left is a real consequence. The economic decision (which card to spend, whether to burn a timeout for more options) is the primary skill of the crisis layer.

### 1.7 Blowouts as a Distinct Mode

Blowouts are not lesser games — they are a different mode:
- **Garbage time signal:** When a game reaches blowout territory, a visual signal indicates the coach can safely experiment
- **Star resting:** Resting stars costs nothing; they recharge faster and reduce injury risk
- **Bench development:** Bench players getting extended garbage-time minutes accumulate development opportunities — a rookie's first extended run can trigger a `late-bloomer` narrative event
- **Opponent bench scouting:** The opponent's bench rotation becomes visible in blowouts, revealing intel unavailable in tight games
- **Elevated story event probability:** Chemistry moments, breakout performances by secondary players, and milestone events are more likely to fire during garbage time

Blowouts are when secondary characters get their stories.
