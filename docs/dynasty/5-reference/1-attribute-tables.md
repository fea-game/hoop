---
title: Hoop Dynasty - Attribute Tables
---

The 15 player attributes, organized by domain. Each attribute has a direct mechanical role in the simulation — if a change in the value cannot change a simulation outcome, it should not be an attribute.

Attributes are continuous numeric values on a **1–100 scale**.

For how attributes feed into scoring functions see [mechanics/1-simulation-model.md](../4-mechanics/1-simulation-model.md). For attribute mutability (development cards, permanent vs. temporary changes) see [mechanics/2-player-model.md](../4-mechanics/2-player-model.md). For derived domain summary scores see [mechanics/2-player-model.md](../4-mechanics/2-player-model.md) §1.

---

## Scoring (5 attributes)

| Attribute | Simulation Role |
|---|---|
| `Three-Point` | Shot probability for attempts beyond the arc |
| `Mid-Range` | Shot probability for pull-ups, post fadeaways, elbow jumpers |
| `Free Throw` | Resolution of foul shots; enables intentional-foul tactics late in game |
| `Close Range` | Non-dunking interior buckets — floaters, runners, short pull-ups |
| `Finishing` | Rim attempts (layups, dunks); contested vs. `Block` and `Inside Defense` |

---

## Defense (4 attributes)

| Attribute | Simulation Role |
|---|---|
| `Perimeter Defense` | On-ball coverage in isolation and pick-and-roll; closing out on shooters; shot contest penalty on mid-range and three-point attempts |
| `Inside Defense` | Interior help defense, post defense, rim protection |
| `Steal` | Active hands in passing lanes and on-ball pressure; feeds the turnover branch |
| `Block` | Shot contest outcome at the rim; applies to `Finishing` and `Close Range` attempts only — mid-range contests are governed by `Perimeter Defense` |

---

## Rebounding (2 attributes)

| Attribute | Simulation Role |
|---|---|
| `Offensive Rebounding` | Second-chance possession probability; interacts with scheme decisions (crash vs. transition defense) |
| `Defensive Rebounding` | Reduces opponent second-chance probability; affects total possession count per game |

---

## Athleticism (2 attributes)

| Attribute | Simulation Role |
|---|---|
| `Speed` | Transition offense and defense, defensive recovery, fast break probability, press resistance |
| `Strength` | Post-up position resolution, rebounding contests in traffic, screen-setting effectiveness |

---

## Playmaking (2 attributes)

| Attribute | Simulation Role |
|---|---|
| `Ball Handling` | Pick-and-roll ball-handler resolution, isolation, press break, turnover risk on dribble-heavy actions |
| `Passing` | Kick-out reads, skip passes, drive-and-dish quality; interacts with IQ tags on decision-quality nodes |

---

## Deliberately Excluded

| Considered | Why excluded |
|---|---|
| Verticality | Redundant — expressed by `Block`, `Finishing`, `Offensive Rebounding`, and the `dunker` tag |
| Durability | Expressed entirely through tags (`injury-prone`, `iron-man`, `high-motor`). A numeric attribute creates a dump-stat problem. |
| IQ | Expressed through context-specific IQ tags. See [reference/2-tag-vocabulary.md](./2-tag-vocabulary.md) §2. |

---

## Open Items

> **Open:** Attribute scaling and calibration — base values per archetype, growth curves, min/max ceilings per tag interaction. Needs a calibration pass once the simulation engine is prototyped. See backlog item Q11.
> **Open:** Domain summary score derivation method is not yet specified. See backlog item M3 and NS5.
