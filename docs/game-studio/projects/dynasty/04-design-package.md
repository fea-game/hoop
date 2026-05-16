---
title: Design Package
status: draft
owner_role: game-designer
contributors:
  - creative-product-lead
  - engineering-lead
  - art-director
  - producer
inputs:
  - 02-vision-brief.md
  - 03-concept-stress-test.md
open_questions:
  []
approved_by:
updated_at: 2026-05-15
---

# 04 — Design Package

## Purpose

Turn the approved vision into a compact, decision-grade design shape. Not a complete GDD — the minimum structure needed to validate the design is sound before Prototype Planning or Production Planning begins.

## Core Loop

<!-- What does the player do every 10 seconds, 1 minute, 10 minutes? -->
<!-- Format: verb — action — consequence — repeat motivation -->

**10-second loop:** Observe possession context, assess heat/fatigue/matchups, and queue or trigger an intervention.
**1-minute loop:** Manage rotation and scheme cadence, spend limited crisis resources, and react to momentum swings.
**10-minute loop:** Execute a full game plan through live simulation, then convert outcomes into between-game progression decisions.

## Target Aesthetics

<!-- Which MDA aesthetics is this game primarily targeting? -->
<!-- sensation | fantasy | narrative | challenge | fellowship | discovery | expression | submission | competition -->

Primary: challenge, fantasy, narrative
Secondary: discovery, expression, competition

## Essential Mechanics

<!-- The rules that produce the core loop. Each mechanic must justify its existence. -->

### Mechanic: Live Crisis Intervention
- **Player verb:** intervene with situation cards, timeouts, and tactical adjustments during high-leverage moments.
- **Target aesthetic:** challenge, fantasy.
- **Minimal rules:** crisis windows, constrained hand, clear effects on immediate possession-level outcomes.
- **Expected dynamics:** risk-reward timing play and resource prioritization under pressure.
- **Comparable precedent:** sports timeout strategy plus deckbuilder hand economy patterns.
- **Risk/unknowns:** card impact must be legible and meaningful without overpowering simulation credibility.

### Mechanic: Background Coaching Plan
- **Player verb:** set rotations and defensive schemes while simulation runs.
- **Target aesthetic:** expression, challenge.
- **Minimal rules:** rotation queue, scheme selection, player role fit checks.
- **Expected dynamics:** pre-commitment planning with tactical adaptation as game state changes.
- **Comparable precedent:** manager sim tactical screens combined with live match flow.
- **Risk/unknowns:** offensive scheme vocabulary is currently missing, blocking complete model behavior.

### Mechanic: Between-Game Decision Economy
- **Player verb:** choose one high-impact contextual action each cycle (development, scouting, contract, morale, etc).
- **Target aesthetic:** challenge, discovery.
- **Minimal rules:** fixed five-step sequence with one meaningful decision slot and constrained options.
- **Expected dynamics:** deliberate trade-offs instead of exhaustive checklist management.
- **Comparable precedent:** run-based hub decisions in roguelites.
- **Risk/unknowns:** off-season action-count economy needs reconciliation with in-season slot logic.

### Mechanic: Off-Season Chapter Progression
- **Player verb:** navigate seven structured chapters of career and roster decisions.
- **Target aesthetic:** fantasy, narrative.
- **Minimal rules:** chapter order, influence tiers, contract and roster transition logic.
- **Expected dynamics:** season reset with persistent identity progression and strategic team rebuilding.
- **Comparable precedent:** campaign phase transitions in management games.
- **Risk/unknowns:** reputation scoring model and injury system are unresolved blockers.

### Mechanic: Persistent Coach Identity Loadout
- **Player verb:** build and equip identity-card toolkit that persists across seasons/runs.
- **Target aesthetic:** expression, discovery, narrative.
- **Minimal rules:** identity card collection with per-season loadout constraints.
- **Expected dynamics:** build differentiation and long-term mastery through constrained customization.
- **Comparable precedent:** roguelite meta loadout systems.
- **Risk/unknowns:** tuning long-term power curves without reducing run freshness.

## Systems Outline

<!-- Supporting systems: progression, economy, rewards, difficulty, social. -->
<!-- Each with: purpose, key inputs/outputs, key risks. -->

### System: Possession Simulation Engine
- Purpose: Produce believable and expressive basketball outcomes at action-chain granularity.
- Key inputs/outputs: player attributes, tags, roles, heat, fatigue, scheme weights -> events, outcomes, attribution.
- Key risks: undefined offensive schemes and missing synergy/scouting input harmonization.

### System: Card Ecosystem
- Purpose: Deliver strategic interventions and progression choices via four card types.
- Key inputs/outputs: roster state, context windows, chapter phase, card inventory -> interventions, player changes, identity progression.
- Key risks: mid-season acquisition clarity and unified visual language debt.

### System: Relationship and Morale Layer
- Purpose: Generate narrative continuity and chemistry effects across seasons.
- Key inputs/outputs: interactions, role fit, outcomes, history -> trust/synergy states, carry-over cards, morale shifts.
- Key risks: synergy effects are not fully integrated into possession scoring.

### System: League and Career Progression
- Purpose: Simulate world evolution and coach career opportunities between seasons.
- Key inputs/outputs: team strength/archetype, rivalry logic, contract outcomes, coach reputation -> offers, rivalries, league narratives.
- Key risks: reputation model undefined and rivalry rule consistency needs cleanup.

## Progression and Motivation

- **Short-term (session):** Win possessions and games through better crisis timing, tactical adaptation, and rotation management.
- **Mid-term (hours):** Shape roster, relationships, and card toolkit to create resilient seasonal runs.
- **Long-term (mastery/completion):** Build distinct coaching identities, unlock enduring legacy options, and create emergent league histories.

## Onboarding Plan

<!-- What must the player understand in the first 2 minutes? -->
<!-- How does the game teach through play rather than text? -->

1. Teach in one exhibition context: read court state, trigger one intervention, and observe outcome impact.
2. Reveal planning layer after first intervention succeeds to avoid initial overload.
3. Introduce between-game single decision slot immediately after game completion.
4. Defer advanced systems (deep scouting, full contract nuance, relationship edge cases) until baseline loop comprehension is confirmed.

## Pacing Outline

Games cycle between baseline flow (observation and planning) and peak crisis windows (card and timeout interventions). Between-game phase is a short strategic decompression point with one meaningful decision. Off-season chapters create macro pacing peaks around contract and roster inflection points.

## Art Direction Summary

Functional broadcast-inspired presentation with clear tactical overlays, high-contrast state indicators, and card/UI hierarchy optimized for speed of reading during pressure moments.

Key readability requirements:
1. Heat, fatigue, and morale states must be decipherable at a glance.
2. Crisis windows and legal interventions must be visually unmistakable.
3. Role and scheme effects must be understandable without reading dense text mid-play.

## Technical Assumptions

<!-- What technical choices are assumed in this design? -->
<!-- Each assumption that turns out to be false creates rework. Be explicit. -->

1. Central simulation controller orchestrates action-chain events and state updates.
2. Possession scoring architecture supports additive modifiers from roles, schemes, heat, fatigue, and matchup context.
3. League simulation remains output-driven and decoupled from full possession simulation.
4. Card systems are data-driven enough to add content without rewriting core simulation loops.

## Design Risks

<!-- Top risks from a design perspective. -->
<!-- Dominant strategies, boredom zones, confusion points, balance traps. -->

| Risk ID | Description | Mitigation |
|---|---|---|
| RISK-001 | Reputation model absent for tier-gated systems | Define model before prototype lock |
| RISK-002 | Offensive scheme vocabulary missing | Author offensive scheme spec and integrate references |
| RISK-003 | Injury loop undefined | Define MVP injury pipeline before production slicing |
| RISK-004 | Scouting numeric integration unresolved | Add scouting knowledge data model or conversion layer |
| RISK-005 | Slot economy inconsistency across loops | Specify in-season vs off-season action economy rules |

## Open Questions

1. Draft event presentation mode to prioritize for initial prototype.
2. Mobile constraints timing (early vs post-core-loop validation).

## Risk Register Updates

1. Updated with blocking foundation-model risks and loop economy integration risk.

## Acceptance Criteria

- [x] Core loop is explicit at all three time horizons.
- [x] All essential mechanics are named and justified.
- [x] Progression structure is addressed.
- [x] Onboarding approach is specified.
- [x] Technical assumptions are explicit.
- [x] The package is compact enough to be revised easily.
- [ ] Human approval recorded.

## Approval Status

Status: `draft`
Approved by:
Notes: Structured from existing system docs under `docs/dynasty/`.
