---
title: Hoop Dynasty - Player Model
---

The player model is split into two distinct layers: **attributes** and **tags**. Attributes express what a player can do physically and technically; tags express how a player behaves, decides, and responds to context.

For the full tag vocabulary (all categories, all tags) see [reference/2-tag-vocabulary.md](../5-reference/2-tag-vocabulary.md). This doc defines the structure and mutability rules; the reference doc is the canonical list.

**Related docs:**
- [reference/1-attribute-tables.md](../5-reference/1-attribute-tables.md) — full 15-attribute table with simulation roles
- [reference/2-tag-vocabulary.md](../5-reference/2-tag-vocabulary.md) — canonical tag vocabulary
- [mechanics/3-roles.md](../4-mechanics/3-roles.md) — offensive and defensive role tags (a tag sub-category)
- [mechanics/1-simulation-model.md](../4-mechanics/1-simulation-model.md) — how attributes and tags feed into scoring functions
- [structure/1-card-systems.md](../2-structure/1-card-systems.md) — development cards that change attributes and tags

---

## 1. Attributes

Attributes are continuous numeric values on a **1–100 scale**. Every attribute has a direct mechanical role in the simulation — if a change in the attribute's value cannot change a simulation outcome, it should not be an attribute.

Attributes are organized into five domains. For the full table see [reference/1-attribute-tables.md](../5-reference/1-attribute-tables.md).

**Domain summary:**
- **Scoring** (5 attributes) — Three-Point, Mid-Range, Free Throw, Close Range, Finishing
- **Defense** (4 attributes) — Perimeter Defense, Inside Defense, Steal, Block
- **Rebounding** (2 attributes) — Offensive Rebounding, Defensive Rebounding
- **Athleticism** (2 attributes) — Speed, Strength
- **Playmaking** (2 attributes) — Ball Handling, Passing

**Total: 15 attributes.**

The dossier card surfaces **domain summary scores** derived from attribute averages within each domain. An **IQ indicator** is derived from the aggregate of a player's IQ tags. Raw attribute values are available on a drill-down screen. Scouting may partially obscure the drill-down until revealed.

> **Open:** The domain summary score derivation method is not yet specified. A straight average produces differently sized samples across domains (Scoring has 5 attributes, Rebounding has 2). See backlog item M3 and NS5.
> **Open:** Player archetype vocabulary is not yet formally defined. See backlog item M2 and NS4.

### Deliberately excluded

- **Verticality** — redundant; expressed by `Block`, `Finishing`, `Offensive Rebounding`, and the `dunker` tag.
- **Durability** — not an attribute. Expressed entirely through tags (`injury-prone`, `iron-man`, `high-motor`). A numeric durability attribute creates a dump-stat problem.
- **IQ** — not an attribute. See §2.2.

---

## 2. Tags

Tags are discrete labels attached to a player. They fire at specific simulation nodes, narrative triggers, or out-of-game decision points. A player may hold any number of tags across categories.

For the full vocabulary see [reference/2-tag-vocabulary.md](../5-reference/2-tag-vocabulary.md). Categories summarized here:

### 2.1 Specialisation Tags

Amplify or constrain attribute effectiveness in a specific context:
- `catch-and-shoot` — amplifies `Three-Point` in off-ball catch-and-shoot possessions
- `dunker` — unlocks the dunk action branch; amplifies crowd heat; slightly increases block risk
- `crafty-finisher` — reduces block risk on `Finishing` attempts
- `physical-screener` — amplifies `Strength` in screen-setting resolution
- `spot-up-shooter` — amplifies `Three-Point` from stationary position

### 2.2 IQ Tags

IQ is expressed through context-specific tags that fire at discrete simulation decision nodes. At any node where a player has no relevant IQ tag, they resolve at a **neutral baseline** — average decision-making is the absence of a tag.

| Situation / Node | Positive Tag | Negative Tag |
|---|---|---|
| Shot clock expiring | `late-clock-savvy` | `panic-chucker` |
| Double-team triggered | `pass-first-instinct` | `force-it` |
| Foul trouble | `foul-aware` | `foul-magnet` |
| Fatigue at critical threshold | `self-manager` | `overplays` |
| End-of-quarter possession | `late-clock-savvy` | — |
| Press break | `press-resistant` | — |
| Post-up decision node | `high-post-iq` | — |

> **Conflict:** `late-clock-savvy` is the canonical name here; `mechanics/1-simulation-model.md` uses `shot-clock-savvy` for the same concept. See backlog item H4.
> **Open:** This list covers known simulation nodes. Full vocabulary expands as new nodes are designed. See backlog item Q12.

### 2.3 Behavioral / Morale Tags

Interact with the morale and Heat systems. See [loops/1-game-loop.md](../3-loops/1-game-loop.md) §2 for effects:
`resilient`, `streaky`, `veteran-leader`, `high-maintenance`, `team-first`, `confidence-dependent`.

### 2.4 Durability Tags

Express injury risk and stamina behavior. Interact with the fatigue accumulation function and injury risk threshold. See [mechanics/1-simulation-model.md](../4-mechanics/1-simulation-model.md) §6:
`injury-prone`, `iron-man`, `high-motor`.

### 2.5 Role Tags

Offensive and defensive role tags are a sub-category of tags. See [mechanics/3-roles.md](../4-mechanics/3-roles.md).

> **Open:** Is there a cap on how many tags a player can hold? See backlog item Q13.

---

## 3. Attribute & Tag Mutability

### 3.1 Attributes

- **Permanent changes** occur between seasons via training-type Development Cards (e.g. "Elite Shooting Camp" raises `Three-Point` permanently).
- **Temporary boosts** are granted by mid-season Development Cards and last for a defined number of games.

The permanent/temporary distinction maps directly to when the card is applied: between-season = permanent; mid-season = temporary.

> **Conflict:** This was not explicitly stated in the original docs. See backlog item M8.

### 3.2 IQ Tags

- IQ tags are **mutable via Development Cards**
- A card may **add a new positive IQ tag** (upside-seeking development)
- A card may **remove a negative IQ tag** (floor-raising development)
- All Development Cards have conditions governing when and to whom they can be applied

> **Open:** Attribute scaling and calibration (base values per archetype, growth curves, min/max ceilings) needs a calibration pass once the simulation engine is prototyped. See backlog item Q11.
