---
title: Hoop Dynasty - Player Attributes & Tags
---

The player model is split into two distinct layers: **attributes** and **tags**. The split is conceptual and load-bearing — attributes express what a player can do physically and technically; tags express how a player behaves, decides, and responds to context.

---

## 1. Attributes

Attributes are continuous numeric values on a **1–100 scale**. They represent measurable physical and technical capacities. Every attribute has a direct mechanical role in the simulation — if a change in the attribute's value cannot change a simulation outcome, it should not be an attribute.

### 1.1 Attribute Domains

**Scoring (5)**
| Attribute | Simulation Role |
|---|---|
| `Three-Point` | Shot probability for attempts beyond the arc |
| `Mid-Range` | Shot probability for pull-ups, post fadeaways, elbow jumpers |
| `Free Throw` | Resolution of foul shots; enables intentional-foul tactics late in game |
| `Close Range` | Non-dunking interior buckets — floaters, runners, short pull-ups |
| `Finishing` | Rim attempts (layups, dunks); contested vs. `Block` and `Inside Defense` |

**Defense (4)**
| Attribute | Simulation Role |
|---|---|
| `Perimeter Defense` | On-ball coverage in isolation and pick-and-roll; closing out on shooters; shot contest penalty on mid-range and three-point attempts |
| `Inside Defense` | Interior help defense, post defense, rim protection |
| `Steal` | Active hands in passing lanes and on-ball pressure; feeds the turnover branch |
| `Block` | Shot contest outcome at the rim; applies to `Finishing` and `Close Range` attempts only — mid-range contests are governed by `Perimeter Defense` |

**Rebounding (2)**
| Attribute | Simulation Role |
|---|---|
| `Offensive Rebounding` | Second-chance possession probability; interacts with scheme decisions (crash vs. transition defense) |
| `Defensive Rebounding` | Reduces opponent second-chance probability; affects total possession count per game |

**Athleticism (2)**
| Attribute | Simulation Role |
|---|---|
| `Speed` | Transition offense and defense, defensive recovery, fast break probability, press resistance |
| `Strength` | Post-up position resolution, rebounding contests in traffic, screen-setting effectiveness |

**Playmaking (2)**
| Attribute | Simulation Role |
|---|---|
| `Ball Handling` | Pick-and-roll ball-handler resolution, isolation, press break, turnover risk on dribble-heavy actions |
| `Passing` | Kick-out reads, skip passes, drive-and-dish quality; interacts with IQ tags on decision-quality nodes |

**Total: 15 attributes.**

### 1.2 Derived Display Values

The dossier card surfaces **domain summary scores** derived from attribute averages within each domain. An **IQ indicator** is derived from the aggregate of a player's IQ tags (see §2.2). Raw attribute values are available on a drill-down screen. Scouting may partially obscure the drill-down until revealed.

Visuals and display design are deferred to a separate design session.

### 1.3 Notes on Non-Attributes

The following were considered and deliberately excluded:

- **Verticality** — redundant; expressed by `Block`, `Finishing`, `Offensive Rebounding`, and the `dunker` tag.
- **Durability** — not an attribute. Durability is expressed entirely through tags (e.g., `injury-prone`, `iron-man`, `high-motor`). A numeric durability attribute creates a dump-stat problem and suppresses interesting roster decisions.
- **IQ** — not an attribute. See §2.2.

---

## 2. Tags

Tags are discrete labels attached to a player. They fire at specific simulation nodes, narrative triggers, or out-of-game decision points. A player may have any number of tags across categories.

### 2.1 Specialisation Tags

Specialisation tags amplify or constrain attribute effectiveness in a specific context. They add situational resolution that a numeric attribute alone cannot express.

Examples:
- `catch-and-shoot` — amplifies `Three-Point` in off-ball catch-and-shoot possessions
- `dunker` — unlocks the dunk action branch in the possession generator; amplifies crowd heat on made attempts; slightly increases block risk from elite shot-blockers
- `crafty-finisher` — reduces block risk on `Finishing` attempts; more forgiving vs. length; no crowd heat bonus
- `physical-screener` — amplifies `Strength` in screen-setting resolution
- `spot-up-shooter` — amplifies `Three-Point` in catch-and-shoot from stationary position

### 2.2 IQ Tags

IQ is not a numeric attribute. Cognitive and decision-making capacity is expressed through context-specific tags that fire at discrete simulation decision nodes. At any node where a player has no relevant IQ tag, they resolve at a **neutral baseline** — average decision-making is the absence of a tag.

IQ tags apply a **bonus or malus** at their specific node. The aggregate balance of positive vs. negative IQ tags on a player drives the derived IQ indicator shown on the dossier card.

| Situation / Node | Positive Tag | Negative Tag |
|---|---|---|
| Shot clock expiring | `late-clock-savvy` | `panic-chucker` |
| Double-team triggered | `pass-first-instinct` | `force-it` |
| Foul trouble | `foul-aware` | `foul-magnet` |
| Fatigue at critical threshold | `self-manager` | `overplays` |
| End-of-quarter possession | `late-clock-savvy` | — |
| Press break | `press-resistant` | — |
| Post-up decision node | `high-post-iq` | — |

This list is not exhaustive. New IQ tags are added as new simulation decision nodes are designed.

### 2.3 Behavioral / Morale Tags

These tags interact with the morale and Heat systems between and during games. Already defined in `3-game-loop.md`: `resilient`, `streaky`, `veteran-leader`, `high-maintenance`, `team-first`, `confidence-dependent`.

### 2.4 Durability Tags

Express injury risk and stamina behavior. Examples: `injury-prone`, `iron-man`, `high-motor`. These interact with the fatigue accumulation function and injury risk threshold. Defined in `3-game-loop.md`.

---

## 3. Attribute & Tag Mutability

### 3.1 Attributes

- **Permanent changes** occur between seasons via training-type Development Cards (e.g., `"Elite Shooting Camp"` raises `Three-Point` permanently).
- **Temporary boosts** are granted by in-season Development Cards and last for a defined number of games.

### 3.2 IQ Tags

- IQ tags are **mutable via Development Cards**.
- A card may **add a new positive IQ tag** to a player (upside-seeking development).
- A card may **remove a negative IQ tag** from a player (floor-raising development).
- Both directions are valid and represent distinct card design categories.
- All Development Cards have conditions governing when and to whom they can be applied.

---

## 4. Open Questions

| Question | Notes |
|---|---|
| Attribute scaling and calibration | Base values per archetype, growth curves, min/max ceilings per tag interaction. Needs a calibration pass once the simulation engine is prototyped. |
| Full IQ tag vocabulary | Tag list above covers known simulation nodes. Full vocabulary expands as new decision nodes are designed. |
| Tag count limits per player | Is there a cap on how many tags a player can hold? Relevant for dossier display and Development Card design. Decision deferred. |
