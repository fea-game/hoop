---
title: Hoop Dynasty - League Simulation
---

The league simulation is the world engine that runs beneath the player's season. It exists to make the world feel alive, produce rival franchise stories, and generate meaningful context for the player's decisions — without becoming a design or performance burden.

The league sim is **output-driven**, not process-driven. It does not simulate full games for rival teams. Instead, it produces the outputs the game needs: standings, player movements, team trajectories, and notable events. All derived statistically from team strength ratings and a lightweight event engine.

---

## 1. Player Movement

There are no trades. Player movement between teams occurs only through three channels:

| Channel | Description |
|---|---|
| **Contract expiry** | Players without a new contract enter free agency at season end |
| **Waivers** | A team releases a player mid-season; they become immediately signable |
| **Free agent signing** | Any team (including the player's) can sign a free agent from the pool |

The free agent pool is never empty. Teams do not fully contract every available player — there are always unsigned players available to scout and sign throughout the season. The pool contains both newly waived players and players who went unsigned after the previous draft or off-season.

---

## 2. Rival Team Modelling

### 2.1 Archetype-Driven Identities

Every rival team has a **team archetype** that defines their identity, playstyle, and the type of stories they generate. Archetypes are persistent across seasons but can evolve as rosters change.

Examples:

| Archetype | Playstyle | Story tendency |
|---|---|---|
| `defensive-juggernaut` | Low pace, high defensive pressure, physical | Grinding wins, injury battles, late-game holds |
| `pace-and-space` | High pace, three-point heavy, switchable defense | Shootout results, streaky records, clutch collapses |
| `veteran-contender` | Experienced roster, high IQ, low variance | Consistent deep playoff runs, aging arc stories |
| `young-and-athletic` | High athleticism, raw IQ, boom-or-bust | Upset potential, breakout narratives, volatile seasons |
| `rebuilding` | Low overall strength, high draft picks | Development stories, surprise upsets, tanking tension |

The archetype governs the team's default strength profile and which simulation branches are more likely to produce notable events for them.

### 2.2 Team Strength Rating

Each rival team carries a **composite strength rating** updated at season start and after significant mid-season events (waiver pickups, key injuries). The rating is derived from:

- Roster quality (aggregate of player attribute scores weighted by role)
- Archetype fit (how well the current roster expresses the team's archetype)
- Current roster phase: **building** / **peak** / **declining**

The roster phase shapes the team's trajectory arc for the season and influences how rival team narratives develop.

### 2.3 Archetype Evolution

A team's archetype is **re-evaluated at the start of every season** by re-running the same archetype assignment function used at save initialisation. The function takes the current roster as input — attributes, tags, age profile, and roster phase — and returns the archetype that best fits.

This means archetypes evolve naturally as rosters change. A `rebuilding` team that drafts well and retains its core may become `young-and-athletic`. A `veteran-contender` whose stars age out may shift to `rebuilding`. No special trigger is required — the function runs on schedule.

Mid-season archetype changes do not occur. The archetype is a season-level identity, not a game-by-game label.

### 2.3 Head-to-Head Resolution Function

When two rival teams meet (or when standings need updating), their result is resolved by a comparison function:

```
matchup_result(
  team_a,                  // archetype, strength rating, roster phase
  team_b,                  // archetype, strength rating, roster phase
  stylistic_matchup,       // how team archetypes interact (e.g. pace-and-space vs. defensive-juggernaut)
  home_advantage,          // fixed scalar bonus for home team
  randomness_roll,         // good day / bad day variance
  hot_streak_modifier      // applied if either team is on a winning or losing run
) → result                 // win/loss margin, notable events generated
```

**Stylistic matchup** is the key differentiator. A `pace-and-space` team with an unusually hot shooting roll can outscore a `defensive-juggernaut` on a given night — the stylistic disadvantage raises the variance, not the floor. A `defensive-juggernaut` that matches up well against a `young-and-athletic` team suppresses variance in the opposite direction.

**V1 implementation:** Lookup table for stylistic matchup modifiers (archetype A vs. archetype B → variance scalar and strength adjustment). Randomness roll is a flat distribution within the variance band. Notable event generation is a probability check against the result margin and the archetypes involved.

**Later:** Richer per-possession approximation; streak tracking that compounds the `hot_streak_modifier` over multiple games; full tag interaction for individual player contributions to team strength.

---

## 3. Rivalries

### 3.1 Pre-Generated Rivalries

At the start of every new save, a set of **pre-existing rivalries** is generated for the league. These exist before the player's first game and reflect the fictional league's history. Generation is partially randomised so every new league feels distinct.

Sources for pre-generated rivalries:

| Source | Example |
|---|---|
| **Geographic proximity** | Two teams in the same city or region share a built-in local rivalry |
| **Historical playoff meetings** | Two storied franchises that have met frequently in generated league history |
| **City/cultural dislike** | An algorithmically assigned friction between certain city pairings — basketball-unrelated, reflects the generated world's lore |
| **Archetype clash** | Two teams with archetypes that produce high-variance, high-drama matchups (e.g. `pace-and-space` vs. `defensive-juggernaut`) may be pre-seeded as rivals |

The combination of fixed rules and randomised assignment ensures structural rivalry logic is consistent while no two leagues feel identical.

### 3.2 In-Season and Emergent Rivalries

Rivalries also form dynamically during play, triggered by threshold events:

| Trigger | Description |
|---|---|
| **Playoff elimination** | The team that eliminated your team last season becomes a rival |
| **Repeated nail-biters** | Two teams that play multiple close games (within 5 points) in a season accumulate rivalry heat |
| **Standings collision** | Two teams fighting for the same top seed all season develop rivalry tension |
| **Repeat playoff meetings** | Teams that meet in the playoffs across multiple seasons deepen their rivalry automatically |
| **Upset** | A lower-rated team beating a dominant rival in a high-stakes game can seed a new rivalry |

Rivalries formed in-season can **persist beyond the season** into subsequent runs. They are part of the coach's historical record and the league's emergent lore.

### 3.3 Rivalry Cap

Each team — including the player's team — can hold a maximum of **2 active rivalries** at any time. This cap applies to both pre-generated and emergent rivalries combined.

When a new rivalry trigger fires and a team is already at the cap, the new rivalry **displaces the oldest or least-intense active rivalry**. Rivalry intensity is tracked (based on time since last trigger event and number of accumulated triggers); the weakest rivalry is dropped.

The cap prevents rivalry dilution and ensures every rivalry on the list feels significant.

### 3.4 Rivalry Mechanical Effects

An active rivalry with another team produces the following effects:

| Effect | Description |
|---|---|
| **Elevated crisis probability** | Games against this opponent have a higher base crisis density — big moments feel bigger |
| **Accumulated scouting knowledge** | Scouting reports against a long-standing rival carry over across seasons — you know them better than anyone else does |
| **Rivalry narrative event pool** | A set of story events unique to this matchup becomes available — moments that can only fire in rivalry games |
| **Rival coach identity** | The rival team's coach has a persistent identity and reputation. They adapt their tendencies over time in response to repeated matchups with the player |

---

## 4. Information Delivery

How league information reaches the player is part of the **presentation layer** and is deferred to a dedicated visual design session. The simulation layer produces the events; the presentation layer decides how and when to surface them.

Outputs the league sim produces for the presentation layer to consume:

- Standings updates (after each simulated round of games)
- Player movement events (waivers, signings, contract expirations)
- Notable game outcomes (upsets, blowouts, streak milestones, injury events)
- Rivalry heat changes (escalating or cooling)
- Team trajectory shifts (a `rebuilding` team spiking into contention; a `veteran-contender` beginning to decline)

---

## 5. Open Questions

| Question | Notes |
|---|---|
| Information delivery / presentation layer | How standings, events, and rivalry info reach the player (news ticker, scouting gate, etc.). Deferred to visual design session. |
| Rival coach identity depth | How much does a rival coach's identity persist and adapt? Does the player ever learn their tendencies explicitly, or only through accumulated scouting? |
| Pre-generated rivalry count | How many pre-existing rivalries should a new league start with? Enough to feel like history exists, not so many that everything is a rivalry. |
