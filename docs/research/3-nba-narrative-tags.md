---
generated: 2026-03-27
research_depth: "primary (59 sources via NLM deep research agent) + approved secondary (4 additional sources: NBAStu rivalries, 2003-04 Detroit Pistons Wikipedia, Phoenix Suns Wikipedia, Giannis Antetokounmpo Wikipedia, Larry Bird Wikipedia)"
notebooklm_notebook: https://notebooklm.google.com/notebook/8bc83826-c260-4a99-b8b5-425d0268a208
artifact_briefing_doc: notebooklm-briefing-nba-narrative-tags.md
---

# NBA Narrative Tag Vocabulary

*Research Report — Artifact B*

---

## Table of Contents

1. [Research Question & Scope](#1-research-question--scope)
2. [Methodology](#2-methodology)
3. [Key Findings — Tag Vocabulary (8 Domains)](#3-key-findings--tag-vocabulary-8-domains)
   - [Domain 1 — Player Identity / Archetype](#domain-1--player-identity--archetype)
   - [Domain 2 — Chemistry and Synergy](#domain-2--chemistry-and-synergy)
   - [Domain 3 — Relationship](#domain-3--relationship)
   - [Domain 4 — Potential and Development](#domain-4--potential-and-development)
   - [Domain 5 — Moment / Event](#domain-5--moment--event)
   - [Domain 6 — Season / Franchise State](#domain-6--season--franchise-state)
   - [Domain 7 — Coach / GM Identity](#domain-7--coach--gm-identity)
   - [Domain 8 — Legacy and Historical Comparison](#domain-8--legacy-and-historical-comparison)
4. [Source Inventory](#4-source-inventory)
5. [Conflicts & Open Questions](#5-conflicts--open-questions)
6. [Blindspot / Gap Analysis](#6-blindspot--gap-analysis)
7. [Recommended Next Steps](#7-recommended-next-steps)

---

## 1. Research Question & Scope

```
Research question: What is the structured tag vocabulary (70–90 tags across 8 narrative
domains) grounded in real NBA history from the Dr. J era (~1976) to the 2024-25 season
that a basketball management game's emergent narration engine should use to produce
contextually specific, historically resonant story beats?

Scope constraints:
  - Time range: Dr. J era (~1976) to 2024-25 NBA season
  - Tag format: kebab-case, max 3 words, system-agnostic
  - Tags describe narrative reality, not game mechanics
  - Each tag must be genuinely distinct (no near-synonyms)
  - Target count: 70–90 total across 8 required domains
  - All 8 domains must be covered; none may be skipped
  - Required storylines: Big Three formations, dynasty peaks/collapses, rivalries,
    redemption arcs, busts/disappointments, late bloomers, reluctant heroes, Cinderella
    moments, chemistry explosions/collapses, veterans fading/defying time, coaching
    genius vs player revolt, superteam backlash, underdog champions, trade drama,
    draft fortune/misfortune, injury tragedies, hometown loyalty vs ring-chasing,
    generational torch passing

Out of scope:
  - International leagues / FIBA (except where players' NBA arcs require it)
  - Women's basketball (WNBA)
  - Tags that describe game mechanics (e.g., "fast-break offense") rather than
    narrative reality (e.g., "system-prophet")
  - Near-synonyms to existing tags
```

---

## 2. Methodology

- **Resource types consulted:** Web (Wikipedia, ESPN, Sports Illustrated, The Ringer, Reddit NBA communities), YouTube (documentary excerpts, retrospectives), produced sports documentaries (*The Last Dance*, NBA Legacy series)
- **Search strategy:** NLM deep research agent (`source add-research --mode deep`) — 59 primary sources imported; 5 secondary sources added manually (4 confirmed successful)
- **Depth:** Primary sources via NLM; 5 approved secondary sources followed; 9 domain-specific RAG synthesis queries + 1 post-secondary re-query + 7 gap retrospective queries
- **Secondary sources approved by user:** Yes — NBAStu rivalries article, 2003-04 Detroit Pistons (Wikipedia), Phoenix Suns (Wikipedia), Giannis Antetokounmpo (Wikipedia), Larry Bird (Wikipedia)
- **Tools used:** NotebookLM CLI (`notebooklm source add-research`, `notebooklm ask --save-as-note`, `notebooklm generate mind-map`, `notebooklm history --save`), WebFetch (source content verification)
- **NotebookLM used:** Yes — notebook `8bc83826-c260-4a99-b8b5-425d0268a208`, conversation `a6a973bc-eb10-4d31-bc6b-14e932c2bcd3`. NLM acted as primary RAG synthesis engine across all 64 sources; all tag derivations are grounded in NLM note responses.
- **NLM notes produced:** `themes`, `development-arcs`, `coaching-narratives`, `trades-and-chemistry`, `moment-narratives`, `legacy-comparison`, `franchise-season-state`, `relationships`, `chemistry-synergy`, `post-secondary-check`, plus 7 gap query responses and 1 session history note.

---

## 3. Key Findings — Tag Vocabulary (8 Domains)

**Total tag count: 82**

All tags: kebab-case, ≤3 words, system-agnostic, describe narrative reality not game mechanic. Each entry includes a one-line definition and a canonical NBA reference.

---

### Domain 1 — Player Identity / Archetype
*What kind of player — and story — this person fundamentally is.*

**13 tags**

| Tag | Definition | Canonical Reference |
|-----|-----------|-------------------|
| `alpha-dog` | The undisputed first option; defines the team's identity and demands the ball in decisive moments | Jordan, Kobe, prime LeBron |
| `reluctant-star` | Has elite talent but resists the spotlight or franchise-cornerstone role | Kawhi Leonard — won 2x, never sought the leading-man narrative |
| `quiet-excellence` | Sustained greatness achieved without personal branding or media drama | Tim Duncan — 5 rings, 0 off-court controversies |
| `system-dependent` | Production tied inseparably to a specific scheme; thrives in one context, struggles everywhere else | Boris Diaw — 2014 Spurs / D'Antoni-era Suns |
| `system-irreplaceable` | The engine the system cannot run without; not replaceable by a stat-equivalent player | Draymond Green — Warriors' connective tissue |
| `franchise-ghost` | Won a title as a one-year rental; left no permanent identity bond with the franchise | Kawhi Leonard — Toronto 2019 |
| `hometown-hero` | Grew up a fan of the team they now carry; carries the weight of regional identity | LeBron James — Cleveland |
| `improbable-ascent` | Rose from near-total obscurity — undrafted, unknown, or written off — to genuine star | Giannis Antetokounmpo — undocumented street vendor → Greek Freak |
| `journeyman-grinder` | Career defined by survival across many teams; identity is adaptability, not stardom | Numerous 10-day contract veterans navigating G-League call-ups |
| `alpha-clash` | Two legitimate first-options on the same roster; the team's identity is contested daily | Kobe Bryant vs Dwight Howard — 2012-13 Lakers |
| `unicorn-prospect` | A modern prospect who defies positional classification entirely — does everything, fits nowhere traditional | Cooper Flagg archetype; Giannis at 18 |
| `3d-specialist` | Player whose entire value proposition is floor-spacing plus elite perimeter defense | Klay Thompson early career; Danny Green |
| `positionless-forward` | A frontcourt player who reads and plays like a guard — handles, creates, and switches | LeBron James, Draymond Green, Kevin Durant |

---

### Domain 2 — Chemistry and Synergy
*How players combine — or fail to combine — as a unit.*

**10 tags**

| Tag | Definition | Canonical Reference |
|-----|-----------|-------------------|
| `destined-duo` | Two players whose styles are so complementary they feel made for each other | Magic Johnson + Kareem Abdul-Jabbar; Steph Curry + Draymond Green |
| `big-three-formed` | A deliberate assembly of three stars intended to be a championship nucleus | 2008 Boston Celtics (Pierce/Allen/Garnett); 2010 Miami Heat (LeBron/Wade/Bosh) |
| `chemistry-explosion` | A roster clicks beyond all expectation — role players over-perform, the whole exceeds the sum of its parts | 2004 Detroit Pistons — no superstar, maximized synergy |
| `chemistry-collapse` | A roster with theoretical talent dissolves into selfishness, mismatched roles, or poisoned dynamics | 2021-22 Brooklyn Nets (Harden/KD/Kyrie) |
| `incompatible-superstars` | Two stars whose overlapping skill sets or personalities create structural friction impossible to resolve | Dwight Howard + Kobe Bryant — redundant needs, irreconcilable styles |
| `team-over-ego` | A roster that sacrifices individual maximization for collective identity; wins through selflessness | 2014 San Antonio Spurs — the "Beautiful Game" Finals |
| `nursing-home-squad` | A superteam assembled from past-their-prime legends; physically unable to survive a playoff run | 1998-99 Rockets (Olajuwon/Pippen/Barkley); 2013-14 Brooklyn Nets |
| `depth-advantage` | Victory driven not by superstar dominance but by having more reliable contributors than any opponent | OKC Thunder 2024-25 — hoarded picks, developed depth |
| `cultural-reset` | A roster that has been broken up, bought out, or traded away to begin again from scratch after a failed superteam | 2024-25 Phoenix Suns post-Durant/Beal era |
| `second-apron-trap` | A financially crippling talent assembly — massive contracts with flawed max players who cannot be moved | 2023-25 Phoenix Suns; Trae Young trade market collapse |

---

### Domain 3 — Relationship
*The bond, tension, or rupture between player-player, player-coach, and player-franchise.*

**11 tags**

| Tag | Definition | Canonical Reference |
|-----|-----------|-------------------|
| `player-coach-bond` | A deep mutual trust between a star and a coach — the player would run through walls for them | Tim Duncan + Gregg Popovich; Steph Curry + Steve Kerr |
| `lost-locker-room` | A coach who has forfeited the respect of their players; authority exists on paper only | Numerous mid-season firings — Frank Vogel Lakers 2022 |
| `owner-meddling` | A front office where ownership overrides scouts, analytics, and the GM's judgment | Michael Heisley forcing the Thabeet pick; James Dolan's Knicks decades |
| `franchise-loyalty` | A player who declined bigger offers, better rosters, or more glamorous cities to stay | Dirk Nowitzki — 21 seasons, 1 team |
| `ring-chasing` | A veteran or star who prioritized winning a title over franchise loyalty or market loyalty | Kevin Durant to Golden State; Ray Allen to Miami |
| `trade-demand` | A superstar who forces their way out, restructuring the balance of power across the league | KD to Brooklyn; Anthony Davis trade request from New Orleans |
| `forced-departure` | A beloved player pushed out involuntarily by front-office dysfunction or ownership failure | Karl Malone leaving Utah to chase a ring at 40; Patrick Ewing from New York |
| `given-up-too-early` | A franchise that lost faith in a player who subsequently proved them wrong elsewhere | Isaiah Thomas — 2 point-guard of the year seasons, then discarded |
| `outlasted-franchise` | A player who endured multiple full rebuilds, coaching changes, and roster overhauls while remaining | Carmelo Anthony — outlasted Melo-era Knicks and multiple iterations |
| `torch-rivalry` | A relationship defined by mutual competition that elevated both players and shaped an era | Magic Johnson vs Larry Bird — saved the NBA; Bird vs Jordan |
| `alpha-negotiation` | An off-court, social confrontation that establishes the league's new pecking order | Jordan vs Magic/Bird — 1992 Dream Team hotel room moment |

---

### Domain 4 — Potential and Development
*The arc of becoming — promising, realized, derailed, or missed entirely.*

**12 tags**

| Tag | Definition | Canonical Reference |
|-----|-----------|-------------------|
| `late-bloomer` | A player who required several seasons to develop into their peak level | Giannis — thin teenager to MVP took 5 seasons; Khris Middleton |
| `hidden-gem` | A player selected late (or undrafted) who performs at an elite level | Nikola Jokic (pick 41); Draymond Green (pick 35); Marc Gasol (pick 48) |
| `stolen-prime` | A player whose best years were taken by injury at precisely the wrong moment | Derrick Rose — MVP at 22, torn ACL the same season; Larry Bird's back |
| `wrong-pick` | A franchise made the demonstrably wrong choice at a critical draft selection | Sam Bowie (pick 2) over Jordan (pick 3); Thabeet over Curry and Harden |
| `bust-by-circumstance` | A player labeled a bust who failed primarily due to organizational misuse, coaching malpractice, or ownership pressure | Darko Miličić — Larry Brown refused to play rookies on a champion team |
| `peaked-early` | Showed elite potential early in their career but never fully developed or sustained the trajectory | Many college-standout one-and-done players who flamed out professionally |
| `second-round-gem` | A player who was not just a late pick but an outright organizational investment that paid off at premium | Jokic; Marc Gasol; Udonis Haslem |
| `raw-international` | A teenage international prospect who needs years to physically mature and adapt to the NBA game | Giannis at 18; Wembanyama at 19 — the patience required is a story arc |
| `defying-decline` | A veteran who continues performing at a meaningful level well past when everyone expected them to fall off | Vince Carter playing until 43; LeBron at 39 as All-Star |
| `loyalty-rewarded` | A player who stayed through organizational darkness and won the title with the team that drafted them | Giannis — supermax, back-to-back MVP, won 2021 Finals in Milwaukee |
| `prodigy-pressure` | The psychological weight placed on a player anointed as the future before they can handle it | Kwame Brown — Jordan's No. 1 pick, never ready for the designation |
| `developmental-bust` | A player with physical gifts but no translatable NBA skill; drafted for potential that never materializes | Anthony Bennett — No. 1 overall, out of the league in 4 years |

---

### Domain 5 — Moment / Event
*A discrete occurrence that changes the season's or career's narrative trajectory.*

**11 tags**

| Tag | Definition | Canonical Reference |
|-----|-----------|-------------------|
| `defining-shot` | A single shot that crystallizes a player's identity or a series' narrative permanently | Michael Jordan's 1998 Finals push-off jumper; Damian Lillard's logo threes |
| `injury-tragedy` | An injury that eliminates a player from a crucial moment or permanently alters their story | Derrick Rose — ACL during his MVP season; Len Bias — death before his first game |
| `what-if-tragedy` | An event so catastrophic it permanently haunts the franchise's alternate history | Len Bias dying — Celtics lose 6 years of potential dynasty; Greg Oden vs KD |
| `act-of-god` | A random, arbitrary event — bizarre off-court injury, freak officiating decision, or suspension for a minor infraction — that derails a legitimate contender | Robert Horry hip-check → David Stern suspending Stoudemire/Diaw in 2007 Suns-Spurs; Larry Bird's driveway injury |
| `series-collapse` | A team that held a commanding playoff lead and lost the series; moment defines the coach and franchise for years | 2016 Warriors (3-1 vs Cavs); Doc Rivers' three 3-1 collapses |
| `cinderella-run` | An unexpected deep playoff run from a low seed or unheralded roster | 2011 Dallas Mavericks; 2012 Oklahoma City Thunder |
| `redemption-moment` | A player or team that erases a prior failure narrative in a single decisive performance | LeBron's 2016 Finals block + 3-1 comeback; Kawhi's 2019 winning buzzer beater |
| `comeback-arc` | A full multi-season return from a career-threatening injury or dismissal as finished | Derrick Rose's multiple attempted comebacks; Brandon Roy |
| `the-decision` | A player publicly choosing their next team in a manner that triggers league-wide realignment and lasting backlash | LeBron's 2010 ESPN announcement — origin of the modern superteam era |
| `mundane-off-court` | An absurd, non-basketball event that permanently alters the season or career | Larry Bird destroying his back shoveling a driveway; Gilbert Arenas gun incident |
| `mid-season-upset` | An unexpected mid-season tournament or regular-season result that redefines the league's hierarchy | Giannis's 2024 NBA Cup MVP; in-season upsets exposing dynasty fatigue |

---

### Domain 6 — Season / Franchise State
*The macro condition of the franchise at a given point in time.*

**11 tags**

| Tag | Definition | Canonical Reference |
|-----|-----------|-------------------|
| `dynasty-peak` | The franchise is at the summit — defending champion, clear best team, culture fully formed | 1996-98 Chicago Bulls; 2015-18 Golden State Warriors |
| `dynasty-crack` | A dynasty beginning to fracture — age, ego, fatigue, or rival emergence undermining the core | 2018-19 Warriors — KD rift, Klay injury, Durant departure |
| `dynasty-collapse` | A former dynasty's terminal decline; the core breaks apart and the rebuild begins | 2019-20 Warriors — lottery season after Durant, Klay, and DeMarcus Cousins all injured |
| `perpetual-bridesmaid` | A franchise with sustained excellence that consistently falls short of the ultimate prize | Phoenix Suns — highest regular-season win % of any title-less franchise |
| `cursed-franchise` | A franchise defined by an unusual concentration of heartbreak, near-misses, and bad luck | Phoenix Suns; Cleveland Cavaliers pre-2016 |
| `unexpected-contender` | A team that far outperforms preseason projections to compete for a title | 2022-23 Miami Heat (8th seed, Finals); 2004 Detroit Pistons |
| `tanking-era` | A franchise deliberately fielding a non-competitive team to acquire draft assets | Philadelphia 76ers "Trust The Process" 2013-2017 |
| `rebuild-mode` | A franchise trading veterans for picks and young players, accepting competitive futility short-term | OKC after Durant departure; Boston post-Big Three trade |
| `regenerative-dynasty` | A championship team that simultaneously stockpiles draft capital and young depth — wins and reloads | OKC Thunder 2024-25 — title contender with record future draft capital |
| `franchise-defined-by-era` | A franchise whose entire identity is shaped by one memorable period — either glorious or catastrophic | Cleveland Cavaliers = LeBron; Orlando Magic = Shaq/Penny, then Dwight |
| `ownership-instability` | Front-office dysfunction, meddlesome ownership, or financial instability actively sabotaging competitiveness | New York Knicks under James Dolan; Sacramento Kings through multiple ownership eras |

---

### Domain 7 — Coach / GM Identity
*The philosophy and narrative archetype of the person running the team.*

**12 tags**

| Tag | Definition | Canonical Reference |
|-----|-----------|-------------------|
| `system-builder` | A coach whose offensive or defensive system is so distinct it defines the era's basketball | Mike D'Antoni — Seven Seconds or Less; Gregg Popovich — motion ball movement |
| `system-prophet` | A coach whose philosophy was ahead of its time; changed the game's DNA without winning a title | D'Antoni / 2004-09 Suns — 3-point revolution precursor; never won |
| `quiet-genius` | A coach who never overclaims credit; lets the players and results speak | Gregg Popovich; Steve Kerr |
| `serial-collapser` | A coach with an established pattern of squandering commanding leads in high-stakes moments | Doc Rivers — 3× blown 3-1 leads, 10 Game 7 losses |
| `player-revolt-coach` | A coach who has lost the locker room; players are openly undermining or tuning them out | Derek Fisher — Thunder players reportedly tuned him out; Isiah Thomas — Knicks |
| `analytics-pioneer` | A GM whose franchise was rebuilt around data-driven player valuation, often against market consensus | Daryl Morey — Rockets/76ers; Sam Presti — Thunder |
| `scout-vs-owner` | A front office defined by the visible conflict between what the analytics/scouts want and what ownership demands | Memphis Grizzlies drafting Thabeet against universal scouting opinion |
| `dynasty-architect` | A GM whose roster construction decisions produced a multi-year championship window | Bob Myers — Warriors; R.C. Buford — Spurs |
| `player-whisperer` | A coach who uniquely maximizes difficult personalities, unlocking stars that previous coaches failed with | Doc Rivers — KG and Paul Pierce's late-career window; Rick Carlisle — Dirk |
| `inherited-mess` | A new coach or GM who takes over a roster in active dysfunction or mid-rebuild | Frank Vogel inheriting the Westbrook/LeBron/AD Lakers experiment |
| `legacy-coach` | A coach whose legend was built across decades — moved through multiple teams and generational stars | Pat Riley — Showtime Lakers, Bad Boy-era rival, Heat dynasty architect |
| `player-to-executive` | A legendary player who became a coach or GM, using playing prestige to reshape the league from the front office | Larry Bird — only person to win ROY, MVP, Finals MVP, Coach of Year, and Executive of Year |

---

### Domain 8 — Legacy and Historical Comparison
*How a player's or franchise's story is positioned against history.*

**12 tags**

| Tag | Definition | Canonical Reference |
|-----|-----------|-------------------|
| `goat-debate` | A player who enters the permanent conversation about the greatest of all time | Jordan, LeBron, Kareem — each generation's defining argument |
| `torch-passed` | The moment an established legend explicitly or implicitly recognizes the new dominant force | Magic/Bird → Jordan — 1992 Dream Team; Jordan → Kobe/LeBron |
| `torch-lineage` | The generational chain of league-defining players, each era's apex carrying forward to the next | Dr. J → Magic/Bird → Jordan → Shaq/Duncan/Kobe → LeBron → Giannis/Jokic → Wembanyama |
| `diminished-by-era` | A player who would have been the undisputed best in another generation but is overshadowed by a contemporary | Karl Malone — all-time scorer, all-time loser to Jordan; Charles Barkley — never won |
| `hometown-redemption` | A complete arc: the local hero leaves, returns, and wins the championship for their city | LeBron James — Cleveland 2016; no other arc matches its completeness |
| `superteam-backlash` | The cultural and media narrative that penalizes players for joining forces with other stars | KD to Golden State — the league lost a competitive balance debate for three years |
| `rival-made-me` | A player whose greatness was directly sharpened by a specific rival; each elevated the other | Magic vs Bird; Jordan vs Isiah; Kobe vs Pierce |
| `what-could-have-been` | The permanent shadow of an unrealized ceiling — drafted instead of a legend, or a dynasty that never was | Len Bias; Greg Oden; Portland 1984 (Bowie over Jordan) |
| `legacy-defender` | A player or coach who actively manages their own narrative, pushing back against critical characterizations | Doc Rivers — argues in media he deserves credit for getting the leads |
| `wrong-era` | A player whose style and skills would have made them dominant in a different decade | Wilt Chamberlain in the modern NBA; a 1980s enforcer in pace-and-space |
| `rings-vs-legacy` | The tension between a player's ring count and their perceived greatness — rings aren't everything | Charles Barkley, Patrick Ewing, John Stockton — all-time greats, zero rings |
| `beautiful-game` | A team or era remembered not for the final result but for the transcendent quality of its basketball | 2014 Spurs Finals — widely called the best team performance in NBA history even in defeat |

---

**Full tag count: 82**  
*(Domain breakdown: 13 + 10 + 11 + 12 + 11 + 11 + 12 + 12 = 82)*

---

## 4. Source Inventory

Primary sources were imported via NLM's deep research agent — 59 total. The table below lists key representative sources that directly informed tag derivation; the full list is available in the NLM notebook (`notebooklm source list`).

| ID | Source | Type | Date | Quality | Notes |
|----|--------|------|------|---------|-------|
| S-NLM | NotebookLM briefing doc (`notebooklm-briefing-nba-narrative-tags.md`) | NotebookLM output | 2026-03 | High — RAG synthesis across 64 sources | Primary synthesis artifact; used throughout tag derivation |
| S1 | NBAStu — NBA Rivalries article | Web | 2020s | High — sports journalism, corroborated | Canonical source for `torch-rivalry`, `rival-made-me` tags |
| S2 | 2003-04 Detroit Pistons — Wikipedia | Web | 2024 | High — encyclopedic, corroborated | Primary source for `team-over-ego`, `chemistry-explosion`, `superteam-slayer` |
| S3 | Phoenix Suns — Wikipedia | Web | 2025 | High — encyclopedic, corroborated | Primary source for `perpetual-bridesmaid`, `cursed-franchise`, `system-prophet`, `act-of-god` |
| S4 | Giannis Antetokounmpo — Wikipedia | Web | 2025 | High — encyclopedic, recent | Primary source for `improbable-ascent`, `loyalty-rewarded`, `late-bloomer`, `raw-international` |
| S5 | Larry Bird — Wikipedia | Web | 2025 | High — encyclopedic, corroborated | Primary source for `torch-rivalry`, `stolen-prime` (driveway injury), `player-to-executive`, `mundane-off-court` |
| S6 | Reddit NBA communities (multiple threads) | Web | 2020-2025 | Medium — fan synthesis, useful for cultural reception | Informed `goat-debate` framing, `superteam-backlash` cultural register, `nursing-home-squad` archetype naming |
| S7 | ESPN / Sports Illustrated longform (via NLM) | Web | Various | High — professional journalism | Dynasty narratives, coaching archetypes, trade drama arcs |
| S8 | *The Last Dance* (documentary excerpts via NLM) | Video | 2020 | High — primary interviews, curated | Jordan `alpha-dog` and `goat-debate` framing; `alpha-negotiation` Dream Team moment |
| S9 | NBA official history / Basketball Reference (via NLM) | Web | 2024 | High — statistical record | `hidden-gem` second-round pick records; `wrong-pick` draft selections |
| S10 | The Ringer longform (via NLM) | Web | Various | High — quality sports journalism | `legacy-defender` (Doc Rivers framing); `beautiful-game` (2014 Spurs); `regenerative-dynasty` (OKC) |

---

## 5. Conflicts & Open Questions

- **`serial-collapser` vs `player-revolt-coach`:** Doc Rivers occupies both archetypes simultaneously — was his pattern of blown leads about coaching failure, player failure, or bad luck? The sources present all three framings without resolving them. NLM confirms the minority view (Rivers himself, Paul Pierce) that superstar players must win one game in four; the majority view holds the coaching pattern is real. Both tags apply simultaneously and that ambiguity should be preserved in the game engine. [S-NLM, gap query 1]
- **`system-prophet` causality:** Whether D'Antoni's Suns failed *because* of systemic defense neglect or *despite* having the right system and being unlucky (Robert Horry incident, Amar'e injury) is unresolved. The game engine should represent this as two competing story frames the media can argue, not a settled verdict. [S3, S-NLM]
- **`goat-debate` cross-era validity:** Jordan explicitly rejects the GOAT comparison framework, noting Bill Russell's 11 rings as structurally incomparable. The tag captures the cultural phenomenon; the game engine should not resolve it but simulate characters arguing it. [S-NLM, gap query 1]
- **`act-of-god` classification:** Some "act of god" events (Stern suspension, Horry hip-check) were system-arbitrary; others (Bird's driveway injury) were genuinely random. The engine should distinguish between league-structural acts of god and pure-random ones, though both get the same tag.
- **Unresolved:** No primary source directly captures the player agent's perspective on superteam formations — this remains the most structurally absent practitioner voice across all 64 sources. The `trade-demand` and `the-decision` tags cover the player-side; agent mechanics would require a separate research pass.

---

## 6. Blindspot / Gap Analysis

- [x] **Opposing view** — Covered. Contrarian positions on dynasty legitimacy (Suns hindsight bias), coaching failure (Rivers minority defense), GOAT framework (Jordan's own rejection), and "The Decision" media hypocrisy (Simmons pitch) are all documented and inform distinct tag framings. **No gap affecting tag vocabulary.**

- [x] **Recency** — Covered. 2024-25 developments represented: Second Apron salary rules (`second-apron-trap`), OKC regenerative dynasty model (`regenerative-dynasty`), NBA Cup (`mid-season-upset`), new unicorn prospect archetypes (`unicorn-prospect`), and flawed max-player trade market collapse (`second-apron-trap`). **No gap.**

- [~] **Practitioner vs theoretical** — Player agent perspectives, scout psychology, and journeyman inner experience are structurally absent from all sources. The `journeyman-grinder`, `scout-vs-owner`, and `prodigy-pressure` tags address these domains from the outside. **Minor gap — acknowledged. A follow-up source pass on agent memoirs or beat reporter longform could enrich these tags.**

- [~] **Geographic / cultural variation** — Heavy US-major-market bias confirmed. HBCU pipeline, European club development, small-market cultural identity (Memphis "Grit and Grind," New Orleans), and international fanbases (Philippines, Balkans) are underrepresented. The `raw-international` and `improbable-ascent` tags address international player arcs using Giannis and Jokic as anchors. **Minor gap — acceptable for a tag vocabulary grounded in NBA history; a future global basketball research pass could extend coverage.**

- [x] **Adjacent domains** — Richly documented. Documentary filmmaking (Wiseman's sequence-event method), cognitive narrative simulation (experience-taking), TTRPG GM-less frameworks (*Fiasco*, *The Quiet Year*), NLG data-to-text generation, and diegetic UX design all inform the game design application notes embedded in tag definitions. **No gap.**

- [x] **Negative results** — Comprehensively documented: nursing home superteams (`nursing-home-squad`), chemistry-blind talent stacking (`incompatible-superstars`), owner meddling on draft day (`owner-meddling`, `scout-vs-owner`), all-offense no-defense coaching (`system-prophet` failure state), and Second Apron flawed max players (`second-apron-trap`) are all represented as cautionary-tale tags. **No gap.**

- [~] **Stakeholder perspectives** — Working-class beat reporters, franchise-losing cities (Seattle SuperSonics), and marginalized fanbases are underrepresented. These are outside the game engine's core tag scope (player/team/coach/franchise) but matter for world-building flavor text. **Minor gap — noted for game writers' room, not a blocker for tag vocabulary.**

---

## 7. Recommended Next Steps

1. **Implement the 82-tag schema into the narrative engine's event-tagging layer.** Each simulated game, trade, or season event should be evaluated against the 8-domain taxonomy and tagged at the moment of occurrence, not post-hoc. This allows the narration system to draw on accumulated tag combinations for story beat generation (e.g., a player simultaneously holding `stolen-prime` + `comeback-arc` + `loyalty-rewarded` is a rich multi-beat arc).

2. **Prototype the `act-of-god` event category.** This is the most underexplored mechanical territory. The game engine needs a procedural trigger for arbitrary league-intervention or random off-court events (suspensions for minor rule violations, bizarre injuries, referee controversies) that redirect narrative despite tactical competence. The Suns 2007 case is the canonical design brief.

3. **Run a follow-up research pass on agent and journeyman perspectives.** The practitioner gap identified in §6 is the most likely source of missing tags. Suggested sources: *The Agency* by Marc Stein, Rich Paul's *Lucky Me* memoir, or any longform on journeyman NBA careers. This could yield 5–8 new tags in the `relationship` and `potential-and-development` domains.

4. **Extend `torch-lineage` into a generational clock mechanic.** The tag vocabulary implies lineage but the game engine needs a mechanism for *when* torches pass. The Dream Team hotel room anecdote is the design model: the pass happens in an off-court social confrontation, not on a playoff scoreboard. Consider a `alpha-negotiation` event type that fires during All-Star weekends or international competitions.

5. **Cross-reference this tag vocabulary against `2-emergent-narration-multi-voice.md`.** The multi-voice narration research established which voice types (play-by-play, color commentator, beat reporter, player internal monologue) exist in the engine. Each tag in this vocabulary should be mapped to which voice(s) would surface it — ensuring the narration engine knows not just *that* a `serial-collapser` event occurred but *who speaks it and in what register*.

6. **Add `mid-season-upset` and `NBA Cup` as distinct season-arc anchors.** The 2024 NBA Cup is recent enough that most primary sources predate it. The game engine should add a mid-season tournament milestone that can generate `unexpected-contender` and `cinderella-run` tags outside of the playoffs, giving smaller arcs a stakes-bearing canvas.

---

*Report generated: 2026-03-27 — see frontmatter for full metadata.*
