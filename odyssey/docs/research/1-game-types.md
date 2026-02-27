---
title: Game Types
---

This document contains a list of influencial game types and their characteristics, relevant for @hoop/odyssey.

## Basketball Video Games

Core sport simulation and single-player career progression (NBA 2K's MyPlayer) define the primary gameplay loop, including player customization and stat-driven development.

## Roleplaying Games

Deep character customization through attributes, skills, and perks — finding smart, personal combinations that make your player uniquely effective in the game world. The RPG genre's protagonist-centred nature pushes the concept towards a single-player focus rather than team management.

## City Building Games

The exploration aspect: discovering the world, uncovering special locations and resources that can be used strategically to gain an advantage.

## Pokemon

World exploration with hidden collectibles and the satisfaction of finding, training, and assembling a team that works well together.

## Roguelite Games

Combining skills and perks in creative ways to build a player, with the drive to discover new synergies and strategies each run.

### Core Mechanics

Roguelites relax the strict rules of classic roguelikes while retaining permadeath and procedural generation. The key shift is the addition of **persistent meta-progression**: each run ends on death, but unlocks — new characters, items, starting bonuses — carry over permanently. This gives every failed run a sense of forward momentum.

**Defining mechanics across the genre:**

1. **Procedural generation** — levels, items, and encounters are randomised each run, ensuring no two playthroughs are identical. Its deeper purpose: ensuring no two builds face the same test, so the game cannot be solved by memorisation alone.
2. **Permadeath (softened)** — the run ends on death, but meta-progression persists. Failure feels meaningful rather than punishing.
3. **Meta-progression** — persistent unlocks across runs (characters, abilities, items, starting bonuses) reward repeated play.
4. **Run-based structure** — sessions are short and completable, with clear goals and a defined end state (vs. the endless nature of classic roguelikes).
5. **Build crafting and synergy discovery** — per-run item and skill combinations; the excitement of discovering unexpected synergies is a core player motivation. Critically, player-discovered synergies (combinations the designer did not anticipate) are among the genre's greatest moments.
6. **Choice architecture** — meaningful branching decisions throughout each run: item rewards, route selection, risk/reward tradeoffs.
7. **Emergent complexity** — simple systems interact to produce surprising, powerful outcomes; mastery comes from understanding these interactions.
8. **Escalating difficulty** — optional harder modes (e.g. the Heat system in Hades, Ascension in Slay the Spire) extend challenge for veteran players.
9. **Narrative integration** *(Hades model)* — story and world are revealed progressively across runs; lore is not lost on death, so failed runs still advance the narrative.
10. **Pre-run customisation** — allowing the player to choose a starting weapon, character, boon, or keepsake before each run negates pure repetition without sacrificing randomness. The best implementations let these choices prioritise a specific build direction from the outset (e.g. Hades weapon + aspect + mirror, Warm Snow starting boon).
11. **World structure and milestones** — clear map layouts, distinct zones, and visible progression markers give the player a "flag to plant" — a sense of farthest reach to strive towards. Procedural generation should work within this structure, not replace it.
12. **Power fantasy** — deliberately giving the player moments where they feel they have broken the game. This makes daunting, mortality-heavy games feel conquerable and keeps the player motivated. The power spike is always temporary, creating a rhythm of empowerment and humility that drives the next run.

**Notable examples:** *Hades*, *Slay the Spire*, *The Binding of Isaac*, *FTL: Faster Than Light*, *Rogue Legacy*, *Spelunky*, *Vampire Survivors*, *Crypt of the NecroDancer*, *Downwell*, *Enter the Gungeon*, *Dead Cells*, *Balatro*.

**Sources:** Wikipedia — Roguelike (Berlin Interpretation and roguelite distinctions); Game Developer (gamedeveloper.com) — Hades narrative design analysis; YouTube — "What Makes a Good Roguelike" (rcX9BDgvkws); "Why Roguelikes Work" (0cvu_ZyBv8g); "Roguelike Progression Systems" (yOfgUFx9RkU); "How to Design a Roguelike" (y5DSSU_KsrQ); "How to Fail at Making a Roguelike" (TAcsYWGtUto).

### What Makes a Roguelite Successful

Research from rogueliker.com — an independent specialist publication covering the genre since at least 2020 — identifies recurring qualities in the genre's most successful games:

**1. The "just one more run" loop**
The short, self-contained run structure is the engine of player retention. Because each attempt is finite, players are always willing to start again. The best games ensure that losing still feels like progress — either through meta-unlocks, knowledge gained, or story revealed.

**2. Build variety that rewards experimentation**
Rogueliker consistently highlights *item combination depth* as a hallmark of the best games (Binding of Isaac, Slay the Spire, Hades). Players must be able to find genuinely different, equally valid builds across many runs. The discovery of a powerful new synergy is described as one of the genre's primary emotional payoffs.

**3. Risk vs. reward as the central per-run tension**
Branching path decisions — which route to take, which reward to pick, when to spend resources — must carry real weight. *FTL: Faster Than Light* is cited for doing this exceptionally well: every decision is a risk/reward calculation with lasting consequences for the run. Risk vs. reward may be the single most important per-run mechanic: cursed items (huge power boost, dangerous downside), elite fights for better rewards at the cost of health, preserving ammunition for a harder boss — these choices define the genre's tension. Crucially, when the player picks a cursed item and dies, they blame themselves, not the game. The player's own agency is what makes failure feel fair.

**4. Accessible entry, mastery ceiling**
The most commercially successful titles in the genre (Slay the Spire, Hades, Balatro) balance approachability with depth. Slay the Spire 2's developer Anthony Giovannetti explicitly stated their goal as: *"add more complexity for returning players without overwhelming newcomers."* Games that fail to onboard new players struggle to find an audience beyond the hardcore fanbase.

**5. Polished, responsive feel**
Rogueliker's reviews repeatedly cite *moment-to-moment gameplay quality* as a deciding factor. Enter the Gungeon is praised for the physical feel of its environments; Hades for its combat fluidity. A technically rough game struggles even if the systems are deep. The reviewer's phrase: *"it needs to feel great to roll around in."*

**6. Strong aesthetic identity**
Every breakout hit has a distinctive and cohesive visual/audio identity: Hades (Greek mythology + Supergiant's painterly art), Slay the Spire (hand-drawn fantasy card art), Binding of Isaac (grotesque pixel horror), Balatro (retro neon poker). The identity makes the game instantly recognisable and builds community around it.

**7. Meta-progression that doesn't invalidate skill**
The snowball effect of meta-progression (getting stronger across runs) must be balanced so skill still matters. Rogueliker notes that top games scale challenge to match player strength, keeping the game demanding even as unlocks accumulate. Pure grind-to-win undermines the genre's core appeal.

**8. Community and longevity through content depth**
The most-played games in the genre (Slay the Spire is still on Steam friend lists years after launch, per rogueliker.com) have enough content variety that players continue discovering new things after dozens of hours. This drives word-of-mouth and long tail sales.

**9. Early Access as a legitimate launch strategy**
Rogueliker's coverage notes that both Slay the Spire and Hades launched in Early Access and used player feedback to refine balance at speed. The Slay the Spire 2 developer confirmed: *"that direct feedback allows us to improve the game at an incredible speed."* Early Access is now an established genre convention, not a risk flag.

**10. Engine building as the conceptual core**
The genre's appeal is best understood through the concept of *engine building* (a term from board game and CCG design): the player makes strategic decisions to construct a character/build, then pilots that engine through a series of tests. The ideal payoff is watching the engine perform in the environment it was built for. This is what separates roguelikes from games that merely have procedural levels — procedural generation ensures the engine faces an unpredictable test, making memorisation irrelevant. Without meaningful engine building, procedural levels alone do not make a roguelike.

**11. Compression of RPG progression**
Roguelikes compress what would be a 100–200 hour RPG character arc into a single 10–90 minute run. This structure forces players to experiment with builds and character types they would never commit to in a long-form RPG (where the investment cost is too high). The run structure is what gives the genre its exceptional replayability: players can be a wizard, then a rogue, then a fighter — each in under an hour.

**12. Simplicity-first design**
The most effective roguelikes build on a simple, familiar gameplay base and layer complexity on top. An accessible core means players can quickly understand the mechanics and focus on mastering them. The ideal is that the player's *skill* visibly improves, not just their stats — the game should feel like *you* are getting better, not just your character getting stronger (see: Downwell). Accessible complexity also prevents alienating new players from discovering the depth beneath.

**13. Within-run progression quality: every choice should be valid**
The quality of per-run decision-making depends on ensuring that every choice presented is a genuinely viable option. When all choices are valid, players are forced into deeper, more interesting decisions. Systems that interconnect — where the same element (e.g. a health pickup, a carried item, a sacrifice) is relevant across multiple mechanics simultaneously — produce richer decision trees than isolated upgrades. Simple, identical stat bumps (+5% speed, +5% damage) that don't interact with the core mechanic are the clearest failure mode; unique items with synergies tied to the core loop are the gold standard.

**14. Streamability and content-creator reach**
The run-based structure and procedural randomness make roguelikes particularly well-suited to streaming: every run is different, so viewers are always watching something new. This has been a meaningful driver of the genre's growth and commercial reach beyond traditional word-of-mouth.

**15. Hard to balance, not hard to design**
The roguelike genre is relatively straightforward to design at a structural level (find a core mechanic, add roguelike elements, generate large quantities of items/passives). The real difficulty — and the defining challenge of quality in the genre — is *balance*: ensuring the randomness is fair, that no combination trivialises the game, that the difficulty curve remains meaningful, and that every item or skill is situationally relevant.

**Commercially successful launch peaks on Steam (SteamDB data via rogueliker.com):**

| Game | Launch-day peak concurrent players |
|---|---|
| Elden Ring: Nightreign | 313,593 |
| Hades 2 | 103,567 |
| Risk of Rain 2 | 70,194 |
| The Binding of Isaac: Rebirth | 69,747 |
| Mewgenics | 65,962 |
| Deep Rock Galactic: Survivor | 56,943 |
| Loop Hero | 51,156 |

**Sources:** rogueliker.com — "The Best Roguelike Games" (Feb 2026); "What is a roguelike?" (Aug 2024); "Preparing for Slay the Spire 2" (Feb 2026); "The biggest roguelike and roguelite launches on Steam" (Feb 2026).

## Deck Building Games

Collection and synergy mechanics — cards can represent either skills/items augmenting a single player's progression, or recruited players forming a team roster. This opens two distinct design directions for the game.

## References

| Resource | Summary |
|---|---|
| [What Makes a Good Roguelike](https://youtu.be/rcX9BDgvkws) | A designer with 1,000+ hours across nearly 100 roguelikes breaks down the key qualities of the genre: pre-run customisation, risk vs. reward as the central per-run mechanic, and how roguelites became more commercially accessible than classic roguelikes. The video argues that risk vs. reward — cursed items, elite fights, resource preservation — is the single most important driver of per-run tension, because the player's own choices make failure feel fair. It also notes that roguelikes are structurally simple to design but extremely hard to balance, and that their run-based format makes them exceptionally well-suited to streaming. |
| [Why Roguelikes Work (Engine Building)](https://youtu.be/0cvu_ZyBv8g) | A game design essay arguing that *engine building* — not procedural level generation — is the true heart of the roguelike genre: players construct a character/build and then pilot it through an unpredictable test. The video frames roguelikes as a compression of the 100–200 hour RPG progression arc into a single short run, which is what forces experimentation and gives the genre its replayability. Procedural generation's real role is to ensure the engine faces a different test each time, preventing memorisation from replacing skill. |
| [Roguelike Progression Systems](https://youtu.be/yOfgUFx9RkU) | A deep analytical breakdown of within-run progression systems across many roguelikes, using custom diagrams to visualise how mechanics interrelate. The central finding is that the best progression designs ensure every choice is a valid choice — when no option can be safely ignored, players are pushed into deeper, more interesting decisions. The video also highlights system interconnectedness (e.g. Spelunky's damsel, Downwell's health-as-currency) as the quality that separates rich decision trees from shallow, isolated upgrades. |
| [How to Design a Roguelike (Three Pillars)](https://youtu.be/y5DSSU_KsrQ) | Identifies three core design pillars for successful roguelikes: simplicity (build complexity on top of a familiar base so the player's own skill visibly improves), world structure (clear zones and milestones give the player a "flag to plant" and a sense of farthest reach), and power fantasy (deliberately creating moments where the player feels they have broken the game, balancing fear with empowerment). The video uses Hades, Enter the Gungeon, Dead Cells, and Downwell as primary examples. |
| [How to Fail at Making a Roguelike](https://youtu.be/TAcsYWGtUto) | A satirical guide that, by inverting bad advice, distills what makes roguelikes succeed: runs must be unique through meaningful item synergies tied to the core mechanic, not generic stat bumps; the skill ceiling should be reached via learned knowledge of complex interacting systems, not just reflexes; and the randomly generated world must genuinely vary to keep each run distinct. The video warns against defining your game category first and building to fit it, advocating instead for making the game as fun as possible and labelling it afterwards. |