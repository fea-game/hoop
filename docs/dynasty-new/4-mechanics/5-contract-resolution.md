---
title: Hoop Dynasty - Contract Resolution
---

Contract resolution is the process by which expiring player contracts are decided in Chapter 2 of the off-season. For each expiring contract, the coach chooses to retain, release, or let expire — but the player also has a decision: they may accept, counter, or decline a retain offer.

See [loops/3-off-season.md](../3-loops/3-off-season.md) §2 for the chapter structure and influence-tier constraints.

**Related docs:**
- [loops/3-off-season.md](../3-loops/3-off-season.md) — Chapter 2 context, influence tiers, card pool
- [mechanics/4-relationships.md](../4-mechanics/4-relationships.md) — how trust level affects retention
- [loops/1-game-loop.md](../3-loops/1-game-loop.md) — how Heat and Morale accumulate over the season

---

## 1. The Accept/Decline Function

When the coach offers a retain, the player's response is computed by:

```
contract_response(
  player,                    // morale, role tags, behavioral tags, relationship tags
  morale_end_of_season,      // final morale value at season end
  rival_interest,            // rival team interest level (see §2)
  role_offered,              // role tags in the retain offer
  role_current,              // role tags the player held this season
  coach_player_relationship, // trust level and relationship tags
  negotiation_modifier       // net effect of any negotiation actions taken
) → response                 // accept | counter | decline
```

Each input contributes a signed score to the player's inclination. The sum determines the response bracket:

| Inclination score | Response |
|---|---|
| High positive | `accept` |
| Near zero | `counter` — player accepts with a condition |
| Negative | `decline` |

**Input contributions:**

| Input | Direction | Notes |
|---|---|---|
| `morale_end_of_season` high (17–20) | Positive | Player feels valued |
| `morale_end_of_season` low (0–6) | Negative | Player feels sidelined |
| No rival interest | Positive | No competing offers |
| Strong rival interest | Negative | Player has options |
| `role_offered` ≥ `role_current` | Positive | Same or better role |
| `role_offered` < `role_current` | Negative | Role downgrade |
| `coach_player_relationship` trust level high | Positive | Deep trust enables below-market-value acceptance |
| Behavioral tag `team-first` | Positive modifier | Loyalty amplifies positive contributions |
| Behavioral tag `high-maintenance` | Negative modifier | Raises the bar for acceptance |

A `counter` response is a narrative event, not a blocking state.

> **Open:** Should player age affect willingness to sign? See backlog item Q23.

---

## 2. Rival Interest Model

Rival team interest is computed at the start of Chapter 2 and is not re-calculated mid-chapter:

```
rival_interest(
  player,
  season_heat_history,     // rolling Heat record across the season
  overall_rating,          // derived from attribute domain scores
  rival_team_needs         // each rival team's roster gaps
) → interest_level         // none | low | medium | high
```

- Consistently **Hot** season + high overall rating → `medium` to `high` interest
- **Cold** or declining rating → `none` or `low` interest
- **Roster fit** matters: a rival with a specific hole weights relevant role tags heavily

**Visibility:**
- The coach sees that interest exists but **not the specific teams or terms** — unless they have `Franchise Coach` influence tier
- A `Franchise Coach` can see which rivals are circling before making a retain offer

Player negotiating posture reflects their rival interest level visibly through narrative text — not numeric readouts.

---

## 3. Negotiation

The coach spends **negotiation actions** during Chapter 2 to shift inputs to `contract_response` before it resolves. Each action corresponds to a card from the Chapter 2 card pool (governed by influence tier).

**One negotiation pass per player per chapter.** If the player still declines after negotiation, the decision is final for this off-season.

| Action type | Effect on function |
|---|---|
| Role upgrade offer | Improves `role_offered` input |
| Relationship appeal | Amplifies `coach_player_relationship` trust contribution |
| Development promise | Adds a conditional positive modifier |
| Market intel suppress | Reduces `rival_interest` contribution |

> **Open:** Negotiation card vocabulary (names, costs, effect magnitudes) is deferred. See backlog item Q21.
> **Open:** Chapter 2 card pool contents per influence tier are deferred. See backlog item Q22.

---

## 4. Counter Offers

A `counter` presents the player's condition as a narrative event (e.g. "He wants to be the primary ball-handler"). The coach's options:

- **Accept the counter's terms** — player signs
- **Play a negotiation card** — attempts to shift the player's position
- **Let them walk** — player enters free agency

V1 has one counter exchange per player.
