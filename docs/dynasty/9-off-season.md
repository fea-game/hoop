---
title: Hoop Dynasty - The Off-Season
---

The off-season is a distinct phase between seasons. It is not an extension of the between-game loop — it has its own chapter structure, its own decision economy, and its own stakes. Where the between-game loop is about managing a season in motion, the off-season is about shaping the next one.

---

## 1. Influence and the Card Economy

### 1.1 Reputation as the Driver

The coach's **reputation** — accumulated across seasons through results, player development, and legacy achievements — is the primary determinant of off-season agency. It is not a permission gate. It is a **card economy multiplier**: higher reputation means more cards available across every off-season chapter, and a richer context-gated decision pool during the in-season between-game loop.

A low-reputation coach can still sign free agents, influence contract decisions, and shape the roster — they simply have fewer actions to do it with. Every decision carries more weight.

The same reputation-driven card economy applies in-season: a `Franchise Coach` draws from a richer between-game decision pool than a `New Coach` managing the same situation.

### 1.2 The Contract Sets the Season's Influence Tier

The **signed coaching contract** translates reputation into a concrete influence tier for the coming season. Contract terms are not about money — they reflect **roster authority, draft involvement, scheme autonomy, and perceived success horizon**.

Three influence tiers:

| Tier | Context | Off-season card economy | In-season card economy |
|---|---|---|---|
| `New Coach` | Prove-it deal, first season at a franchise, or post-reputation-hit | Minimum card pool; inherited roster has fixed elements the coach cannot immediately change | Restricted between-game decision pool |
| `Established Coach` | Multi-year deal, mid-reputation, standard front-office relationship | Standard card pool; full draft involvement; meaningful free agent agency | Standard between-game decision pool |
| `Franchise Coach` | Long-term deal, high reputation, high front-office authority | Expanded card pool; maximum roster agency; early free agent access; bonus scouting actions | Enriched between-game decision pool |

### 1.3 Prestige vs. Control

A coaching offer's influence tier does not always match the coach's reputation tier. High-prestige contenders with established front offices may offer `Established Coach` authority to a `Franchise Coach`-reputation coach — they are not ceding full control. Rebuilding teams offer `Franchise Coach` authority as an incentive to attract strong candidates.

This creates a genuine contract decision: **prestige vs. control.** A coach who wants to run their system takes the rebuild. A coach chasing a championship takes the contender and accepts the constraints.

The coaching free agency screen presents 2–3 offers simultaneously (established in `2-season-structure.md`). Each offer displays the team, the perceived success horizon, and the influence tier — but not the full detail of the off-season card pool until the contract is signed.

---

## 2. Off-Season Chapter Structure

The off-season runs as a **guided chapter sequence**. Each chapter has a fast lane (mandatory decisions only) and an optional depth layer (additional actions available from the chapter's card pool, governed by influence tier). Chapters advance when mandatory decisions are resolved; optional actions expire when the chapter closes.

### Chapter 0 — Coaching Contract

**Mandatory:** Select one of 2–3 incoming coaching offers, or re-sign with the current team if an offer was made.

This is the first resolved event of the off-season. Everything that follows — roster authority, draft involvement, card pool depth — flows from the signed contract.

The prior team is one possible offer but not guaranteed (established in `2-season-structure.md`). The coach sees pending offers before the last games of the season, making late-season results mechanically meaningful — a strong playoff run may upgrade an offer's influence tier before the off-season formally begins.

**Sets:** Influence tier for all subsequent chapters and the coming season's between-game loop.

---

### Chapter 1 — Season Debrief

**Mandatory:** Review is presented automatically — no decisions required.

**Content:**
- Key narrative moments from the season (narrator voice highlights)
- Season-level Heat history per player (who ran hot, who regressed)
- Morale outcomes and their carry-over implications
- Reputation delta — how the season shifted the coach's standing
- Legacy achievements unlocked (Identity Card unlocks triggered)

**Optional depth (influence-gated):**
- Detailed per-player stat review
- Rival team season summary (standings, notable trajectories)

The debrief is informational, not decisional. It sets the context for every chapter that follows.

---

### Chapter 2 — Contract Resolution

The coach and front office decide the fate of every player with an expiring contract.

**Mandatory:** For each expiring contract, a decision is required:
- **Retain** — offer a new contract; player may accept, negotiate, or decline based on morale, market interest, and fit. See [12-contract-resolution.md](./12-contract-resolution.md).
- **Release** — player enters the waiver pool immediately
- **Let expire** — player enters free agency at chapter end; rival teams can sign them

**Optional depth (influence-gated):**

| Action | `New Coach` | `Established Coach` | `Franchise Coach` |
|---|---|---|---|
| View player's full season Heat history before deciding | No | Yes | Yes |
| Negotiate contract terms (affects player morale and retention probability) | No | Limited | Full |
| Identify which rival teams are interested in your expiring players | No | No | Yes |

**`New Coach` constraint:** Some contracts may already be resolved by the front office before the coach's involvement — inherited fixed decisions. The number of pre-resolved contracts decreases as influence tier increases.

---

### Chapter 3 — Draft

The annual draft class enters the league. The coach selects from available prospects in draft order.

**Structure:** Defined in `7-draft-and-scouting.md`. Draft event UI is an open question (board vs. crisis-style). Undrafted players enter the free agent pool at chapter end.

**Influence-gated actions within chapter:**

| Action | `New Coach` | `Established Coach` | `Franchise Coach` |
|---|---|---|---|
| Pre-draft scouting actions (progressive reveal) | 1 | 2–3 | 4+ |
| View rival teams' draft tendencies | No | No | Yes |
| `"The Eye"` Identity Card (free hidden tag per pick) | If slotted | If slotted | If slotted |

---

### Chapter 4 — Free Agent Signing

The open free agent pool — including undrafted players, waived players, and unsigned veterans — is available for signing.

**Mandatory:** None. This chapter is fully optional but time-sensitive.

**Soft pressure:** High-value free agents have a signing window. If the coach does not make an offer within a certain number of chapter actions, rival teams sign them. The window is visible — the player can see which agents are attracting rival interest. There is no hard timer; pressure advances by action count, not real time.

**Influence-gated signing slots:**

| Tier | Signing actions available |
|---|---|
| `New Coach` | 1–2 |
| `Established Coach` | 3–4 |
| `Franchise Coach` | 5+ plus early access to the pool before rival teams |

**Scouting before signing:** Free agents are partially-obscured dossiers (same model as draft prospects in `7-draft-and-scouting.md`). Scouting actions within this chapter reveal more of a target's card before committing a signing slot.

---

### Chapter 5 — Roster Construction

With contracts resolved and new signings complete, the coach sets the roster structure for the coming season.

**Mandatory:**
- Set the depth chart (starting five + rotation order)
- Assign player roles (primary ball handler, defensive anchor, sixth man, etc.) — roles feed into scheme fit and morale expectations. See [11-role-assignment.md](./11-role-assignment.md).

**Optional depth (influence-gated):**
- Waiver claims — pick up recently released players who became available after free agency
- Review role assignments against scheme fit (attribute and tag compatibility surfaced)

---

### Chapter 6 — Pre-Season Setup

The final chapter before the new season begins. This is where the coach's identity for the season is locked in.

**Mandatory:**
- **Slot 3 Identity Cards** from the career library (locked for the season once confirmed)
- **Select opening scheme**
- **Build the opening situation card pool** (~15–20 cards selected from available pool; 5 will be chosen pre-game each game)

**Optional depth:**
- Review Identity Card interactions with current roster (does `"Player Whisperer"` have a target? Does `"System Prophet"` unlock a scheme the roster fits?)
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

Each chapter has a fast lane (mandatory decisions only) and an optional depth layer governed by the coach's influence tier. The off-season is completable quickly for a casual session; meaningful engagement is always available for a player who wants it.

---

## 4. Open Questions

| Question | Notes |
|---|---|
| Draft event UI | Board vs. crisis-style. Deferred. See `7-draft-and-scouting.md`. |
| Influence tier thresholds | At what reputation scores does the coach cross from `New Coach` to `Established` to `Franchise`? Needs calibration once reputation scoring is designed. |
| Waiver timing | Waivers are available in Chapter 5 but also mid-season. Is there a distinction between off-season waivers and in-season waivers in terms of available pool or influence cost? |
| Negotiation card vocabulary | Chapter 2 negotiation card contents (names, costs, effect magnitudes). Deferred to card design pass. See [12-contract-resolution.md](./12-contract-resolution.md). |
