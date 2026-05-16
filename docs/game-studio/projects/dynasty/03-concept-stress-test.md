---
title: Concept Stress Test
status: draft
owner_role: producer
contributors:
  - creative-product-lead
  - game-designer
  - engineering-lead
  - art-director
inputs:
  - 01-idea-brief.md
  - 02-vision-brief.md
open_questions:
  []
approved_by:
updated_at: 2026-05-15
---

# 03 — Concept Stress Test

## Purpose

Challenge the concept before design work begins. Expose scope, feasibility, market, and creative risks early when they are cheap to address. Kill weak ideas. Strengthen good ones.

## Strengths

<!-- What is genuinely strong about this concept? What makes it worth pursuing? -->

1. Distinct identity: coach-as-protagonist persistence layered over season-as-run structure.
2. Strong loop stack: live intervention gameplay, constrained between-game decisions, and structured off-season chapters.
3. High replay potential from roster churn, relationship carry-over, rivalry evolution, and identity card loadouts.
4. Clear scope boundaries already present (no trades, no full rival possession simulation).
5. Existing design corpus is detailed enough to support immediate prototype planning once blockers are resolved.

## Fatal Risks

<!-- Risks that would kill the project if unresolved. Must be addressed before Production Planning. -->

| Risk ID | Description | Mitigation Path |
|---|---|---|
| RISK-001 | Reputation system is undefined but gates progression and offer logic across loops. | Define numeric reputation model, thresholds, and contributing events before prototype lock. |
| RISK-002 | Offensive scheme vocabulary is missing while core simulation depends on scheme weights and role fit. | Create offensive scheme document and integrate into scoring/role assignment references. |
| RISK-003 | Injury system is referenced widely but has no minimum viable rules. | Define injury severity tiers, games-missed model, and emergency signing flow. |
| RISK-004 | Scouting knowledge requires continuous numeric input in simulation but current scouting model is card reveal based. | Specify numeric scouting field or conversion from reveal state to scoring input. |

## Scope Risks

<!-- Features or ambitions that are likely to exceed the team's realistic capacity. -->

1. Relationship, narrative, and league simulation depth can balloon scope before core fun is validated.
2. Draft presentation path (board vs crisis-style event) can consume UI effort too early.
3. Attempting to solve all medium/low backlog conflicts before first playable risks schedule drift.

## Technical Risks

<!-- Engineering concerns surfaced by Engineering Lead. -->

<!-- Feasibility status: green | amber | red -->
Feasibility status: `amber`

1. Core scoring models reference undefined inputs (reputation and scouting knowledge).
2. Cross-system coupling is high: roles, schemes, relationships, and card systems all touch possession scoring.
3. Undefined offensive scheme vocabulary blocks deterministic validation of offensive simulation behavior.

## Art Burden Risks

<!-- Visual direction concerns surfaced by Art Director. -->

1. Four card types require a unified visual language with high readability under time pressure.
2. Draft and crisis interfaces may require distinct visual treatment if both become card-driven.
3. Narrative clarity risks increase if league events and relationship states are not surfaced cleanly.

## Design Risks

<!-- Core loop or mechanics concerns surfaced by Game Designer. -->

1. Heat-state model inconsistency may produce unclear morale outcomes in match flow.
2. Role/tag vocabulary mismatches can create implementation ambiguity and balance drift.
3. Slot economy across in-season and off-season decision systems is not yet harmonized.
4. Synergy effects are conceptually defined but not integrated into possession scoring.

## Differentiation Check

<!-- How is this distinct from comparable titles? -->
<!-- Is the differentiation meaningful and defensible? -->

| Comparable | How we differ | Risk if they dominate |
|---|---|---|
| Traditional basketball management sims | Live crisis intervention cards and coach-as-RPG persistence | Audience may still prefer deeper spreadsheet realism |
| Deckbuilding roguelites | Sports simulation context with season-as-run and roster churn | If card layer is shallow, players may choose deeper deckbuilders |
| Auto battlers | Direct in-game coaching interventions and off-season contract drama | If interventions are low impact, differentiation collapses |

## Market and Audience Fit

Audience fit is plausible: sports strategy players and systems-heavy roguelite players overlap on decision depth and replayability. Reachability is strongest via clear positioning around coaching fantasy and dramatic interventions rather than broad sports simulation parity claims.

## Kill Criteria

<!-- Conditions under which we would stop this project. -->
<!-- Being explicit about kill criteria prevents sunk-cost continuation. -->

1. Prototype evidence shows crisis interventions do not materially change outcomes or player emotion.
2. Core loop cannot be made understandable within a short onboarding window.
3. Foundational blockers (reputation, offensive schemes, injuries, scouting knowledge) remain unresolved past prototype planning.

## Recommendation

<!-- Primary recommendation: proceed | proceed-with-conditions | rework | park | reject -->

Recommendation: `proceed-with-conditions`
Reasoning:
The concept is differentiated and structurally strong, but four high-severity foundation gaps must be resolved before production-credible implementation planning.

## Alternatives

### Alternative A
Description: Rework now by narrowing to a single-season exhibition-first prototype before off-season and league layers.
Trade-offs: Reduces near-term risk but delays validation of the full roguelite career promise.

### Alternative B
Description: Park advanced narrative and relationship depth until post-prototype to keep loop validation focused.
Trade-offs: Faster technical de-risking, but temporary reduction in storytelling distinctiveness.

## Open Questions

1. Which draft presentation mode should be validated first: board or crisis-style flow?
2. Should platform target remain desktop-first for v1 or include mobile constraints early?

## Risk Register Updates

<!-- New risks to add to 00-risk-register.md. -->

1. RISK-001 through RISK-004 marked as blocking and critical-to-high severity.
2. Scope and integration risks captured as non-blocking but active.

## Acceptance Criteria

- [x] All major risk categories are addressed.
- [x] A clear verdict is stated.
- [x] Kill criteria are explicit.
- [ ] Human can approve progression, request rework, reject, or park.

## Approval Status

Status: `draft`
Approved by:
Notes: Generated from existing `docs/dynasty/` concept corpus and backlog.
