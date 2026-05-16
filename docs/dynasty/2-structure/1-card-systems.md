---
title: Hoop Dynasty - The Card Systems
---

Four distinct card types share a unified visual language. All cards look like cards; their type and tier determine their function.

For the visual language design (art style, layout, tier indicators) see backlog item Q10.

**Related docs:**
- [mechanics/2-player-model.md](../4-mechanics/2-player-model.md) — player attributes, tags, and archetypes
- [mechanics/4-relationships.md](../4-mechanics/4-relationships.md) — how relationship tags unlock carry-over situation cards
- [loops/2-between-games.md](../3-loops/2-between-games.md) — when and how development cards are applied
- [loops/3-off-season.md](../3-loops/3-off-season.md) — pre-season setup: slotting Identity Cards, building the situation card pool
- [reference/2-tag-vocabulary.md](../5-reference/2-tag-vocabulary.md) — full tag vocabulary

---

## 1. Player Cards (Dossiers)

Player cards are not played from a hand. They are persistent objects representing a player:
- Narrative tags (from the tag vocabulary — see `../brainstorming/3-storyline.md` and backlog item M7)
- Attributes and archetype
- Career history and relationship tags
- Compatibility flags (which development cards are valid for this player)

Player cards appear on the court display, in the roster screen, and in the historical record. Discovering a player through scouting reveals their card — a moment of genuine exploration and collection. The card's art and presentation reflect the player's archetype, making the roster visually readable at a glance.

> **Open:** Player archetype vocabulary is not yet formally defined. See backlog item M2 and NS4.

---

## 2. Situation Cards (Coaching Crisis Hand)

The coaching toolkit for in-game crisis management:
- Rebuilt each season through between-game decisions (training sessions, film room work, scouting reports, narrative events)
- ~15–20 owned per season; 5 selected pre-game as the active hand
- Reset at season end — with one exception (see Relationship-tagged carry-over below)
- Examples: "Ice the Shooter," "Second Wind," "Film Room Read," "Locker Room Speech," "Ankle Treatment," "Switch the Scheme"

Situation cards are what the coaching philosophy looks like in practice. A defensive coach who built their season toolkit differently has different crisis options than a pace-and-space coach.

**Relationship-tagged carry-over:** When a player earns a Coach–Player relationship tag (e.g. `trusted-veteran`, `locker-room-anchor`), it may unlock a relationship-tagged situation card specific to that player. If that player is still on the roster at the start of the following season, the card carries over into the new season's owned pool. If the player leaves, the card expires. Up to 3 relationship-tagged cards may carry over at season start. Carry-over cards are **additive** — they expand the season pool beyond the normal rebuild. See [mechanics/4-relationships.md](../4-mechanics/4-relationships.md).

> **Conflict:** Whether Elite player–player synergy cards count against the same 3-card cap is unresolved. See backlog item M10.
> **Conflict:** The "additive" rule is only stated explicitly in `mechanics/4-relationships.md` — needs to be consistent across docs. See backlog item M11.
> **Open:** How new situation cards enter the pool mid-season is not defined. See backlog item M5.
> **Open:** "Film Room Read" card — activation conditions, what it reveals, and interaction with scouting are undefined. See backlog item L4.
> **Open:** "Available pool" vs. "owned pool" vs. "season working set" terminology is inconsistent. See backlog item L1.

---

## 3. Development Cards (Player Power-Ups)

Applied between games to individual players:
- Compatible with specific player types and archetypes only (a `positionless-forward` can use development cards a `3d-specialist` cannot, and vice versa)
- Create the core tension: invest in developing an existing player, or let them go for a new one who fits the roster better
- Examples: "Elite Shooting Camp," "Defensive Footwork Drills," "Mentorship" (requires a veteran player on the roster), "New Shoes" (reduces injury risk for one season), "Film Study" (reveals a hidden player tag)
- Some development cards are compatible with multiple archetypes; the most powerful are narrowly specific

**Timing:** Development cards applied mid-season via the between-game decision slot grant **temporary boosts** lasting a defined number of games. Permanent attribute changes occur only via development cards applied between seasons (during the off-season). See [loops/2-between-games.md](../3-loops/2-between-games.md) and [mechanics/2-player-model.md](../4-mechanics/2-player-model.md).

> **Conflict:** This permanent/temporary distinction was not explicitly stated in the original docs. See backlog item M8.

---

## 4. Identity Cards (Coaching Legacy)

The persistent meta-progression layer:
- Collected across seasons and runs through legacy achievements
- Up to ~20 owned across a coaching career
- **Only 3 can be slotted per season** — selected at the start of each season, locked for its duration
- Persist across seasons and are available in new runs from the same coaching career
- Cross-run unlocks (from prior save files) are available as starting options in new runs
- Examples: "Player Whisperer" (once per season, retain a player who would otherwise leave), "System Prophet" (unlocks a unique scheme), "Clutch Caller" (crisis window visible one possession earlier), "The Eye" (one free hidden player tag revealed per draft pick)

Identity Cards replace each other as the coach evolves — the library of ~20 allows meaningful selection of 3, not unlimited accumulation of power.

> **Open:** Whether cross-save inheritance can push the combined Identity Card pool above ~20 is not addressed. See backlog item L2.
