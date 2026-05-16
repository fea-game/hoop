---
title: Hoop Dynasty - Relationships
---

The relationship system tracks history between three parties: **Coach–Player**, **Player–Player**, and (in future phases) **Coach–Coach**. Relationships accumulate, persist through roster changes, and re-activate on reunion.

The current implementation is intentionally simple. The data model is designed from the start to support richer expressions without requiring a rewrite.

**Related docs:**
- [structure/1-card-systems.md](../2-structure/1-card-systems.md) — carry-over situation cards tied to relationship tags
- [loops/3-off-season.md](../3-loops/3-off-season.md) — when relationship effects are resolved
- [mechanics/1-simulation-model.md](../4-mechanics/1-simulation-model.md) — where synergy effects should hook in (currently a gap)

---

## 1. Relationship Axes

### 1.1 Coach–Player Relationships

Built through repeated interaction: mentorship, high-stakes moments, development investment, loyalty decisions.

A Coach–Player relationship records:
- **History log** — seasons shared, key narrative events
- **Trust level** — `None` / `Developing` / `Established` / `Deep`
- **Relationship tags** — contextual labels: `trusted-veteran`, `mentored-rookie`, `locker-room-anchor`, `development-project`

Relationship tags are earned; not assigned at player creation. Trust level is **not reset** when a player leaves — it is restored from recorded history on return, with a possible decay modifier.

> **Open:** After how many seasons apart does trust begin to decay, and at what rate? See backlog item Q19.

### 1.2 Player–Player Synergies

Built through time on the court: shared possessions, clutch moments, successful play execution, narrative events.

A Player–Player relationship records:
- **Shared history log** — seasons played together, significant on-court events
- **Synergy level** — `None` / `Building` / `Established` / `Elite`
- **Synergy tags** — `pick-and-roll-partners`, `defensive-anchor-pair`, `locker-room-rivalry`, `mentor-pupil`

**Synergy history persists even after a player leaves the roster.** If the two players are reunited, the synergy level re-activates from stored history rather than rebuilding from scratch. (The "LeBron–Wade" rule.)

Synergy is bidirectional. Conflict relationships are valid synergy entries with negative polarity.

> **Open:** Synergy accumulation speed (possessions / seasons per level) is deferred to calibration. See backlog item Q1.
> **Open:** Can a conflict relationship be repaired? Mechanism undefined. See backlog item Q20.
> **Open:** Reunion narrative events (story pool for returning player moments) not yet designed. See backlog item Q2.

---

## 2. Data Model (Interface Contract)

Records are written even when the simulation does not yet query them. The interface contract is fixed; behavioral depth is deferred.

### Coach–Player Record

```
coach_player_relationship {
  coach_id
  player_id
  trust_level       // enum: none | developing | established | deep
  relationship_tags
  history_log       // list of { season, event_type, event_detail }
  last_shared_season
  decay_eligible    // bool
}
```

### Player–Player Record

```
player_player_relationship {
  player_a_id
  player_b_id
  synergy_level      // enum: none | building | established | elite
  synergy_tags       // list (may include negative-polarity tags)
  polarity           // positive | negative | mixed
  history_log        // list of { season, event_type, event_detail }
  last_shared_season
  reactivation_eligible // bool
}
```

---

## 3. Carry-Over Situation Cards

When a player earns a Coach–Player relationship tag during a season, it may unlock a **relationship-tagged situation card** specific to that player:
- If that player is still on the roster at the start of the next season, the linked card carries over into the new season's owned situation card pool
- If the player leaves, the card expires
- **Cap: 3 relationship-tagged cards maximum in the carry-over pool at season start**

The carry-over pool is **additive**: 3 carry-over cards means starting with those 3 *plus* the normal seasonal rebuild.

> **Conflict:** Whether Elite player–player synergy cards count against the same 3-card cap is unresolved. A roster with 2 elite synergies and 2 strong coach–player relationships could generate 4 eligible carry-over cards with no tie-breaking rule defined. See backlog item M10.
> **Conflict:** The additive rule is only stated explicitly here. See backlog item M11.

---

## 4. Player–Player Synergy Effects (Current Scope)

| Synergy Level | Effect |
|---|---|
| `None` | No effect. |
| `Building` | Minor probability bonus on play types matching the synergy tag. |
| `Established` | Meaningful bonus. Eligible to fire narrative events referencing the relationship. |
| `Elite` | Significant bonus. Unlocks synergy-specific situation cards. Elevated narrative event probability. |

Negative-polarity synergies apply maluses at equivalent levels.

> **Conflict:** These synergy bonuses ("probability bonuses on play types matching the synergy tag") are not reflected in the possession scoring function in `mechanics/1-simulation-model.md`. No `synergy_modifier` term exists there. See backlog item H10 and NS6.

---

## 5. Coach–Coach Relationships

Not in scope for the current phase. Data model does not yet include this axis.

> **Open:** Rival coaches as persistent entities with relationship history (grudges, respect). See backlog item Q3.
