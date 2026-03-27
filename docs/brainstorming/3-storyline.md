---
title: Storyline Concept
---

This document captures the outcomes of a structured design interview focused on the emotional and narrative core of the game — before mechanics are locked in. The goal: a session of the game should feel like a **unique, authored story** that the player lived through, not just a series of outcomes.

---

## 1. The Core Ambition

When people talk about basketball — especially the past — they don't talk about stats first. They talk about stories. The Bulls dynasty against the Warriors. Isaiah Thomas carrying a team after his sister died. The Spurs and their beautiful, selfless basketball. Kawhi's steal. Reggie Miller's eight points in nine seconds.

Stats support stories. They don't generate them.

The ambition of this game is that **every season feels like a story the player will want to retell**. Not because the game scripted it, but because the player's decisions, combined with luck and unforeseen challenges, produced something that felt genuinely dramatic and personal.

---

## 2. The Protagonist Frame

The player is the **coach/GM** — a persistent character with a reputation, a philosophy, and a legacy that builds across seasons. The coach is not a neutral observer. They are a character in the story too, with their own arc, their own rivalries, their own moments of doubt and vindication.

This resolves the tension between single-protagonist focus (RPG influence) and ensemble storytelling (the NBA drama the player wants to replicate): the coach is the anchor character, but the team, the players, and the league are the ensemble.

**Session structure:** Persistent career (the coach persists across all seasons — reputation, rivalries, philosophy, legacy) combined with roguelite seasons (each season is a self-contained story chapter with its own arc, cast, and outcome).

---

## 3. Story Taxonomy

A season generates stories across six interlocking categories. All six should be able to interweave within a single season:

### 3.1 Character-Driven Stories
About a specific player on the roster or in the league:
- The washed-out veteran who has one last great season
- The draft bust who finally figures it out — or doesn't
- The sudden hero nobody saw coming
- The locker room cancer who poisons team chemistry
- The rookie who freezes in the playoffs then breaks through

### 3.2 Relationship-Driven Stories
Between players, or between players and the coach:
- Rivalries between players (or between coaches)
- The mentor who lifts a young player
- Two stars who cannot coexist on the same team
- The protégé the coach believes in before anyone else does
- The player the coach had to trade — and what that does to both of them

### 3.3 Institutional / Franchise Stories
About the team as a collective identity:
- The local team the city rallies behind
- The dynasty everyone roots against
- The rebuild that takes years but pays off
- The team that had it all and collapsed
- The franchise player who becomes synonymous with the city

### 3.4 Season Arc Stories
The structural drama of a season as a narrative:
- The slow start and miraculous turnaround
- The team that peaks in the playoffs
- The injury that derails a title run
- The trade deadline that changes everything
- The winning streak nobody predicted

### 3.5 Coach-Driven Stories
About the player's own avatar:
- The hotshot coach who has to earn respect from veteran players
- The old-school coach who clashes with a modern front office
- The coach who bets their job on an unproven rookie
- The coach who gets too attached to a player and cannot make the hard call
- The coach who finally wins it all after decades of near-misses
- The coach fired mid-season and what that does to a locker room

### 3.6 In-Game Arc Stories
Within a single game or series:
- The player who goes off for 50 in a must-win game
- The comeback from 20 down in the fourth quarter
- The rivalry game where everything gets personal
- The game-winner by the last person you'd expect
- The veteran who steps up when the star is injured

---

## 4. Story Generation Philosophy: Emergent-First

Stories should arise **from the interaction of systems**, not from a library of scripted events. The game should not know it is telling a story about a washed-out player — it should simulate conditions, and the story should emerge.

This means:
- Player attributes, personality, morale, chemistry, fatigue, rivalry status, and momentum all interact to produce outcomes
- No outcome is fully predetermined
- The player's decisions are genuine inputs into what story gets told

However, **emergence alone is not enough**. The game needs a narrative layer that **names and frames** what is happening — surfacing it to the player as a story beat rather than just a stat change. The number 30 in a box score is not a story. *"Marcus Elliot, once considered a bust, just had his first 30-point game"* is.

The authoring happens at the framing layer, not the event layer. Every significant game event writes a **structured narrative record** at the moment it fires — player identity, event type, context tags, relational tags to the coach, season state. The narrator voices read from this record, not from raw stats. This keeps the simulation layer and the narration layer cleanly separated while ensuring the narration is always specific.

---

## 5. The Narration Problem

### 5.1 Why Existing Solutions Fail

NBA 2K's social media feed and news ticker are the most directly comparable existing solutions. They consistently fail for the same structural reasons:

- **Present-tense and reactive** — they comment on what just happened with no memory of what came before
- **No perspective or bias** — nobody argues, nobody is wrong, nobody has an agenda
- **Disconnected from player decisions** — the feed says the same thing regardless of the quality of the decision that produced the outcome
- **Does not accumulate** — there is no sense that history is being written

The result is narrative content without meaning. Players stop reading it within hours.

### 5.2 What Real Basketball Narration Actually Does

Real basketball discourse operates in several distinct modes, all of which are absent from existing games:

| Mode | Example | What Makes It Work |
|---|---|---|
| **The hot take** | "This team is done. They have no heart." | Emotional, biased, sometimes wrong — creates reaction |
| **The revisionist** | "We didn't appreciate what we had until it was gone." | Retrospective, only possible with accumulated history |
| **The comparison** | "Nobody's done what Jordan did since Jordan." | Cross-era, requires the game to know multiple eras |
| **The narrative arc** | "Year three of the rebuild. The fans are running out of patience." | Longitudinal, tracks a story over time |
| **The debate** | Two voices disagree about what a trade means | Contested history feels alive; settled history feels like Wikipedia |
| **The prophecy** | "If they stay healthy, this is a championship team." | Forward-looking, creates stakes and anticipation |

Existing games only attempt hot takes, and even those are hollow because they carry no bias and no consequence.

### 5.3 The Comparison Problem

The reason real basketball discourse generates the most resonant stories — Bulls vs. Warriors, Jordan vs. LeBron, the Bad Boy Pistons vs. everyone — is that **comparison requires accumulated shared history**. Both subjects must be known quantities. Fans of both eras must have opinions.

In the game, this means:
- The narration system must track not just the current franchise but **the full history of the league** — who won, who dominated, which coaches and players defined eras
- When a dynasty ends and a new one begins, the game must be able to place the current story in context: *"No team has matched the Eastside Hawks' three-title run since 2034"*
- The history the player authored must become the reference point against which future stories are measured

This is the mechanism by which the game becomes **more meaningful over time**, not less.

---

## 6. The Narration Solution: Multiple Voices

### 6.1 Core Principle

Instead of a news feed, the game should maintain a **living historical record** — not a stream of posts, but an evolving body of lore about the franchise and the league. This record is:

- **Retrospective by default** — it interprets the past, not the present
- **Biased and argumentative** — different voices disagree about what things mean
- **Comparative across time** — it can say *"this is the best team this franchise has had since..."* because it actually knows the franchise's history
- **Tied to player decisions** — the trade, the draft pick, the coaching call all become referenced data points in the record
- **Discoverable, not pushed** — the player goes looking for it, like reading about their team online, rather than being interrupted by it

### 6.2 The Cast of Voices

A small cast of **four recurring narrator characters** with distinct perspectives, biases, and typographic signatures. The cast is capped at four — new voices replace rather than add.

| Voice | Archetype | Perspective | Characteristic bias | Typographic signature |
|---|---|---|---|---|
| The Beat Reporter | Covers the franchise daily | Close to the team, protective of access | Tends to humanise; soft on the coach | Clipped AP-style sentences. No flourish. |
| The Skeptical Analyst | Data-driven outsider | Sees through narratives; demands evidence | Dismissive of chemistry and storylines; trusts only numbers | Bullet points. Parenthetical caveats. Qualifies everything. |
| The Nostalgic Fan | Long-suffering supporter | Remembers everything; compares obsessively | Romanticises the past; slow to trust the present | Rambling, digressive prose. Em-dashes. Tangents. |
| The Former Player | Ex-athlete turned commentator | Understands the locker room; reads people | Focused on personalities and relationships over tactics | Short, punchy fragments. Reads between the lines. |

**No audio narration.** The typographic and stylistic signature of each voice is the primary differentiator, compensating for the absence of voice acting. The way each voice writes *is* the voice.

These voices should:
- **Disagree with each other** — contested interpretation makes history feel alive
- **Be consistent over time** — the skeptic is still skeptical three seasons later; the nostalgic fan still references that heartbreaking loss from season one
- **Know the player's history** — they reference specific decisions, not generic outcomes
- **Occasionally be wrong** — the analyst who predicted failure when the coach made that trade, now reluctantly admitting it worked, is more interesting than a voice that is always right
- **Never cross functional roles** — the skeptical analyst can only analyse; the nostalgic fan can only reminisce; the beat reporter can only report. Disagreement emerges from role collision, not scripted conflict.

### 6.3 The Narrator Architecture

Two implementation tracks are kept open in parallel. Every content and system decision should be designed to work on both tracks:

#### Template Track (no LLM)
Combines two proven systems from the research:

1. **Wildermyth's tag-branching templates** — one template authored per event type, filled at runtime by the tags attached to the event and the characters involved. A trade event produces different output depending on which voice is speaking and what their relational tag to the traded player is (`rival-of`, `mentor-of`, `gave-up-on`, `developed-under-me`).

2. **Hades' three-tier priority bucket** — each voice maintains three pools:
   - **Evergreen** — generic takes that fire when nothing specific applies
   - **Specific** — reactive lines tied to recent gameplay state (references the exact player, the exact record, the exact rival)
   - **Essential** — milestone beats that override everything (first championship, dynasty comparison unlocked, coach fired)

   The engine always surfaces the highest-priority unlocked line. No generic filler unless nothing specific applies.

#### LLM Track
The same tag vocabulary and event records serve as structured prompt context fed to a language model. The model generates the surface text; the tags constrain what it can say and from whose perspective. The LLM replaces the authored template library but reads from the same event record structure. Consistency across sessions is maintained by including the voice's persona definition and recent history in the prompt context.

Both tracks share the same underlying event record schema and tag vocabulary. The choice between them is an implementation decision, not a design decision.

### 6.4 What the Narration Layer Does NOT Do

- It does not comment in real time during matches
- It does not provide mechanical guidance disguised as flavour text (Purpose Bleed — the failure mode where players recognise commentary as a tutorial signal and stop reading it as story)
- It does not fire as an interruption; the player seeks it out
- It does not repeat structurally recognisable templates that expose the procedural machinery beneath them

---

## 7. The Tag Vocabulary

Tags are the atoms of the narration system. Every significant event, player, relationship, moment, and season state is tagged at the moment it occurs. Narrator voices read these tags to produce contextually specific output rather than generic commentary.

### 7.1 Architecture

Tags operate across five domains simultaneously:

- **Player identity tags** — what narrative archetype this player represents
- **Chemistry and synergy tags** — the quality and nature of relationships between players or between a player and a system
- **Relationship tags** — the history between specific pairs (player–player, player–coach, player–franchise)
- **Potential and development tags** — where a player is on their arc
- **Moment tags** — what kind of event this was
- **Season / franchise state tags** — what kind of team or era this is
- **Coach identity tags** — what coaching or GM archetype the player's avatar represents
- **Legacy and comparison tags** — cross-era references that enable the nostalgic fan and the analyst to make historical comparisons

### 7.2 Design Constraints

- **Start constrained** — approximately 10 tags per domain, ~70 total at launch. Resist expanding until the system proves it needs more. Tag inflation collapses the combination space into noise.
- **No near-synonyms** — every tag must represent a genuinely distinct narrative dynamic.
- **3 words maximum** — tags must be readable as UI tooltips.
- **System-agnostic** — tags describe narrative reality, not game mechanics.
- **Cross-domain applicability noted** — where a tag naturally applies to multiple domains (e.g. `hometown-hero` as both player identity and franchise state), it is listed in its primary domain with a cross-domain note.

### 7.3 Tag Assignment Model

Tags are assigned through a **hybrid model**: a small number of hidden seed tags are assigned at player creation; the majority of tags are earned through simulation events and conditions.

**Seed tags (hidden):**
- Each player is created with 1–2 hidden seed tags drawn from a constrained set of disposition archetypes
- Seeds bias the simulation toward certain outcomes by adjusting underlying probabilities — they do not guarantee any outcome
- The coach (player) never sees seed tags directly — only the revealed narrative tag when the simulation condition fires
- A player's environment can override or redirect a seed: a `prodigy-pressure` seed player mentored by a `player-whisperer` coach has a meaningfully different arc than one left alone

**Event tags (revealed):**
- The majority of a player's tag profile accumulates through events and conditions during simulation
- Tags fire at the moment the narrative condition is met — not post-hoc, not interpolated
- Multiple tags can co-exist and compound: a player simultaneously holding `stolen-prime` + `comeback-arc` + `loyalty-rewarded` produces a richer narrator output than any single tag alone

**Design intent:** The hybrid model ensures every roster has narrative texture without pre-authoring outcomes. The coach's decisions genuinely alter trajectories — the most dramatic version of arcs like `bust-by-circumstance` (organizational failure) and `late-bloomer` (right system found) only emerge when the simulation and the player's choices interact.

### 7.4 Tag Vocabulary (82 tags, 8 domains)

*Full research: `docs/research/3-nba-narrative-tags.md`. Every tag is kebab-case, ≤3 words, system-agnostic, and grounded in at least one real NBA example.*

#### Domain 1 — Player Identity / Archetype (13 tags)
*What kind of player — and story — this person fundamentally is.*

| Tag | Definition | Canonical Reference |
|-----|-----------|-------------------|
| `alpha-dog` | The undisputed first option; defines the team's identity | Jordan, Kobe, prime LeBron |
| `reluctant-star` | Elite talent that resists the franchise-cornerstone role | Kawhi Leonard |
| `quiet-excellence` | Sustained greatness without personal branding or drama | Tim Duncan |
| `system-dependent` | Production tied inseparably to a specific scheme | Boris Diaw — D'Antoni Suns |
| `system-irreplaceable` | The engine the system cannot run without | Draymond Green |
| `franchise-ghost` | Won a title as a one-year rental; left no identity bond | Kawhi — Toronto 2019 |
| `hometown-hero` | Grew up a fan of the team they now carry | LeBron — Cleveland |
| `improbable-ascent` | Rose from near-total obscurity to genuine star | Giannis — street vendor → Greek Freak |
| `journeyman-grinder` | Career defined by survival across many teams | G-League call-up veterans |
| `alpha-clash` | Two legitimate first-options on the same roster | Kobe vs Dwight — 2012-13 Lakers |
| `unicorn-prospect` | Defies positional classification; does everything | Cooper Flagg archetype; Giannis at 18 |
| `3d-specialist` | Floor-spacing plus elite perimeter defense | Klay Thompson early career |
| `positionless-forward` | Frontcourt player who reads and plays like a guard | LeBron, Draymond, Durant |

#### Domain 2 — Chemistry and Synergy (10 tags)
*How players combine — or fail to combine — as a unit.*

| Tag | Definition | Canonical Reference |
|-----|-----------|-------------------|
| `destined-duo` | Two players whose styles are so complementary they feel made for each other | Magic + Kareem; Curry + Draymond |
| `big-three-formed` | A deliberate assembly of three stars as a championship nucleus | 2008 Celtics; 2010 Heat |
| `chemistry-explosion` | Roster clicks beyond all expectation — whole exceeds sum of parts | 2004 Detroit Pistons |
| `chemistry-collapse` | Theoretical talent dissolves into selfishness or poisoned dynamics | 2021-22 Brooklyn Nets |
| `incompatible-superstars` | Overlapping skill sets or personalities create irresolvable friction | Dwight Howard + Kobe |
| `team-over-ego` | Sacrifices individual maximization for collective identity | 2014 San Antonio Spurs |
| `nursing-home-squad` | Past-their-prime legends physically unable to survive a playoff run | 1998-99 Rockets; 2013-14 Nets |
| `depth-advantage` | Victory driven by reliable contributors, not superstar dominance | OKC Thunder 2024-25 |
| `cultural-reset` | Roster broken up to begin again after a failed superteam | 2024-25 Phoenix Suns |
| `second-apron-trap` | Financially crippling talent assembly — massive contracts that cannot move | 2023-25 Phoenix Suns |

#### Domain 3 — Relationship (11 tags)
*The bond, tension, or rupture between player–player, player–coach, and player–franchise.*

| Tag | Definition | Canonical Reference |
|-----|-----------|-------------------|
| `player-coach-bond` | Deep mutual trust — the player would run through walls for them | Duncan + Popovich; Curry + Kerr |
| `lost-locker-room` | A coach who has forfeited player respect; authority on paper only | Frank Vogel — Lakers 2022 |
| `owner-meddling` | Ownership overrides scouts, analytics, and GM judgment | James Dolan's Knicks |
| `franchise-loyalty` | Declined bigger offers or better rosters to stay | Dirk Nowitzki — 21 seasons |
| `ring-chasing` | Prioritized winning over franchise loyalty | KD to Golden State; Ray Allen to Miami |
| `trade-demand` | A superstar who forces their way out | KD to Brooklyn; AD from New Orleans |
| `forced-departure` | A beloved player pushed out by front-office dysfunction | Patrick Ewing from New York |
| `given-up-too-early` | Franchise lost faith; player proved them wrong elsewhere | Isaiah Thomas |
| `outlasted-franchise` | Endured multiple rebuilds while remaining | Carmelo Anthony |
| `torch-rivalry` | Mutual competition that elevated both players and shaped an era | Magic vs Bird; Bird vs Jordan |
| `alpha-negotiation` | Off-court confrontation establishing the league's new pecking order | Jordan vs Magic/Bird — 1992 Dream Team |

#### Domain 4 — Potential and Development (12 tags)
*The arc of becoming — promising, realized, derailed, or missed entirely.*

| Tag | Definition | Canonical Reference |
|-----|-----------|-------------------|
| `late-bloomer` | Required several seasons to develop into peak level | Giannis; Khris Middleton |
| `hidden-gem` | Selected late or undrafted; performs at elite level | Jokic (41); Draymond (35) |
| `stolen-prime` | Best years taken by injury at precisely the wrong moment | Derrick Rose — MVP → ACL |
| `wrong-pick` | Franchise made the demonstrably wrong choice at a critical draft | Sam Bowie over Jordan |
| `bust-by-circumstance` | Failed primarily due to organizational misuse, not ability | Darko Miličić |
| `peaked-early` | Elite potential early; never sustained the trajectory | Many one-and-done washouts |
| `second-round-gem` | Not just a late pick — an outright investment that paid off | Jokic; Marc Gasol |
| `raw-international` | Teenage international prospect needing years to mature | Giannis at 18; Wembanyama at 19 |
| `defying-decline` | Performing meaningfully well past expected dropoff | Vince Carter at 43; LeBron at 39 |
| `loyalty-rewarded` | Stayed through organizational darkness; won with the team that drafted them | Giannis — 2021 Finals |
| `prodigy-pressure` | Psychological weight of being anointed future before ready | Kwame Brown — Jordan's No. 1 pick |
| `developmental-bust` | Physical gifts, no translatable NBA skill | Anthony Bennett |

#### Domain 5 — Moment / Event (11 tags)
*A discrete occurrence that changes the season's or career's narrative trajectory.*

| Tag | Definition | Canonical Reference |
|-----|-----------|-------------------|
| `defining-shot` | A single shot that crystallizes a player's identity permanently | Jordan's 1998 push-off jumper |
| `injury-tragedy` | An injury that eliminates a player from a crucial moment | Derrick Rose — ACL during MVP season |
| `what-if-tragedy` | An event so catastrophic it haunts the franchise's alternate history | Len Bias — Celtics lose 6 years |
| `act-of-god` | A random event that derails a legitimate contender despite tactical competence | Horry hip-check → Stern suspends Suns 2007 |
| `series-collapse` | Held a commanding playoff lead and lost the series | 2016 Warriors — 3-1 vs Cavs |
| `cinderella-run` | Unexpected deep playoff run from a low seed or unheralded roster | 2004 Detroit; 2022-23 Miami Heat |
| `redemption-moment` | Erases a prior failure narrative in a single decisive performance | LeBron's 2016 block + 3-1 comeback |
| `comeback-arc` | A full multi-season return from career-threatening injury or dismissal | Derrick Rose's multiple comebacks |
| `the-decision` | A player publicly choosing their next team, triggering league-wide realignment | LeBron's 2010 ESPN announcement |
| `mundane-off-court` | An absurd non-basketball event that permanently alters the season | Bird destroying his back shoveling a driveway |
| `mid-season-upset` | An unexpected mid-season result that redefines the league's hierarchy | Giannis's 2024 NBA Cup MVP |

#### Domain 6 — Season / Franchise State (11 tags)
*The macro condition of the franchise at a given point in time.*

| Tag | Definition | Canonical Reference |
|-----|-----------|-------------------|
| `dynasty-peak` | At the summit — defending champion, clear best team, culture formed | 1996-98 Bulls; 2015-18 Warriors |
| `dynasty-crack` | Beginning to fracture — age, ego, or rival emergence undermining the core | 2018-19 Warriors |
| `dynasty-collapse` | Terminal decline; the core breaks apart, rebuild begins | 2019-20 Warriors — lottery season |
| `perpetual-bridesmaid` | Sustained excellence that consistently falls short of the prize | Phoenix Suns |
| `cursed-franchise` | Unusual concentration of heartbreak, near-misses, and bad luck | Suns; pre-2016 Cavaliers |
| `unexpected-contender` | Far outperforms preseason projections to compete for a title | 2022-23 Heat (8 seed, Finals) |
| `tanking-era` | Deliberately fielding a non-competitive team to acquire draft assets | 76ers "Trust The Process" 2013-17 |
| `rebuild-mode` | Trading veterans for picks and young players; accepting short-term futility | OKC after Durant; Boston post-Big Three |
| `regenerative-dynasty` | Wins and simultaneously stockpiles draft capital and depth | OKC Thunder 2024-25 |
| `franchise-defined-by-era` | Entire identity shaped by one memorable period | Cleveland = LeBron; Orlando = Shaq/Penny |
| `ownership-instability` | Front-office dysfunction or ownership meddling sabotaging competitiveness | Knicks under Dolan |

#### Domain 7 — Coach / GM Identity (12 tags)
*The philosophy and narrative archetype of the person running the team.*

| Tag | Definition | Canonical Reference |
|-----|-----------|-------------------|
| `system-builder` | Coach whose system defines the era's basketball | D'Antoni — Seven Seconds or Less |
| `system-prophet` | Philosophy was ahead of its time; changed the game without winning a title | D'Antoni / 2004-09 Suns |
| `quiet-genius` | Never overclaims credit; lets results speak | Gregg Popovich; Steve Kerr |
| `serial-collapser` | Established pattern of squandering commanding leads | Doc Rivers — 3× blown 3-1 leads |
| `player-revolt-coach` | Lost the locker room; players openly tuning them out | Derek Fisher — Thunder |
| `analytics-pioneer` | Franchise rebuilt around data-driven valuation against market consensus | Daryl Morey; Sam Presti |
| `scout-vs-owner` | Visible conflict between what scouts want and what ownership demands | Memphis drafting Thabeet |
| `dynasty-architect` | Roster construction decisions produced a multi-year championship window | Bob Myers — Warriors |
| `player-whisperer` | Uniquely maximizes difficult personalities other coaches failed with | Doc Rivers — KG/Pierce; Carlisle — Dirk |
| `inherited-mess` | Takes over a roster in active dysfunction or mid-rebuild | Frank Vogel — Lakers |
| `legacy-coach` | Legend built across decades — multiple teams and generational stars | Pat Riley |
| `player-to-executive` | Legendary player who became a coach or GM | Larry Bird |

#### Domain 8 — Legacy and Historical Comparison (12 tags)
*How a player's or franchise's story is positioned against history.*

| Tag | Definition | Canonical Reference |
|-----|-----------|-------------------|
| `goat-debate` | Enters the permanent conversation about the greatest of all time | Jordan, LeBron, Kareem |
| `torch-passed` | Established legend explicitly recognizes the new dominant force | Magic/Bird → Jordan — 1992 Dream Team |
| `torch-lineage` | The generational chain of league-defining players | Dr. J → Magic/Bird → Jordan → LeBron → Giannis |
| `diminished-by-era` | Would have been undisputed best in another generation | Karl Malone — all-time scorer, Jordan's contemporary |
| `hometown-redemption` | Local hero leaves, returns, and wins the championship for their city | LeBron — Cleveland 2016 |
| `superteam-backlash` | Cultural narrative penalizing players for joining forces | KD to Golden State |
| `rival-made-me` | Greatness directly sharpened by a specific rival; each elevated the other | Magic vs Bird; Jordan vs Isiah |
| `what-could-have-been` | Permanent shadow of an unrealized ceiling | Len Bias; Greg Oden |
| `legacy-defender` | Actively manages their own narrative, pushes back against critical characterizations | Doc Rivers |
| `wrong-era` | Style and skills would have made them dominant in a different decade | Wilt Chamberlain in modern NBA |
| `rings-vs-legacy` | Tension between ring count and perceived greatness | Barkley, Ewing, Stockton — zero rings |
| `beautiful-game` | Remembered not for the result but for the transcendent quality of the basketball | 2014 Spurs Finals |

---

## 8. Narration UX

### 8.1 Two-Layer Surface Model

Narration reaches the player through two complementary layers:

**Layer 1 — Contextual flashes (diegetic moments):**
At high-stakes moments only — championship wins, franchise-defining trades, player retirements, milestone performances — a brief, non-blocking overlay appears. One or two lines from the most contextually relevant narrator voice. It disappears without requiring interaction.

These moments must feel earned and anchored in the player's specific decisions, not generic. The flash for a trade references the player traded, the coach's history with them, the season context. A generic line does not fire.

**Layer 2 — The historical record (active archive):**
A dedicated screen the player can open at any time, organized by season, player, and event type. All four voices accumulate entries here. The player discovers depth at their own pace — like reading about their team online. This is where the retrospective, comparative, and argumentative registers live: the nostalgic fan's long digressions, the analyst's reluctant admissions, the former player's reading-between-the-lines takes.

The passive digest (news feed format) is explicitly rejected as a standalone surface: it requires the player to build a habit without earning it. The historical record earns its place because it rewards investment with accumulated meaning.

### 8.2 Voice-Differentiated UI

Each narrator voice has a distinct typographic and visual signature — not just in prose style but in the interface itself. This replaces audio differentiation and makes each voice immediately recognizable without reading the byline.

| Voice | UI signature |
|---|---|
| The Beat Reporter | Clean, narrow column. Dateline header. Black on white. Dense but fast. |
| The Skeptical Analyst | Structured layout. Bullet points visible as scan targets. Sidebar caveat annotations. Monospace accent font for numbers. |
| The Nostalgic Fan | Wide measure. Sepia or aged-paper tint. Em-dashes and parentheticals rendered with visual breathing room. No hard column structure — rambles. |
| The Former Player | Short lines. Large leading. Fragment-friendly typesetting. Almost no punctuation density. Reads like a text message from someone who played. |

The contextual flash inherits the UI signature of whichever voice fires it — so a championship moment surfaced by the beat reporter looks and reads differently than the same moment surfaced by the nostalgic fan.

---

## 10. The Living Historical Record

### 10.1 Structure

The record has two complementary views, always available together:

**View A — The Arc Tree (Story Thread View):**
A horizontal tree structure. The **coach/franchise arc is the trunk** — the persistent spine running left-to-right across the full career, segmented by season. Player arcs, rival franchise arcs, and named story threads branch vertically off the trunk when they enter the coach's orbit.

- The horizontal axis is time (career-wide, left to right)
- The vertical spread is the branching complexity of any given period
- A player's branch begins when they join the roster and ends — greyed out, dormant — when they leave via trade or retirement
- If a traded player later becomes a rival, or is re-acquired, their branch reactivates and reconnects to the trunk — visually tracing the full relationship history
- Season arcs are time-bounded segments of the trunk itself, named automatically from the tag combinations active during that period: "The Rebuild," "The Year the Coach Was Proved Right," "The Dynasty That Never Was"
- Arc names are generated from tag combinations (Template track: finite named arc patterns; LLM track: freely generated arc names from the same tag context)

The tree is the primary navigation for players who want to understand their career as a whole. Zooming out shows the shape of the coaching legacy. Zooming in on a branch shows the arc of a single relationship.

**View B — Entity Pages:**
Each entity type (player, game, franchise, rival, coach) has its own dedicated page with a distinct visual language. The player navigates to an entity from the arc tree or from in-game moments. Narrator entries accumulate on the relevant entity page tagged to that entity.

| Entity type | UI register | Primary narrator voice(s) |
|---|---|---|
| **Player page** | Career dossier / scouting report. Stats sidebar; narrator entries are the primary content. | All four voices; former player and beat reporter dominate |
| **Game page** | Box score that grew a conscience. Data-forward, but narrative entries frame the numbers. | Skeptical analyst dominates; beat reporter for colour |
| **Franchise page** | Team Wikipedia being written in real time. Longitudinal, institutional, era-segmented. | Nostalgic fan and beat reporter dominate |
| **Rival page** | Rivalry wall. Two columns — the coach's franchise vs the rival — contested by competing narrator takes. | Former player and nostalgic fan fight for space |
| **Coach page** | The player reads narration about themselves. Personal journal meets press conference transcript. Most intimate register. | All four voices; their biases toward or against the coach become the primary texture. Beat reporter's protectiveness, analyst's skepticism, fan's oscillating faith. |

### 10.2 Design Principles

- **Dormant branches, not deleted ones.** History is never erased. A traded player's branch goes dormant visually but remains in the record. The player can always return to a past relationship.
- **Reactivation as narrative.** When a dormant branch reactivates — a traded player becomes a rival, a former player returns — the arc tree makes the reconnection visible. The nostalgic fan's entry for that moment writes itself.
- **Arc names are earned.** A named arc ("The Comeback," "The Rebuild") only surfaces when the tag combination that triggers it has accumulated enough events. A two-game losing streak does not become "The Collapse." A franchise-defining multi-season decline does.
- **The coach page is the most personal.** It is the only entity page where the player is the subject. The four voices reading the coach's decisions back to them — protective, skeptical, nostalgic, perceptive — is where the coaching avatar becomes a character with a reputation.

---

## 11. Narrator Voice Content Principles

Each voice maintains three line pools (Evergreen / Specific / Essential), per the Hades three-tier architecture established in Section 6.3. The engine always surfaces the highest-priority unlocked pool. Evergreen fires only when nothing specific applies.

### The Beat Reporter

| Pool | Content principle | Prohibition |
|---|---|---|
| **Evergreen** | Game outcome plus attendance or crowd angle. Factual, clipped, no interpretation. | Never speculates. Never compares to history. |
| **Specific** | Names the exact player or coaching decision that changed the game. References the record, the streak, the opponent. | Never openly critical of the coach — protects access. |
| **Essential** | Always the first voice to surface a milestone. Sets the factual record before the others editorialize. | Never editorialises on the milestone itself — that is the other voices' role. |

### The Skeptical Analyst

| Pool | Content principle | Prohibition |
|---|---|---|
| **Evergreen** | Efficiency metrics, win-share context, sample size caveats. Reminds the reader why the narrative is probably wrong. | Never uses emotional language. Never references a player's personal life. |
| **Specific** | References the exact stat that contradicts the popular narrative — the celebrated win that was actually a negative-efficiency game. | Never concedes without a caveat. |
| **Essential** | The reluctant admission: when the data forces conceding something they predicted wrong. Rare by design — its rarity is what makes it land. | Never admits error without immediately reframing it as a data anomaly. |

### The Nostalgic Fan

| Pool | Content principle | Prohibition |
|---|---|---|
| **Evergreen** | Comparison to a past player or season the coach may not even remember. Unprompted. Digressive. | Never talks about the future. Never acknowledges stats directly — only feelings and memories. |
| **Specific** | Invokes a prior season or player from *this coach's* career history to frame the current moment. Requires accumulated record to fire correctly — the referenced event must have actually happened. | Never references events that have not occurred in the coach's career history. No fabricated nostalgia. |
| **Essential** | The deepest comparison: "nobody has done this since..." — triggered only by milestones, and only when the record contains the prior event being referenced. | Never fires if the comparative event is not in the record. Silence is preferable to a hollow comparison. |

### The Former Player

| Pool | Content principle | Prohibition |
|---|---|---|
| **Evergreen** | Reads the body language or locker room dynamic behind the public result. Short. Punchy. Reads between the lines. | Never abstract. Never institutional. |
| **Specific** | Identifies the personality at the centre of what just happened — not the star, but the person who made the difference in the room. | Never talks about systems or schemes — only people. |
| **Essential** | The moment of recognition: "I've been in that locker room. I know exactly what just happened in there." Reserved for moments involving personality conflict, chemistry collapse, or locker room turning points. | Never fires for purely statistical milestones — that is the analyst's and reporter's territory. |

---

## 13. Mechanical Consequences of Narration

### 13.1 Direct Simulation Effects

Narrative beats are not decorative — every named story beat has at least one mechanical surface. The narration names what the simulation already produced; it does not set the simulation state.

| Narrative beat | Mechanical consequence |
|---|---|
| `torch-rivalry` / `alpha-negotiation` fires | Rivalry becomes a persistent mechanical state: performance modifiers in matchups against that opponent, higher-priority narrator entries for those games, rival coach behaviour changes |
| `chemistry-explosion` fires | Team performance modifier active — felt through outcomes, not displayed as a labelled stat |
| `chemistry-collapse` fires | Opposing modifier: morale penalties, increased probability of `trade-demand` or `lost-locker-room` |
| `dynasty-peak` essential entry | League treats the franchise differently: harder trade negotiations, top free agents more willing to meet, rivals scheming specifically against them |
| Coach reputation milestones | Free agent attraction, player morale baseline, and rival coach offer quality all shift — expressed through world behaviour, not a displayed number |

### 13.2 Tag Cascade — Conditional Probability Network

Active tags raise or lower the likelihood of other tags firing. The tag system is a **probabilistic network**, not a flat labelling layer. Coach decisions have second-order narrative consequences: tags on departed players still feed back into the historical record and the rival page even after a trade.

**Cascade examples:**

| Active tag | Raises probability of | Lowers probability of |
|---|---|---|
| `dynasty-peak` | `superteam-backlash`, `torch-rivalry`, `serial-collapser` (opponents scheming) | — |
| `chemistry-explosion` | `cinderella-run`, `unexpected-contender` | `trade-demand` |
| `chemistry-collapse` | `trade-demand`, `lost-locker-room` | `cinderella-run` |
| `alpha-clash` | `chemistry-collapse`, `the-decision` | `team-over-ego` |
| `stolen-prime` (injury) | `comeback-arc` or `developmental-bust` (determined by personality seed) | — |
| `prodigy-pressure` + `player-whisperer` coach active | `late-bloomer` | `developmental-bust` |
| `dynasty-crack` | `dynasty-collapse`, `trade-demand` | `regenerative-dynasty` |
| Great run / winning streak active | `torch-rivalry` (easier to trigger), `unexpected-contender` | — |

The cascade model means a team on a great run is more likely to attract a rivalry — not because the game scripts it, but because the conditions that produce great runs also raise the probability of the conditions rivalries require.

### 13.3 Rewards — Narrative Capital and Legacy Unlocks

Points and badge systems are rejected as rewards: they sit outside the fiction and feel shallow relative to the story the game is telling. Rewards that live *inside the world* are the design target.

**Narrative capital (soft currency):**
Significant story events — a `redemption-moment`, a `cinderella-run`, a `dynasty-peak` — generate institutional prestige and cultural momentum that the world responds to without labelling it as a number. Effects include:
- Top free agents take meetings they would otherwise decline
- Rival GMs make worse offers in trade negotiations
- The press (via the beat reporter) gives the coach more rope after a bad run
- Players on the roster perform with a confidence modifier
The reward is *how the world treats the coach*, not a score.

**Legacy unlocks:**
Certain tag combinations, accumulating across seasons, unlock things unavailable through any other path:
- Access to a legendary retired player as a mentor figure for a young prospect
- A franchise record that future narrator entries permanently reference as a comparison point
- A rival who seeks out a rematch — arriving as a free agent, or engineering a trade to the same conference
- A historical arc name earned by the franchise that becomes part of the league's permanent lore
The reward is more story — richer, more specific, more historically grounded story.

**The coach's legend (narration as reward):**
The deepest reward is not a separate system — it is the narration itself changing texture over time. As the coach's legend accumulates:
- The beat reporter's protectiveness grows — criticism of the coach becomes rarer and more hedged
- The analyst's reluctant admissions come more frequently — the data keeps proving the coach right
- The nostalgic fan begins making comparisons that favour the coach over their historical heroes
- The former player starts deferring — "I've been wrong about this coach before"

The narration system *is* the reward system. Significant play produces richer, more specific, more favourable narration — which is the experience the player came for. The loop closes on itself.

---

## 14. Open Questions

| Question | Status | Notes |
|---|---|---|
| Narrator implementation: Template vs LLM | **Open by design** | Both tracks maintained in parallel; decision deferred |
| AAA LLM NPC integration quality | **Research gap** | Existing research did not cover NVIDIA ACE / Inworld AI — follow-up needed before LLM track decision |
| Primary source interview: sports broadcast writer | **Research gap** | No sports journalist perspective in existing research corpus |

---

## 15. Design Risks Specific to Narration

| Risk | Description | Mitigation direction |
|---|---|---|
| **Purpose Bleed** | Players recognise commentary as a tutorial signal and stop reading it as story | Strict separation: narration layer never carries mechanical guidance |
| **Template Recognition** | Players identify the syntactic fill-in-the-blank structure and stop reading the content | Structural variety in sentence form, not just content fills; each voice has a distinct syntactic signature that differs from the others |
| **Story Behind Glass** | Rich emergent history exists but is too hard to access during play | Make the narration layer discoverable and skimmable; surfaced at natural pause points (between matches, end of season) |
| **Narrative Without Consequence** | Media events are atmospheric but change nothing strategically | Narration should reflect and reinforce mechanical realities — a rivalry is both a narrative record and a mechanical state |
| **Relationship Inflation** | Too many tracked voices or relationships dilute each one's significance | Hard cap: four narrator voices; rivalries capped at 2–3 as per nemesis mechanic |
| **Emotional Attachment vs. Roguelite Impermanence** | Stories require player investment in characters; roguelite resets destroy investment | Persistent coach identity, persistent rivalry history, and persistent league lore anchor attachment across resets; the team resets but the world and the coach do not |
| **Tag Inflation** | Too many tags make combinations unmanageable and outputs feel random | Hard cap at launch; each new tag must displace or consolidate an existing one |
| **Evergreen Filler Dominance** | If specific events are rare, the system defaults to generic evergreen lines too often | Specific lines must fire at high enough frequency that players notice the system is paying attention to their specific playthrough |
| **Siloed Narration** | Narrative events fire but have no consequences in the simulation underneath | Every named story beat must have at least one mechanical surface (rivalry escalates, chemistry shifts, reputation changes) |
