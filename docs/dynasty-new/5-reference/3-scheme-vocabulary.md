---
title: Hoop Dynasty - Scheme Vocabulary
---

The canonical reference for coaching schemes. Schemes set `scheme_weight` values across the play type or defensive response vocabulary, defining which options are prioritised and which are deprioritised.

Scheme changes have a lag — players need a possession or two to adjust. The active scheme is visible on the court display formation.

**Related docs:**
- [mechanics/1-simulation-model.md](../4-mechanics/1-simulation-model.md) — how `scheme_weight` feeds into scoring functions
- [mechanics/3-roles.md](../4-mechanics/3-roles.md) — how role tags interact with scheme fit
- [loops/1-game-loop.md](../3-loops/1-game-loop.md) §4 — background planning layer (scheme selection)

---

## Offensive Schemes

> **MISSING — Next Step NS1.** The possession generator's `scheme_weight(play_type)` function and the offensive role assignment function both depend on offensive scheme definitions. No offensive scheme vocabulary has been designed yet.
>
> This is a high-severity gap. See backlog item H8 and NS1.

Placeholder — offensive scheme vocabulary to be defined in a dedicated design session. Known named schemes referenced in other docs (not yet formally defined):

- "push pace"
- "half-court grind"
- "hero ball"
- "motion offense"

---

## Defensive Schemes

Six named defensive schemes, each defining `scheme_weight` values across the defensive response vocabulary.

---

### `protect-the-paint`

Concede the perimeter. Protect the rim at all costs. Defenders sag off perimeter players and funnel everything toward the paint. Dares the opponent to beat you with threes.

| | |
|---|---|
| Responses weighted up | `drop`, `help-and-rotate`, `sag-off` |
| Responses weighted down | `deny`, `hard-hedge`, `press` |
| Role tags rewarded | `rim-protector`, `help-defender`, `post-defender` |

---

### `protect-the-arc`

Concede the interior. Lock down the perimeter and deny three-point looks. Defenders close out hard on shooters and stay attached. Dares the opponent to drive and finish at the rim.

| | |
|---|---|
| Responses weighted up | `deny`, `stay-with-ball-handler`, `sag-off` (interior) |
| Responses weighted down | `drop`, `sag-off` (perimeter) |
| Role tags rewarded | `perimeter-stopper`, `ball-hawk`, `transition-stopper` |

---

### `pressure`

Aggressive on-ball. Force turnovers, disrupt rhythm, accept transition risk. High-energy scheme that fatigues defenders faster.

| | |
|---|---|
| Responses weighted up | `hard-hedge`, `deny`, `double-team` |
| Responses weighted down | `drop`, `sag-off`, `get-back` |
| Role tags rewarded | `perimeter-stopper`, `ball-hawk` |

---

### `drop-and-contain`

Containment-first. The primary defender stays attached; the help defender drops as a safety rather than committing. Disciplined scheme that minimises breakdown risk.

| | |
|---|---|
| Responses weighted up | `drop`, `stay-with-ball-handler`, `get-back` |
| Responses weighted down | `hard-hedge`, `double-team` |
| Role tags rewarded | `transition-stopper`, `rim-protector` |

---

### `switch-everything`

Switch all screens. Eliminate pick-and-roll advantages by trading assignments. Only viable if the resulting matchups are credible — demands versatile defenders.

| | |
|---|---|
| Responses weighted up | `switch`, `stay-with-ball-handler` |
| Responses weighted down | `hard-hedge`, `drop`, `double-team` |
| Role tags rewarded | `switchable-defender`, `perimeter-stopper` |

---

### `zone`

Area-based coverage. Defenders guard regions rather than specific players. Protects against dribble penetration, disrupts timing-dependent offenses, masks individual matchup weaknesses.

**Implementation note:** Full zone is a Later phase. The proximity function supports zone from day one via the `defensive_scheme` parameter.

| | |
|---|---|
| Responses weighted up | `help-and-rotate`, `drop`, `hedge-and-recover` |
| Responses weighted down | `stay-with-ball-handler`, `deny` (individual) |
| Role tags rewarded | `help-defender`, `switchable-defender`, `rim-protector` |

> **Open:** Zone role tags (`zone-anchor` and zone-scheme-specific role binding) not defined. Belongs to a dedicated zone scheme design session. See backlog item Q25.
