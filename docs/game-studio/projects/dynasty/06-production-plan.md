---
title: Production Plan
status: draft
owner_role: producer
contributors:
  - engineering-lead
  - game-designer
  - creative-product-lead
  - art-director
inputs:
  - 02-vision-brief.md
  - 04-design-package.md
  - 05-prototype-plan.md
  - 00-risk-register.md
open_questions:
  []
approved_by:
updated_at: 2026-05-15
---

# 06 — Production Plan

## Purpose

Convert the approved concept into a sequenced, dependency-explicit plan for building the game. Only starts after either the stress test passes with acceptable risk or prototype goals are met.

## Gate Check

<!-- Confirm the pre-conditions for production planning. -->

- [ ] Concept stress test outcome: `approved` or `approved-with-conditions`.
- [ ] Prototype plan outcome (if required): `approved`.
- [ ] All critical-severity risks are either resolved or have accepted mitigations.

## Milestones

<!-- Ordered sequence of major delivery points. Each milestone is a playable or demonstrable state. -->

| Milestone | Description | Deliverables | Definition of Done |
|---|---|---|---|
| M1 | Core Match Loop Playable | Exhibition game sim, crisis intervention layer, rotation and defensive scheme controls, baseline telemetry | One complete game can be played end-to-end with meaningful interventions and stable outputs |
| M2 | Seasonal Progression Slice | Between-game five-step flow, single decision economy, scouting preview and data persistence | Players can complete multi-game cycle with persistent contextual decisions |
| M3 | Off-Season and Career Loop | Seven-chapter off-season scaffold, contract resolution, draft/free-agent flow, coach offer outcomes | One full season-to-season transition is playable with coherent roster and coach progression |

## Slice Backlog

<!-- Implementation slices ordered by dependency. Each slice will become one or more IMP-XXX briefs. -->
<!-- Slices should be independently understandable and deliverable. -->

| Slice ID | Name | Milestone | Dependencies | Effort | Primary Role |
|---|---|---|---|---|---|
| S-001 | Foundational schema lock (reputation, offense schemes, scouting knowledge, injury MVP) | M1 | none | medium | game-designer |
| S-002 | Possession engine baseline with crisis hooks | M1 | S-001 | large | engineering-lead |
| S-003 | Defensive schemes and role assignment integration | M1 | S-001, S-002 | medium | engineering-lead |
| S-004 | Between-game decision economy and data persistence | M2 | S-002 | medium | game-designer |
| S-005 | Scouting and dossier progression integration | M2 | S-001, S-004 | medium | game-designer |
| S-006 | Relationship and morale carry-over MVP | M2 | S-002, S-004 | medium | game-designer |
| S-007 | Off-season chapter scaffolding and contract resolution | M3 | S-001, S-004, S-005 | large | game-designer |
| S-008 | Draft and free-agent flow MVP | M3 | S-005, S-007 | medium | engineering-lead |
| S-009 | League output simulation and offer generation | M3 | S-001, S-007, S-008 | medium | engineering-lead |

## Dependency Map

<!-- Explicit dependencies between slices. Undeclared dependencies are a leading cause of ordering failures. -->

```
S-001 → S-002 → S-004 → S-007 → S-008 → S-009
S-003 depends on S-001 and S-002
S-005 depends on S-001 and S-004
S-006 depends on S-002 and S-004
```

## Definitions of Done

<!-- What does "done" mean for this project? Apply to every slice. -->

A slice is done when:

1. It matches the approved implementation brief.
2. Relevant tests pass.
3. Trade-offs and follow-up risks are recorded.
4. Engineering Lead has signed off on testability.
5. Human has approved before the next slice begins.

## Recommended Sequence

Lock foundation schemas first, then establish a stable match-loop vertical slice before layering progression systems. Integrate between-game persistence before off-season chapters to avoid rework in data contracts. Add league output simulation only after season transition logic is verified.

## Major Risks

<!-- Top risks for the production phase. Full entries in 00-risk-register.md. -->

| Risk ID | Description | Mitigation |
|---|---|---|
| RISK-001 | Reputation model drift causes gate instability | Lock formula and thresholds before M2 |
| RISK-002 | Offensive scheme definitions remain incomplete | Timebox scheme specification and reduce initial scheme count |
| RISK-003 | Injury model introduces punitive variance | Cap severity frequency and test emergency recovery paths |
| RISK-004 | Scouting conversion lacks player clarity | Instrument reveal-to-score mapping and expose progression feedback |
| RISK-006 | Cross-system dependency rework | Enforce schema contracts and dependency order via slice gates |

## Alternatives

### Alternative A
Description: Split M3 into two milestones (off-season first, league output second).
Trade-offs: Better risk isolation, but more overhead in milestone management.

## Open Questions

1. What is the target cadence per slice for review and approval in active implementation?

## Acceptance Criteria

- [ ] Gate check is satisfied.
- [x] Milestones are named and described.
- [x] Slices are listed with dependencies.
- [x] Definitions of done are explicit.
- [ ] Human approval recorded.

## Approval Status

Status: `draft`
Approved by:
Notes: Initial production sequence synthesized from legacy docs and unresolved backlog constraints.
