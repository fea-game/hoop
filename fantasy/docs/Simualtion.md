# Approaches to Simulating matches

> _How do I turn players + strategies into realistic outcomes without “playing the game” visually?_

- [The simplest mental model: Basketball as a sequence of decisions](#the-simplest-mental-model-basketball-as-a-sequence-of-decisions)
- [Option A: Possession-based statistical engine](#option-a-possession-based-statistical-engine)
  - [Concept](#concept)
  - [Inputs](#inputs)
  - [Outputs](#outputs)
  - [Why it works](#why-it-works)
  - [Tradeoff](#tradeoff)
- [Option B: Strategy-weighted outcome models](#option-b-strategy-weighted-outcome-models)
  - [Concept](#concept-1)
  - [Example](#example)
  - [Outputs](#outputs-1)
  - [Why it works](#why-it-works-1)
  - [Tradeoff](#tradeoff-1)
- [Option C: Matchup-driven simulation](#option-c-matchup-driven-simulation)
  - [Concept](#concept-2)
  - [Example](#example-1)
  - [Why it works](#why-it-works-2)
  - [Tradeoff](#tradeoff-2)
- [Option D: Play-type flow modeling](#option-d-play-type-flow-modeling)
  - [Concept](#concept-3)
  - [Example](#example-2)
  - [Why it works](#why-it-works-3)
  - [Tradeoff](#tradeoff-3)
- [Option E: Outcome buckets instead of animation](#option-e-outcome-buckets-instead-of-animation)
  - [Concept](#concept-4)
  - [Why it works](#why-it-works-4)
  - [Tradeoff](#tradeoff-4)
- [Option F: Calibration against real games](#option-f-calibration-against-real-games)
  - [Concept](#concept-5)
  - [Why it matters](#why-it-matters)
- [How these fit together (recommended stack)](#how-these-fit-together-recommended-stack)
- [How to explain this to users (important)](#how-to-explain-this-to-users-important)
- [Final takeaway](#final-takeaway)
  - [You don’t need:](#you-dont-need)
  - [To get:](#to-get)
- [Deeper Dive v1](#deeper-dive-v1)
  - [1. For Possession-Based Simulation (Core)](#1-for-possession-based-simulation-core)
  - [2. For Strategy-Weighted Modifiers](#2-for-strategy-weighted-modifiers)
  - [3. For Matchup Adjustments](#3-for-matchup-adjustments)
  - [4. For Outcome Buckets](#4-for-outcome-buckets)
  - [It's a Scalable Solution](#its-a-scalable-solution)
  - [How It Works in Practice](#how-it-works-in-practice)
  - [Applying Archetype Synergy](#applying-archetype-synergy)
  - [Why Box Stats Fall Short](#why-box-stats-fall-short)
  - [What Data You Actually Need](#what-data-you-actually-need)
  - [Offensive Archetypes](#offensive-archetypes)
  - [Defensive Archetypes](#defensive-archetypes)
  - [Rebounding Archetype](#rebounding-archetype)
  - [What's Missing?](#whats-missing)
- [Deeper Dive v2](#deeper-dive-v2)
  - [Traits: Recommendation](#traits-recommendation)
  - [Traits: NBA 2K](#traits-nba-2k)
  - [Traits: Crafted NBA](#traits-crafted-nba)


## The simplest mental model: Basketball as a sequence of decisions

At a high level, a basketball game is just:

*   Possessions
*   Decisions made on each possession
*   Outcomes influenced by:
    *   Player skills
    *   Lineups
    *   Context
    *   Strategy

Every simulation approach is just a different way of modeling that loop.

## Option A: Possession-based statistical engine

This is the backbone of most serious simulations.

### Concept

*   The game is simulated **possession by possession**
*   Each possession:
    1.  Chooses a play type (PnR, iso, post, spot-up)
    2.  Chooses a player (based on roles/usage)
    3.  Resolves an outcome probabilistically
    4.  Updates stats

### Inputs

*   Player efficiency by play type
*   Team pace
*   Lineup synergy
*   Strategy weights (e.g. “run PnR 40%”)

### Outputs

*   Box score
*   Shot charts
*   Play-type breakdowns
*   Final score

### Why it works

*   Mirrors how analysts think
*   Naturally produces realistic distributions
*   Scales well for “what-if” scenarios

### Tradeoff

*   No spatial detail
*   Abstract, but powerful

## Option B: Strategy-weighted outcome models

Instead of simulating every possession, you simulate **statistical tendencies**.

### Concept

*   Strategies modify statistical expectations:
    *   More corner 3s
    *   Fewer mid-range shots
    *   Higher pace
*   You simulate the _resulting stat profile_ directly.

### Example

*   “5-out offense” →
    *   +3PA
    *   −Post-ups
    *   Slightly higher turnover risk
*   “Drop coverage” →
    *   Fewer rim attempts
    *   More pull-up jumpers allowed

### Outputs

*   Adjusted box scores
*   Shot distribution
*   Efficiency metrics

### Why it works

*   Very fast
*   Extremely stable
*   Easy to explain to users

### Tradeoff

*   Less granular storytelling
*   More “model-driven” than “game-driven”

## Option C: Matchup-driven simulation

This adds realism without visuals.

### Concept

*   Every possession is influenced by:
    *   Offensive player
    *   Primary defender
    *   Team scheme
*   Outcomes are adjusted by matchup context.

### Example

*   Elite rim protector vs slasher →
    *   Lower FG% at rim
    *   Higher kick-out rate
*   Weak POA defender vs PnR ball-handler →
    *   More drives
    *   Higher foul rate

### Why it works

*   Feels basketball-real
*   Explains _why_ results happen
*   Supports coaching decisions

### Tradeoff

*   More complexity
*   Requires thoughtful abstractions

## Option D: Play-type flow modeling

This is about _how plays lead into each other_.

### Concept

*   Plays don’t happen randomly
*   They flow based on:
    *   Success/failure
    *   Coaching tendencies
    *   Game state

### Example

*   Missed shots → more transition attempts
*   Hot shooter → increased usage
*   Late game → more isolation

### Why it works

*   Produces believable momentum
*   Explains scoring runs
*   Avoids “random soup” feeling

### Tradeoff

*   Still abstract
*   Needs careful tuning

## Option E: Outcome buckets instead of animation

This is a powerful middle ground.

### Concept

*   Every possession resolves into:
    *   Shot type
    *   Defender pressure
    *   Result category

Instead of “he drives and dunks”:

*   “Rim attempt, contested, made”

### Why it works

*   Keeps everything numeric
*   Still feels descriptive
*   Supports deep stat breakdowns

### Tradeoff

*   No cinematic flair
*   Requires good UI to feel engaging

## Option F: Calibration against real games

This is _how you get realism_, regardless of method.

### Concept

*   Run your simulation thousands of times
*   Compare distributions to:
    *   Real NBA box scores
    *   Shot profiles
    *   Play-type frequencies
*   Adjust until they match reality.

### Why it matters

*   Realism is about **distributions**, not perfection
*   Users care that results “feel right”

## How these fit together (recommended stack)

If I had to recommend a **clean, powerful approach**:

1.  **Possession-based simulation** (core)
2.  **Strategy-weighted modifiers**
3.  **Matchup adjustments**
4.  **Outcome buckets**
5.  **Data visualization instead of animation**

This gives you:

*   Deep realism
*   Clear explainability
*   Legal safety
*   Performance at scale

## How to explain this to users (important)

Users trust simulations when they understand them.

Frame it as:

> “This engine models possessions using historical player tendencies, lineup interactions, and coaching strategies to generate statistically realistic outcomes.”

That’s honest and compelling.

## Final takeaway

### You don’t need:  
❌ Animated players  
❌ Visual courts  
❌ Play-by-play reenactments

### To get:  
✅ Realistic outcomes  
✅ Meaningful strategy impact  
✅ Deep what-if exploration

What you’re really building is:

> **A basketball decision simulator, not a basketball video game**

## Deeper Dive v1

User: Please read #file:Simualtion.md. The author left a recomendation in the section #sym:## How these fit together (recommended stack). Which data, like player and team stats, would be necessary to drive this?

GitHub Copilot: Based on the recommended simulation stack in Simualtion.md, you would need a comprehensive set of player, team, and lineup data to drive the engine. The focus is on statistical realism rather than visual animation.

Here is a breakdown of the necessary data for each component of the recommended stack:

### 1. For Possession-Based Simulation (Core)
This is the engine's foundation, simulating the game one possession at a time.

*   **Player Play-Type Data:**
    *   **Frequency:** What percentage of the time is a player used in specific plays (e.g., PnR Ball Handler, Spot-up, Isolation, Post-up)?
    *   **Efficiency:** How many points does a player score per possession for each of those play types? This also includes their shooting percentages and turnover rates within each play.
*   **Player Usage Rate:** The overall percentage of team possessions a player uses when on the floor.
*   **Team Pace:** The average number of possessions a team uses per game.
*   **Lineup Data:**
    *   **Synergy Stats:** Offensive and defensive ratings for specific combinations of players (e.g., how many points do they score/allow per 100 possessions when on the court together?).

### 2. For Strategy-Weighted Modifiers
This layer adjusts statistical probabilities based on the chosen coaching strategies.

*   **Team Strategy Data:**
    *   Statistical impact of different offensive and defensive schemes. For example, data showing how a "5-out" offense changes a team's shot distribution (more 3-point attempts, fewer post-ups) or how a "Drop" defensive coverage affects opponent shot charts (fewer shots at the rim, more mid-range jumpers).

### 3. For Matchup Adjustments
This component models how individual player-vs-player matchups affect outcomes.

*   **Player Matchup Data:**
    *   **Offensive Performance vs. Defender Archetypes:** How a player's efficiency changes when facing elite perimeter defenders versus average ones, or when attacking a strong rim protector.
    *   **Defensive Impact:** Statistics on a defender's ability to contest shots, force turnovers, and how opponents shoot when they are the primary defender.
*   **Shot Contest Data:** Player shooting percentages when "open" versus "contested."

### 4. For Outcome Buckets
This determines the descriptive result of a possession without needing animation.

*   **Detailed Shot Data:**
    *   **Location:** Where on the court a shot was taken from (e.g., at the rim, short mid-range, corner 3).
    *   **Type:** Was it a dunk, layup, jumper, etc.?
    *   **Context:** Was the shot assisted? Was it a pull-up jumper or a catch-and-shoot?

In essence, you are looking for data that goes beyond traditional box scores. The ideal source would be services that provide detailed play-by-play, play-type, and player tracking statistics.

User: Because the game will include a fantasy draft system, having specific lineup combinations as part of the assessment, won't work. The furthest I could imagine is some kind of effectniveness of players in certain roles (e.g. PnR Ballhandler) alongside other archtetypes (e.g. Postup Player, PnR Roller, ...). Would that be a reasonable substituation?

GitHub Copilot: Yes, that is an excellent and highly practical substitution. Replacing specific, hard-coded lineup data with a system of player archetypes and their interactions is a standard and effective way to model team composition in a dynamic environment like a fantasy draft.

Here’s why that’s a strong approach and how it would work:

### It's a Scalable Solution
You are correct that pre-calculating the synergy of every possible 5-player lineup is impossible in a fantasy context. An archetype-based system solves this by abstracting players into roles. Instead of analyzing `Player A + Player B`, you analyze `Slasher + Spot-up Shooter`. This is computationally feasible and scales to any combination of players.

### How It Works in Practice
You would define a set of core basketball archetypes, for example:
*   **On-Ball Creator** (Handles the ball, initiates offense, e.g., PnR Ballhandler)
*   **Off-Ball Scorer** (Moves without the ball, e.g., Spot-up Shooter)
*   **Finisher/Roller** (Scores at the rim, sets screens, e.g., PnR Roller)
*   **Post Hub** (Operates from the post)
*   **Defensive Anchor** (Protects the rim)
*   **Perimeter Defender** (Guards players on the wing)

During the simulation, the engine would assess the archetypes on the floor for the offensive and defensive teams on each possession.

### Applying Archetype Synergy
This system would directly influence the **Possession-based Simulation** and **Matchup Adjustment** layers of the recommended stack:

1.  **Improves Possession-Based Probabilities:**
    *   A **PnR Ballhandler's** efficiency would increase if a **PnR Roller** is on the floor, as it opens up a high-value passing target.
    *   A **Slasher's** probability of a successful drive increases if the other players are **Spot-up Shooters**, as this creates spacing and pulls defenders away from the paint.
    *   Conversely, having two **Post Hubs** on the floor at the same time might slightly decrease the efficiency of both, as they clog the same space.

2.  **Enhances Matchup Adjustments:**
    *   If the offense has a dominant **Slasher**, the defense having a **Defensive Anchor** at the rim would significantly lower the slasher's expected FG%.
    *   A team of **Spot-up Shooters** would be less effective if the opposing team has multiple elite **Perimeter Defenders**.

This approach retains the spirit of lineup synergy by focusing on *fit* and *roles*, which is the core of modern team-building, while being flexible enough to handle the endless combinations a fantasy draft allows. It makes the draft itself more strategic, as users would need to think about building a coherent team of complementary archetypes, not just accumulating the highest-rated players.

User: Can I derive these archetypes from box stats?

GitHub Copilot: Deriving those specific, granular archetypes directly from traditional box stats (points, rebounds, assists, etc.) is very difficult and often inaccurate. The simple answer is **no, not effectively.**

Box scores tell you the **result** of a player's actions, but they don't tell you the **process**. They lack the necessary context to distinguish between different play styles that might lead to the same statistical output.

### Why Box Stats Fall Short

Let's take a few examples:

*   **Points:** A player scores 25 points. The box score doesn't tell you *how*.
    *   Was it a **Spot-up Shooter** hitting catch-and-shoot threes?
    *   Was it a **Slasher** constantly driving to the rim?
    *   Was it a **Post Hub** scoring with their back to the basket?
    *   Was it an **On-Ball Creator** using pick-and-rolls to create their own shot?
    All these archetypes could end up with 25 points, but they represent completely different roles on the court.

*   **Assists:** A player has 8 assists.
    *   Did they come from a **PnR Ballhandler** masterfully finding the rolling big man?
    *   Did they come from a **Slasher** collapsing the defense and kicking out to open shooters?
    The box score just shows "8 assists."

*   **Defense:** A player's defensive role is almost invisible in a standard box score. Steals and blocks are useful but don't capture:
    *   A **Perimeter Defender's** ability to stay in front of their man.
    *   A **Defensive Anchor's** skill in altering shots without blocking them (rim deterrence).

### What Data You Actually Need

To properly identify these archetypes, you need data that describes the *process* of the game. This is typically found in **play-type data** and **advanced tracking stats**.

Here’s what you would look for:

| Archetype | Key Data Points Needed (Beyond Box Score) |
| :--- | :--- |
| **PnR Ballhandler** | - **Frequency** of possessions used as the PnR ball handler.<br>- **Efficiency** (Points Per Possession) in those situations. |
| **PnR Roller/Finisher** | - **Frequency** of possessions used as the PnR roll man.<br>- FG% on shots at the rim. |
| **Spot-up Shooter** | - **Frequency** of spot-up possessions.<br>- Points Per Possession on catch-and-shoot jumpers. |
| **Slasher / Driver** | - Number of drives per game.<br>- FG% on drives. |
| **Post Hub** | - **Frequency** of post-up possessions.<br>- **Efficiency** on post-up plays. |
| **Perimeter Defender** | - Opponent FG% when they are the primary defender.<br>- Advanced metrics like "contested shots." |

In short, while you can make some very rough inferences from box scores (e.g., a player with high rebounds and blocks is likely a big man), you cannot reliably build the nuanced archetype system your simulation needs. You will need a data source that provides play-type statistics.

User: I have access to data, reflected by the following the model #file:AllSeasonStats.ts. Please check it for relevant data to create these archetypes and suggest the once that could be extracted of that data.

GitHub Copilot: After reviewing the `AllSeasonStats.ts` model, I can confirm that you have access to an excellent dataset. While it doesn't contain explicit play-type data (like "Pick and Roll Ball Handler possessions"), it is far more detailed than a standard box score and provides strong proxies to derive several key archetypes.

You can absolutely create a robust archetype system with this data. The key is to combine multiple fields to build a profile for each player.

Here are the archetypes you can effectively extract from this data model, along with the fields you would use:

### Offensive Archetypes

#### 1. Slasher / Rim Attacker
This player's primary value comes from getting to the basket.
*   **Key Indicators:**
    *   High `AtRimFrequency`: A large percentage of their shots are at the rim.
    *   High `AtRimFGA`: A high volume of attempts at the rim.
    *   High `AtRimAccuracy`: They finish effectively when they get there.
    *   Low `AtRimPctAssisted`: They create their own shots at the rim (a true slasher) vs. being a pure finisher.

#### 2. Off-Ball Finisher
This player scores at the rim, but is typically assisted by others (e.g., a center who gets dunks and layups from passes).
*   **Key Indicators:**
    *   High `AtRimFrequency` and `AtRimAccuracy`.
    *   High `AtRimPctAssisted`: Most of their rim attempts are set up by teammates.

#### 3. Perimeter Shooter (Spot-up Specialist)
This player excels at catch-and-shoot situations from the three-point line.
*   **Key Indicators:**
    *   High `Corner3Frequency` and/or `Arc3Frequency`: They take a lot of threes.
    *   High `Corner3Accuracy` and/or `Arc3Accuracy`: They make them at a high rate.
    *   High `Corner3PctAssisted` and `Arc3PctAssisted`: A very high percentage of their made threes are assisted, indicating they are not creating their own shot.
    *   High `PtsAssisted3s`.

#### 4. On-Ball Creator / Shot Creator
This is your primary initiator. They create their own offense and shots for others. This is the closest you can get to a "PnR Ballhandler" archetype with this data.
*   **Key Indicators:**
    *   High `Usage`: They are heavily involved in the offense.
    *   Low `AtRimPctAssisted`, `ShortMidRangePctAssisted`, `LongMidRangePctAssisted`: A low percentage of their shots are assisted, meaning they create for themselves.
    *   High `PtsUnassisted2s` and `PtsUnassisted3s`.
    *   High `AssistPoints`, `Assists`, and assists to valuable locations (`AtRimAssists`, `Corner3Assists`).

#### 5. Mid-Range Scorer
A player who specializes in shots inside the arc but outside the paint.
*   **Key Indicators:**
    *   High `ShortMidRangeFrequency` and/or `LongMidRangeFrequency`.
    *   High `ShortMidRangeAccuracy` and/or `LongMidRangeAccuracy`.
    *   Often has a lower `...PctAssisted` on these shots, indicating self-creation.

### Defensive Archetypes

#### 6. Rim Protector
The defensive anchor who deters and blocks shots at the basket.
*   **Key Indicators:**
    *   High `Blocks`.
    *   High `BlockedAtRim`: Specifically blocks shots where they matter most.
    *   Low `OpponentAtRimAccuracy` (when this player is on the court, if available at the player level).
    *   High `DefReboundPct`.

#### 7. Perimeter Defender / On-Ball Pest
A defender who disrupts plays on the perimeter.
*   **Key Indicators:**
    *   High `Steals`.
    *   High `FoulsDrawn` on non-shooting plays (if you can isolate them) and `ChargesDrawn`.
    *   Low `Opponent...Accuracy` across perimeter zones (Corner3, Arc3) when they are on the court.

### Rebounding Archetype

#### 8. Offensive Rebounder / Hustle Player
A player who creates extra possessions for their team.
*   **Key Indicators:**
    *   High `OffReboundPct`.
    *   High `SelfOReb` and `SelfORebPct`: They are adept at getting their own miss.
    *   High `SecondChancePoints`.

### What's Missing?
The main thing you cannot directly measure is **play-type frequency**. You can't definitively say "this player was the PnR Ballhandler on X% of possessions." However, by using `Usage`, `PtsUnassisted`, and `AssistPoints`, you can create a very strong "On-Ball Creator" archetype that serves the same functional purpose in your simulation.

**Conclusion:** The data in `AllSeasonStats.ts` is more than sufficient. You can build a nuanced and effective archetype system by creating composite scores from these metrics.

## Deeper Dive v2

### Traits: Recommendation

For the purpose of a stats-based simulation game, the **NBA 2K traits are significantly more helpful and practical** than the Crafted NBA traits, given the available data.

The primary reason is that the NBA 2K traits are directly mapped to the granular statistics available in the project's data models (like `AllSeasonStats.ts`). They are designed to describe *how* a player plays, which is exactly what a possession-based simulation engine needs.

*   **NBA 2K Traits (Recommended):**
    *   **Actionable & Granular:** These traits describe specific, observable basketball skills (e.g., `Corner Specialist`, `Putback Boss`). This allows the simulation to directly modify probabilities for specific actions. For example, when simulating a shot from the corner, the engine can check if the player has the `Corner Specialist` trait and grant a statistical boost.
    *   **Directly Mapped to Available Data:** They can be identified using the fields in `AllSeasonStats.ts` without needing external or unavailable data.
    *   **Builds a Player Profile:** Combining these traits creates a detailed picture of a player's style, which tells the simulation how to use them effectively.

*   **Crafted NBA Traits (Less Suitable):**
    *   **Requires Unavailable Data:** The "ingredients" for these traits are complex, all-in-one metrics like `DARKO`, `LEBRON`, and `BPM`. These are the proprietary outputs of complex external models and cannot be calculated with the available data.
    *   **Too Abstract for Simulation:** These traits are conclusions, not components. Knowing a player is one of the "Best Offensive Players" doesn't tell the simulation *how* to model their next possession. The NBA 2K traits provide this crucial context.

### Traits: NBA 2K

Here is a breakdown of the traits from NBA 2K, mapped to the data points available in your `AllSeasonStats.ts` model. This provides a clear path for identifying which players possess these traits based on their statistical profile.

#### Finishing/Inside Scoring

| Trait | Key Statistics | Description |
| :--- | :--- | :--- |
| **Fearless Finisher** | `ShootingFoulsDrawn`, `And1s` | Strengthens a player's ability to absorb contact and still finish layups. |
| **Giant Slayer** | High `AtRimAccuracy` for a player with below-average height for their position. | Boosts the shot percentage for a smaller player on a layup attempt against a taller defender. |
| **Lob City Finisher** | High `AtRimPctAssisted`, High `AtRimAccuracy`, `Dunks` | Improves the chances of completing a successful alley-oop dunk/layup. |
| **Posterizer** | `Dunks`, `ShootingFoulsDrawn` | Increases the chances of dunking on a defender. |
| **Pro Touch** | High `AtRimAccuracy` | Gives an additional boost for having good layup timing. |
| **Putback Boss** | `OffReboundPct`, `SecondChancePoints`, `SelfORebPct` | Increases shot percentage when attempting a putback after an offensive rebound. |
| **Rise Up** | `Dunks`, `AtRimFrequency` | Increases the likelihood of dunking the ball when standing in the painted area. |
| **Slithery** | High `AtRimFrequency`, Low `Turnovers` | Makes it easier for a player to get through traffic and avoid contact on gathers and finishes at the rim. |

#### Shooting/Outside Scoring

| Trait | Key Statistics | Description |
| :--- | :--- | :--- |
| **Agent 3** | `PtsUnassisted3s`, High `Arc3Frequency` | Improves the ability to make pull-up or spin shots from three-point range. |
| **Catch & Shoot** | `PtsAssisted3s`, `Arc3PctAssisted`, `Corner3PctAssisted`, `Arc3Accuracy`, `Corner3Accuracy` | Boosts the chance of hitting a jump shot immediately after a catch. |
| **Corner Specialist** | High `Corner3Frequency`, High `Corner3Accuracy` | Gives a boost to shots taken in the corner. |
| **Difficult Shots** | `PtsUnassisted2s`, `PtsUnassisted3s`, `ShortMidRangeAccuracy`, `LongMidRangeAccuracy` | Improves the ability to shoot difficult shots off the dribble. |
| **Middy Magician** | `ShortMidRangeFrequency`, `LongMidRangeFrequency`, `ShortMidRangeAccuracy`, `LongMidRangeAccuracy` | Improved ability to make mid-range jumpers off the bounce or out of the post. |
| **Tireless Shooter** | High `Points` and `FGA` on high `Minutes` played | Improves a player's ability to make shots when fatigued. |
| **Volume Shooter** | High `Usage`, `FGA` | Boosts shot percentages as shot attempts accrue throughout the game. |

#### Playmaking/Ball-handling

| Trait | Key Statistics | Description |
| :--- | :--- | :--- |
| **Bail Out** | Low `Turnovers` relative to `Usage` and `AssistPoints` | Increases the success of passing out of a jump shot or layup. |
| **Break Starter** | High `DefRebounds` and `Assists` for a rebounding player | Improves a player's ability to throw effective outlet passes after a rebound. |
| **Dimer** | `AssistPoints`, `Assists`, `AtRimAssists`, `Corner3Assists` | Boosts the shot percentage for open teammates on jump shots after catching a pass. |
| **Needle Threader** | High `AssistPoints` relative to `Turnovers` | Increases the likelihood that tough passes can get by the defense. |
| **Quick First Step** | Low `AtRimPctAssisted`, `ShortMidRangePctAssisted` (indicates self-creation) | Provides more explosive first steps out of triple threat and size-ups. |
| **Unpluckable** | Low `Turnovers` relative to `Usage` | Reduces the chances of being stripped by a defender. |

#### Defense/Rebounding

| Trait | Key Statistics | Description |
| :--- | :--- | :--- |
| **Boxout Beast** | High `DefReboundPct` | Improves the player's ability to box out and win rebound battles. |
| **Chase Down Artist** | High `Blocks` for a non-center position | Boosts the speed and leaping ability of a player when chasing down an offensive player for a block. |
| **Interceptor** | High `Steals` | Increases the chances of getting steals in passing lanes. |
| **Pick Pocket** | High `Steals`, Low `ShootingFoulsDrawn` against them | Increases the chances of a steal and reduces the chances of a foul when attempting to strip the ball. |
| **Rebound Chaser** | High `OffReboundPct`, High `DefReboundPct` | Improves a player's ability to track down rebounds from farther distances. |
| **Rim Protector** | `Blocks`, `BlockedAtRim` | Reduces the chances of a dunk/layup being successful for those that the player is defending. |
| **Work Horse** | High `Steals`, `Blocks`, `ChargesDrawn`, `LooseBallFoulsDrawn` | Improves a player's ability to hustle for loose balls and play tough defense without getting tired. |

#### Athleticism & Intangibles

| Trait | Key Statistics | Description |
| :--- | :--- | :--- |
| **Free Points** | High `FTAPct` | Improves the ability to knock down free throws. |
| **Team Player** | High `AssistPoints`, Low `Usage` relative to position | A player will get a boost to their attributes when their team is playing well. |

### Traits: Crafted NBA

This website uses advanced metrics to define its player traits. Here's a breakdown of their categories and the "ingredients" they use.

#### Offense

| Trait | Key Statistics | Description |
| :--- | :--- | :--- |
| **Best Offensive Players** | `DARKO`, `DRIP`, `CraftedPM`, `BPM` | Identifies elite offensive players using a composite of all-in-one metrics. |
| **Best Shooters** | `SQ` (Shot Quality), `3P` (3-Point Percentage), `FT` (Free Throw Percentage) | Evaluates shooting prowess based on shot quality, three-point, and free-throw accuracy. |
| **Biggest Gunners** | `Passes Received`, `Passes Made`, `Defensive Rebounds` | Highlights players who dominate possession and look to score. |
| **Best Offensive Rebounders (Moses)** | `ORB%` (Offensive Rebound Percentage), `raORDB` | Pinpoints players who excel at creating second-chance opportunities. |
| **Best Passers** | `PasserRating` | Measures a player's ability to create for teammates. |
| **Best Players (King of the Court)** | `DARKO`, `DRIP`, `BPM`, `LEBRON` | Designates the most impactful players on the court using top-tier advanced stats. |

#### Defense

| Trait | Key Statistics | Description |
| :--- | :--- | :--- |
| **Best Defenders** | `DARKO`, `CraftedPM`, `BPM`, `LEBRON` | Identifies elite defensive players using a composite of all-in-one metrics. |
| **Worst Defenders (Sieve)** | `DARKO`, `CraftedPM`, `BPM`, `LEBRON` | Pinpoints the least effective defensive players. |
| **Most Versatile Defenders** | `Versatility Rating`, `Matchup Difficulty Rating` | Highlights players who can guard multiple positions against difficult opponents. |
| **Defensive Rebounding (Board Man Gets Paid)** | `TRB%` (Total Rebound Percentage), `raDRDB` | Measures a player's effectiveness at securing defensive rebounds. |
| **Rim Defense (We Must Protect This House!)** | `RADpgDefended`, `DefendedFG%` | Evaluates a player's ability to protect the rim and alter shots. |
| **Disruptors (Muck It Up)** | `DFL` (Deflections), `raDTOV` | Identifies players who create defensive havoc through deflections and forcing turnovers. |

#### Other

| Trait | Key Statistics | Description |
| :--- | :--- | :--- |
| **Replacement Level (Bad Bad Not Good)** | `DARKO`, `DRIP`, `BPM`, `CraftedPM`, `LEBRON` | Identifies players performing at or below a replacement-level standard. |
| **Length** | `Wingspan`, `Height` | Measures a player's physical size and reach. |
| **Consistency** | `Offensive Load`, `Good Game %` | Evaluates a player's game-to-game reliability and performance stability. |
| **Basketball IQ** | `BBall IQ` | A metric assessing a player's on-court intelligence and decision-making. |
| **Futures (Prospects)** | `CraftedPeakPM`, `Age` | Identifies young players with high potential based on age and projected peak performance. |
| **Three 'N D** | `3PM/g`, `3P%`, `3PAttemptRate`, `CraftedDPM` | Pinpoints players who excel at both three-point shooting and defense. |
| **Portability (Fit)** | `Portability` | Measures how well a player's skills translate to different team contexts. |
| **Unsung Heroes (Intangible)** | `CraftedPM`, `DARKO`, `DRIP`, `LEBRON`, `PTS/g`, `TRB/g`, `AST/g` | Highlights impactful players whose contributions may not always show up in basic stats. |

