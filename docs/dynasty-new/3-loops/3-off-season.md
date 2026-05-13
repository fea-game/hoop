---
title: Hoop Dynasty - The Off-Season
---

The off-season is a distinct phase between seasons. It is not an extension of the between-game loop — it has its own chapter structure, its own decision economy, and its own stakes. Where the between-game loop is about managing a season in motion, the off-season is about shaping the next one.

**Related docs:**
- [vision/2-season-structure.md](../1-vision/2-season-structure.md) — what resets and what persists between seasons
- [loops/2-between-games.md](./between-games.md) — the in-season decision loop
- [mechanics/5-contract-resolution.md](../4-mechanics/5-contract-resolution.md) — how individual contract decisions resolve
- [mechanics/6-draft-and-scouting.md](../4-mechanics/6-draft-and-scouting.md) — the draft chapter detail
- [structure/1-card-systems.md](../2-structure/1-card-systems.md) — Identity Cards, situation cards, development cards

---

## 1. Influence and the Card Economy

### 1.1 Reputation as the Driver

The coach's **reputation** — accumulated across seasons through results, player development, and legacy achievements — is the primary determinant of off-season agency. It is a **card economy multiplier**: higher reputation means more cards available across every off-season chapter, and a richer context-gated decision pool during the in-season between-game loop.

A low-reputation coach can still sign free agents, influence contract decisions, and shape the roster — they simply have fewer actions to do it with. Every decision carries more weight.

The same reputation-driven card economy applies in-season: a `Franchise Coach` draws from a richer between-game decision pool than a `New Coach` managing the same situation.

> **Open:** The reputation scoring model (numeric range, scoring formula, tier thresholds) is not yet defined. See backlog items H7 and Q9.

### 1.2 The Contract Sets the Season's Influence Tier

The **signed coaching contract** translates reputation into a concrete influence tier for the coming season. Contract terms reflect **roster authority, draft involvement, scheme autonomy, and perceived success horizon**.

Three influence tiers:

| Tier | Context | Off-season card economy | In-season card economy |
|---|---|---|---|
| `New Coach` | Prove-it deal, first season at a franchise, or post-reputation-hit | Minimum card pool; inherited roster has fixed elements the coach cannot immediately change | Restricted between-game decision pool |
| `Established Coach` | Multi-year deal, mid-reputation, standard front-office relationship | Standard card pool; full draft involvement; meaningful free agent agency | Standard between-game decision pool |
| `Franchise Coach` | Long-term deal, high reputation, high front-office authority | Expanded card pool; maximum roster agency; early free agent access; bonus scouting actions | Enriched between-game decision pool |

### 1.3 Prestige vs. Control

A coaching offer's influence tier does not always match the coach's reputation tier. High-prestige contenders may offer `Established Coach` authority to a `Franchise Coach`-reputation coach. Rebuilding teams offer `Franchise Coach` authority as an incentive.

This creates a genuine contract decision: **prestige vs. control.** A coach who wants to run their system takes the rebuild. A coach chasing a championship takes the contender and accepts the constraints.

The coaching free agency screen presents 2–3 offers simultaneously. Each offer displays the team, perceived success horizon, and influence tier — but not the full detail of the off-season card pool until the contract is signed.

> **Conflict:** Whether the prior team counts as one of the 2–3 offer slots or a separate option is unresolved. See backlog item H1.

---

## 2. Off-Season Chapter Structure

The off-season runs as a **guided chapter sequence**. Each chapter has a fast lane (mandatory decisions only) and an optional depth layer governed by influence tier. Chapters advance when mandatory decisions are resolved; optional actions expire when the chapter closes.

### Chapter 0 — Coaching Contract

**Mandatory:** Select one of 2–3 incoming coaching offers, or re-sign with the current team if an offer was made.

Sets the influence tier for all subsequent chapters and the coming season's between-game loop.

The coach sees pending offers before the last games of the season, making late-season results mechanically meaningful — a strong playoff run may upgrade an offer's influence tier before the off-season formally begins.

---

### Chapter 1 — Season Debrief

**Mandatory:** Review is presented automatically — no decisions required.

**Content:**
- Key narrative moments from the season
- Season-level Heat history per player (who ran hot, who regressed)
- Morale outcomes and carry-over implications
- Reputation delta — how the season shifted the coach's standing
- Legacy achievements unlocked (Identity Card unlocks triggered)

**Optional depth (influence-gated):**
- Detailed per-player stat review
- Rival team season summary

The debrief is informational, not decisional. It sets the context for every chapter that follows.

---

### Chapter 2 — Contract Resolution

For each expiring contract, a decision is required:
- **Retain** — offer a new contract; player may accept, counter, or decline. See [mechanics/5-contract-resolution.md](../4-mechanics/5-contract-resolution.md).
- **Release** — player enters the waiver pool immediately
- **Let expire** — player enters free agency at chapter end

**Optional depth (influence-gated):**

| Action | `New Coach` | `Established Coach` | `Franchise Coach` |
|---|---|---|---|
| View player's full season Heat history before deciding | No | Yes | Yes |
| Negotiate contract terms | No | Limited | Full |
| Identify which rival teams are interested in your expiring players | No | No | Yes |

**`New Coach` constraint:** Some contracts may already be resolved by the front office before the coach's involvement. The number of pre-resolved contracts decreases as influence tier increases.

---

### Chapter 3 — Draft

The annual draft class enters the league. The coach selects from available prospects in draft order.

See [mechanics/6-draft-and-scouting.md](../4-mechanics/6-draft-and-scouting.md) for full draft mechanics. Undrafted players enter the free agent pool at chapter end.

**Influence-gated actions:**

| Action | `New Coach` | `Established Coach` | `Franchise Coach` |
|---|---|---|---|
| Pre-draft scouting actions (progressive reveal) | 1 | 2–3 | 4+ |
| View rival teams' draft tendencies | No | No | Yes |
| `"The Eye"` Identity Card (free hidden tag per pick) | If slotted | If slotted | If slotted |

> **Open:** Draft event UI (board vs. crisis-style) is unresolved. See backlog item Q8.

---

### Chapter 4 — Free Agent Signing

The open free agent pool — including undrafted players, waived players, and unsigned veterans — is available for signing.

**Mandatory:** None. Fully optional but time-sensitive.

**Soft pressure:** High-value free agents have a signing window. If the coach does not make an offer within a certain number of chapter actions, rival teams sign them. The window is visible. There is no hard timer; pressure advances by action count, not real time.

**Influence-gated signing slots:**

| Tier | Signing actions available |
|---|---|
| `New Coach` | 1–2 |
| `Established Coach` | 3–4 |
| `Franchise Coach` | 5+ plus early access to the pool before rival teams |

**Scouting before signing:** Free agents are partially-obscured dossiers (same model as draft prospects). Scouting actions within this chapter reveal more of a target's card before committing a signing slot.

---

### Chapter 5 — Roster Construction

With contracts resolved and new signings complete, the coach sets the roster structure for the coming season.

**Mandatory:**
- Set the depth chart (starting five + rotation order)
- Assign player roles — feeds into scheme fit and morale expectations. See [mechanics/3-roles.md](../4-mechanics/3-roles.md).

**Optional depth (influence-gated):**
- Waiver claims — pick up recently released players
- Review role assignments against scheme fit

> **Open:** Distinction between off-season waivers and in-season waivers is not defined. See backlog item Q24.

---

### Chapter 6 — Pre-Season Setup

**Mandatory:**
- **Slot 3 Identity Cards** from the career library (locked for the season once confirmed)
- **Select opening scheme**
- **Build the opening situation card pool** (~15–20 cards; 5 selected pre-game each game)

**Optional depth:**
- Review Identity Card interactions with current roster
- Deliberate situation card pool construction — considering known opponent tendencies from scouting

---

## 3. Off-Season Summary

```
Chapter 0  Coaching Contract      → sets influence tier for everything that follows
Chapter 1  Season Debrief         → informational; sets context
Chapter 2  Contract Resolution    → retain / release / let expire expiring contracts
Chapter 3  Draft                  → draft class selection; undrafted pool opens
Chapter 4  Free Agent Signing     → sign from open pool; soft rival pressure
Chapter 5  Roster Construction    → depth chart, role assignments, waiver claims
Chapter 6  Pre-Season Setup       → Identity Cards, scheme, situation card pool
```

Each chapter has a fast lane (mandatory decisions only) and an optional depth layer. The off-season is completable quickly for a casual session; meaningful engagement is always available for a player who wants it.
