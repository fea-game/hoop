---
title: Hoop Dynasty - Draft & Player Scouting
---

The draft and scouting loop is the player discovery funnel. It governs how new talent enters the league, how the coach evaluates prospects, and how the draft event itself plays out.

---

## 1. How Players Enter the League

The league maintains a **classic annual draft class model**. Each season a new cohort of prospects is generated, adding fresh talent and keeping the total number of players across the league in balance.

The league is never fully contracted. At any point in the season there is a pool of **free agents** — players without a team — that includes:
- Undrafted prospects from the most recent draft class
- Veterans released mid-season or during the off-season
- Players who declined offers or were not retained after contract expiry

Free agents can be scouted and signed throughout the season, not only during off-season windows. The free agent pool is a secondary discovery channel alongside the draft.

---

## 2. Scouting — Prospect Evaluation

### 2.1 Progressive Reveal Model

Prospects and free agents are represented as **partially-obscured Player Dossiers**. The coach does not see a prospect's full attribute and tag set upfront. Information is revealed progressively through scouting actions.

Different scouting actions reveal different types of information. Examples:
- A scoring-focused scouting action reveals Scoring domain attributes for one or more players
- A defensive scouting action reveals Defense domain attributes
- A behavioral scouting action reveals IQ or morale tags

This makes scouting decisions meaningful — the coach is always choosing what to learn, not just whether to learn.

### 2.2 Scouting as a Between-Game Decision

Scouting a prospect consumes the **context-gated free decision slot** in the between-game sequence (defined in `4-between-games.md`). During the pre-draft period, the available actions in that slot shift toward prospect evaluation.

Free agents can be scouted during the regular season and playoffs using the same slot.

### 2.3 Meta-Progression and Scouting

Scouting is a primary domain for meta-progression. As the coaching career advances:
- More powerful scouting cards become available (revealing more attributes per action, or revealing hidden tags)
- The coach may accumulate beneficial scouting-related Identity Cards
- Example Identity Card already in the design: `"The Eye"` — one free hidden player tag revealed per draft pick

The scouting toolkit improves across seasons, making experienced coaches materially better at evaluating talent than first-season coaches.

### 2.4 Information Asymmetry as Risk

Not all scouting opportunities are equal. A coach who did not scout a prospect before their draft slot arrives must decide based on partial or zero information. Stale scouting reports are a deliberate risk — a player's situation or team context may have changed since the report was generated.

---

## 3. The Draft Event

### 3.1 Structure

The draft is an **important between-season moment** with dedicated structural weight. It is not resolved silently — it is a distinct event with its own UI and decision pressure.

The draft order is determined by prior season standing (worse teams pick earlier).

### 3.2 Draft Event UI

**Open question.** Two candidate models are under consideration:

> **Option A — Draft Board:** A ranked list of available prospects. The coach picks when their slot arrives. Rival teams pick in order (simulated). Undrafted players enter the free agent pool. A surprise pick by a rival (e.g., taking your top target) triggers a light narrative moment. Simple, legible, fast.

> **Option B — Crisis-Style Event:** The draft is presented with a situation-card-style UI, introducing timing pressure and card-based decision-making. Could include draft-day maneuvering (trades, reactive picks). Structurally consistent with the rest of the game's language. Higher design and implementation cost.

**Decision deferred.** The draft should feel important and support meaningful decisions under pressure. The final UI model will be resolved in a dedicated design session.

---

## 4. Open Questions

| Question | Notes |
|---|---|
| Draft event UI | Option A (board) vs. Option B (crisis-style). Deferred to dedicated design session. |
| Draft class size | How many prospects per class? How many are visible to the coach before the draft? |
| Scouting card vocabulary | What specific scouting actions exist? How are they acquired (between-game decisions, Identity Cards, narrative events)? |
| Rival team draft behavior | Do rival teams have scouting tendencies that can be observed or predicted? Connects to league simulation depth. |
| Prospect generation | How are prospect attributes and tags procedurally generated? What ensures draft classes feel varied and not formulaic? |
| Free agent scouting limits | Is there a cap on how many free agents can be scouted per season, or is it limited only by the decision slot economy? |
