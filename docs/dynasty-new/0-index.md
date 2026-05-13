---
title: Hoop Dynasty - Design Docs
---

# Hoop Dynasty

## What is this game?

A **basketball coaching roguelite**. You are the coach/GM — a persistent character whose identity, reputation, and toolkit accumulate across seasons and runs. Each season is a self-contained run: the roster largely resets when contracts expire, but your coaching identity and legacy persist.

The game is a roguelite first. Secondary influences in order: deck building, auto battler, RPG.

> *"Build your roster and coaching toolkit across seasons, manage your team through live card-based crisis moments, and watch unique stories emerge from every run."*

---

## The Core Loop

**In-season:** Each game is a live simulation (2–12 minutes). You watch the simulation unfold and intervene via a background planning layer (rotation queue, scheme changes) and a foreground crisis layer (situation cards, timeouts). Between games, a fixed 5-step sequence gives you one meaningful decision slot.

**Off-season:** A 7-chapter guided sequence — Coaching Contract → Season Debrief → Contract Resolution → Draft → Free Agent Signing → Roster Construction → Pre-Season Setup. Your reputation determines how much agency you have in each chapter.

**Meta-progression:** The coach persists. Reputation, Identity Cards (coaching legacy toolkit), and relationship history accumulate across seasons. Better reputation unlocks better job offers and more off-season agency.

---

## Re-entry Reading Order

Coming back after a break? Start here:

1. **[vision/1-game-concept.md](1-vision/1-game-concept.md)** — What is this game? Genre, protagonist frame, core promise. (2 min)
2. **[vision/2-season-structure.md](1-vision/2-season-structure.md)** — How the roguelite arc works. What resets, what persists. (2 min)
3. **[loops/1-game-loop.md](3-loops/1-game-loop.md)** — The exhibition game: Heat system, crisis layer, blowout mode. (5 min)
4. **[loops/2-between-games.md](3-loops/2-between-games.md)** — The 5-step between-game sequence and the context-gated decision. (2 min)
5. **[loops/3-off-season.md](3-loops/3-off-season.md)** — The 7-chapter off-season. (5 min)

Then dive into whatever system you're working on next.

---

## What's Unresolved Right Now

The most critical open items — resolve these before proceeding with related design work.

| ID | Item | Blocks |
|---|---|---|
| H7 | Reputation scoring model is undefined — range, formula, tier thresholds. Nearly every meta-progression mechanic gates on this. | Everything in `loops/3-off-season.md` §1 |
| H8 | Offensive scheme vocabulary does not exist. Possession generator and role assignment both depend on it. | `mechanics/1-simulation-model.md`, `mechanics/3-roles.md` |
| H2 | Heat state model has 3 states in the definition but 5 states in the morale delta table. "Warm" and "Cool" undefined. | `loops/1-game-loop.md` |
| H6 | `scouting_knowledge` needed as a continuous number in the scoring function, but the scouting system produces card reveals. No conversion layer defined. | `mechanics/1-simulation-model.md` |
| NS2 | Injury system is a stub — no severity model, games-missed model, or emergency signing flow defined. | Multiple docs |

**Full backlog:** [meta/2-backlog.md](6-meta/2-backlog.md)

---

## Doc Inventory

### vision/
| File | Contents |
|---|---|
| [game-concept.md](1-vision/1-game-concept.md) | Genre identity, protagonist frame, the core promise |
| [season-structure.md](1-vision/2-season-structure.md) | Roguelite season arc, what resets/persists, coaching free agency |

### structure/
| File | Contents |
|---|---|
| [card-systems.md](2-structure/1-card-systems.md) | All four card types: Player Dossiers, Situation Cards, Development Cards, Identity Cards |
| [league-simulation.md](2-structure/2-league-simulation.md) | World engine: player movement (no trades), rival team archetypes, rivalries |

### loops/
| File | Contents |
|---|---|
| [game-loop.md](3-loops/1-game-loop.md) | Exhibition game: Heat system, court display, background planning, crisis layer, blowouts |
| [between-games.md](3-loops/2-between-games.md) | Fixed 5-step post/pre-game sequence; context-gated decision slot; scouting and information decay |
| [off-season.md](3-loops/3-off-season.md) | 7-chapter off-season sequence; influence tiers; prestige vs. control |

### mechanics/
| File | Contents |
|---|---|
| [simulation-model.md](4-mechanics/1-simulation-model.md) | Service architecture, game loop, possession scoring function, action chain, fatigue, defensive model |
| [player-model.md](4-mechanics/2-player-model.md) | 15 attributes (5 domains), tag system overview, mutability rules |
| [roles.md](4-mechanics/3-roles.md) | Offensive and defensive role tags; morale mismatch function; auto-assignment |
| [relationships.md](4-mechanics/4-relationships.md) | Coach–Player trust, Player–Player synergy, carry-over situation cards |
| [contract-resolution.md](4-mechanics/5-contract-resolution.md) | Accept/decline function, rival interest model, negotiation, counter offers |
| [draft-and-scouting.md](4-mechanics/6-draft-and-scouting.md) | Progressive reveal scouting, draft event structure, free agent pool |

### reference/
| File | Contents |
|---|---|
| [attribute-tables.md](5-reference/1-attribute-tables.md) | All 15 attributes with simulation roles |
| [tag-vocabulary.md](5-reference/2-tag-vocabulary.md) | All tags: Specialisation, IQ, Behavioral, Durability, Narrative/Earned |
| [scheme-vocabulary.md](5-reference/3-scheme-vocabulary.md) | 6 defensive schemes (full); offensive schemes (placeholder — not yet designed) |

### meta/
| File | Contents |
|---|---|
| [design-notes.md](6-meta/1-design-notes.md) | Resolved tensions and resolved questions — locked-in decisions |
| [backlog.md](6-meta/2-backlog.md) | All conflicts, open questions, and next steps with status tracking |
