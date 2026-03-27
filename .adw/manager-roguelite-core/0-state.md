# Workflow State: manager-roguelite-core

## Status
current-phase: 5 — Plan
phase-status: pending

## Completed phases
- [x] 1 — Idea
- [x] 2 — Research
- [x] 3 — Prototype
- [x] 4 — PRD
- [ ] 5 — Plan
- [ ] 6 — Refine
- [ ] 7 — Execution
- [ ] 8 — QA

## Notes
- Two-stage scope: (A) resolve open design questions → PRD; (B) code prototype of the autobattler loop
- All three core systems treated equally: tactic chain, chemistry/familiarity, nemesis
- Prototype is a runnable code slice, not a design doc
- Game constraints: cross-platform mobile + desktop, free release, minimal effort

## Prototype findings (Phase 3)
- Tech: SvelteKit 5 + Vite, located at prototypes/hoop-manager/
- Three screens implemented: Draft → Tactic Chain → Match Summary
- Prototype question answered: the role-slot layout (5 slots + 2 tactic cards + synergy indicators)
  fits a 390px mobile screen and is legible. The tap-to-select-then-assign pattern works
  without drag-and-drop; simpler and more reliable on mobile than drag.
- Synergy indicator pattern confirmed: tag-highlight approach (green = present, inactive = grey)
  is immediately readable. Players understand which tags are needed at a glance.
- Match summary reveal (score animation + key moments list) provides satisfying feedback loop.
  Chemistry delta bar and familiarity gain note ground post-match decisions.
- Architecture decision: single-page screen router via $state('draft'|'chain'|'match') in a
  class-based Svelte 5 store works cleanly. No SvelteKit routing needed for the prototype loop.
- Key finding: the "bench + select + assign to slot" flow adds one interaction step vs. drag-drop
  but is far more reliable on touch. Keep this for the shipped product.
- Key risk confirmed: tactic chain screen is information-dense. With 5 role slots + 2 tactic
  slots + synergy readout all visible, the screen scrolls on small devices. Collapsible bench
  or a tabbed layout will be needed in the full product.
- Familiarity bars render correctly but are passive in v1 (accumulate but don't yet gate
  synergies). This is intentional — the mechanic is scaffolded for PRD to specify thresholds.
