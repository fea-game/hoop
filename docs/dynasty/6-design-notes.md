---
title: Hoop Dynasty - Design Notes
---

## 1. Resolved Tensions

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

## 2. Open Questions

| Question | Notes |
|---|---|
| Situation card reset mechanism at season end | Do some situation cards carry over (earned through player relationships)? Decision deferred. |
| Draft and rookie scouting loop | The discovery mechanic for new players needs its own design session. |
| League simulation depth | How much does the rest of the league simulate between games? Rival teams need enough depth to produce the rival franchise stories from [3-storyline.md](../brainstorming/3-storyline.md). |
| Multiplayer or single-player only | Document 2 notes single-player focus; no decision required now but should be explicitly deferred rather than assumed. |
| Platforms | Not addressed. Casual session length and card visual language suggest mobile viability alongside desktop. |
| Attribute and tag interaction model | How attributes are defined, scaled, and combined with tags to derive player fit values. Deferred to its own design session. |
| Defensive simulation | Resolved. Mirror model with weighted scoring function, defensive response vocabulary, and proximity function. See §1.2 — Defensive simulation in [3-game-loop.md](./3-game-loop.md). |
| Fatigue model | Resolved. Accumulation function, recovery schedule, display thresholds. See §1.2 — Fatigue model in [3-game-loop.md](./3-game-loop.md). |
| Play type action budgets | Base shot clock budget per play type (e.g. transition vs. half-court set). Interface supports variable budgets from day one; calibration deferred. |
