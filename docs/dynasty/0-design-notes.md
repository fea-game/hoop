---
title: Hoop Dynasty - Design Notes
---

## 1. Resolved Tensions

| Tension | Resolution |
|---|---|
| Single protagonist (RPG) vs. ensemble franchise | Coach is protagonist + anchor; players and league are ensemble |
| Timing pressure vs. card economy skill | Timing creates urgency and engagement; economic card decisions are the actual skill |
| Casual sessions vs. deep engagement | Fixed 5-step post/pre-game sequence with one context-gated decision slot; constrained menu makes each decision meaningful |
| Roguelite resets vs. narrative attachment | Roster resets naturally (contracts, aging); coach identity, rivalries, and league history persist |
| Blowouts as dead time vs. meaningful play | Blowouts are a distinct mode: development sessions + elevated story event probability |
| Opponent scheme visibility vs. scouting value | Formation always visible; hidden bonuses revealed only through scouting or experience |
| Identity card accumulation vs. run freshness | Collect ~20; slot only 3 per season; full library available but always constrained |

---

## 2. Open Questions

| Question | Notes |
|---|---|
| Player–Player synergy depth | Synergy history persists across roster changes and re-activates on reunion. Full synergy accumulation speed, decay, and conflict repair undefined. Data model interface is fixed; behavioral depth deferred. See [10-relationships.md](./10-relationships.md). |
| Reunion narrative events | Story events triggered on player reunion (returning star, mentor/pupil reunited, rival becomes teammate). Story pool for this axis not yet designed. |
| Coach–Coach relationships | Rival coaches as persistent entities with relationship history. Not in scope for current phase; data model does not include this axis yet. |
| League simulation — information delivery | How standings, events, and rivalry info reach the player. Deferred to visual design session. See [8-league-simulation.md](./8-league-simulation.md). |
| Multiplayer or single-player only | Single-player implied but not decided. Should be explicitly deferred rather than assumed. |
| Platforms | Not addressed. Casual session length and card visual language suggest mobile viability alongside desktop. |
| Play type action budgets | Base shot clock budget per play type (e.g. transition vs. half-court set). Interface supports variable budgets from day one; calibration deferred. |
| Draft event UI | Draft Board (simple) vs. Crisis-style UI (card-based, pressure). Deferred to dedicated design session. See [7-draft-and-scouting.md](./7-draft-and-scouting.md). |
| Influence tier thresholds | At what reputation scores does the coach cross from `New Coach` → `Established Coach` → `Franchise Coach`? Needs calibration once reputation scoring is designed. |
| Card visual language | All four card types share a unified visual language. Details (art style, layout, tier indicators, domain summary display) deferred to a dedicated visual design session. |

---

## 3. Resolved Questions

| Question | Resolution |
|---|---|
| Role assignment mechanics | Offensive role tags (10-tag vocabulary: `ball-handler`, `pick-and-roll-handler`, `pick-and-roll-screener`, `pick-and-pop-screener`, `handoff-screener`, `isolation-scorer`, `post-anchor`, `floor-spacer`, `cutter`, `transition-initiator`). Auto-assigned in V1; manually overridable later. Morale mismatch detected by a function returning `games_left_until_crisis`. Defensive roles deferred. See [11-role-assignment.md](./11-role-assignment.md). |
| Contract resolution detail | Accept/decline driven by morale, rival interest (Heat-history-based), and role match. Negotiation via cards that shift function inputs (one negotiation pass per player per chapter). Counter offers are one-round narrative events. See [12-contract-resolution.md](./12-contract-resolution.md). |
| Rivalry cap | Max 2 active rivalries per team. New rivalries displace the weakest existing rivalry when the cap is reached. See [8-league-simulation.md](./8-league-simulation.md). |
| Team archetype evolution | Archetype re-evaluated at the start of every season by re-running the archetype assignment function on the current roster. No special trigger — evolves naturally with roster changes. Mid-season archetype changes do not occur. See [8-league-simulation.md](./8-league-simulation.md). |
| Situation card carry-over at season end | Relationship-tagged situation cards survive the season reset if the linked player is retained (cap: 3). Cards expire when the player leaves. Coach–Player and Player–Player relationship records persist indefinitely; synergies re-activate on reunion. Data model interface fixed; depth deferred. See [10-relationships.md](./10-relationships.md). |
| Attribute and tag interaction model | 15 attributes across 5 domains (Scoring, Defense, Rebounding, Athleticism, Playmaking). Tags handle IQ, behavioral, specialisation, and durability traits. See [6-player-attributes-and-tags.md](./6-player-attributes-and-tags.md). |
| Draft and rookie scouting loop | Annual draft class + persistent free agent pool. Progressive reveal scouting via between-game decision slot. Draft event UI deferred. See [7-draft-and-scouting.md](./7-draft-and-scouting.md). |
| Defensive simulation | Mirror model with weighted scoring function, defensive response vocabulary, and proximity function. See §1.2 in [3-game-loop.md](./3-game-loop.md). |
| Defensive role tags and schemes | 7-tag defensive role vocabulary (`perimeter-stopper`, `ball-hawk`, `rim-protector`, `post-defender`, `help-defender`, `switchable-defender`, `transition-stopper`). Defensive IQ tags (`defensive-gambler` / `defensive-conservative`). 6 named defensive schemes (`protect-the-paint`, `protect-the-arc`, `pressure`, `drop-and-contain`, `switch-everything`, `zone`). See [13-defensive-schemes.md](./13-defensive-schemes.md). |
| Fatigue model | Accumulation function, recovery schedule, display thresholds. See §1.2 in [3-game-loop.md](./3-game-loop.md). |
| League simulation depth | Output-driven sim: standings, player movements (contracts/waivers/signings only — no trades), team trajectories, notable events. Archetype-driven rival teams with dynamic event layer. Rivalries: pre-generated at save start + emergent in-season. See [8-league-simulation.md](./8-league-simulation.md). |
| Off-season | 7-chapter guided sequence (Coaching Contract → Season Debrief → Contract Resolution → Draft → Free Agent Signing → Roster Construction → Pre-Season Setup). Reputation-based influence tiers (`New Coach` / `Established Coach` / `Franchise Coach`) govern card economy across chapters and in-season. Prestige vs. control tension in contract offers. See [9-off-season.md](./9-off-season.md). |
