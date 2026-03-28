---
title: Game Concept
---

This document captures the core game concept as resolved through a structured design interview. It supersedes all earlier open questions on genre and mechanics. The narration system defined in [3-storyline.md](3-storyline.md) remains in full effect and is not repeated here — this document addresses only the mechanical and structural layer.

---

## 1. Genre Identity

**Primary genre: Basketball Coaching Roguelite.**

The game is a roguelite first. The season is the run. The coaching career is the meta-progression. The card systems (coaching toolkit, player development) are features of the roguelite, not the primary genre framing.

> *"A basketball coaching roguelite — build your roster and coaching toolkit across seasons, manage your team through live card-based crisis moments, and watch unique stories emerge from every run."*

Secondary genre influences, in order of structural weight:
- **Roguelite** — season-as-run structure, meta-progression, natural roster reset through contracts/aging/injury
- **Deck Building** — card collection and hand construction for the coaching toolkit; compatible development cards per player archetype
- **Auto Battler** — the live simulation with player-driven crisis intervention; team-as-build tested against opposition
- **RPG** — coach-as-protagonist with persistent identity, narrative weight, legacy accumulation

---

## 2. The Protagonist Frame

The player is the **coach/GM** — a persistent character whose identity, reputation, and toolkit accumulate across seasons and across runs. The coach is not a neutral observer. They are a character with a philosophy, a history, and a legacy.

The team is the run. The coach is the meta-progression.

This resolves the prior tension between single-protagonist RPG focus and ensemble franchise storytelling: the coach is the anchor character, the players and the league are the ensemble. The coach's decisions are what produce the stories; the players and events are the cast.

---

## 3. The Season Structure

### 3.1 Season as Roguelite Run

Each season is a self-contained story chapter. It has a beginning (roster assembly, coaching philosophy selection), a middle (the regular season), a climax (the playoffs), and an end (contracts expire, the season's story closes). The coach persists; the roster is largely rebuilt.

**What resets at season end:**
- Most of the roster (contracts expire; players age, retire, or leave for better opportunities)
- The situation card hand (rebuilt each season through between-game decisions)
- The coach's job (not guaranteed — performance determines which offers arrive)

**What persists:**
- The coaching identity and reputation (affects free agent attraction, trade leverage, job offers)
- Identity Cards (the coaching legacy toolkit — see Section 6)
- The historical record (league lore, rivalries, narrative archive — see [3-storyline.md](3-storyline.md))
- Cross-run unlocked Identity Cards (available to future coaching runs as starting options)

### 3.2 Natural Roster Churn

Roster resets are not arbitrary permadeath. They emerge from realistic basketball conditions:
- A player at the end of their career retires
- An injury-prone player fades out of the league
- A player who didn't receive playing time won't re-sign
- A star player demands a trade or signs elsewhere for more money

The coach actively manages this: contract negotiation is a between-game action during the off-season phase. The player decides who to pursue, who to let go, and who to fight to keep. This creates natural continuity (a beloved player returning) and natural loss (a cornerstone leaving for a rival).

### 3.3 Coaching Free Agency

At season end, the coach enters their own free agency:
- **2–3 curated offers** arrive, shaped by the coach's reputation and philosophical profile (a defensive coach gets offered defense-minded teams)
- Returning to the prior team is one possible offer — not guaranteed if performance was poor
- Better teams become available as reputation grows
- A coach can see pending offers before the final games of the season, making the last week mechanically meaningful: a coach fighting for their job, or turning down a better offer out of loyalty, is a real scenario

The player can also start a new save as a different coaching identity — a fully fresh run with different starting philosophy and style.

---

## 4. The Exhibition Game Loop

### 4.1 Overview

The exhibition game is the core session unit. It is a live simulation with two active layers: a **background planning layer** (ongoing, low-urgency) and a **foreground crisis layer** (triggered, high-urgency). The player watches the simulation unfold and manages both layers simultaneously.

**Game length is emergent, not fixed.** It is determined by the quality gap between the two teams:
- Blowout (large skill differential): 2–4 minutes, few crisis windows
- Competitive regular season game: 4–7 minutes, moderate crisis density
- Playoff game: 6–10 minutes, higher base crisis density due to better-prepared opponents
- Finals: 8–12 minutes, maximum crisis density, more situation cards available

There is no skip and no auto-resolve. Every game is played. Blowouts are fast, not absent.

### 4.2 The Simulation Model

The game uses a **possession-level simulation** decoupled from the presentation clock.

#### Simulation granularity

Each possession resolves as a discrete unit. The outcome is attributed to 1–2 primary players and tagged with the play type that produced it:

- **Outcome types:** scored, missed shot, turnover, foul drawn, defensive stop
- **Primary attribution:** the player who took the shot, turned it over, made the defensive stop, etc.
- **Secondary attribution** (optional): screener, assister, help defender
- **Play type tag:** `iso`, `pick-and-roll`, `post-up`, `transition`, `spot-up`, `cut`, etc.

This resolution level is sufficient to drive all derived indicators — Heat, matchup line pulses, crisis triggers, scheme interactions — without requiring per-dribble or per-pass tracking.

#### Decoupled presentation clock

The simulation resolves possessions instantly. A separate presentation layer paces the display:

- **Baseline pace:** approximately 1 possession per 4–8 seconds of screen time
- **Blowouts** compress faster — shorter pauses between outcomes, less narration per event
- **Tight games** stretch — more commentary, more crisis windows, slower pace
- **High-drama events** (buzzer-beaters, flagrants, momentum swings) receive additional presentation weight regardless of game state

Crisis windows work by the presentation layer **slowing or pausing** the possession clock to give the player time to respond. The simulation does not stop — the window is a presentation-layer gate, not a simulation pause.

### 4.3 Heat: Performance Indicator System

Heat is the primary per-player performance indicator. It is a rolling signal of recent in-game performance, displayed as three visible states: **Cold**, **Neutral**, and **Hot**.

#### Signal production

Heat is computed as a rolling weighted score across the **last 5 possessions** for that player. Each possession event decomposes into an **action delta** (rewarding or penalising the player's decision regardless of outcome) and an **outcome delta** (rewarding or penalising what actually happened). This separation ensures a player is credited for a good shot that happened to miss, and penalised for a bad shot that happened to go in.

**Offensive events:**

| Event | Delta | Notes |
|---|---|---|
| Good shot taken (open, quality look) | +0.5 | Action credit — rewards shot selection |
| Bad shot taken (contested, low quality) | -0.5 | Action penalty — punishes poor decisions |
| Shot made | +1 | Outcome reward |
| Shot missed | -1 | Outcome cost |
| Assist | +1 | Equivalent to making a shot |
| Offensive rebound | +1 | Protects or generates a possession |
| Turnover (own) | -1.5 | Costs a possession |

Net examples: good shot made = **+1.5**; good shot missed = **-0.5**; bad shot made = **+0.5**; bad shot missed = **-1.5**

**Defensive events:**

| Action | Action delta | Outcome | Outcome delta | Combined |
|---|---|---|---|---|
| Good positioning | +0.5 | Stop | +1 | **+1.5** |
| Good positioning | +0.5 | Scored on | -1 | **-0.5** |
| Bad positioning | -0.5 | Stop | +1 | **+0.5** |
| Bad positioning | -0.5 | Scored on | -1 | **-1.5** |
| Good shot contest | +0.5 | Forced miss | +1 | **+1.5** |
| Good shot contest | +0.5 | Made anyway | -1 | **-0.5** |
| No/bad contest | -0.5 | Missed anyway | +1 | **+0.5** |
| No/bad contest | -0.5 | Open look made | -1 | **-1.5** |
| Steal | +0.5 (action) + 1.5 (forced TO) | — | — | **+2** |
| Block (own team recovers) | +0.5 (action) + 1.5 (possession secured) | — | — | **+2** |
| Block (out of bounds) | +0.5 (action) + 1 (stop) | — | — | **+1.5** |
| Defensive rebound | +1 | — | — | **+1** |

**Foul events:**

| Event | Delta | Notes |
|---|---|---|
| Foul drawn (offensive) | +1 | Good action + earned free throws |
| Tactical foul (deliberate, correct decision) | 0 | Net neutral — smart team play |
| Careless / reaching foul | -1.5 | Matches turnover cost |
| Flagrant / technical | -2 | Composure failure |

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

### 4.4 The Court Display

The primary visual surface is a **static 5v5 card formation**:
- Ten player cards (5 per side), displayed in a slightly tilted/rotated layout to create an illusion of depth
- Cards face each other; matchup lines connect directly opposed players
- The formation reflects the **active scheme** of each team: a 5-out offense spaces the cards differently than a post-up set; a zone defense clusters the defensive cards differently than man-to-man
- The display is a permanent coaching panel, not an animation — only indicators animate

**Live indicators on each card:**
- Fatigue bar (bleeds into card border as the game progresses)
- Foul count
- Heat (performance indicator — see §4.3)
- Matchup line pulse (activates when a matchup is being exploited or a defensive mismatch is active)
- Crisis indicator (glows when a crisis event is tied to that player)

**Ball indicator:** A glowing marker rests on the attacking side's formation to indicate possession. Possession changes flip the indicator. No physical card movement is required.

### 4.5 The Background Planning Layer

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

### 4.6 The Crisis Layer

**What triggers a crisis window:**
- Momentum swings (opponent goes on a 7-2 run)
- Foul trouble on a key player
- Injury or health scare
- Hot hand on either side requiring response
- End-of-quarter or end-of-half decision points
- Late-game close-score situations

**What the window looks like:**
A visual and audio signal marks the opening of a crisis window. The window has a timing component — it closes if the player doesn't respond, just as a real coaching opportunity closes when the possession ends. The window is long enough for a deliberate player to always respond; its purpose is to keep engagement, not to punish reaction time. An experienced coach (higher reputation, specific Identity Cards) can see signals one possession earlier, effectively widening their response window.

**What the player does in a crisis:**
The player responds using their **situation card hand** (5 cards selected pre-game from their season pool of ~15–20). Options include:
- Playing a situation card (a tactical response specific to the crisis type)
- Calling a timeout (limited resource — forces a pause, allows a rotation adjustment, optionally lets the player select a replacement crisis card from a small reserve)
- Making a free rotation adjustment without spending a card (lower-impact, always available)

Timeouts are a limited economy: spending one early saves a crisis, but the fourth quarter with no timeouts left is a real consequence. The economic decision (which card to spend, whether to burn a timeout for more options) is the primary skill of the crisis layer.

### 4.7 Blowouts as a Distinct Mode

Blowouts are not lesser games — they are a different mode:
- **Garbage time signal:** When a game reaches blowout territory, a visual signal indicates the coach can safely experiment
- **Star resting:** Resting stars costs nothing; they recharge faster and reduce injury risk
- **Bench development:** Bench players getting extended garbage-time minutes accumulate development opportunities — a rookie's first extended run can trigger a `late-bloomer` narrative event
- **Opponent bench scouting:** The opponent's bench rotation becomes visible in blowouts, revealing intel unavailable in tight games
- **Elevated story event probability:** Chemistry moments, breakout performances by secondary players, and milestone events are more likely to fire during garbage time

Blowouts are when secondary characters get their stories.

---

## 5. The Between-Game Layer

### 5.1 Structure

After each game, and before the next, the player moves through a **fixed short sequence** with one meaningful decision slot. This is the casual layer — completable in under 5 minutes — with the open hub always available for deeper engagement.

**Fixed sequence:**
1. **Postgame summary** — key narrative flashes from the narrator voices; injury and fatigue flags; development events that fired
2. **Roster check** — one visible urgent item (injured player, chemistry event, player morale flag)
3. **One free decision** — a single contextually gated action (see 5.2)
4. **Opponent scouting preview** — partial view of the next opponent's visible formation and known players
5. **Pre-game setup** — select 5 situation cards for the game hand; confirm rotation queue; set opening scheme

### 5.2 The Context-Gated Decision

The one free decision is not always the same menu. Available options are determined by the current season phase and events:

| Context | Available actions |
|---|---|
| Regular season, healthy roster | Training session, film room scouting, development card application |
| Player injured | Healing/recovery card, rest decision, emergency signing |
| Free agency period | Sign free agents, contract negotiations, trade offers |
| Pre-draft period | Draft scouting, prospect development |
| Post-blowout win | Bonus development opportunity (bench player who performed) |
| Pre-playoff | Extra scouting action, scheme refinement |

The constrained menu makes each decision meaningful. The player cannot do everything — they must choose.

### 5.3 Scouting and Information Decay

**Own scheme:** Always fully visible. The player chose it.

**Opponent formation:** Always visible on the court display. The player can see the scheme shape.

**Opponent's hidden information** (specific synergy bonuses, rotation tendencies, bench patterns): Revealed only through:
- Prior film room scouting (between-game action)
- Experience from previous games against this team — the more times you've played a team, the more information is automatically revealed
- Specific scouting cards in the situation hand ("Film Room Read")

**Stale scouting is a real risk:** A team that traded away their aging franchise player mid-season has a different scheme profile than their earlier scouting report suggested. Meeting a familiar opponent in the playoffs after a major roster change is a genuine surprise and challenge.

---

## 6. The Card Systems

Three distinct card types share a unified visual language. All cards look like cards; their type and tier determine their function.

### 6.1 Player Cards (Dossiers)

Player cards are not played from a hand. They are persistent objects representing a player:
- Narrative tags (from the tag vocabulary in [3-storyline.md](3-storyline.md))
- Attributes and archetype
- Career history and relationship tags
- Compatibility flags (which development cards are valid for this player)

Player cards appear on the court display, in the roster screen, and in the historical record. Discovering a player through scouting reveals their card — a moment of genuine exploration and collection. The card's art and presentation reflect the player's archetype, making the roster visually readable at a glance.

### 6.2 Situation Cards (Coaching Crisis Hand)

The coaching toolkit for in-game crisis management:
- Rebuilt each season through between-game decisions (training sessions, film room work, scouting reports, narrative events)
- ~15–20 owned per season; 5 selected pre-game as the active hand
- Reset at season end
- Examples: "Ice the Shooter," "Second Wind," "Film Room Read," "Locker Room Speech," "Ankle Treatment," "Switch the Scheme"

Situation cards are what the coaching philosophy looks like in practice. A defensive coach who built their season toolkit differently has different crisis options than a pace-and-space coach.

### 6.3 Development Cards (Player Power-Ups)

Applied between games to individual players:
- Compatible with specific player types and archetypes only (a `positionless-forward` can use development cards a `3d-specialist` cannot, and vice versa)
- Create the core tension: invest in developing an existing player, or trade them for a new one who fits the roster better
- Examples: "Elite Shooting Camp," "Defensive Footwork Drills," "Mentorship" (requires a veteran player on the roster), "New Shoes" (reduces injury risk for one season), "Film Study" (reveals a hidden player tag)
- Some development cards are compatible with multiple archetypes; the most powerful are narrowly specific

### 6.4 Identity Cards (Coaching Legacy)

The persistent meta-progression layer:
- Collected across seasons and runs through legacy achievements
- Up to ~20 owned across a coaching career
- **Only 3 can be slotted per season** — selected at the start of each season, locked for its duration
- Persist across seasons and are available in new runs from the same coaching career
- Cross-run unlocks (from prior save files) are available as starting options in new runs
- Examples: "Player Whisperer" (once per season, retain a player who would otherwise leave), "System Prophet" (unlocks a unique scheme), "Clutch Caller" (crisis window visible one possession earlier), "The Eye" (one free hidden player tag revealed per draft pick)

Identity Cards replace each other as the coach evolves — the library of 20 allows meaningful selection of 3, not unlimited accumulation of power.

---

## 7. Resolved Design Tensions

| Tension | Resolution |
|---|---|
| Single protagonist (RPG) vs. ensemble franchise | Coach is protagonist + anchor; players and league are ensemble |
| Timing pressure vs. card economy skill | Timing creates urgency and engagement; economic card decisions are the actual skill |
| Casual sessions vs. deep engagement | Fixed 5-step post/pre-game sequence for casual; open hub always available for depth |
| Roguelite resets vs. narrative attachment | Roster resets naturally (contracts, aging); coach identity, rivalries, and league history persist |
| Blowouts as dead time vs. meaningful play | Blowouts are a distinct mode: development sessions + elevated story event probability |
| Opponent scheme visibility vs. scouting value | Formation always visible; hidden bonuses revealed only through scouting or experience |
| Identity card accumulation vs. run freshness | Collect ~20; slot only 3 per season; full library available but always constrained |

---

## 8. Open Questions

| Question | Notes |
|---|---|
| Situation card reset mechanism at season end | Do some situation cards carry over (earned through player relationships)? Decision deferred. |
| Draft and rookie scouting loop | The discovery mechanic for new players needs its own design session. |
| League simulation depth | How much does the rest of the league simulate between games? Rival teams need enough depth to produce the rival franchise stories from [3-storyline.md](3-storyline.md). |
| Multiplayer or single-player only | Document 2 notes single-player focus; no decision required now but should be explicitly deferred rather than assumed. |
| Platforms | Not addressed. Casual session length and card visual language suggest mobile viability alongside desktop. |
