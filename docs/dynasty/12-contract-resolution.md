---
title: Hoop Dynasty - Contract Resolution
---

Contract resolution is the process by which expiring player contracts are decided in Chapter 2 of the off-season (see [9-off-season.md](./9-off-season.md)). For each expiring contract, the coach chooses to retain, release, or let expire — but the player also has a decision: they may accept, counter, or decline a retain offer.

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
  coach_player_relationship, // trust level and relationship tags (see 10-relationships.md)
  negotiation_modifier       // net effect of any negotiation actions taken (see §3)
) → response                 // accept | counter | decline
```

**Response logic (V1):**

Each input contributes a signed score to the player's inclination. The sum determines the response bracket:

| Inclination score | Response |
|---|---|
| High positive | `accept` |
| Near zero | `counter` — player accepts with a condition (higher role, specific Development Card, etc.) |
| Negative | `decline` |

**Input contributions:**

| Input | Direction | Notes |
|---|---|---|
| `morale_end_of_season` high (17–20) | Positive | Player feels valued; more likely to stay |
| `morale_end_of_season` low (0–6) | Negative | Player feels sidelined or disrespected |
| No rival interest | Positive | No competing offers; staying is the logical choice |
| Strong rival interest | Negative | Player has options; retention is competitive |
| `role_offered` ≥ `role_current` | Positive | Same or better role; matches expectation |
| `role_offered` < `role_current` | Negative | Downgrade in role; triggers morale expectation pressure even at offer stage |
| `coach_player_relationship` trust level high | Positive | Deep trust makes a player more likely to accept below-market-value offers |
| Behavioral tag `team-first` | Positive modifier | Team loyalty amplifies positive contributions |
| Behavioral tag `high-maintenance` | Negative modifier | Raises the bar for acceptance |

A `counter` response is a narrative event, not a blocking state. The coach can respond to it with a negotiation action (see §3), accept the counter's terms, or let the player walk.

---

## 2. Rival Interest Model

Rival team interest in a player is computed at the start of Chapter 2 and is not re-calculated mid-chapter. It is based on:

```
rival_interest(
  player,                  // attributes, age, role tags
  season_heat_history,     // rolling Heat record across the season
  overall_rating,          // derived from attribute domain scores
  rival_team_needs         // each rival team's roster gaps
) → interest_level         // none | low | medium | high
```

**Interest level derivation:**

- A player who ran **consistently Hot** across the season and has a high overall rating attracts `medium` to `high` interest from multiple rival teams.
- A player who ran **Cold** or has a declining overall rating attracts `none` or `low` interest — few or no outside offers.
- Interest is also shaped by **roster fit**: a rival team with a specific hole (no `floor-spacer`, for example) weights that player's relevant role tags heavily.

**Visibility:**
- The coach can see that interest exists but **not the specific teams or offer terms** unless they have `Franchise Coach` influence tier (see [9-off-season.md](./9-off-season.md) §1.2).
- A `Franchise Coach` can see which rivals are circling, giving them signal about which players are most at risk of leaving before a retain offer is made.

**Rival interest as implicit pressure:** Even when the coach cannot see the specific offers, the player's negotiating posture is visibly different. A player with high rival interest negotiates from strength; one with no interest is more accommodating. This is communicated through narrative text on the contract resolution screen, not numeric readouts.

---

## 3. Negotiation

The coach can spend **negotiation actions** during Chapter 2 to shift the inputs to the `contract_response` function before it resolves. Each negotiation action corresponds to a card played from the Chapter 2 card pool — the pool is governed by influence tier (see [9-off-season.md](./9-off-season.md) §2).

**Negotiation actions shift one input per card played.** Examples:

| Action type | Effect on function |
|---|---|
| Role upgrade offer | Improves `role_offered` input — may move response from `counter` to `accept` |
| Relationship appeal | Amplifies `coach_player_relationship` trust contribution |
| Development promise | Adds a conditional positive modifier (Development Card committed to this player next season) |
| Market intel suppress | Reduces `rival_interest` contribution — the coach downplays outside options |

**One negotiation pass per player per chapter.** The coach can play one card to shift the inputs, then the function re-evaluates. If the player still declines after negotiation, the decision is final for this off-season.

The specific cards available, their costs, and their strength are part of the card pool design — details deferred. The function signature accepts a `negotiation_modifier` from day one so the card system can plug in without a structural change.

---

## 4. Counter Offers

A `counter` response presents the player's condition as a narrative event. The coach sees the condition stated in plain terms (e.g. "He wants to be the primary ball-handler" or "He wants assurance he'll stay in the starting lineup"). The coach's options:

- **Accept the counter's terms** — adjusts the role assignment accordingly; player signs
- **Play a negotiation card** — attempts to shift the player's position without fully accepting
- **Let them walk** — declines the counter; player enters free agency

Counters are not multi-round by default. V1 has one counter exchange per player. A later phase could allow a multi-round back-and-forth at higher card cost.

---

## 5. Open Questions

| Question | Notes |
|---|---|
| Negotiation card vocabulary | What specific cards exist in the Chapter 2 pool? Names, costs, and effect magnitudes. Belongs to a card design pass. |
| Counter condition vocabulary | What conditions can a player counter with beyond role and morale? (e.g. "wants guaranteed minutes," "wants a specific teammate retained"). Story event pool not yet designed for this. |
| Influence tier card pool detail | Chapter 2 card pool sizes per influence tier are set in [9-off-season.md](./9-off-season.md) but individual card contents are not. Deferred to card design pass. |
| Age factor | Should player age affect willingness to sign (younger players more willing to move for a bigger role; aging veterans more likely to chase a championship)? Not yet modelled. |
