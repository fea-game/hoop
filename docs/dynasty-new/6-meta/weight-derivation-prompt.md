---
title: Weight Derivation Methodology
---

# Weight Derivation Methodology

This document explains how to score design decisions and re-derive the `actual_weight` values in `goals.yaml`.

---

## Maintaining `goals.yaml`

### Adding a new decision

1. Add an entry to `decisions[]` with the next sequential ID (`D22`, etc.).
2. Set `summary`, `source_ref`, `impact`, and `pillars` — see scoring rules below.
3. Add a `doc_href` field pointing to the section in the docs site where the decision is documented.
4. Re-run the weight derivation script (see **How to run** below).

### `doc_href` format

`doc_href` must be an **absolute site path** — never a relative path.

```yaml
doc_href: "/dynasty-new/<section>/<page>/#<heading-slug>"
```

Rules:
- Start with `/dynasty-new/` (the docs root for this project).
- Use the file's path segments without the `.md`/`.mdx` extension — Starlight strips extensions from URLs automatically.
- Add a trailing `/` before the anchor: `/<page>/#<anchor>`.
- The anchor is the heading text lowercased, spaces replaced with `-`, and non-alphanumeric characters removed (standard GitHub/Starlight heading slug rules).

**Examples:**

| File path | Heading | `doc_href` |
|---|---|---|
| `dynasty-new/1-vision/2-game-concept.md` | `## The Protagonist Frame` | `/dynasty-new/1-vision/2-game-concept/#the-protagonist-frame` |
| `dynasty-new/4-mechanics/3-roles.md` | `## 1. Offensive Roles` | `/dynasty-new/4-mechanics/3-roles/#1-offensive-roles` |

**Do not use:**
- Relative paths such as `../2-game-concept` — these resolve against the MDX *file path*, not the browser URL, and will break when the page is nested under a subdirectory.
- `.md` or `.mdx` extensions in the path.

---

## When to run

Re-run derivation whenever you:
- Add a new resolved decision to `decisions[]` in `goals.yaml`
- Change the `impact` score of an existing decision
- Change the `pillars[]` tags on a decision
- Move a decision from the backlog (`6-meta/2-backlog.md`) to resolved

---

## How to run

```bash
# Print derived weights (read-only):
node scripts/derive-weights.js

# Print AND write actual_weight back into goals.yaml:
node scripts/derive-weights.js --write
```

---

## Impact scoring rules

Each decision gets a single `impact` score: **3 (HIGH)**, **2 (MEDIUM)**, or **1 (LOW)**.

The test is: **what would happen if this decision were reversed?**

### HIGH (3) — Foundational

Reversing this decision would require rewriting the game's genre classification or identity.
It defines *what kind of game this is*, not just *how* a system works.

**Examples in this project:**
- D4 (roguelite resets from basketball logic) — removes the naturalistic-churn promise
- D7 (collect ~20, slot 3 Identity Cards) — collapses the meta-progression model
- D19 (reputation tiers govern card economy) — removes the career arc engine

**Heuristics for HIGH:**
- Would the game appear in a different genre category on a store page?
- Would a feature review summary have to change fundamentally?
- Is there no reasonable alternative that preserves the player experience?

### MEDIUM (2) — Structural

Reversing this decision requires significant redesign of a major system, but the game remains recognisably the same genre and experience.

**Examples in this project:**
- D3 (5-step between-game sequence) — costly to redesign but not identity-breaking
- D12 (relationship cards carry over on retention) — weakens the emotional logic but doesn't break a pillar
- D14 (progressive scouting reveal) — a specific mechanism; alternatives preserve the scouting intent

**Heuristics for MEDIUM:**
- Would one or more docs sections need to be rewritten?
- Would at least one other decision need to change as a cascade?
- Is there a viable alternative that still serves the same pillar promise?

### LOW (1) — Detail

A reasonable implementation choice; alternatives exist without meaningfully changing the experience.

**Examples in this project:**
- D10 (rivalry cap = 2) — tunable parameter; 3 or 1 are equally defensible
- D11 (archetype re-evaluated at season start) — when to update is a scheduling detail
- D16 (7-tag defensive vocabulary) — the count is a tuning choice, not a commitment

**Heuristics for LOW:**
- Is the number/threshold the main content of the decision, not the mechanism?
- Could you change it without touching any other file?
- Does it fall out naturally from a MEDIUM or HIGH decision above it?

---

## Pillar tagging rules

A decision should be tagged to a pillar if it **implements or constrains** a promise under that pillar.
A decision should **not** be tagged just because it is consistent with the pillar — only if it actively expresses it.

When in doubt, ask: "If someone asked 'what decisions show we take [pillar] seriously?', would this decision be a valid answer?"

One decision may serve multiple pillars. There is no maximum — but over-tagging inflates the actual weight for those pillars and obscures the signal. Aim to tag only the pillars the decision *primarily* serves.

---

## Intent vs. actual weights

- **Intent weight** — set manually. Changes only when you consciously reprioritise the design. Currently: Roguelite / Basketball Feel / Storytelling each at 23.3%, Crisis Play / Collection each at 15.0%.
- **Actual weight** — derived by script. Reflects where design decisions have actually been invested.

### Reading the gap

| Gap | Interpretation |
|---|---|
| < ±1.5 pp | Aligned — decisions match intent |
| Actual > Intent | Pillar is over-served relative to its priority — future decisions should lean elsewhere |
| Actual < Intent | Pillar is under-served — check whether open backlog items cover this pillar, or add new decisions |

---

## Prompt for AI-assisted scoring

When using an AI assistant to score a batch of new decisions, use this prompt:

> Read `docs/dynasty-new/6-meta/goals.yaml` for context on the five pillars and existing decisions.
> For each new decision below, assign:
> - `impact`: 3 (HIGH), 2 (MEDIUM), or 1 (LOW) — see the rules in `weight-derivation-prompt.md`
> - `pillars`: a list of pillar IDs from {roguelite, basketball_feel, storytelling, crisis_play, collection}
>
> Return a YAML block for each decision in the same format as the existing decisions[].
> Justify the impact score briefly.
>
> New decisions to score:
> [paste decisions here]
