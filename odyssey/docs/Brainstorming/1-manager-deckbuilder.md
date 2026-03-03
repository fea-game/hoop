---
title: "Deck builder: Team Manager"
---

## 0. Ideas Inbox

Raw ideas collected for analysis and discussion. These are unvetted — open questions are part of each entry.

---

### Manager progression as playbook construction

The manager's core progression mechanic could be **building the autobattler behaviour itself**. Instead of levelling up abstract stats, the manager buys or wins **playbook cards** that define how the team executes on the floor. Every manager starts with a simple, generic playbook. Over time, more complex and specific cards become available — and cards can be **combined into behaviour chains**, creating emergent tactical identities from simpler primitives.

Open questions:
- Is there a **time economy** for plays? Does each possession consume a budget, and more complex chains cost more of it?
- What **categories of playbook card** exist? (Spacing, screen actions, defensive rotations, transition triggers, conditional reads?)
- How do you create **distinctive tactical identities** that are legible to the player and feel like real basketball archetypes — without requiring the player to understand real basketball?
- **Balancing**: more complex chains should not simply be stronger — what is the failure mode or cost of complexity?
- How do **playbook cards interact with player cards**? Does a pick-and-roll card require a specific player property (e.g. "screen setter") to unlock, enhance, or even be playable?
- What **player card properties** need to exist to enable and leverage this system — and how do they stay legible?
- How does the player **observe execution** of their behaviour chain during a match? Without replay or step-through, can they diagnose what went wrong?
- Is the behaviour chain the run resource or the meta resource? Can it survive a season reset, or is rebuilding the playbook part of the roguelite loop?
- What prevents one chain configuration from becoming a dominant strategy that all experienced players converge on?
- At what point does the combination space become large enough that players stop reasoning from first principles and start following external guides?

**Critique**

The core risk here is **legibility collapse** — the gap between what the player *thinks* they built and what the system *actually* executes. This is the foundational failure mode of all "build your own AI" systems in games.

*Creatures* (1996) is the most instructive cautionary tale: the game's neural network was technically sophisticated and produced genuinely emergent behaviour, but players couldn't diagnose what went wrong when it did. The feedback loop between "I trained the creature to do X" and "the creature is doing Y" was too long and too indirect. Players gave up rather than debug. A basketball behaviour chain with 5+ interacting cards, executing against a dynamic opponent AI, has the same structural problem. The player needs to be able to *watch the chain execute step by step* — like Zachtronics puzzles (SpaceChem, Opus Magnum), not like Black & White.

*Teamfight Tactics* augment stacking (Set 6+) illustrates the **combinatorial complexity vs. legibility** failure. When three augments could interact in unexpected ways, the skill ceiling became "memorise off-wiki interactions," not "reason well during the draft." TFT's response was to repeatedly reduce augment interaction complexity and add explicit combo labels. If playbook cards can combine freely, the interaction space will eventually exceed what players can hold in working memory — and the emergent creativity the system was designed to enable will be replaced by guide-following.

**Named failure modes to design against:**

- **Interaction Debt** — the accumulating cost players pay to understand every possible card combination. Above a certain pool size, this debt exceeds what a player can pay during a run, and they default to safe/known strategies. The intended creative space collapses into archetype repetition.
- **Tax on Simplicity** — if complex chains are always stronger than simple ones (not just situationally), the game punishes players for not engaging with its most opaque systems. New players are structurally excluded; experienced players converge on the same solutions.
- **Dominant Strategy Collapse** — when the combination space is large but the payoff surface has a single global maximum, all experienced players solve for the same chain. TFT Set 1's breakpoint races and Hearthstone's solved combo metagames both demonstrate how quickly this compression happens once the player community begins sharing solutions.
- **Evaluation Asymmetry** — the mental effort required to evaluate a chain offer grows non-linearly with pool size, but the value of each individual decision declines. Players stop optimising and start picking by feel, which undermines the design intent entirely.

*Monster Train* offers a partial structural solution: enforcing a two-clan constraint limits the active interaction space to a fraction of the total pool at any time. The creative space stays large; the in-run evaluation space stays tractable. An equivalent constraint for playbook chains — a maximum chain depth, or a "playbook slots" limit — may be necessary for the same reason.

---

### Making substitution and trade decisions genuinely difficult

Beyond player chemistry from shared court time, there could be **momentum mechanics** — runs and stretches. A team on a hot streak has a compounding in-game identity that creates a real cost to interrupting it:

- Do you substitute a player **while the team is on a run**, risking breaking the rhythm?
- Do you play a star player past their safe minutes, risking **injury or fatigue**, because the team is executing perfectly?
- Do you **trade a player** for an objectively better one, knowing it breaks a stretch of cohesion the team has built?

The design goal is decisions where the correct answer is genuinely unclear — where short-term performance and long-term roster health are in visible tension.

Rather than encoding hot streaks and stretches as a game success effect (a mechanical buff), they could be handled as **achievements that feed into the storytelling layer** — unlocking rewards and narrative recognition without reducing momentum to a legible number that becomes gameable. This reframes the substitution dilemma as a story-rich choice: *"I am sacrificing my hot team, which has reached its ceiling today, for a brighter future tomorrow."* The cost is felt, not calculated.

**Team chemistry and personality** must be a first-class factor — something no basketball game has replicated convincingly. The real-world pattern is well-documented: former MVP candidates collapse in new organisations (Russell Westbrook in Los Angeles, Damian Lillard in Milwaukee, James Harden in Philadelphia), while players in a better system or culture become foundational pieces (PJ Tucker in Miami, Kristaps Porzingis in Boston, Manu Ginobili in San Antonio). A player's rating is not a complete predictor of their value on *this* team. It is always, in part, a gamble. The **scouting mechanic** can help predict fit and effectiveness — but it should never guarantee it. Irreducible uncertainty about fit is what makes every trade a story rather than arithmetic.

Additional questions:
- How is momentum **represented to the player**? A visible bar? Statistical trend? Narrative flavour only? The choice determines whether momentum is gameable, felt, or invisible.
- What is the **floor of a bad momentum decision**? Is it recoverable in the same match, or does a wrong call spiral into a losing season?
- How do injury and fatigue probabilities get **communicated before the decision**? If risk is hidden, loss feels arbitrary. If risk is fully visible, decisions become arithmetic.
- Does momentum affect the **autobattler simulation parameters**, or is it purely narrative/morale? What exactly changes mechanically when a team is "on a run"?
- How do you prevent a player from simply **never substituting and never trading** to avoid all risk? What forces engagement with these decisions?
- Is **player attachment** designed in? If players don't form emotional bonds with individual athletes, the trade tension evaporates — the player just compares ratings.
- How are **streaks and stretches surfaced as achievements**? What form do the rewards take — manager XP, permanent narrative entries in the dossier, meta-unlocks? And how do you prevent achievement-hunting from becoming its own exploit (e.g. never substituting purely to chase a streak reward)?
- What is the **scope of chemistry unpredictability**? If a high-rated player's fit is uncertain, how much downside variance is acceptable before it reads as unfair RNG rather than a meaningful gamble? What signals does the scouting system give, and how partial must they be to preserve genuine risk?
- Does **personality** manifest as a distinct card property, a hidden attribute revealed through scouting, or an emergent property of team composition? Can two players share synergy tags but have incompatible personalities that suppress it?
- How is a **chemistry downfall** distinguished from a plain roster downgrade? The game must make it legible that a high-rated player is underperforming because of fit, not because of hidden stat manipulation — otherwise the player blames the game rather than the decision.

**Critique**

The design goal here — decisions where the correct answer is genuinely unclear — is one of the hardest problems in management game design, and the failure modes are well-documented across the genre.

*Football Manager*'s injury system is the most instructive negative case. It generates frequent, stressful events that are always resolved by the same solution (scout cover, wait for recovery). The stress is real but the tension is false — there's almost always an objectively correct response. Most FM injuries are not interesting decisions; they are administrative friction. The design challenge is distinguishing between **friction** (cost without interesting choice) and **tension** (cost with genuine decision). A substitution prompt during a hot streak is only difficult if both options — substitute and don't — have a credible upside.

The **"feel-bad" trap** in fatigue and injury systems comes from predictability and lack of agency. XCOM's design retrospectives (GDC talks by the Firaxis team) identify the key distinction: loss that the player could have prevented with a different decision feels meaningful; loss that was genuinely random feels arbitrary. An injury system where probability is hidden from the player will systematically produce feel-bad outcomes, not difficult decisions. The XCOM community's term for this — "unfair RNG" — maps directly to the risk here. The same applies to chemistry fit: if a high-profile trade results in a player dramatically underperforming and the player had no scouting signal suggesting the fit risk, it is experienced as an unfair tax, not a regretted gamble.

The **"spreadsheet brain" failure mode** in FM transfers is the most relevant trade-decision pitfall. When player attributes are fully visible as numbers, trade decisions collapse to arithmetic: highest-rated affordable player wins. SI Games has added hidden attributes and personality traits as partial mitigations, but players routinely recover these values through scouting tools, restoring numerical decision-making. The underlying problem: **rating gravity** — when explicit numbers exist, all other qualities (style fit, team chemistry, streak cohesion) fall toward zero weight in player decisions. The only reliable escape is making the visible number an incomplete predictor of performance — which is exactly what the chemistry and personality system can provide, if fit uncertainty is baked in at a level that scouting reduces but cannot eliminate.

The **momentum visibility problem** is directly illustrated by two sports games. NBA 2K's hot zone mechanics became static multipliers rather than dynamic states — once visible and stable, they stopped producing the intended decision tension. Madden's Momentum Meter (introduced 2020) was too legible at the wrong granularity: players began making anti-football decisions to exploit the meter state. Framing streaks as narrative achievements rather than mechanical buffs avoids this trap: there is no meter to game, only a story unfolding — with rewards that arrive as recognition rather than real-time leverage.

The **chemistry fit problem** is the systemic gap no basketball game has closed. 2K tracks chemistry as an aggregate roster stat, but it does not model fit collapse: there is no mechanism by which a high-rated player systematically underperforms on a specific team due to culture, role, or personality. The result is that the game's most dramatic real-world stories — a superstar traded to a new franchise who never finds his footing — are invisible in simulation. Making this visible and meaningful requires personality as a first-class property, partial scouting visibility, and outcomes that can diverge from rating-based predictions in ways the player could have (imperfectly) anticipated.

**Named failure modes to design against:**

- **Roster Depletion Spiral** — injuries force sub-optimal roster use, creating conditions for further injuries (overplayed backups), which further depletes the roster until the run becomes unrecoverable. If this spiral can form, players stop attaching to individual players and treat them as fungible resources — destroying the emotional stakes the mechanics depend on.
- **False Difficulty via Administrative Tax** — punishing correct play (rest your star) not with strategic consequences but with interface friction, morale micromanagement, and press conference navigation. The player is doing the right thing; the game just makes it exhausting.
- **Mechanic Collapse on Mastery** — any momentum system fully predictable from its visible state will be solved and then become either background noise or a trivial exploit. The system must retain irreducible uncertainty without feeling random. Framing streaks as achievements rather than mechanical states removes the most exploitable surface.
- **Solved Liquidation** — when the correct players to sell or trade in any board state can be determined by an experienced player in under 10 seconds, the tension is gone. Genuine difficulty requires either irreducible future uncertainty or irreversible emotional attachment to the player being moved. The chemistry fit gamble is the primary lever for preserving this uncertainty: a player whose rating promises one thing may deliver another.
- **Fit Opacity** — if chemistry downfall is mechanically real but invisible to the player before the trade, it reads as a punishing black box. The scouting system must surface partial fit signals — personality indicators, system compatibility flags, prior team culture notes — that make the risk legible without making it eliminable. The player should be able to reason about the gamble, not just absorb the outcome.

---

### Every property should serve basketball storytelling

All mechanics — whether manager-layer or player-layer — should connect to **basketball narrative**. The game's primary promise is delivering what feels like a unique, emergent story. Two supporting mechanisms worth exploring:

**Public feedback layer** — media, fans, and pundits commenting on the team in real time:
- Giving players and the team **nicknames** based on observed behaviour.
- Declaring **rivalries** based on match history.
- Issuing **narrative judgements** the player can read as scouting signals or flavour: *"This team has no answer for a dominant big in the paint."*
- This serves double duty: it makes the game world feel alive, and it functions as a **post-run learning scaffold** — the media commentary surfaces what the player's build was weak against without requiring a stats screen.

Additional questions:
- Who generates the commentary — a fixed pool of authored lines with procedural fill-in, a full procedural grammar, or something in between? The answer has major production cost implications.
- How does the commentary system **access game state** without exposing so much mechanical detail that it breaks the fiction?
- What is the **repetition budget**? How many seasons before a player encounters the same nickname, the same rivalry declaration, the same pundit line?
- Are nicknames and rivalries **persistent across seasons** (meta layer) or reset with the run? If they persist, they accumulate into a rich personal history. If they reset, they're flavour that never builds into identity.
- How do you prevent the commentary from becoming a **spoiler or a prescription**? If a pundit says "this team has no answer for a dominant big," has the game solved its own puzzle?
- What happens to the **tone contract** when commentary is simultaneously entertainment (hyperbolic, hot-take) and a mechanical signal (scouting information)? These two registers may be incompatible.
- Is there a **negative feedback loop** where bad media coverage has strategic consequences — or is it purely atmospheric?

**Critique**

The dual-purpose design of this system — narrative layer and learning scaffold — is structurally ambitious and carries a specific failure mode that is underexplored in game design writing but well-observed in practice.

**Purpose Bleed** is the named failure: once players recognise that commentary is also a tutorial signal, it is no longer experienced as narrative. Once it is recognised as narrative, it is not trusted as reliable mechanical information. NBA 2K's social media feed is the most directly comparable case. 2K14–present invested significant resources in a media narrative layer (Twitter-style feeds, ESPN commentary segments, sponsor relationships). Player response was consistently negative for two connected reasons: narrative without mechanical consequence (media stories don't change draft position or trade value in ways that require strategic response) and tone mismatch (the feed is written as entertainment but the gameplay is a management simulation). The tones don't reinforce each other; they compete.

*Football Manager* press conferences represent the opposite failure: the system is mechanical without being narrative. Questions test player knowledge of their own decisions. Players report press conferences as hoops to jump through, not sources of information or story. The system communicates nothing not already visible in the management UI.

The **"Story Behind Glass"** failure is the most critical procedural narrative risk: generated stories that are technically present but require significant effort to access and interpret. Dwarf Fortress generates extraordinary emergent history that is largely inaccessible to players during play. If the media commentary generates rich context but players can't easily read it during the flow of a session, it becomes flavour text that is ignored.

*Wildermyth* illustrates the **repetition wall**: the vignette pool is finite, and procedural combination only delays, not eliminates, recognisable repetition. Wildermyth's developers have written about this directly. Committed players at 15+ campaigns begin to recognise the templates beneath the text. NBA 2K commentary repetition is the direct sports analogue — players report hearing the same lines within single sessions because commentary triggers are too broad (any mid-range jumper triggers the same pool, regardless of game context).

**Named failure modes to design against:**

- **Purpose Bleed** — a dual-purpose mechanic where the presence of one purpose (tutorial) contaminates the player's perception of the other (narrative). Identified as tutorialisation, the text stops being read as story. Identified as story, it stops being trusted as tactical information.
- **Scaffolding Overclosure** — when a feedback system closes off the exploration loop by being too precise. "This team has no answer for a dominant big" is atmospheric. "Your pick-and-roll defence rating is below the league average against high post-up frequency teams" is a build prescription. The first leaves the player to discover the fix; the second removes the learning experience.
- **Template Recognition** — players identify the syntactic pattern underlying procedural text and stop reading the content. Once the fill-in-the-blank structure is visible, the text becomes cognitively invisible regardless of how varied the fills are. This is distinct from content repetition — it is structural repetition, and it is faster to hit.
- **Relationship Inflation** — as tracked relationships (rivalries, fan bases, media personalities) grow in number, the average significance of each approaches zero. What began as a memorable rivalry becomes a roster management overhead.
- **Narrative Without Consequence** — media events that are atmospheric but have no strategic surface produce a system that players notice once and then ignore. If a rivalry declaration changes nothing about the draft, trade market, or sponsorship economy, it is lore, not mechanics.

The cross-cutting risk beneath all three ideas is **emotional attachment vs. roguelite impermanence**. Ideas 1 and 2 require players to invest emotionally in their playbook and their players. Idea 3 requires the world to feel like it is tracking and remembering them. Roguelite structure inherently destroys these investments at run end. Hades resolves this by anchoring attachment to *permanent* characters (Zagreus, the cast of the House) rather than to run-specific resources. If basketball players are run resources — assembled each season, gone at reset — the attachment that makes trade tension and media commentary meaningful may never form in the first place.

---

## 1. Concept

The player takes the role of a **team manager** — a persistent RPG protagonist who accumulates skills, reputation, and tactical knowledge across multiple seasons. The team they manage is rebuilt each season using deck-building and collection mechanics. One season equals one run. Matches resolve automatically: before each game the manager assembles a tactic chain from collected cards that defines how the team plays; there is no real-time intervention during the match itself.

This structure resolves the tension between single-character RPG focus, collection/roster mechanics, and roguelite replayability by assigning each to a different layer:

| Layer | Protagonist | Scope | Persistence |
|---|---|---|---|
| Meta | The Manager | Across all seasons | Permanent |
| Run | The Team | One season | Reset each season |

The **manager** grows through attributes, skills, and reputation that carry over permanently. The **team** is assembled fresh each season via draft, free agents, and trades — consistent with how real sports seasons work. All on-court outcomes are driven by the manager's pre-game decisions; the player never controls a player directly and does not intervene during a match.

The structural differentiator: **you are building a tactic chain from a deck of players and cards, managed by a character you are simultaneously levelling up as an RPG protagonist, and then watching that system execute automatically.** This is the autobattler loop — preparation and construction are the skill surface, not real-time execution — applied to a basketball management layer with a persistent RPG protagonist beneath it.

Existing basketball games (NBA 2K, Football Manager) simulate management without meaningful decision agency. Existing roguelite deck builders (Slay the Spire) lack the sports team abstraction. Existing autobattlers (Teamfight Tactics, Super Auto Pets) lack a persistent single-protagonist arc. This game occupies the gap between all three.

## 2. Constraints

- The game must run on mobile phones and computers (cross-platform).
- The release process must be free and require minimal effort and time.

## 3. The Manager

The manager has attributes, skills, and a narrative identity that develop permanently across seasons:

- **Attributes:** Tactical IQ, Scouting Range, Negotiation, Motivational Presence, Media Handling.
- **Skills & Perks:** Unlockable abilities that add passive bonuses or active options. Examples: "Zone Defense Expert" (unlocks zone coverage cards), "Talent Scout" (raises quality floor of recruitable players), "Chemistry Builder" (faster familiarity accumulation), "Settle the Score" (one-time tactic bonus when facing a Tier 2+ rival).
- **Reputation:** Gates access to higher-tier free agents, sponsorships, and elite mentors. Grows slowly across seasons; a catastrophic season damages but does not destroy it.
- **Manager Level:** XP-based; gates meta-unlock milestones (new card archetypes in the pool, harder league tiers, new player archetypes recruitable).
- **Background / Origin Story:** Chosen once at creation (former player, data analyst, street ball legend, European tactician). Provides a starting specialisation and can seed a pre-existing Tier 2 rivalry from the first season.

**What persists between seasons:** manager level, reputation, unlocked skill trees, a small set of discovered player archetypes (not specific players), tactical knowledge as manager IQ (widens card option ranges), optionally one or two players retained on multi-year deals, the full manager player dossier (scouting notes and tendency profiles for every player ever encountered), and archived pair-familiarity baselines for players who shared a roster.

## 4. The Team and Card System

Within each season the manager assembles a roster through draft, scouting, and free-agent acquisition. The roster is the deck. Before each match, the manager constructs a **tactic chain** — a pre-game arrangement of player cards, tactic cards, and item modifiers that defines how the team behaves automatically during the match. There is no in-game card play; the tactic chain is the entire strategic surface for that match.

- **Player Cards:** Position, attributes, traits, and one or more synergy tags (e.g. "Playmaker", "Rim Protector", "Hustle Player", "Floor Spacer"). Synergy tags interact with other cards and with manager perks. Each player carries a trait or background note that gives them narrative texture beyond numbers. In the tactic chain, player cards occupy role slots (ball-handler, screener, finisher, defender) and their synergy tags determine which tactic cards activate at full efficiency.
- **Tactic Cards:** Plays and schemes that define automated team behaviour — pick-and-roll packages, defensive rotations, late-game sets, transition patterns. A tactic card requires compatible player card tags in the adjacent slots to activate; an incompatible combination runs at reduced efficiency. Available tactic cards are gated by manager level and skill tree, and accumulate across the season through week nodes.
- **Item Cards:** Gear, training regimes, medical staff, facility upgrades — attached to player cards to modify attributes or unlock conditional tactic interactions. Items acquired through season nodes are attached before the tactic chain is assembled.
- **Event Cards:** Contextual occurrences (trade offers, injuries, chemistry incidents, media controversies) that force reactive decisions during the season. Event cards are not played during matches; they surface at week nodes and alter the conditions under which the next tactic chain is built.

The tactic chain itself is the autobattler preparation phase: the manager arranges player and tactic cards into a formation, inspects synergy activations, and locks it in before the match resolves. The chain cannot be modified once the match begins. Deck composition evolves across the season via the waiver wire, trades, training, and item discoveries. At season end the deck resets; meta unlocks from the manager layer seed the next season's card pool quality.

## 5. The Season Structure

One season is one roguelite run:

1. **Pre-Season:** Draft from a procedurally generated player pool (Scouting Range determines stat visibility before selection). Acquire free agents within budget (Negotiation reduces cost). Choose a base offensive and defensive scheme from available tactic cards. Assemble the opening tactic chain: arrange player cards into role slots, attach tactic cards, and confirm synergy activations. This chain is the starting board state for the first match; it can be revised between matches as the roster and card pool evolve.
2. **Regular Season:** A series of game weeks, each presenting nodes on a branching path — Match, Training, Scout, Event, or Shop. Time per week is limited; not every node can be visited.
3. **Playoffs:** A bracket with higher stakes. Elimination ends the run.
4. **Season End:** Win or lose, meta-progression is applied. The next season begins with the same manager, a new seed, and a new team. The outgoing season's player pool is partially refreshed:
   - Roughly half of the season's players are removed from the next draft pool — retired, dropped for quality reasons, or sidelined by career-ending injuries. The attrition is visible at season end so the manager knows what is about to disappear.
   - The remaining half re-enter the draft pool alongside a new cohort of incoming players, keeping the pool partially familiar and partially unpredictable.
   - **Cross-season knowledge persists.** The manager's scouting notes, observed tendencies, and familiarity assessments for every player they have ever drafted, played against, or actively scouted are stored permanently in a manager dossier. When a returning player appears in the next draft, the manager already has a profile on them rather than starting blind. This rewards long-term play: a manager who has spent several seasons building up knowledge about specific archetypes or individuals gains a structural advantage in draft evaluation that a first-season manager does not have.
   - **Cross-season chemistry knowledge persists.** Pair familiarity for players who were on the same roster is archived. If two players who once played together are reassembled — through draft, free agency, or trade — they resume from a residual familiarity baseline rather than zero. The manager can actively target these pairings to front-load chemistry from day one, which is a meaningful draft strategy, especially when rebuilding around a retained core player.
   - This creates intentional draft arcs across seasons: a manager may pursue a rival's key player specifically because they have built a profile of that player over multiple matchups and believe the chemistry fit is viable — a story that only becomes possible through accumulated cross-season knowledge.

Each season seed generates a unique league, rival teams, player pool, and event calendar. Manager level shifts the game into harder league tiers over time.

## 6. Core Mechanics

### Chemistry and Familiarity

Chemistry and familiarity are two distinct resources that together determine how well the roster performs:

- **Chemistry** is a shared roster-wide value. It shifts after matches and events — wins and coordinated plays raise it, losses and disruptive decisions lower it. High chemistry unlocks combo synergies between player cards with compatible tags. The manager's Motivational Presence attribute raises the chemistry ceiling for a given roster composition.
- **Familiarity** is a per-player-pair value that accrues only through shared playing time. It cannot be trained or bought. When two players reach a familiarity threshold, their synergy tag combinations activate at higher efficiency — a pick-and-roll between a Playmaker and Rim Protector who have played together all season functions differently than the same pairing assembled mid-season.

**Roster changes — trades, signings, waiver acquisitions — damage both resources:**
- A new player arrives with zero familiarity toward every current roster member; threshold synergies are unavailable until shared time accumulates.
- A departure degrades familiarity for the players who remain; their history with the departed player is lost, and their synergy with the new arrival starts from zero.
- Trades cause an immediate chemistry drop (locker room disruption, adjusted roles); the drop scales with the prominence of the player traded and the timing — a mid-season trade hits harder than an early one, when familiarity was low anyway.
- A player signed from a rival or nemesis team carries an additional chemistry penalty on arrival.

Every roster change is therefore a meaningful trade-off, not a pure upgrade: a better player on paper may produce a weaker team in practice for several game weeks, at exactly the wrong point in the season. The manager must weigh talent gain against chemistry cost, familiarity rebuild time remaining, and proximity to high-stakes matches.

### Opponent Knowledge and Surprise

Teams in the same league are played multiple times across a season. Repeated matchups accumulate **opponent knowledge**: the manager's profile of each team's tendencies, synergy combinations, and key player traits fills in progressively with each encounter.

- **Preparation bonus** — before a match against a known opponent, a targeted game plan card becomes available (e.g. deny the pick-and-roll, shade toward their primary scorer). The more complete the knowledge, the stronger the preparation card and the tighter the probability ranges on in-game adjustments.
- **Surprise vulnerability** — opponent teams are not static. Between matchups they run training nodes and make trades, just as the manager does. A significant opponent change (a trade, a training block unlocking a new scheme) can partially or fully invalidate the prepared game plan.

Surprise events surface as a pre-match reveal: the game signals something has changed, but not specifically what. The manager decides whether to spend a scout node investigating or proceed and absorb the risk. Thorough preparation can become a liability if it breeds overconfidence. Scouting Range determines how early in the week large opponent changes are detected — a low-range manager may not learn of a major trade until game day.

### Player Knowledge and Visualization

Knowledge about individual players is a first-class mechanic, not background bookkeeping. It is acquired through three channels and rendered visually at every stage where it is relevant:

- **Playing with** — drafting and rostering a player fills in their profile the fastest. Shared practice and match reps surface hidden attributes, confirm or contradict scouted impressions, and unlock pair-familiarity data with other roster members.
- **Playing against** — facing a player in a match reveals fragments of their tendency profile (preferred spots, defensive tells, clutch traits). The more times the manager faces the same player, the more complete their scouting card becomes.
- **Active scouting** — spending a Scout node on a specific player accelerates profile completion. Scouting Range determines how many attributes can be revealed per scout action and how reliable early impressions are.

**Visualization:**

- Each player card has a **knowledge track** — a visible fill indicator that reflects how much the manager knows about that player. An unknown prospect in the draft might show position and one visible attribute; a player the manager has coached for two seasons shows a fully filled card.
- **Hidden attributes** are displayed as obscured slots (e.g. a greyed-out trait bubble). As knowledge accumulates, slots unlock and reveal their content. The reveal is a discrete event — the manager sees the card update — so it feels like a discovery rather than passive stat drift.
- **Tendency overlays** appear on player cards in match and draft contexts once enough knowledge has been gathered: indicators like "Fades in 4th quarter," "Pick-and-roll liability," or "Elevates vs. rivals." These overlays are visible decision aids, not hidden bonuses.
- **Pair-familiarity bars** between any two players who have shared a roster are shown on the team overview. The bar fills over the season and depletes when one player is traded away. Archived baselines from prior seasons are shown as a distinct (lighter) fill beneath the current season's progress, so the manager can see the history at a glance.
- **The player dossier** (accessible at all times) shows every player the manager has ever encountered, organised by knowledge completeness. Players due to re-enter the draft next season are flagged, allowing forward-planning across the off-season.

Knowledge as a resource changes how scouting nodes feel: spending a scout action is not just risk mitigation — it visibly advances a profile that has direct downstream value in the draft, the trade market, and chemistry optimisation.

### Match Resolution (Autobattler Loop)

Matches execute automatically from the tactic chain the manager assembled before the game. There is no real-time card play during a match. The manager's entire strategic contribution happens in the preparation phase; the match resolves and presents a summary. This is the autobattler contract: preparation is the skill surface.

**Pre-match preparation (the preparation phase):**
- **Tactic chain assembly** — arrange player cards into role slots (ball-handler, screener, finisher, primary defender, help defender), attach tactic cards to the chain, and confirm which synergy tags are active. The game shows projected synergy activations and flagged mismatches before locking in.
- **Lineup selection** — choose starters and a rotation depth order. Fatigue accumulates during the match; deeper rotation sustains late-game performance at the cost of reduced peak synergy early.
- **Game plan card** — against a known opponent, a targeted game plan card is available if the scouting profile is sufficiently complete. Selecting it biases the automated match toward the prepared counter-strategy. If the opponent has changed approach since the last encounter, the game plan card may be partially or fully nullified — surfaced as a mid-match surprise in the summary.
- **Item allocation** — confirm item card attachments to player cards before locking the chain.

**Match summary (the automated execution phase):**

The match resolves without input. Outcomes are driven by the tactic chain's synergy state, individual player attributes, fatigue curves, familiarity thresholds, chemistry level, and opponent knowledge state — all of which the manager set during preparation. The summary is presented as a short sequence showing key moments: a synergy activation that created a run, a familiarity threshold that fired in the fourth quarter, a game plan card that landed cleanly or got countered.

The summary length is calibrated for mobile: fast enough to feel like feedback, not a recap to sit through.

**Mid-match events (limited intervention):**

Two to three decision points surface during the summary sequence — moments where the match pauses and the manager is asked to respond to a specific situation:

- **Substitution call** — a player is fatigued or carrying foul trouble; choose who enters. The incoming player's tactic chain compatibility is shown.
- **Defensive adjustment** — the opponent has shifted approach; choose whether to hold the game plan or switch to a fallback scheme. Tactical IQ widens the available options.
- **Late-game situation** — in a close game, a higher-stakes decision card surfaces (a final possession play call, a deliberate foul decision, a timeout usage). Tactical IQ improves the success probability of the best options.

These intervention points are not real-time; the match pauses and waits for the manager's choice. They are the narrow moments where the manager is present *during* the automated execution — making the RPG layer visible mid-match without requiring constant attention.

### Failure States

- **Regular Season Record:** A poor record locks the team out of higher playoff seeds, forcing a harder bracket path.
- **Playoff Elimination:** Ends the run. A post-run evaluation surfaces what went wrong (synergy composition, tactic card choices, chemistry state).
- **Season Abandonment (Rebuild):** Accepting a very poor record mid-season yields a high draft pick for the next run at a reputation cost. This is the roguelite "cut losses" option — and an implicit decision to let chemistry and familiarity collapse deliberately.

### Nemesis Mechanic

Rivalries form organically from game results and carry over into future seasons as persistent, evolving threats.

**How rivalries form** — evaluated at match end and season end:
- A dominant loss (playoff elimination, repeatedly exposed tactical weakness).
- A humiliation marker (a specific player's exceptional performance directly against a manager decision that failed).
- Escalation — an existing rivalry that results in another loss intensifies.

A cap of 2–3 rival players and 1–2 rival teams is enforced. New rivals displace weaker existing ones. Each rivalry must feel named and personal.

**Rivalry tiers:**

| Tier | Label | How It Forms | Mechanical Effect |
|---|---|---|---|
| 1 | Opponent | Single notable loss | Rival appears in future seasons; slightly boosted attributes |
| 2 | Rival | Repeated losses or playoff elimination | Rival tracks the manager across seasons; targeted counter-strategies |
| 3 | Nemesis | Season-defining defeat or consistent humiliation | Adapts to manager's known playstyle; passive debuffs when matched up |

**Individual player rivals** carry across seasons:
- Attributes grow between seasons proportional to performance against the manager.
- Counter-traits develop tied to specific tactics the manager used when losing — a consistent pick-and-roll user faces a "Pick-and-Roll Killer" trait next season.
- At Nemesis tier the rival may appear in the manager's own draft pool: signing them collapses the rivalry and adds a powerful card, but at a chemistry and reputation cost.
- A decisive win reduces tier. Rivalries can be resolved.

**Rival teams** persist as opponent franchises:
- Their generated deck evolves to counter synergy patterns that worked against them previously.
- Rival team encounters are flagged visually on the season path.
- Beating a rival team in a high-stakes context yields a Rivalry Victory bonus: elevated manager XP, a tactic card upgrade, and a team chemistry boost.
- A Nemesis-tier rival team applies a passive chemistry debuff the week they are scheduled — the pressure creates internal friction before the match.

**Narrative layer** — rivalries accumulate a short history:
- An "origin moment" is recorded when a rivalry forms, referencing the specific decision that went wrong (e.g. "Season 3 — Game 7, your defensive switch failed. He hit the shot. He remembered.").
- This is surfaced on re-encounter in future seasons.

**Manager RPG interaction:**
- Each loss to a rival generates Rivalry IQ entries (tendencies, counter-trait triggers) — forced scouting; losses have educational value.
- Defeating a Tier 3 Nemesis decisively in a playoff game grants a permanent meta-unlock (new card archetype, manager attribute point, or reputation milestone), making rivalry resolution one of the highest rewards in the game.

## 7. Design Risks

### Roguelite

Based on [How to Fail at Making a Roguelike](https://youtu.be/TAcsYWGtUto), [What Makes a Good Roguelike](https://youtu.be/rcX9BDgvkws), [How to Design a Roguelike](https://youtu.be/y5DSSU_KsrQ), [Roguelike Progression Systems](https://youtu.be/yOfgUFx9RkU), and [rogueliker.com](https://rogueliker.com):

- **Generic stat bumps instead of synergies** — items must have unique identities tied to the core mechanic, not isolated percentage increases. Synergy interactions are the source of memorable moments.
- **Runs feel the same** — procedural generation must meaningfully vary the league, player pool, and event combinations each season, not just reskin the same structure.
- **Designing to fit a genre label** — fun comes first; roguelite mechanics serve the game, not the other way around.
- **Balance is the real challenge** — unfair randomness, overpowered combinations, and situationally irrelevant items all break the experience. This is where most effort will be spent.
- **No power fantasy moments** — the team must be capable of becoming genuinely dominant by late season. Feeling like you have "broken" the game is a reward, not a failure.
- **Meta-progression that invalidates skill** — manager unlocks must widen options, not unconditionally reduce difficulty. The run layer must remain challenging regardless of manager level.
- **Poor onboarding** — complexity must be introduced gradually; the entry barrier must stay low enough to reach beyond a hardcore audience.

### Deck Builder

Based on [What Makes a Great Deckbuilder?](https://youtu.be/d_gBRNAgBKQ), [What Makes A Good DECK BUILDING Roguelike?](https://youtu.be/UG_T3S6-qUw), and [Can Any Roguelike Deckbuilder Beat Slay the Spire?](https://youtu.be/LLeuofCTq5M):

- **Cards without distinct identities** — every card needs a unique use case and a constraint; generic equivalents collapse deck building into stat optimisation.
- **Complexity without depth** — parallel systems that don't change how you play add tracking burden without strategic value. Depth comes from non-obvious interactions, not more things to track.
- **Card illegibility** — card text must be readable as plain language (Slay the Spire benchmark). Symbols replacing text create friction without adding depth.
- **Slow pacing** — excessive per-card admin or slow resolution causes players to abandon runs mid-season. A season must feel fast even when long.
- **Out-of-combat layer treated as dead time** — the week nodes (training, scouting, events, shop) are where strategic stakes are set; they are not menus between matches.
- **No late-season power fantasy** — the roster must be capable of genuine dominance by the playoffs. Extravagant late-run power is a reward.
- **Players as tokens** — if player cards have no personality, the collection fantasy collapses. Each player card needs narrative texture (a trait, a background note) beyond numbers.

### Manager + Team Dual Path

- **Manager progress invisible during a run** — intra-season manager decisions (tactic calls, in-game adjustments) must produce visible, immediate consequence. Manager XP and unlocks that only manifest between seasons leave the RPG layer feeling absent mid-run.
- **Team reset undermining investment** — the multi-year contract meta-unlock exists to preserve one or two threads of continuity while resetting the rest. The sports season framing carries the narrative justification for the full reset.
- **Parallel paths creating analysis paralysis** — manager upgrades must be infrequent milestone events, not constant small choices. Card categories must be strictly distinct to limit cognitive load.
- **Manager attributes as a stat wall** — attributes must expand options and raise probability ceilings; they must never hard-block progress pathways regardless of manager level.

### Autobattler

Based on the auto battler genre analysis in [Game Genres](/odyssey/Research/1-game-genres) and the structural properties of the preparation-then-execution loop:

- **Preparation outcome not legible** — if the player cannot clearly see how their tactic chain will behave before locking it in, the preparation phase loses its strategic weight. Synergy activations, projected mismatches, and compatibility flags must be visible at construction time, not discovered after the match resolves.
- **Randomness reading as unfair** — automated match resolution must consistently reflect the quality of preparation. If a well-constructed tactic chain loses to a poorly-constructed one due to opaque variance, the autobattler contract is broken. The player must have visible tools to manage variance (game plan cards, scouting, substitution calls) so that losses feel like preparation failures, not coin flips.
- **Preparation phase too long** — tactic chain assembly before every match will cause session friction if it cannot be adjusted quickly. The default chain from the previous match should persist and be editable in place; rebuilding from scratch must never be required unless the roster has changed substantially.
- **Mid-match pauses feeling arbitrary** — the two to three intervention points during the match summary must surface at moments that feel consequential and earned, not as random interruptions. Each pause must connect directly to a preparation decision the manager made — a substitution because fatigue was predictable, an adjustment because the opponent's known tendency triggered.
- **Tactic chain illegibility** — the chain arrangement (role slots, tactic card connections, synergy activations) must be readable at a glance. If the manager cannot quickly evaluate whether a chain is coherent, the construction phase becomes guesswork. Visual clarity here is equivalent to card text legibility in a traditional deck builder.
- **Balance between preparation and luck** — the autobattler genre's primary design difficulty is calibrating how much variance exists in automated execution relative to the skill expressed in preparation. Too much variance and preparation feels irrelevant; too little and games become deterministic simulations of whoever built the stronger chain on paper. The chemistry, familiarity, and opponent knowledge systems are the levers for this calibration.

- **Consequence-free trades** — chemistry and familiarity costs must be visible and meaningfully timed. A familiarity reset three weeks before playoffs carries very different weight than one in the first week; both must feel real.
- **Invisible familiarity** — familiarity progress between pairs must be surfaced clearly so the manager can evaluate the cost of breaking it. If it accumulates silently until a threshold fires, it becomes ignored bookkeeping.

### Opponent Knowledge

- **Preparation trivialising repeat matchups** — the surprise system must fire at a meaningful rate with genuine consequences. If it rarely matters, late-season games against familiar opponents become formalities.
- **Surprises reading as unfair punishment** — the pre-match reveal and scout node option are the fairness valve. The player must always have agency to respond, even if it costs resources.
- **Early Scouting Range gap too punishing** — early-season surprises should have lower stakes (minor tactic shifts, not full scheme overhauls), scaling up as the season and manager level progress.
- **Knowledge profile as ignored UI** — the preparation cards unlocked by opponent knowledge must produce clear, desirable outcomes. Filling in the profile must feel rewarding, not like bookkeeping.

### Player Knowledge Visualization

- **Knowledge UI as noise** — visible knowledge tracks and tendency overlays only add value if the player acts on them. Every revealed attribute or tendency must connect to a decision the manager can take; decorative reveals are wasted screen space.
- **Reveal pacing** — too fast and the system becomes trivial after one season with a player; too slow and it feels like gatekeeping. The rate of reveal must be calibrated so full profile completion feels earned but achievable within one season of active play.
- **Dossier as dead menu** — the player dossier must be consulted during live decisions (draft, trade evaluation, scout node choice), not browsed in a separate management screen. Contextual surfacing of relevant profiles at decision points is required.
- **Cross-season knowledge advantage too deterministic** — if a fully profiled returning player is always the correct draft pick, variety collapses. Unknown new entrants must carry genuine upside that known quantities cannot offer (ceiling uncertainty, off-the-board potential).

### Nemesis Mechanic

- **Rivalries feeling random** — the origin moment must be clearly surfaced as a direct consequence of a specific failed decision. Opaque trigger conditions undermine the mechanic's narrative core.
- **Nemesis as unavoidable difficulty tax** — resolution pathways (decisive win, signing the rival, outlasting them across seasons) must always exist and feel achievable. A Tier 3 Nemesis with no exit is a punishing modifier, not a story.
- **Too many rivalries** — the active cap must be enforced. Every rivalry must feel named and personal; a diluted registry produces noise.
- **Counter-traits with one solution** — counter-traits raise the cost of a strategy; they do not invalidate it. The manager must be pushed toward creativity, not a single "anti-rival" deck.
- **Generic narrative text** — origin moments must reference specific tactical decisions (the card played, the adjustment made) to feel personal. Templated text ("You lost a big game") loses resonance immediately.

## 8. Roguelite / Deckbuilder / Autobattler: Key Design Priorities

This section captures the findings from the genre analysis in [Game Genres](/odyssey/Research/1-game-genres) applied specifically to this concept. It covers what to get right, and the most common pitfalls that cause games in this hybrid space to fail.

### What to get right

**The "just one more season" loop**

The run-based structure (one season = one run) is sound. But losing must feel like progress. Every playoff elimination needs to surface what went wrong — the post-run evaluation screen must be emotionally satisfying: the synergy that was one card away from firing, the rival's counter-trait that was never solved. Failure must teach, not just end.

**Card and player identity**

The most consistently cited failure mode across roguelites and deck builders. Every player card needs a mechanical quirk that creates both a use case and a constraint — not just stat numbers. If two player cards are interchangeable, the deck-building has already failed. Cards must force decisions no other card forces.

**The unique mechanic must be legible in one sentence**

Deck builders without a structural differentiator are Slay the Spire clones. The differentiator here is the manager-as-RPG-protagonist layer — but it must be felt *within* a run, not only between seasons. Tactic calls, in-game adjustments, and knowledge reveals must make the manager's presence felt every session. If the manager only matters at season boundaries, the RPG layer is invisible for 90% of playtime.

**The autobattler contract: preparation is everything**

Choosing auto-resolved matches makes a promise to the player: your preparation is what determines the outcome. The match result must visibly reflect pre-season decisions and week-node choices. If a well-prepared roster loses to a poorly-prepared one due to unmanageable variance, the player blames the game. Controlled randomness requires tools to manage variance — scouting, game plan cards, in-game adjustment windows.

**Chemistry and familiarity as the economy layer**

The auto-battler's economy layer (interest management, streak decisions) is the genre's primary hidden skill differentiator — invisible to new players, fully legible to experienced ones. Chemistry and familiarity serve the same role here. This system must be visible at all times and every roster decision must produce a clear, felt cost. If players learn to ignore it, strategic depth collapses to stat optimisation.

**Meta-progression must widen options, never reduce difficulty**

Manager unlocks that make runs unconditionally easier hollow out the roguelite. New card archetypes, harder league tiers, and unlocked rivals must expand the design space, not compress it. The run layer must remain challenging regardless of manager level.

### Common pitfalls

**Runs feeling the same.** Procedural generation that only reskins the same structure — same draft archetypes, same event types, same rival team shapes — destroys replayability within five to ten hours. The league seed, player pool composition, and event calendar must produce genuinely different strategic problems each run.

**The manager invisible mid-run.** If manager XP and attribute points only surface between seasons, the RPG layer vanishes for the majority of playtime. Tactic calls and in-game adjustments must produce immediate, visible feedback connected to manager attributes. Tactical IQ widens available calls — that widening must be shown in real time.

**Complexity without depth.** Chemistry, familiarity, opponent knowledge, player knowledge tracks, nemesis counter-traits, and manager attributes running in parallel is a significant system load. The cited failure mode is adding more things to track without changing how you play. Every system must interact with at least one other in a non-obvious way. If a mechanic doesn't change decisions, it should be cut or merged.

**Slow pacing.** A season that drags — excessive confirmation screens, slow match resolution, per-card admin overhead — causes players to abandon runs mid-season. Match summaries must be fast. Week nodes must be snappy. The mobile context makes this a hard constraint, not a preference.

**Late-season power fantasy missing.** If the team never feels dominant, the roguelite promise is broken. By the playoffs, a well-built roster must feel like it has broken the game — synergies firing at full capacity, familiarity thresholds active, game plan cards landing cleanly. This moment is the payoff for the whole run. Without it, there is nothing to chase.

**The Nemesis mechanic as a difficulty tax.** A Tier 3 Nemesis with no exit is pure punishment. Resolution pathways must always be visible and feel achievable. The genre principle: when a player makes a bad decision and loses, they blame themselves. When a Nemesis kills a run and there was no way to respond, they blame the game.

**Balance will take longer than everything else.** Across all three contributing genres — roguelite, deck builder, autobattler — the research is consistent: architecture is the easy part, balance is where the work is. Unfair randomness, overpowered synergy combinations, and situationally irrelevant player cards will all appear in testing. This should be treated as 40–50% of development time post-prototype.

### The structural insight

The genre research identifies the autobattler as the only genre in the dataset that holds both character/team identity and the full replayability/session flexibility cluster simultaneously. This design — manager as single protagonist (RPG identity) combined with team as the per-run build (autobattler + deck builder) — is the right architecture to pursue both qualities at once. The manager layer provides the personal identity and progression visibility that pure autobattlers lack. The team reset provides the replayability that pure RPGs lack. Auto-resolved matches provide session flexibility.

The risk is ending up with three thin genres instead of one deep game. Every mechanic must serve the core loop — assembling a roster, watching it perform, learning from failure, doing it again — not the genre checklist.

## 9. Comparable Games

Each entry overlaps with at least two of the four core design decisions: **roguelite**, **deckbuilder**, **autobattler**, or **sports/basketball management**.

---

### [Basketball GM](https://www.basketball-gm.com)

**Overlap: basketball management + deckbuilder-style roster construction + multi-season persistence.**

The closest existing game to the basketball management layer in this design. A free, browser-based basketball general-manager sim in which the player drafts, trades, develops, and cuts players across multiple seasons. Strategic depth lives entirely in roster construction and team-building decisions — no real-time play, no card mechanics — but the selection-from-a-pool loop and the long-arc persistence model are structurally identical to the management layer described here. The absence of roguelite run structure and any deckbuilder economy is the primary gap. The presence of detailed player attributes, salary cap constraints, and multi-year franchise arcs is the reference point for the management fidelity ceiling.

---

### [Super Auto Pets](https://store.steampowered.com/app/1714040/Super_Auto_Pets/)

**Overlap: autobattler + roguelite meta-progression.**

A cross-platform (mobile + PC) autobattler in which the player assembles a team of units from a shop before each battle round; units act automatically. Run structure is roguelite: each arena run is discrete, ends in elimination, and feeds into a persistent meta-progression layer. The **preparation-then-execution loop** — buy, position, watch, advance or die — is the closest existing analogue to the weekly-node → match-resolution loop described in this design. The absence of any sports/basketball context and the shallow card economy (no tactic chain, no familiarity/chemistry axis) are the primary gaps. The session length and mobile-friendly pacing are direct reference points.

---

### [Teamfight Tactics](https://teamfighttactics.leagueoflegends.com)

**Overlap: autobattler + deckbuilder economy layer.**

A free-to-play cross-platform (mobile + PC) autobattler with a draft-based unit acquisition loop and a gold/interest economy that governs when the player can afford to upgrade or pivot composition. The **gold/interest economy** maps directly to the chemistry/familiarity economy described in this design: holding units builds synergy value over time, spending early sacrifices long-term compounding. Synergy tags (unit traits) are the deckbuilder layer — composition is constructed from a shared pool rather than a fixed deck, but the combinatorial selection logic is identical. The absence of any sports context or persistent manager identity across seasons is the primary gap.

---

### [Slay the Spire](https://store.steampowered.com/app/646570/Slay_the_Spire/)

**Overlap: roguelite + deckbuilder.**

The benchmark explicitly named throughout this document for card legibility, run structure, and the "just one more run" loop. A PC/mobile roguelite deckbuilder in which the player constructs a card deck across a single run by choosing from offered cards at each node; the run resets on death. **Card legibility** — every card does exactly what it says, effects are readable at a glance — is the design standard this project adopts for tactic cards. The node-map run structure (choice nodes, event nodes, boss encounters) is the direct template for the season week-node graph. The absence of any sports context or autobattler execution layer is the primary gap.

---

### [Hades](https://store.steampowered.com/app/1145360/Hades/)

**Overlap: roguelite + persistent RPG protagonist across runs.**

The structural model for how a **single named character** (the manager) accumulates permanent progression — relationships, unlocks, narrative — while the run resets each attempt. In Hades, Zagreus is the persistent protagonist; escape attempts are the runs. Here, the manager is the persistent protagonist; seasons are the runs. The pattern of permanent upgrades (Mirror of Night / manager attributes), per-run boons (boon cards / tactic cards), and narrative continuity across failed runs is the architecture this design follows for the manager RPG layer. The absence of any sports context or team-management layer is the primary gap.

---

## 10. Decision Log

### Genre: Roguelite / Deck builder / Autobattler

The match loop uses the **autobattler model**: before each game the manager assembles a tactic chain from collected cards that defines how players behave automatically. There is no real-time card play during a match. Strategic depth lives entirely in pre-game construction — roster selection, tactic chain assembly, lineup synergy — and in the week-node decisions that precede each match. Match outcomes are resolved automatically and presented as a summary sequence.

This direction was chosen because:
- It is the only game loop format compatible with the mobile constraint (cross-platform, async-friendly, no APM requirement).
- The autobattler structure is the only genre in the design research that holds both team/character identity and the full replayability/session flexibility cluster simultaneously — a structural match for the dual-layer design (persistent manager + per-season team).
- Strategic depth and skill expression live in preparation, economy management (chemistry, familiarity, roster timing), and opponent scouting — not in real-time execution. This is the autobattler's core promise and it is fully compatible with the manager RPG layer.

The active card-play mode is not pursued. It creates a UI surface problem that is out of scope for the mobile constraint and duplicates the strategic layer rather than deepening it.