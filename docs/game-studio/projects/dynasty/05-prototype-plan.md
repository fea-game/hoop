---
title: Prototype Plan
status: draft
owner_role: engineering-lead
contributors:
  - game-designer
  - producer
  - creative-product-lead
inputs:
  - 02-vision-brief.md
  - 04-design-package.md
  - 00-risk-register.md
open_questions:
  []
approved_by:
updated_at: 2026-05-15
---

# 05 — Prototype Plan

## Purpose

Identify the smallest tests for the biggest risks. Prototypes are not production work — they are questions made executable. Every prototype must map to a specific risk in the risk register.

## Risks Requiring Validation

<!-- Pull from 00-risk-register.md. List only risks that require prototyping to resolve. -->

| Risk ID | Description | Severity | Why prototype? |
|---|---|---|---|
| RISK-001 | Reputation model undefined | critical | Tier-gated systems cannot be balanced without testable thresholds and progression behavior. |
| RISK-002 | Offensive scheme vocabulary missing | high | Core offensive scoring and role fit cannot be validated until scheme definitions exist. |
| RISK-003 | Injury system stub | high | Roster continuity, emergency signing, and season pacing require executable injury behavior. |
| RISK-004 | Scouting knowledge numeric gap | high | Defensive scoring references a numeric signal not produced by current scouting flow. |
| RISK-005 | Crisis interventions may lack impact | high | Primary differentiator must be empirically meaningful in match outcomes and player perception. |

## Prototype Backlog

<!-- One entry per prototype. Order by risk priority. -->

### PROTO-001: Crisis Impact Greybox

- **Risk addressed:** RISK-005
- **Question to answer:** Do crisis interventions materially alter possession and game-level outcomes?
- **Smallest valid test:** Minimal exhibition simulator with 2-3 interventions and measurable before/after deltas.
- **Pass criteria:** Interventions show clear, repeatable impact bands without trivializing baseline simulation.
- **Fail criteria:** Outcome changes are noise-level, opaque, or dominant enough to invalidate tactical planning.
- **Effort estimate:** medium.
- **Dependencies:** Baseline possession loop and telemetry output.
- **Method:** grey-box.

### PROTO-002: Offensive Scheme Vocabulary Probe

- **Risk addressed:** RISK-002
- **Question to answer:** Can a compact offensive scheme set create distinct, believable team behavior?
- **Smallest valid test:** 3-5 offense schemes with provisional weights applied to a fixed roster matrix.
- **Pass criteria:** Each scheme yields legible play-pattern differences and role interaction signatures.
- **Fail criteria:** Schemes collapse into indistinguishable outcomes or require excessive complexity.
- **Effort estimate:** small-to-medium.
- **Dependencies:** Draft offensive scheme definitions.
- **Method:** design exercise plus code prototype.

### PROTO-003: Reputation Progression Calibration

- **Risk addressed:** RISK-001
- **Question to answer:** Can reputation tiers progress at satisfying cadence across one season and one off-season?
- **Smallest valid test:** Spreadsheet or scripted model with event inputs and threshold outputs over simulated season arcs.
- **Pass criteria:** Tier transitions align with intended milestones and do not stall or spike unpredictably.
- **Fail criteria:** Thresholds create dead zones, runaway growth, or incoherent offer gating.
- **Effort estimate:** small.
- **Dependencies:** Candidate formula and event contribution list.
- **Method:** design exercise.

### PROTO-004: Injury and Emergency Signing Flow Test

- **Risk addressed:** RISK-003
- **Question to answer:** Does a minimal injury model preserve roster pressure without collapsing player agency?
- **Smallest valid test:** Stub injury event generator with 3 severity tiers and one emergency signing path.
- **Pass criteria:** Injuries create meaningful adaptation decisions while keeping season flow playable.
- **Fail criteria:** Injuries feel arbitrary/punitive or are too inconsequential to matter.
- **Effort estimate:** medium.
- **Dependencies:** Free-agent pool accessibility and roster slot rules.
- **Method:** code prototype.

### PROTO-005: Scouting Knowledge Conversion Test

- **Risk addressed:** RISK-004
- **Question to answer:** Can card-reveal scouting be converted into a robust numeric input for simulation scoring?
- **Smallest valid test:** Mapping function from reveal states to normalized scouting_knowledge values with sample defender-ballhandler pairs.
- **Pass criteria:** Conversion produces stable, interpretable score effects and supports progression from unknown to known states.
- **Fail criteria:** Mapping is too coarse, too noisy, or too difficult for players to reason about.
- **Effort estimate:** small-to-medium.
- **Dependencies:** Scouting reveal taxonomy.
- **Method:** design exercise plus code prototype.

## Sequencing

<!-- In what order should prototypes run? Which are parallel? Which are blocked? -->

1. Run PROTO-001 first to validate core differentiator impact.
2. Run PROTO-002 and PROTO-005 in parallel once baseline instrumentation exists.
3. Run PROTO-003 after candidate reputation events are finalized.
4. Run PROTO-004 after free-agent and roster constraints are specified.

## Test Strategy

Engineering and design jointly execute prototypes, logging assumptions, metrics, and outcomes in decision notes. Evidence requires repeatable scenarios, explicit pass/fail against criteria, and documented recommendation to proceed, modify, or drop.

## Recommendation

Recommendation: `proceed with prototypes | skip prototypes (justify below) | modify concept first`
Reasoning: proceed with prototypes. The concept shape is strong, and targeted prototypes are the fastest path to resolve blocking foundation risks without premature production commitment.

## Alternatives

### Alternative A
Description: Skip prototypes and move directly to production planning.
Trade-offs: Faster planning cadence, but high risk of rework from unresolved foundational assumptions.

## Open Questions

1. Should prototype success require qualitative playtest feedback in addition to simulation metrics?

## Acceptance Criteria

- [x] Every prototype maps to a specific risk ID.
- [x] Pass/fail criteria are explicit for each prototype.
- [x] Sequencing is clear.
- [ ] Human approval recorded before any prototype work begins.

## Approval Status

Status: `draft`
Approved by:
Notes: Prototype backlog derived from unresolved high-severity items in `docs/dynasty/6-meta/2-backlog.md`.
