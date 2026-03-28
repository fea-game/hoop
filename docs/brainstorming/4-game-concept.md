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

### 4.2 The Court Display

The primary visual surface is a **static 5v5 card formation**:
- Ten player cards (5 per side), displayed in a slightly tilted/rotated layout to create an illusion of depth
- Cards face each other; matchup lines connect directly opposed players
- The formation reflects the **active scheme** of each team: a 5-out offense spaces the cards differently than a post-up set; a zone defense clusters the defensive cards differently than man-to-man
- The display is a permanent coaching panel, not an animation — only indicators animate

**Live indicators on each card:**
- Fatigue bar (bleeds into card border as the game progresses)
- Foul count
- Heat (hot hand or cold streak indicator)
- Matchup line pulse (activates when a matchup is being exploited or a defensive mismatch is active)
- Crisis indicator (glows when a crisis event is tied to that player)

**Ball indicator:** A glowing marker rests on the attacking side's formation to indicate possession. Possession changes flip the indicator. No physical card movement is required.

### 4.3 The Background Planning Layer

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

### 4.4 The Crisis Layer

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

### 4.5 Blowouts as a Distinct Mode

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
