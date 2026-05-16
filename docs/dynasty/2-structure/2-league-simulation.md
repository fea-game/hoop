---
title: Hoop Dynasty - League Simulation
---

The league simulation is the world engine that runs beneath the player's season. It exists to make the world feel alive, produce rival franchise stories, and generate meaningful context for the player's decisions — without becoming a design or performance burden.

The league sim is **output-driven**, not process-driven. It does not simulate full games for rival teams. Instead, it produces the outputs the game needs: standings, player movements, team trajectories, and notable events — all derived statistically from team strength ratings and a lightweight event engine.

**Related docs:**
- [vision/2-season-structure.md](../1-vision/3-season-structure.md) — how the season arc relates to the league world
- [mechanics/6-draft-and-scouting.md](../4-mechanics/6-draft-and-scouting.md) — how players enter the league
- [mechanics/5-contract-resolution.md](../4-mechanics/5-contract-resolution.md) — how player movement is decided at season end

---

## 1. Player Movement

There are no trades. Player movement between teams occurs only through three channels:

| Channel | Description |
|---|---|
| **Contract expiry** | Players without a new contract enter free agency at season end |
| **Waivers** | A team releases a player mid-season; they become immediately signable |
| **Free agent signing** | Any team (including the player's) can sign a free agent from the pool |

The free agent pool is never empty. Teams do not fully contract every available player — there are always unsigned players available to scout and sign throughout the season.

---

## 2. Rival Team Modelling

### 2.1 Archetype-Driven Identities

Every rival team has a **team archetype** that defines their identity, playstyle, and the type of stories they generate. Archetypes are persistent across seasons but evolve as rosters change.

| Archetype | Playstyle | Story tendency |
|---|---|---|
| `defensive-juggernaut` | Low pace, high defensive pressure, physical | Grinding wins, injury battles, late-game holds |
| `pace-and-space` | High pace, three-point heavy, switchable defense | Shootout results, streaky records, clutch collapses |
| `veteran-contender` | Experienced roster, high IQ, low variance | Consistent deep playoff runs, aging arc stories |
| `young-and-athletic` | High athleticism, raw IQ, boom-or-bust | Upset potential, breakout narratives, volatile seasons |
| `rebuilding` | Low overall strength, high draft picks | Development stories, surprise upsets, tanking tension |

The archetype governs the team's default strength profile and which simulation branches are more likely to produce notable events.

> **Open:** Player archetypes are referenced throughout but never formally defined. Team archetypes (above) and player archetypes should be kept as distinct vocabularies. See backlog item M2.

### 2.2 Team Strength Rating

Each rival team carries a **composite strength rating** updated at season start and after significant mid-season events (waiver pickups, key injuries). Derived from:
- Roster quality (aggregate of player attribute scores weighted by role)
- Archetype fit (how well the current roster expresses the team's archetype)
- Current roster phase: **building** / **peak** / **declining**

The roster phase shapes the team's trajectory arc for the season and influences how rival team narratives develop.

### 2.3 Archetype Evolution

A team's archetype is **re-evaluated at the start of every season** by re-running the same archetype assignment function used at save initialisation. The function takes the current roster as input — attributes, tags, age profile, and roster phase — and returns the archetype that best fits.

Archetypes evolve naturally as rosters change. A `rebuilding` team that drafts well may become `young-and-athletic`. A `veteran-contender` whose stars age out may shift to `rebuilding`. No special trigger is required.

Mid-season archetype changes do not occur. The archetype is a season-level identity.

### 2.4 Head-to-Head Resolution Function

When two rival teams meet, their result is resolved by:

```
matchup_result(
  team_a,                  // archetype, strength rating, roster phase
  team_b,                  // archetype, strength rating, roster phase
  stylistic_matchup,       // how team archetypes interact
  home_advantage,          // fixed scalar bonus for home team
  randomness_roll,         // good day / bad day variance
  hot_streak_modifier      // applied if either team is on a winning or losing run
) → result                 // win/loss margin, notable events generated
```

**Stylistic matchup** is the key differentiator. A `pace-and-space` team with an unusually hot shooting roll can outscore a `defensive-juggernaut` on a given night — the stylistic disadvantage raises variance, not lowers the floor.

**V1 implementation:** Lookup table for stylistic matchup modifiers. Randomness roll is a flat distribution within the variance band. Notable event generation is a probability check against the result margin and the archetypes involved.

**Later:** Richer per-possession approximation; streak tracking; full tag interaction for individual player contributions to team strength.

---

## 3. Rivalries

### 3.1 Pre-Generated Rivalries

At the start of every new save, a set of **pre-existing rivalries** is generated for the league. Generation is partially randomised so every new league feels distinct.

Sources:

| Source | Example |
|---|---|
| **Geographic proximity** | Two teams in the same city or region |
| **Historical playoff meetings** | Two storied franchises that have met frequently in generated league history |
| **City/cultural dislike** | Algorithmically assigned friction between certain city pairings |
| **Archetype clash** | Two teams with archetypes that produce high-variance matchups |

### 3.2 In-Season and Emergent Rivalries

Rivalries also form dynamically, triggered by threshold events:

| Trigger | Description |
|---|---|
| **Playoff elimination** | The team that eliminated your team last season becomes a rival |
| **Repeated nail-biters** | Two teams that play multiple close games (within 5 points) in a season |
| **Standings collision** | Two teams fighting for the same top seed all season |
| **Repeat playoff meetings** | Teams that meet in the playoffs across multiple seasons |
| **Upset** | A lower-rated team beating a dominant rival in a high-stakes game |

Rivalries formed in-season can **persist beyond the season** into subsequent runs.

### 3.3 Rivalry Cap

Each team can hold a maximum of **2 active rivalries** at any time. When a new rivalry trigger fires and a team is already at the cap, the new rivalry displaces the oldest or least-intense active rivalry.

> **Conflict:** The displacement criterion differs between docs — "weakest" vs. "oldest or least-intense." See backlog item M1.
> **Open:** How many pre-existing rivalries should a new league start with? See backlog item Q31.

### 3.4 Rivalry Mechanical Effects

| Effect | Description |
|---|---|
| **Elevated crisis probability** | Games against this opponent have a higher base crisis density |
| **Accumulated scouting knowledge** | Scouting reports carry over across seasons against a long-standing rival |
| **Rivalry narrative event pool** | Story events unique to this matchup |
| **Rival coach identity** | The rival team's coach has a persistent identity and reputation |

> **Open:** How much a rival coach's identity persists and adapts is not defined. See backlog item Q30.

---

## 4. Information Delivery

How league information reaches the player is part of the **presentation layer** and is deferred to a dedicated visual design session. The simulation layer produces the events; the presentation layer decides how and when to surface them.

Outputs the league sim produces:
- Standings updates (after each simulated round of games)
- Player movement events (waivers, signings, contract expirations)
- Notable game outcomes (upsets, blowouts, streak milestones, injury events)
- Rivalry heat changes
- Team trajectory shifts

> **Open:** Presentation layer design for information delivery is deferred. See backlog item Q4.
