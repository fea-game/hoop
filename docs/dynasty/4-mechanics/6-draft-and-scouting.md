---
title: Hoop Dynasty - Draft & Player Scouting
---

The draft and scouting loop is the player discovery funnel. It governs how new talent enters the league, how the coach evaluates prospects, and how the draft event plays out.

**Related docs:**
- [loops/3-off-season.md](../3-loops/3-off-season.md) — Chapter 3 (Draft) and Chapter 4 (Free Agent Signing)
- [loops/2-between-games.md](../3-loops/2-between-games.md) — the between-game decision slot used for scouting
- [structure/2-league-simulation.md](../2-structure/2-league-simulation.md) — how rival teams draft and the free agent pool

---

## 1. How Players Enter the League

The league maintains a **classic annual draft class model**. Each season a new cohort of prospects is generated, adding fresh talent and keeping the total player pool in balance.

The league is never fully contracted. At any point there is a pool of **free agents** that includes:
- Undrafted prospects from the most recent draft class
- Veterans released mid-season or during the off-season
- Players who declined offers or were not retained after contract expiry

Free agents can be scouted and signed throughout the season, not only during off-season windows.

---

## 2. Scouting — Prospect Evaluation

### 2.1 Progressive Reveal Model

Prospects and free agents are represented as **partially-obscured Player Dossiers**. Information is revealed progressively through scouting actions.

Different scouting actions reveal different types of information:
- A scoring-focused scouting action reveals Scoring domain attributes
- A defensive scouting action reveals Defense domain attributes
- A behavioral scouting action reveals IQ or morale tags

This makes scouting decisions meaningful — the coach is always choosing *what* to learn, not just whether to learn.

### 2.2 Scouting as a Between-Game Decision

Scouting a prospect consumes the **context-gated free decision slot** in the between-game sequence. During the pre-draft period, the available actions in that slot shift toward prospect evaluation.

Free agents can be scouted during the regular season and playoffs using the same slot.

> **Conflict:** The between-game slot gives 1 action per game. The off-season chapter gives 1 / 2–3 / 4+ scouting actions by influence tier. The relationship between these economies is never defined. See backlog item H11.

### 2.3 Meta-Progression and Scouting

As the coaching career advances:
- More powerful scouting cards become available (revealing more attributes per action, or revealing hidden tags)
- The coach may accumulate beneficial scouting-related Identity Cards
- Example Identity Card: `"The Eye"` — one free hidden player tag revealed per draft pick

### 2.4 Information Asymmetry as Risk

Not all scouting opportunities are equal. A coach who did not scout a prospect before their draft slot arrives must decide based on partial or zero information. Stale scouting reports are a deliberate risk — a player's situation or team context may have changed since the report was generated.

> **Conflict:** `scouting_knowledge` is used as a continuous numeric input in the defensive scoring function, but the scouting system produces card reveals with no defined conversion. See backlog item H6 and NS8.

---

## 3. The Draft Event

### 3.1 Structure

The draft is an **important between-season moment** with its own UI and decision pressure. It is not resolved silently.

Draft order is determined by prior season standing (worse teams pick earlier). Undrafted players enter the free agent pool.

### 3.2 Draft Event UI

**Open question.** Two candidate models:

> **Option A — Draft Board:** A ranked list of available prospects. Simple, legible, fast. A surprise pick by a rival triggers a light narrative moment.

> **Option B — Crisis-Style Event:** The draft is presented with a situation-card-style UI, introducing timing pressure and card-based decision-making. Structurally consistent with the rest of the game's language. Higher design and implementation cost.

**Decision deferred.** See backlog item Q8.

---

## 4. Open Questions

See the backlog for the full list. Key items:

| Item | Backlog ref |
|---|---|
| Draft event UI (board vs. crisis-style) | Q8 |
| Draft class size and pre-draft visibility | Q14 |
| Scouting card vocabulary and acquisition | Q15 |
| Rival team draft behavior | Q16 |
| Prospect generation (procedural attributes/tags) | Q17 |
| Free agent scouting limits | Q18 |
