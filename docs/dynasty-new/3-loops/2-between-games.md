---
title: Hoop Dynasty - The Between-Game Layer
---

After each game, and before the next, the player moves through a **fixed short sequence** with one meaningful decision slot. The sequence is completable in under 5 minutes.

**Related docs:**
- [loops/1-game-loop.md](./game-loop.md) — what happens during the game
- [loops/3-off-season.md](./off-season.md) — the extended decision sequence between seasons
- [structure/1-card-systems.md](../2-structure/1-card-systems.md) — situation cards and development cards
- [mechanics/6-draft-and-scouting.md](../4-mechanics/6-draft-and-scouting.md) — scouting mechanics

---

## 1. Structure

**Fixed sequence:**
1. **Postgame summary** — key narrative flashes; injury and fatigue flags; development events that fired
2. **Roster check** — one visible urgent item (injured player, chemistry event, player morale flag)
3. **One free decision** — a single contextually gated action (see §2)
4. **Opponent scouting preview** — partial view of the next opponent's visible formation and known players
5. **Pre-game setup** — select 5 situation cards for the game hand; confirm rotation queue; set opening scheme

---

## 2. The Context-Gated Decision

The one free decision is not always the same menu. Available options are determined by the current season phase and events:

| Context | Available actions |
|---|---|
| Regular season, healthy roster | Training session, film room scouting, development card application |
| Player injured | Healing/recovery card, rest decision, emergency signing |
| Free agency period | Sign free agents, contract negotiations |
| Pre-draft period | Draft scouting, prospect development |
| Post-blowout win | Bonus development opportunity (bench player who performed) |
| Pre-playoff | Extra scouting action, scheme refinement |

The constrained menu makes each decision meaningful. The player cannot do everything — they must choose.

> **Conflict:** How the one-slot economy relates to the off-season chapter action counts (1 / 2–3 / 4+ scouting actions by influence tier) is never defined. See backlog item H11.
> **Open:** How new situation cards enter the pool mid-season through this slot is not defined. See backlog item M5.
> **Open:** The injury system (severity, games missed, emergency signing flow) is a stub. See backlog item H9 and NS2.

---

## 3. Scouting and Information Decay

**Own scheme:** Always fully visible. The player chose it.

**Opponent formation:** Always visible on the court display. The player can see the scheme shape.

**Opponent's hidden information** (specific synergy bonuses, rotation tendencies, bench patterns): Revealed only through:
- Prior film room scouting (between-game action)
- Experience from previous games against this team — the more times you've played a team, the more information is automatically revealed
- Specific scouting cards in the situation hand ("Film Room Read")

**Stale scouting is a real risk:** A team that made a major roster change mid-season has a different scheme profile than their earlier scouting report suggested. Meeting a familiar opponent in the playoffs after a major roster change is a genuine surprise and challenge.

> **Conflict:** `scouting_knowledge` is used as a live numeric input in the defensive scoring function, but the scouting system produces card reveals, not a continuous value. No conversion layer is defined. See backlog item H6.
> **Open:** "Film Room Read" card — activation conditions and what exactly it reveals are undefined. See backlog item L4.
