---
title: Risk Register
status: draft
project: dynasty
updated_at: 2026-05-15
---

# Risk Register — Dynasty

## Purpose

Track all known risks across the full project lifecycle. Every open question that is not blocking a phase must be accepted as a risk and recorded here.

## Risk Status Vocabulary

- `open` — active risk, not yet mitigated.
- `accepted` — known and consciously accepted.
- `mitigated` — addressed with a confirmed solution.
- `resolved` — no longer a risk.
- `blocking` — blocks phase progression until resolved.

## Severity Vocabulary

- `critical` — threatens project viability or core vision.
- `high` — significant impact on scope, quality, or schedule.
- `medium` — manageable with attention.
- `low` — minor or speculative.

## Risks

<!-- Add a new entry for each risk. Increment ID sequentially. -->

### RISK-001

| Field | Value |
|---|---|
| **Description** | Reputation system is undefined (range, formula, and tier thresholds), but is required by off-season influence, coach offers, and progression gating. |
| **Category** | design |
| **Phase Introduced** | 03-concept-stress-test |
| **Status** | blocking |
| **Severity** | critical |
| **Confidence** | high |
| **Mitigation** | Define a minimum viable reputation model and validate with prototype calibration before gate advancement. |
| **Owner Role** | game-designer |
| **Blocks Progression** | yes |
| **Updated** | 2026-05-15 |

---

### RISK-002

| Field | Value |
|---|---|
| **Description** | Offensive scheme vocabulary is missing while possession scoring and role assignment depend on scheme-weight logic. |
| **Category** | design |
| **Phase Introduced** | 03-concept-stress-test |
| **Status** | blocking |
| **Severity** | high |
| **Confidence** | high |
| **Mitigation** | Create offensive scheme spec with compact v1 scope and integrate terms across mechanics docs. |
| **Owner Role** | game-designer |
| **Blocks Progression** | yes |
| **Updated** | 2026-05-15 |

---

### RISK-003

| Field | Value |
|---|---|
| **Description** | Injury system is referenced across loops but has no defined severity, recovery, or emergency signing behavior. |
| **Category** | design |
| **Phase Introduced** | 03-concept-stress-test |
| **Status** | blocking |
| **Severity** | high |
| **Confidence** | high |
| **Mitigation** | Define injury MVP rules and run flow validation prototype before production slicing. |
| **Owner Role** | game-designer |
| **Blocks Progression** | yes |
| **Updated** | 2026-05-15 |

---

### RISK-004

| Field | Value |
|---|---|
| **Description** | Scouting knowledge is required as a numeric simulation input, but scouting currently yields reveal states/cards only. |
| **Category** | technical |
| **Phase Introduced** | 03-concept-stress-test |
| **Status** | blocking |
| **Severity** | high |
| **Confidence** | high |
| **Mitigation** | Define conversion from scouting reveals to normalized numeric knowledge score and validate stability. |
| **Owner Role** | engineering-lead |
| **Blocks Progression** | yes |
| **Updated** | 2026-05-15 |

---

### RISK-005

| Field | Value |
|---|---|
| **Description** | Crisis interventions may be either too weak to matter or too dominant, undermining core game identity. |
| **Category** | design |
| **Phase Introduced** | 03-concept-stress-test |
| **Status** | open |
| **Severity** | high |
| **Confidence** | medium |
| **Mitigation** | Run intervention impact prototype with explicit telemetry and pass/fail thresholds. |
| **Owner Role** | engineering-lead |
| **Blocks Progression** | no |
| **Updated** | 2026-05-15 |

---

### RISK-006

| Field | Value |
|---|---|
| **Description** | Cross-system dependency density (roles, schemes, scouting, relationships) increases rework risk if schema contracts are not locked early. |
| **Category** | delivery |
| **Phase Introduced** | 06-production-planning |
| **Status** | open |
| **Severity** | medium |
| **Confidence** | medium |
| **Mitigation** | Enforce dependency-ordered slices and schema review gate before implementation briefs. |
| **Owner Role** | producer |
| **Blocks Progression** | no |
| **Updated** | 2026-05-15 |
