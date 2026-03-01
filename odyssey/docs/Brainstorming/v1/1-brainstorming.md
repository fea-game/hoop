---
title: Brainstorming
---

## Synthesis from Motivation & Inspiration
- Focus: Single-player basketball RPG with world exploration, player progression, and story-driven elements.
- Inspirations: NBA2K MyPlayer, Pokémon (exploration/collection), RPGs (customization, story), Captain Tsubasa (unique backgrounds), city builders (discovery), roguelites (replayability).
- Avoids: Grind, pay-to-win, pure team management sim.

## Game World Ideas
- **Semi-Open World:** World consists of different regions, countries, and a global area. Exploration is rewarded (mentors, items, story events).
- **World Progression:** Player starts in one region and must succeed to unlock access to others, eventually reaching a global stage.
- **Dynamic World:** Regions have unique cultural traits and influencing factors. Street tournaments, scouting, and rival encounters occur dynamically.
- **Rivalries & Relationships:** Rivalries can form between players, squads, and even regions, influencing story and matches. Long-lasting rivalries can evolve into nemesis relationships.
- **Fictional League:** Creative freedom for rules, characters, and locations. (TO BE DECIDED: Real-world countries or a fantasy world?)
- **Fog-of-War Exploration:** Each region begins hidden; courts, shops, gyms, and points of interest are revealed through player movement (Civilization-like uncovering) with seed-based procedural variation per run.
- **Region Unlock Criteria:** "Domination" of current region (win key tournaments / prestige threshold) unlocks travel to a new region; regions offer unique training buffs (e.g., stamina gains x2) and mentor pools.
- **Procedural Seeding:** World, local players, rival archetypes, and location buffs generated from a season/run seed ensuring replayable variety while enabling reproducibility.

## Core Mechanics

### Player & Squad Progression
- **Player Attributes:** Skills level up via play, training, and rare mentors/items.
- **Player Traits:** Unique backgrounds (inspired by Captain Tsubasa, NBA 2K Badges and Project Zomboid) give special abilities or challenges.
- **Player Knowledge:** Playing with or against others reveals their attributes, skills, traits, and tendencies over time.
- **Collectibles:** Gear (like shoes and other wearables), skills, or perks found in the world affect play style and attributes. (TO BE SPECIFIED FURTHER)
- **AI Adaptation:** After a loss, AI players might train or recruit to improve their capabilities and strategies.

### On-Court Gameplay
- **Game Modes:** Games range from 1v1, 2v2, to 3v3, with the player always participating.
- **Arcade-Sim Hybrid:** Accessible but deep controls.
- **Signature Moves:** Unlock/equip special moves or animations.
- **Team Chemistry & Familiarity:**
    - Relationships with teammates affect performance. Chemistry is influenced by winning, losing, or impressive plays.
    - High familiarity with squad members unlocks set plays and advanced strategies (e.g., pick and roll, post-ups). (TO BE SPECIFIED FURTHER)
- **Customizable Strategies:** A building-block engine allows for creating custom plays. Availability of blocks depends on player IQ, skills, chemistry, and familiarity. (TO BE SPECIFIED FURTHER)
- **Teammate Control Model:** Possession-centric selection: when any squad member has the ball the player can choose from context-aware action cards (dribble variants, pass lanes, shot types, special) with success chances derived from attributes, traits, fatigue, chemistry. Off-ball teammates follow AI behaviors influenced by familiarity & assigned development goals.
- **Knowledge Reveal:** Repeated encounters gradually surface hidden rival stats/traits, lowering uncertainty in success probability ranges.

### Off-Court Gameplay
- **Squad Building:**
    - Build a squad of up to 4 players (3 starters, 1 rotation for 3v3).
    - If the squad is incomplete, random local players are available for selection.
    - Recruiting requires providing incentives (e.g., money, playing time, chance of success). (TO BE SPECIFIED FURTHER)
    - Strategic decision: Evolve the current squad or recruit better players at the cost of chemistry and familiarity.
- **Training & Mentorship:** Choose how to spend time (train, explore, build relationships).
- **Story Choices:** Decisions affect path, unlock/close opportunities.
- **Indirect Teammate Development:** Player sets wearables and dialog-driven growth focuses (e.g., "improve perimeter defense"), but teammates autonomously gain XP and evolve; direct micro-training is reserved for the user's avatar to preserve differentiation.
- **Mentor & Location Synergy:** Visiting specialty courts or gyms applies temporary training modifiers; mentors may require prior exploration knowledge or rivalry prestige thresholds.

### Roguelite Elements
- **Run-based Progression:** Each season/run is unique (mentors, rivals, events).
- **Permanent Progression:** Some unlocks/knowledge persist between runs (backgrounds, skills, starting bonuses).
- **Seed Persistence:** Player can optionally reuse a prior world seed to attempt optimized routing with accumulated meta-knowledge.
- **Adaptive Opposition:** Post-loss AI squads may recruit or intensify training focus areas, generating emerging rival build paths.

### Failure Handling
- **Regular Match Loss:** Grants reduced XP and minimal chemistry gain (may decay if performance poor); prestige & reputation gains withheld; knowledge still accumulates.
- **Tournament Elimination:** Ends progression in that bracket for the season; player can pivot to side events, training arcs, or exploration to recover advantage.
- **Strategic Recovery Loop:** Losses increase probability of encountering scouting events or mentor opportunities offering comeback pathways (balancing morale without trivializing failure).

### Session Length & Accessibility
- **Flexible Session Design:** Core loops (explore tile -> trigger encounter/event OR play short-sided match) support 5–10 minute micro sessions while longer arcs (tournament run + exploration sweep) scale to 45–60 minutes.
- **Touch-Friendly Interaction:** Action selection panels and exploration movement simplified to tap/drag; success probability & trait effect overlays presented as concise icon stacks.
- **Return-Friendly State:** Mid-region exploration, pending mentor meeting, or queued tournament round each form natural save points; quick re-entry surfaces "next 3 actionable options" UI.
- **Diegetic UI Scaling:** High IQ/vision traits widen vignette & highlight pass lanes—also functions as an accessibility aid for clarity on small screens.

## Art Style

### High-Level Direction
- Core Split: Top-down exploration uses a lightweight, modular sprite system; match view uses stylized manga/comic action panels plus minimal 3D/2.5D staging for positioning and camera context.
- Tone: Energetic, aspirational shonen-sports feel (Captain Tsubasa influence) but restrained enough to allow fast production.

### Exploration Layer (Top-Down)
- Base Assets: Pick an existing permissive CC0 or low-cost RPG sprite pack with 3–5 body bases (short, tall, lanky, strong).
- Customization: Implement a JSON-driven layer map (body -> skin tone palette swap -> hair overlay -> wearable overlays -> trait icon).
- Tech: Simple palette swap (nearest-color mapping) plus optional tint masks for team colors.
- Output: Real-time composited sprites (no need for AI generation here initially).

### Match Layer (Perspective + Panels)
- Spatial Context: Lightweight 2.5D court (orthographic or shallow perspective) with placeholder capsule rigs for positioning.
- Action Resolution: After player selects an action, generate 2–3 manga panels: (Setup) -> (Clash/Motion) -> (Outcome).
- Panel Styles: Monochrome ink with selective color pops (team color, ball, special effects) to emphasize tactical choices.
- Speed: Cache common poses (dribble, pass, jump, block) as ControlNet pose templates or static silhouette layers.
- Generative Path: Use a stable pipeline (e.g. Stable Diffusion or Flux + LoRA per recurring character for consistent face/hair).
- Fallback: If generation exceeds time budget (e.g. >1.0s), show pre-composited template panels with dynamic text overlays.

### Dynamic Character Consistency
- Data Model: Each player has a style seed (hash of name + trait IDs) used for: palette selection, prompt embedding token (e.g. <RIVAL_07>).
- LoRA Strategy: Batch-generate a small set (4–6) of high-value rivals/squad members; generic players use base model + descriptive prompt tags.
- Wearables: Maintain a vector/flat color layer library (SVG or PNG with alpha) that can be composited pre-generation (via ControlNet mask) or post-generation (overlay if alignment is stable).
- Body Types: Provide silhouette masks to upstream model via inpainting to control proportions.
- Versioning: Store generated panel metadata (prompt, seed, RNG) for reproducibility/debug.

### Pipeline Phases
1. Prototype (No AI): Hand-assemble panels using layered static art + effect overlays.
2. Hybrid: Introduce AI only for “hero” moments (critical passes, clutch shots).
3. Full: Expand AI panel generation to most actions; refine caching/performance.
4. Enhancement: Add trait-specific visual motifs (e.g. spark trails, aura lines) via post-process shader or overlay library.

### Performance & Tooling
- Panel Cache: Key on (actionType, playerTraitCluster, successTier).
- Async Gen: Spawn generation in background; display placeholder composition if not ready; swap in final panel.
- Asset Build Script: Generates body-type palettes and wearable composite previews for QA.

### Risk Mitigation
- Consistency Issues: Limit AI usage early; invest in a robust manual base pack.
- Time Sink: Fix a hard budget per action (e.g. 800ms target, fallback at 1000ms).
- Style Drift: Central style guide (brush weight, contrast, color pop rules).

### Immediate Next Steps (if you want to move forward)
- Choose base top-down sprite pack candidates.
- Define 5–8 canonical action types (pass, drive, shot, block, steal, special).
- Draft style guide (panel layout grid, font for SFX, color accent rules).
- Decide initial AI vs manual split (e.g. only “shot” and “special” use AI in v0).

## Core Gameplay Loop

### Overview
The loop layers micro decisions (tile exploration, short matches, training, recruitment) inside region progression toward season domination, all governed by a reproducible procedural seed to enable roguelite variety and meta learning.

### Create a Player
Before starting a season, a player has to be created.

### Season (Run) Loop
1. Seed Initialization (world, regions, rival archetypes, mentor pools, wearable distribution).
2. Start in first region; pursue prestige and tournament wins to meet domination thresholds.
3. Unlock subsequent regions sequentially; each introduces new buffs, mentors, rivals.
4. Reach global stage OR conclude upon defined end condition (final tournament, time limit, narrative milestone).
5. Season Wrap-Up: Persist meta unlocks (backgrounds, select skills, style seeds) and optionally reuse seed for optimized routing in next run.

### Region Progression Sub-Loop
1. Enter region (fog-of-war grid hidden).
2. Explore tiles to reveal courts, gyms, shops, mentors, events.
3. Trigger dynamic events: rival encounter, scouting, item discovery, side match, mentor lead.
4. Accrue prestige, chemistry, knowledge, buffs; pursue tournaments / key courts.
5. Dominate region (threshold of prestige or tournament victory) to unlock travel option.

### Exploration Micro-Loop
1. Move to adjacent tile (reveals terrain + rolls event table).
2. Surface actionable options (Match, Training, Recruit, Story, Shop, Skip).
3. Player chooses one; unchosen opportunities may decay or persist per rules.
4. Resolve choice; apply progression deltas (attributes, fatigue, chemistry, knowledge, buffs).
5. Present “Next 3 Suggestions” (context-sensitive recommended actions) for continuity and quick re-entry.

### Match Loop (Short-Sided Basketball 1v1/2v2/3v3)
1. Initialize possession with action card set (dribble variants, pass lanes, shot types, specials) derived from attributes, traits, fatigue, chemistry, familiarity, knowledge certainty.
2. Player selects an action; success probability displayed as range (narrows with rival knowledge).
3. Resolve via panel sequence (Setup → Clash/Motion → Outcome) affecting score, fatigue, chemistry, trait triggers.
4. Update stats: XP ticks based on participation in match, knowledge reveal increments, possible unlock of new play blocks at familiarity thresholds.
   - Decision: Have user's player taking most actions (+ player XP & - team chemistry), or distribute them (+ other players XP & + team chemistry)
5. Alternate possession or chain fast-follow actions (rebounds, steals) until win/loss condition.
6. Post-Match screen: summarize XP, prestige, chemistry delta, rival adaptations queued, suggestions.

### Training & Mentorship Loop
1. Select location/mentor (location modifiers: e.g. stamina gain x2, trait synergy boosts).
2. Choose focus (primary attribute, secondary tweak, trait progress, signature move unlock attempt).
3. Resolve with seed-based variance; apply fatigue and attribute XP; possible card / trait unlock.
4. Return to exploration decision point with updated suggestions.

### Recruitment & Relationship Loop
1. Initiate dialog with prospective player (local or scouted rival).
2. Negotiate incentives (playing time, prestige trajectory, wearables, chemistry impact).
3. Accept / Decline adjusts roster composition, chemistry baseline, familiarity build timers, potential future play blocks.

### Knowledge & Fog Interaction
- Spatial Uncertainty: Exploring removes fog, revealing strategic assets and opportunities.
- Mechanical Uncertainty: Repeated rival encounters narrow stat probability ranges (confidence improves action selection).
- Combined effect: higher clarity yields expanded action card sophistication (e.g. precision pass lanes, advanced set plays).

### Chemistry & Familiarity
- Chemistry shifts instantly after impactful plays or match outcomes (+ for teamwork success, − for selfish failures).
- Familiarity accrues per shared possessions and minutes; threshold unlocks advanced play blocks (pick and roll, post-up chains, coordinated specials).

### Adaptive Opposition
- Losses or rapid player advancement enqueue rival adaptation jobs (focused training, recruitment, trait development).
- Rival build path changes feed back into future probability ranges and may introduce new rival action cards.

### Failure & Recovery
- Regular match loss: reduced rewards (XP dampened, prestige withheld), but knowledge still increases.
- Tournament elimination: bracket progress halts; exploration and side activities offer comeback pathways.
- Recovery Events: Loss boosts odds of mentor encounters, rare wearables, specialty court reveals.

### Session Modularity
- Micro decision (tile + choice) ~1–2 minutes.
- Short match 5–10 minutes.
- Region cycle spans multiple sessions; save points at exploration state, pending mentor meeting, queued tournament.
- Resume flow always presents "Next 3 Suggestions" based on last snapshot.

### Core Loop Pseudo-Flow
```
SeedInit()
while !SeasonComplete:
    RegionSelectOrContinue()
    while !RegionDominated:
        tile = ExploreStep()
        events = RollEvents(tile)
        choice = PlayerSelect(events)
        Resolve(choice)        # Match | Training | Recruit | Story | Shop | Skip
        ApplyProgression()
        RivalAdaptationTick()
        OfferNextSuggestions()
    UnlockNextRegion()
SeasonWrapUp(); PersistMetaProgress()
```

### State Model (Simplified)
- Global: Seed, SeasonMeta, RegionList
- Region: FogGrid, Courts[], Gyms[], Shops[], Mentors[], Domination
- Player: Attributes, Traits, Fatigue, Wearables, KnowledgeMap (PlayerID→Reveal%), ChemistryMap, FamiliarityTimers, Prestige
- Squad: Members[], ChemistryAggregate, PlayBlocksUnlocked[], PrestigeAggregate
- Rivals: Archetype, BuildPathHistory[], AdaptationQueue[]
- Buffs: ActiveLocationModifiers[], MentorSessionEffects[]
- ActionCards: Derived each possession from (Attributes, Traits, Fatigue, Chemistry, Familiarity, KnowledgeCertainty, ContextState)

### Metrics & Tuning Hooks
- Engagement: Average actions per session (target 3–6 micro decisions).
- Variety: Distinct event types per region (>5 baseline).
- Progress Clarity: Sessions ending with suggestions panel (~100%).
- Replayability: Seed variation (trait distribution, mentors, rivals).
- Fair Challenge: Recovery event rate balanced to avoid rubber-band.

### Rationale Alignment
Supports exploration reward (fog), tactical depth (action cards + probabilities), roguelite variability (seed), accessible sessions (modular micro loops), meaningful failure recovery (mentor/item opportunities) and persistent meta growth.

## Next Steps
- Prototype: Fog-of-war region reveal + possession action card selection + chemistry/familiarity modifiers.
- Draft style guide (panel grid, SFX font, ink weight, color pop rules) and fallback panel templates.
- Implement seed initialization & serialization (world, player style seeds, rival archetypes).
- Outline mentor & location buff system data schema (JSON layer mapping + training modifiers).
- Begin UX wireframes for touch vs desktop input flows.
- JSON schemas for entities.
- Prototype state machine implementation.