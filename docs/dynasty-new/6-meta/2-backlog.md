---
title: Hoop Dynasty - Backlog
---

The single source of truth for all unresolved design items. Three sections:

- **Conflicts** — two or more docs contradict each other; needs a decision before work proceeds
- **Open Questions** — design space not yet closed; needs a decision
- **Next Steps** — known missing pieces; needs work

Status values: `open` | `decided` | `done`

Cross-references use the new doc paths (e.g. `vision/2-season-structure.md`).

---

## 1. Conflicts

Items derived from the cross-document audit. High-severity items block downstream design or implementation. Medium-severity items create ambiguity. Low-severity items are cleanup.

### High Severity

| ID | Description | Source docs | Status |
|---|---|---|---|
| H1 | **Coaching offers: prior-team slot vs. separate option.** `vision/2-season-structure.md` says the prior team is *one of* the 2–3 offers. `loops/3-off-season.md` Chapter 0 implies re-signing is a separate option outside the 2–3 count — potentially 4 choices total. Decide: prior team counts as one slot within the 2–3, or is an extra outside the count. | `vision/2-season-structure.md`, `loops/3-off-season.md` | open |
| H2 | **Heat state model: 3 states vs. 5 states.** The Heat state table defines Hot / Neutral / Cold. The morale delta table in the same section uses Hot / Warm / Neutral / Cool / Cold. "Warm" and "Cool" are used but never defined. Either extend the state definition to five with explicit thresholds, or collapse the morale table to three entries. | `loops/1-game-loop.md` | open |
| H3 | **`veteran-leader` morale floor of 10 is in the Frustrated range, not Stable.** All three files say "morale floor of 10; never drops below Stable." Stable is 12–16; Frustrated is 7–11. A floor of 10 is Frustrated. Either raise the floor to 12, or change the prose to "never drops below Frustrated." Fix in all three files. | `loops/1-game-loop.md`, `mechanics/3-roles.md` | open |
| H4 | **Tag name mismatch: `shot-clock-savvy` vs. `late-clock-savvy`.** `loops/1-game-loop.md` uses `shot-clock-savvy`; `mechanics/2-player-model.md` names the same concept `late-clock-savvy`. Pick one and apply consistently across all docs and `reference/2-tag-vocabulary.md`. | `loops/1-game-loop.md`, `mechanics/2-player-model.md`, `reference/2-tag-vocabulary.md` | open |
| H5 | **`ball-stopper` tag is undefined.** Referenced in the shot clock exhaustion branch but absent from the tag vocabulary. Either add it to `reference/2-tag-vocabulary.md`, or replace the reference with an existing tag. | `loops/1-game-loop.md`, `reference/2-tag-vocabulary.md` | open |
| H6 | **`scouting_knowledge` is a live scoring-function input with no data model.** The defensive scoring function requires `scouting_knowledge(primary_defender, ball_handler)` as a continuous numeric value. The scouting system is a progressive card reveal — it produces no continuous score. No conversion layer is defined. Either define `scouting_knowledge` as a tracked numeric field, or respecify the scoring function to use revealed-card flags. | `mechanics/1-simulation-model.md`, `loops/2-between-games.md`, `mechanics/6-draft-and-scouting.md` | open |
| H7 | **Reputation system is undefined.** Reputation is the core meta-progression driver referenced in nearly every document. No file defines its numeric range, scoring formula, or tier thresholds. All tier-gated mechanics depend on thresholds that do not exist. Needs a dedicated section or doc. | `meta/1-design-notes.md`, `vision/2-season-structure.md`, `loops/1-game-loop.md`, `loops/3-off-season.md` | open |
| H8 | **Offensive schemes have no defining document.** `mechanics/1-simulation-model.md` references `scheme_weight(play_type)` and `mechanics/3-roles.md` depends on offensive scheme definitions — but no equivalent of `reference/3-scheme-vocabulary.md` (defensive side) exists for offense. See Next Steps: NS1. | `loops/1-game-loop.md`, `mechanics/3-roles.md`, `reference/3-scheme-vocabulary.md` | open |
| H9 | **Injury system is a stub.** Multiple docs reference injuries but no document defines severity tiers, games-missed model, or how emergency signings interact with the roster and free-agent pool. See Next Steps: NS2. | `loops/1-game-loop.md`, `loops/2-between-games.md`, `mechanics/2-player-model.md` | open |
| H10 | **Player–player synergy has no hook in the possession scoring function.** `mechanics/4-relationships.md` defines synergy bonuses as "probability bonuses on play types matching the synergy tag." The possession generator scoring function in `mechanics/1-simulation-model.md` includes no `synergy_modifier` term. Either add the term or explicitly mark integration as deferred in both docs. | `mechanics/4-relationships.md`, `mechanics/1-simulation-model.md` | open |
| H11 | **Between-game slot economy vs. off-season chapter economy are never reconciled.** In-season: one free decision slot per game. Off-season Chapter 3: 1 / 2–3 / 4+ scouting actions per influence tier. The relationship between these two cadences is never defined. Clarify whether the "one free decision slot" economy applies during the off-season, or whether chapter-action counts replace it. | `loops/2-between-games.md`, `mechanics/6-draft-and-scouting.md`, `loops/3-off-season.md` | open |

### Medium Severity

| ID | Description | Source docs | Status |
|---|---|---|---|
| M1 | **Rival displacement rule: "weakest" vs. "oldest or least-intense".** `meta/1-design-notes.md` says new rivalries displace "the weakest existing rivalry." `structure/2-league-simulation.md` says "the oldest or least-intense." Different criteria. Settle on one and update both files. | `meta/1-design-notes.md`, `structure/2-league-simulation.md` | open |
| M2 | **"Archetype" used for both players and teams without a unified vocabulary.** Team archetypes are formally defined in `structure/2-league-simulation.md`. Player archetypes are referenced throughout but never formally defined. Define the player archetype vocabulary in `mechanics/2-player-model.md`. | `structure/1-card-systems.md`, `mechanics/2-player-model.md`, `structure/2-league-simulation.md`, `mechanics/3-roles.md` | open |
| M3 | **Domain summary score derivation is undefined.** Domain summaries are described as "derived from attribute averages within each domain" but deferred. Scoring has 5 attributes, Defense has 4 — unequal sample sizes. Specify the derivation method and its relationship to player archetype. | `mechanics/2-player-model.md`, `structure/1-card-systems.md` | open |
| M4 | **"Trade leverage" listed as a reputation benefit; trades do not exist.** `vision/2-season-structure.md` lists "trade leverage" as a reputation effect. `structure/2-league-simulation.md` explicitly states there are no trades. Remove or replace with the correct free-agency equivalent. | `vision/2-season-structure.md`, `structure/2-league-simulation.md` | open |
| M5 | **Situation card pool mid-season acquisition mechanism is undefined.** The pool is "rebuilt each season through between-game decisions" but how new cards enter the pool mid-season is never described. Clarify whether cards can be acquired mid-season via the between-game slot, or whether the pool is fixed at pre-season setup. | `structure/1-card-systems.md`, `loops/2-between-games.md`, `loops/3-off-season.md` | open |
| M6 | **Scheme name mismatches between game-loop and scheme-vocabulary docs.** `loops/1-game-loop.md` §5 uses "protect the three-point line" (canonical: `protect-the-arc`) and "zone press" (does not map cleanly to `pressure` or `zone`). Update example names in `loops/1-game-loop.md` to match canonical vocabulary. | `loops/1-game-loop.md`, `reference/3-scheme-vocabulary.md` | open |
| M7 | **Narration system and narrative tags depend on an out-of-scope document.** Several files reference `../brainstorming/3-storyline.md` for narrative tags and the narration system. Player card narrative tags are undefined within this doc set. Either inline the relevant vocabulary or make the dependency explicit. | `vision/1-game-concept.md`, `vision/2-season-structure.md`, `structure/1-card-systems.md` | open |
| M8 | **Development card timing: "between seasons" vs. "between games" is ambiguous.** `mechanics/2-player-model.md` says permanent attribute changes occur "between seasons." `loops/2-between-games.md` lists "development card application" as a between-game action. Whether mid-season development cards produce only temporary boosts is never explicitly stated. Clarify the permanent/temporary distinction maps to between-season vs. mid-season timing. | `mechanics/2-player-model.md`, `loops/2-between-games.md`, `loops/3-off-season.md` | open |
| M9 | **`breakout-star` and `clutch-performer` tags referenced but not defined.** Both appear in `loops/1-game-loop.md` as unlockable tags from a hot season. Neither appears in `reference/2-tag-vocabulary.md`. Add them with defined simulation effects, or move them to the narrative tag system. | `loops/1-game-loop.md`, `reference/2-tag-vocabulary.md` | open |
| M10 | **Elite synergy situation cards: carry-over cap coverage undefined.** Elite player–player synergy "unlocks synergy-specific situation cards." The 3-card carry-over cap is defined only for coach–player relationship cards. Whether synergy cards count against the same cap is not stated. A roster with 2 elite synergies and 2 strong coach–player relationships could generate 4 eligible carry-over cards with no tie-breaking rule. | `mechanics/4-relationships.md`, `structure/1-card-systems.md` | open |
| M11 | **Carry-over cards are additive, but this is only explicit in one file.** Only `mechanics/4-relationships.md` explicitly states carry-over cards are additive. `structure/1-card-systems.md` and `meta/1-design-notes.md` describe the cap without clarifying whether cards replace slots or expand the pool. Add the additive clarification to both files. | `structure/1-card-systems.md`, `meta/1-design-notes.md`, `mechanics/4-relationships.md` | open |

### Low Severity

| ID | Description | Source docs | Status |
|---|---|---|---|
| L1 | **Situation card pool: "owned" vs. "selected from available pool" terminology is inconsistent.** `structure/1-card-systems.md` states ~15–20 cards are *owned* per season; `loops/3-off-season.md` Chapter 6 describes selecting ~15–20 from a larger "available pool." Define "available pool" vs. "owned pool" vs. "season working set" as distinct terms, or clarify they are the same thing. | `structure/1-card-systems.md`, `loops/3-off-season.md` | open |
| L2 | **Identity Card library cap: within-career vs. cross-save scope unclear.** Both docs use "~20" for the library cap. Whether cross-save inheritance can push the combined pool above ~20 is not addressed. | `structure/1-card-systems.md`, `loops/3-off-season.md` | open |
| L3 | **Duplicate section label `2.3` in `structure/2-league-simulation.md`.** Two sections are both labelled `### 2.3`: "Archetype Evolution" and "Head-to-Head Resolution Function." Renumber the second to `2.4`. | `structure/2-league-simulation.md` | open |
| L4 | **`Film Room Read` card activation conditions are undefined.** Referenced as a situation card that reveals opponent hidden information, but no doc defines which crisis type it is valid for, what it reveals, or how it interacts with the progressive scouting model. Add a definition to `structure/1-card-systems.md` or `loops/2-between-games.md`. | `structure/1-card-systems.md`, `loops/2-between-games.md` | open |
| L5 | **`role_mismatch()` function has different parameter names in two files.** `mechanics/3-roles.md` (offensive section) uses `touches_this_game` / `role_touch_expectation`; the defensive section uses `assignments_this_game` / `role_assignment_expectation`. Decide whether these are one function or two, and unify naming. | `mechanics/3-roles.md` | open |

---

## 2. Open Questions

Design decisions not yet made. Organized by the doc they primarily belong to.

| ID | Question | Source doc | Status |
|---|---|---|---|
| Q1 | **Player–player synergy depth.** Full synergy accumulation speed, decay rate, and conflict repair mechanism undefined. Data model interface is fixed; behavioral depth deferred. | `mechanics/4-relationships.md` | open |
| Q2 | **Reunion narrative events.** Story events triggered on player reunion (returning star, mentor/pupil, rival becomes teammate). Story pool for this axis not yet designed. | `mechanics/4-relationships.md` | open |
| Q3 | **Coach–coach relationships.** Rival coaches as persistent entities with relationship history. Not in scope for current phase; data model does not include this axis yet. | `mechanics/4-relationships.md` | open |
| Q4 | **League simulation information delivery.** How standings, events, and rivalry info reach the player. Deferred to visual design session. | `structure/2-league-simulation.md` | open |
| Q5 | **Multiplayer or single-player only.** Single-player implied but not decided. Should be explicitly deferred rather than assumed. | — | open |
| Q6 | **Platform targets.** Not addressed. Session length and card visual language suggest mobile viability alongside desktop. | — | open |
| Q7 | **Play type action budgets.** Base shot clock budget per play type (e.g. transition vs. half-court set). Interface supports variable budgets; calibration deferred. | `mechanics/1-simulation-model.md` | open |
| Q8 | **Draft event UI.** Draft Board (simple ranked list) vs. Crisis-Style Event (card-based, timing pressure). Deferred to dedicated design session. | `mechanics/6-draft-and-scouting.md` | open |
| Q9 | **Reputation tier thresholds.** At what reputation scores does the coach cross from `New Coach` → `Established Coach` → `Franchise Coach`? Needs calibration once the reputation scoring model exists (see H7). | `loops/3-off-season.md` | open |
| Q10 | **Card visual language.** All four card types share a unified visual language. Art style, layout, tier indicators, domain summary display — deferred to a dedicated visual design session. | `structure/1-card-systems.md` | open |
| Q11 | **Attribute scaling and calibration.** Base values per archetype, growth curves, min/max ceilings per tag interaction. Needs a calibration pass once the simulation engine is prototyped. | `mechanics/2-player-model.md` | open |
| Q12 | **Full IQ tag vocabulary.** Current list covers known simulation nodes. Full vocabulary expands as new decision nodes are designed. | `reference/2-tag-vocabulary.md` | open |
| Q13 | **Tag count limits per player.** Is there a cap on how many tags a player can hold? Deferred. | `mechanics/2-player-model.md` | open |
| Q14 | **Draft class size.** How many prospects per class? How many are visible before the draft? | `mechanics/6-draft-and-scouting.md` | open |
| Q15 | **Scouting card vocabulary.** What specific scouting actions exist? How are they acquired? | `mechanics/6-draft-and-scouting.md` | open |
| Q16 | **Rival team draft behavior.** Do rival teams have scouting tendencies that can be observed? | `mechanics/6-draft-and-scouting.md` | open |
| Q17 | **Prospect generation.** How are prospect attributes and tags procedurally generated? | `mechanics/6-draft-and-scouting.md` | open |
| Q18 | **Free agent scouting limits.** Is there a cap on how many free agents can be scouted per season? | `mechanics/6-draft-and-scouting.md` | open |
| Q19 | **Trust decay rate.** After how many seasons apart does coach–player trust begin to decay? | `mechanics/4-relationships.md` | open |
| Q20 | **Conflict relationship repair.** Can a negative-polarity player–player relationship be repaired? Mechanism undefined. | `mechanics/4-relationships.md` | open |
| Q21 | **Negotiation card vocabulary.** Names, costs, and effect magnitudes for contract negotiation cards. Belongs to a card design pass. | `mechanics/5-contract-resolution.md` | open |
| Q22 | **Counter condition vocabulary.** What conditions can a player counter with beyond role and morale? | `mechanics/5-contract-resolution.md` | open |
| Q23 | **Age factor in contract resolution.** Should player age affect willingness to sign? Not yet modelled. | `mechanics/5-contract-resolution.md` | open |
| Q24 | **Waiver timing.** Distinction between off-season waivers and in-season waivers? | `loops/3-off-season.md` | open |
| Q25 | **Zone role tags.** `zone-anchor` and zone-scheme-specific role binding not defined. Belongs to a dedicated zone scheme design session. | `reference/3-scheme-vocabulary.md`, `mechanics/3-roles.md` | open |
| Q26 | **Scheme fit scoring.** When a roster lacks role tags a scheme rewards, should the simulation penalise `scheme_weight` globally or only at the individual response level? | `mechanics/3-roles.md` | open |
| Q27 | **Role tag manual override UX.** How the coach interacts with offensive and defensive role tags mid-season. Not yet designed. | `mechanics/3-roles.md` | open |
| Q28 | **Role conflict resolution.** When two players share a primary role, should the simulation penalise scheme fit score? | `mechanics/3-roles.md` | open |
| Q29 | **`opponent_scheme` activation.** At what phase does the defensive auto-assignment function begin receiving real opponent scouting input? Tied to scouting system depth. | `mechanics/3-roles.md` | open |
| Q30 | **Rival coach identity depth.** How much does a rival coach's identity persist and adapt over seasons? | `structure/2-league-simulation.md` | open |
| Q31 | **Pre-generated rivalry count.** How many pre-existing rivalries should a new league start with? | `structure/2-league-simulation.md` | open |

---

## 3. Next Steps

Known missing pieces that require new design or writing work.

| ID | Description | Priority | Status |
|---|---|---|---|
| NS1 | **Create offensive schemes document.** The possession generator's `scheme_weight(play_type)` and offensive role assignment both depend on offensive scheme definitions. No document defines the offensive scheme vocabulary. Equivalent of the defensive scheme section in `reference/3-scheme-vocabulary.md`. Blocks: H8. | high | open |
| NS2 | **Define minimum viable injury system.** Severity levels, games-missed model, and the emergency signing flow. Multiple docs reference injuries as a real mechanic; no doc defines how they work. Blocks: H9. | high | open |
| NS3 | **Define reputation scoring model.** Numeric range, scoring formula, tier boundaries, and what actions contribute to reputation. Nearly every meta-progression mechanic gates on this. Blocks: H7, Q9. | high | open |
| NS4 | **Define player archetype vocabulary.** Player archetypes are referenced in role assignment, development cards, and the possession generator but never formally defined. Belongs in `mechanics/2-player-model.md`. Blocks: M2. | medium | open |
| NS5 | **Define domain summary score derivation.** How attribute domain scores are computed from the 15 raw attributes, and how they relate to player archetype. Blocks: M3. | medium | open |
| NS6 | **Add `synergy_modifier` to possession scoring function.** Player–player synergy effects are defined in `mechanics/4-relationships.md` but absent from the scoring function in `mechanics/1-simulation-model.md`. Blocks: H10. | medium | open |
| NS7 | **Inline or formally reference narrative tag vocabulary.** Player card narrative tags are currently defined only in an out-of-scope document (`../brainstorming/3-storyline.md`). Either inline the relevant vocabulary in `reference/2-tag-vocabulary.md` or add an explicit dependency note. Blocks: M7. | medium | open |
| NS8 | **Define `scouting_knowledge` as a tracked field.** The defensive scoring function requires a continuous numeric scouting value. The scouting system produces card reveals, not numbers. A conversion layer must be designed. Blocks: H6. | medium | open |
| NS9 | **Design the draft event UI.** Two candidate models (board vs. crisis-style). Needs a dedicated design session. Blocks: Q8. | low | open |
| NS10 | **Card visual language design session.** Unified visual language for all four card types. Deferred. Blocks: Q10. | low | open |
