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
| League simulation depth | How much does the rest of the league simulate between games? Rival teams need enough depth to produce the rival franchise stories from [3-storyline.md](../brainstorming/3-storyline.md). |
| Multiplayer or single-player only | Single-player implied but not decided. Should be explicitly deferred rather than assumed. |
| Platforms | Not addressed. Casual session length and card visual language suggest mobile viability alongside desktop. |
| Play type action budgets | Base shot clock budget per play type (e.g. transition vs. half-court set). Interface supports variable budgets from day one; calibration deferred. |
| Draft event UI | Draft Board (simple) vs. Crisis-style UI (card-based, pressure). Deferred to dedicated design session. See [7-draft-and-scouting.md](./7-draft-and-scouting.md). |
| Tag count limits per player | Is there a cap on how many tags a player can hold? Relevant for dossier display and Development Card balance. Deferred. |
| Card visual language | All four card types share a unified visual language. Details (art style, layout, tier indicators, domain summary display) deferred to a dedicated visual design session. |

---

## 3. Resolved Questions

| Question | Resolution |
|---|---|
| Attribute and tag interaction model | 15 attributes across 5 domains (Scoring, Defense, Rebounding, Athleticism, Playmaking). Tags handle IQ, behavioral, specialisation, and durability traits. See [6-player-attributes-and-tags.md](./6-player-attributes-and-tags.md). |
| Draft and rookie scouting loop | Annual draft class + persistent free agent pool. Progressive reveal scouting via between-game decision slot. Draft event UI deferred. See [7-draft-and-scouting.md](./7-draft-and-scouting.md). |
| Defensive simulation | Mirror model with weighted scoring function, defensive response vocabulary, and proximity function. See §1.2 in [3-game-loop.md](./3-game-loop.md). |
| Fatigue model | Accumulation function, recovery schedule, display thresholds. See §1.2 in [3-game-loop.md](./3-game-loop.md). |
