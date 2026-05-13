---
title: Hoop Dynasty - Design Notes
---

A meta-document tracking the state of the design process. This records resolved tensions and resolved questions — the decisions that are locked in and should not be revisited without deliberate reason.

For active unresolved items (conflicts, open questions, and next steps) see [meta/2-backlog.md](./backlog.md).

---

## 1. Resolved Tensions

Core design tensions that were debated and settled. Each resolution is load-bearing — downstream design depends on it.

| Tension | Resolution |
|---|---|
| Single protagonist (RPG) vs. ensemble franchise | Coach is protagonist + anchor; players and league are ensemble. The coach's decisions produce the stories; the players and events are the cast. |
| Timing pressure vs. card economy skill | Timing creates urgency and engagement; economic card decisions are the actual skill. The two coexist. |
| Casual sessions vs. deep engagement | Fixed 5-step post/pre-game sequence with one context-gated decision slot. Constrained menu makes each decision meaningful without overwhelming. |
| Roguelite resets vs. narrative attachment | Roster resets emerge naturally from realistic basketball logic (contracts, aging, injury). Coach identity, rivalries, and league history persist across seasons. |
| Blowouts as dead time vs. meaningful play | Blowouts are a distinct mode: bench development + elevated story event probability. Fast, not absent. |
| Opponent scheme visibility vs. scouting value | Formation always visible; hidden bonuses (synergy, rotation tendencies, bench patterns) revealed only through scouting or experience. |
| Identity card accumulation vs. run freshness | Collect ~20; slot only 3 per season; full library available but always constrained. |

---

## 2. Resolved Questions

Design questions that were open and are now decided. Cross-references updated to new doc paths.

| Question | Resolution |
|---|---|
| Role assignment mechanics | 10-tag offensive role vocabulary. Auto-assigned in V1; manually overridable later. Morale mismatch detected by `role_mismatch()` returning `games_left_until_crisis`. Defensive roles follow the same model. See [mechanics/3-roles.md](../4-mechanics/3-roles.md). |
| Contract resolution detail | Accept/decline driven by morale, rival interest (Heat-history-based), and role match. Negotiation via cards that shift function inputs (one pass per player per chapter). Counter offers are one-round narrative events. See [mechanics/5-contract-resolution.md](../4-mechanics/5-contract-resolution.md). |
| Rivalry cap | Max 2 active rivalries per team. New rivalries displace the oldest or least-intense existing rivalry when the cap is reached. See [structure/2-league-simulation.md](../2-structure/2-league-simulation.md). |
| Team archetype evolution | Archetype re-evaluated at the start of every season by re-running the archetype assignment function on the current roster. No special trigger — evolves naturally with roster changes. Mid-season archetype changes do not occur. See [structure/2-league-simulation.md](../2-structure/2-league-simulation.md). |
| Situation card carry-over at season end | Relationship-tagged situation cards survive the season reset if the linked player is retained (cap: 3, additive). Cards expire when the player leaves. Coach–Player and Player–Player relationship records persist indefinitely; synergies re-activate on reunion. See [mechanics/4-relationships.md](../4-mechanics/4-relationships.md). |
| Attribute and tag interaction model | 15 attributes across 5 domains (Scoring, Defense, Rebounding, Athleticism, Playmaking). Tags handle IQ, behavioral, specialisation, durability, and role traits. See [mechanics/2-player-model.md](../4-mechanics/2-player-model.md) and [reference/2-tag-vocabulary.md](../5-reference/2-tag-vocabulary.md). |
| Draft and rookie scouting loop | Annual draft class + persistent free agent pool. Progressive reveal scouting via between-game decision slot. Draft event UI deferred. See [mechanics/6-draft-and-scouting.md](../4-mechanics/6-draft-and-scouting.md). |
| Defensive simulation | Mirror model with weighted scoring function, defensive response vocabulary, and proximity function. See [mechanics/1-simulation-model.md](../4-mechanics/1-simulation-model.md) §7. |
| Defensive role tags and schemes | 7-tag defensive role vocabulary. Defensive IQ tags (`defensive-gambler` / `defensive-conservative`). 6 named defensive schemes. See [mechanics/3-roles.md](../4-mechanics/3-roles.md) §2 and [reference/3-scheme-vocabulary.md](../5-reference/3-scheme-vocabulary.md). |
| Fatigue model | Accumulation function, recovery schedule, display thresholds. See [mechanics/1-simulation-model.md](../4-mechanics/1-simulation-model.md) §6. |
| League simulation depth | Output-driven sim: standings, player movements (contracts/waivers/signings only — no trades), team trajectories, notable events. Archetype-driven rival teams with dynamic event layer. Rivalries: pre-generated + emergent. See [structure/2-league-simulation.md](../2-structure/2-league-simulation.md). |
| Off-season | 7-chapter guided sequence (Coaching Contract → Season Debrief → Contract Resolution → Draft → Free Agent Signing → Roster Construction → Pre-Season Setup). Reputation-based influence tiers (`New Coach` / `Established Coach` / `Franchise Coach`) govern card economy. Prestige vs. control tension in contract offers. See [loops/3-off-season.md](../3-loops/3-off-season.md). |
