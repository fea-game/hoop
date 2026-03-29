---
title: Hoop Dynasty - Relationships
---

The relationship system tracks history between three parties: **Coach–Player**, **Player–Player**, and (in future phases) **Coach–Coach**. Relationships are longer-lived than a single contract or season — they accumulate, persist through roster changes, and re-activate on reunion.

The current implementation is intentionally simple. The data model is designed from the start to support richer expressions without requiring a rewrite.

---

## 1. Relationship Axes

### 1.1 Coach–Player Relationships

Built through repeated interaction over seasons: mentorship, high-stakes moments, development investment, loyalty decisions during the off-season.

A Coach–Player relationship records:
- **History log** — seasons shared, key narrative events (e.g. "gave him the starting role," "retained him when a contender came calling," "benched him for the playoffs")
- **Trust level** — a discrete tier: `None` / `Developing` / `Established` / `Deep`
- **Relationship tags** — contextual labels that fire at simulation nodes or in crisis events (e.g. `trusted-veteran`, `mentored-rookie`, `locker-room-anchor`, `development-project`)

Relationship tags are earned; they are not assigned at player creation. They emerge from play.

Trust level is **not reset** when a player leaves. If the player returns to the roster in a future season, the trust level is restored from the recorded history — with a possible decay modifier if significant time has passed.

### 1.2 Player–Player Synergies

Built through time on the court together: shared possessions, clutch moments, successful play execution, and narrative events (road trip conversations, practice chemistry, on-court conflict).

A Player–Player relationship records:
- **Shared history log** — seasons played together, significant on-court events
- **Synergy level** — a discrete tier: `None` / `Building` / `Established` / `Elite`
- **Synergy tags** — contextual labels expressing the nature of the chemistry (e.g. `pick-and-roll-partners`, `defensive-anchor-pair`, `locker-room-rivalry`, `mentor-pupil`)

**Crucially: synergy history persists even after a player leaves the roster.** If the two players are reunited — regardless of which team or season — the synergy level re-activates from stored history rather than rebuilding from scratch. This is the "LeBron–Wade" rule: that chemistry existed, and it does not disappear from the record.

Synergy is bidirectional (Player A ↔ Player B). Conflict relationships are also valid synergy entries with negative polarity.

---

## 2. Data Model (Interface Contract)

The following fields must be present in the relationship record regardless of current implementation depth. Fields not yet used by the simulation are stored and reserved.

### Coach–Player Record

```
coach_player_relationship {
  coach_id          // persistent across saves
  player_id         // persistent across runs
  trust_level       // enum: none | developing | established | deep
  relationship_tags // list of tag identifiers
  history_log       // list of { season, event_type, event_detail }
  last_shared_season
  decay_eligible    // bool: can trust decay if seasons apart > threshold
}
```

### Player–Player Record

```
player_player_relationship {
  player_a_id
  player_b_id
  synergy_level      // enum: none | building | established | elite
  synergy_tags       // list of tag identifiers (may include negative-polarity tags)
  polarity           // positive | negative | mixed
  history_log        // list of { season, event_type, event_detail }
  last_shared_season
  reactivation_eligible // bool: true if either player is on current roster
}
```

These records are written even when the simulation does not yet query them. The interface contract is fixed; calibration and behavioral depth are deferred.

---

## 3. Carry-Over Situation Cards

Relationship tags on the **Coach–Player** axis are the mechanism for situation card carry-over across seasons.

**Rule:**
- When a player earns a relationship tag during a season, it may unlock a **relationship-tagged situation card** specific to that player (e.g. `trusted-veteran` → "Trust the Veteran"; `locker-room-anchor` → "Anchor Call").
- If that player is still on the roster at the start of the next season, the linked card carries over into the new season's owned situation card pool.
- If the player leaves, the card expires. It does not carry over to the next roster.
- **Cap: 3 relationship-tagged cards maximum in the carry-over pool at season start.**

This is the only exception to the full season-end situation card reset.

The carry-over pool is additive: if a coach carries over 3 relationship cards, they start with those 3 plus the normal seasonal rebuild. If they carry over 0, the seasonal rebuild is unchanged.

---

## 4. Player–Player Synergy Effects (Current Scope)

Player–Player synergies are recorded from day one. Current simulation effects are intentionally minimal:

| Synergy Level | Effect |
|---|---|
| `None` | No effect. |
| `Building` | Minor probability bonus on play types matching the synergy tag (e.g. `pick-and-roll-partners` gives a small bonus on pick-and-roll actions). |
| `Established` | Meaningful bonus. Eligible to fire narrative events referencing the relationship. |
| `Elite` | Significant bonus. Unlocks synergy-specific situation cards (analogous to relationship-tagged coach–player cards). Elevated narrative event probability. |

Negative-polarity synergies (conflict tags) apply maluses at equivalent levels.

---

## 5. Open Questions

| Question | Notes |
|---|---|
| Trust decay rate | After how many seasons apart does trust begin to decay, and at what rate? Deferred to calibration pass. |
| Synergy accumulation speed | How many shared possessions / seasons does it take to advance a level? Deferred to simulation calibration. |
| Conflict resolution | Can a conflict relationship be repaired? Mechanism undefined. Deferred. |
| Coach–Coach relationships | Rival coaches as persistent entities with relationship history (grudges, respect). Not in scope for current phase — data model does not yet include this axis. |
| Reunion narrative events | Specific story events triggered on player reunion (e.g. the returning star, the mentor and pupil reunited). Story event pool not yet designed for this axis. |
