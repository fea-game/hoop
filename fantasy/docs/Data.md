# NBA Data APIs for Fantasy Basketball & Management Games

- [APIs](#apis)
  - [Important Limitations of Free/Public APIs](#important-limitations-of-freepublic-apis)
  - [Popular Free NBA Data APIs](#popular-free-nba-data-apis)
  - [What These APIs Typically Provide](#what-these-apis-typically-provide)
  - [Tips for Building Your Fantasy/Management Game](#tips-for-building-your-fantasymanagement-game)
  - [Summary Table](#summary-table)
- [Scraping](#scraping)
  - [robots.txt](#robotstxt)
  - [Terms of service](#terms-of-service)
  - [Available Content](#available-content)

## APIs

If you want to build a game that combines fantasy basketball and management aspects using real NBA player data, there are several free APIs available. These APIs provide data on current and former NBA players, though most have some limitations compared to paid offerings. Below is a rundown of good options to get started:

### Important Limitations of Free/Public APIs

Before diving in, be aware of constraints common to all public and free NBA data sources:

*   Limited depth and detail: advanced or granular data is typically unavailable.
*   Season-scoped constraints: many endpoints are restricted by season and lack multi-year rollups.
*   Live/real-time data is minimal or gated behind paid tiers.
*   Historical completeness varies; coverage gaps and inconsistent advanced metrics are common.
*   Strict rate limits often require heavy caching and careful batching.

#### About Sportradar (Paid)

For truly comprehensive, production-grade coverage (rich events, advanced metrics, timely feeds), Sportradar is widely regarded as the only sufficiently powerful option among commonly known providers. However, reliable public pricing is not available; information encountered suggests costs starting around $1,000+ per month, which makes it a non-candidate for this project or most indie prototypes.

### Popular Free NBA Data APIs

#### 1. BALDONTLIE API (Free, well documented)

A widely-used free API with NBA player & team data going back decades.

**Features**

*   Player profiles (names, basic info)
*   Team info
*   Game stats and seasonal data
*   Historical data back to the early NBA era

**Notes**

*   You need a free API key.
*   Some endpoints (like detailed live box scores / advanced stats) **may require paid tiers**. [nba.balldontlie.io+1](https://nba.balldontlie.io/?utm_source=chatgpt.com)

👉 Great starting point for basic player data and historical stats.

#### 2. NBA REST API (Unofficial / public) - <span style="color:orange">Unavailable</span>

A community-hosted REST API that serves NBA player, team, and game data via JSON.

**Features**

*   Players list and individual info
*   Season and game stats
*   Team standings
*   Advanced stats and shot chart endpoints

**Notes**

*   No authentication required.
*   Data coverage depends on the specific REST API source (public clones of nba.com data). [openpublicapis.com](https://openpublicapis.com/api/nba-rest-api?utm_source=chatgpt.com)
*   <span style="color:orange">**Status:** As of late 2025, this API appears to be unavailable or deprecated.</span>

👉 Good if you want a **no-auth, easy JSON source** quickly.

#### 3. NBA GraphQL API - <span style="color:orange">Unavailable</span>

A GraphQL-style API that lets you request NBA data via flexible queries.

**Features**

*   Players, teams, seasons, stats all in one schema
*   Request only the fields you need
*   Flexible for building UI or game backend logic

**Notes**

*   Official authentication requirements may vary (check endpoint docs). [openpublicapis.com](https://openpublicapis.com/api/nba-graphql?utm_source=chatgpt.com)
*   <span style="color:orange">**Status:** As of late 2025, this API appears to be unavailable or deprecated.</span>

👉 Great if you like **GraphQL flexibility**.

#### 4. API-Basketball Free Tier

A more general sports API provider that includes basketball/NBA support.

**Features**

*   NBA data endpoints
*   Free tier available (with registration)
*   Designed for building apps and dashboards

**Notes**

*   Might not be as detailed for advanced metrics as some others. [api-basketball.com](https://www.api-basketball.com/sports?utm_source=chatgpt.com)

👉 Useful if you want **multi-sport support** and simple endpoints.

#### 5. Community / Public Builder APIs

There are APIs listed in free public API directories (like _NBA Stats API_ or wrappers of `nba.com` endpoints) that provide basic stats and player lists.

**Features**

*   Often no API key required
*   Historical and current season support

**Notes**

*   These can be **unstable or undocumented**, so use with caution for production. [Free APIs+1](https://freeapis.io/nba-stats?utm_source=chatgpt.com)

👉 Useful for **prototyping or side projects**, but validate long-term reliability.

### What These APIs Typically Provide

Depending on which one you choose, you can usually access:

✅ Player profiles (name, team, height/weight, position)  
✅ Career stats (season averages, totals)  
✅ Game results and box scores  
✅ Team data and schedules  
✅ Historical player data (some go back to the 1940s) [nba.balldontlie.io](https://nba.balldontlie.io/?utm_source=chatgpt.com)

**Note:** Many free APIs _do not_ include detailed advanced stats or live game feeds without upgrades.

### Tips for Building Your Fantasy/Management Game

#### 1. Combine Sources

You can start with Balldontlie or the NBA REST API for foundational data (players, teams, seasons), then layer advanced stats from another API or data store.

#### 2. Cache Data

Free APIs often have strict rate limits. Cache player data and stats server-side to reduce calls.

#### 3. Consider Data Licensing

If your game becomes commercial, check the API’s terms of service — especially for real-time/live data.

#### 4. Fallback to Datasets

For historical depth, consider supplementing API calls with downloaded datasets (e.g., Kaggle NBA datasets) or open data repos.

### Summary Table

| API | Free | API Key | Data Coverage | Good For |
| --- | --- | --- | --- | --- |
| **Balldontlie** | ✅ | Yes | Good historical & current | Player/team basics |
| **NBA REST API** | ❌ | No | Varied | Quick prototyping |
| **NBA GraphQL** | ❌ | Depends | Flexible | Custom queries |
| **API-Basketball** | ✅ | Yes | Moderate | Multi-sport |
| **Public Wrappers** | ✅ | No | Varies | Simple use cases |

If you want, you can also request example code for fetching NBA player data using these APIs in Python or JavaScript. Specify your preferred language and the specific data you want (e.g., player list, stats, career totals).

## Scraping

While APIs are the preferred method for data retrieval, scraping websites is another option.

| Rating | Website | Restriction |
| --- | --- | --- |
| 10 | [nbarapm.com](https://www.nbarapm.com) | Fully permissive; no `robots.txt` or terms of service were found. |
| 10 | [pbpstats.com](https://www.pbpstats.com/) | Fully permissive; no `robots.txt` or terms of service were found. |
| 10 | [craftednba.com](https://craftednba.com) | Fully permissive; `robots.txt` allows all scraping and no terms of service were found. |
| 10 | [thinkingbasketball.net](https://thinkingbasketball.net) | Fully permissive; `robots.txt` allows all scraping and no terms of service were found. |
| 9.5 | [cleaningtheglass.com](https://cleaningtheglass.com) | `robots.txt` is fully permissive. Terms of service require attribution for non-commercial use. |
| 8.5 | [nbastuffer.com](https://www.nbastuffer.com/) | `robots.txt` is permissive. Terms of use prohibit commercial use and require a link back for any reuse or distribution. |
| 7.5 | [bball-index.com](https://www.bball-index.com/) | `robots.txt` is fully permissive, but the terms of service do not explicitly mention automated access. |

### robots.txt

However, it's crucial to respect the `robots.txt` file of each site, which outlines the rules for web crawlers. Below is an analysis of the scraping-friendliness of several NBA data websites based on their `robots.txt` files. Each site is rated from 1 (most restrictive) to 10 (least restrictive).

| Rating | Website | Notes |
| --- | --- | --- |
| 10/10 | [bball-index.com](https://www.bball-index.com/robots.txt) | Fully permissive. The `robots.txt` file explicitly allows all crawling. |
| 10/10 | [nbarapm.com](https://www.nbarapm.com) | Fully permissive. No `robots.txt` file was found. |
| 10/10 | [pbpstats.com](https://www.pbpstats.com/) | Fully permissive. No `robots.txt` file was found. |
| 10/10 | [craftednba.com](https://craftednba.com/robots.txt) | Fully permissive. The `robots.txt` does not constrain scraping. |
| 10/10 | [thinkingbasketball.net](https://thinkingbasketball.net/robots.txt) | Fully permissive. The `robots.txt` does not constrain scraping. |
| 10/10 | [databallr.com](https://databallr.com/robots.txt) | Fully permissive. The `robots.txt` does not constrain scraping. |
| 10/10 | [cleaningtheglass.com](https://cleaningtheglass.com/robots.txt) | Fully permissive. The listed bots do not apply to general scraping. |
| 9/10 | [nbastuffer.com](https://www.nbastuffer.com/robots.txt) | Permissive. Disallows crawling of some file types and administrative paths, but content is generally accessible. |
| 2/10 | [basketball-reference.com](https://www.basketball-reference.com/robots.txt) | Very restrictive. Disallows crawling of many data-rich sections like gamelogs, splits, and shooting stats. Imposes a 3-second delay between requests. |
| 1/10 | [nba.com](https://www.nba.com/robots.txt) | Highly restrictive. Blocks access to its API and disallows many common user agents from crawling large parts of the site. |

### Terms of service

Always review the terms of service for any website before scraping. The absence or permissiveness of a `robots.txt` file does not grant a license to use the content in any way you wish.

| Rating | Website | Notes |
| --- | --- | --- |
| 10/10 | [nbarapm.com](https://www.nbarapm.com) | No terms of service page was found. |
| 10/10 | [pbpstats.com](https://www.pbpstats.com/) | No terms of service page was found. |
| 10/10 | [craftednba.com](https://craftednba.com) | No terms of service page was found. |
| 10/10 | [thinkingbasketball.net](https://thinkingbasketball.net) | No terms of service page was found. |
| 9/10 | [cleaningtheglass.com](https://cleaningtheglass.com/terms-of-service/) | User contributions are licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License, which allows for non-commercial use with attribution. |
| 8/10 | [nbastuffer.com](https://www.nbastuffer.com/terms-of-use/) | The terms of use state that you may not use their work for commercial purposes, but for any reuse or distribution on the internet, you just need to provide a link to the website. |
| 5/10 | [bball-index.com](https://www.bball-index.com/) | The terms of service do not explicitly mention automated access or scraping. The terms are standard and don't contain any specific restrictions on data usage for non-commercial projects, but they also don't grant any explicit permissions. |
| 2/10 | [databallr.com](https://databallr.com/terms-of-service) | The terms of service grant a limited license for personal, non-commercial use and explicitly state that you may not modify or copy the materials or use them for commercial purposes. |

### Available Content

#### nbarapm.com

*   **Data Types**: Provides advanced player impact metrics. The primary metrics are:
    *   **RAPM** (Regularized Adjusted Plus-Minus): Includes several variations like time-decayed RAPM (2-year to 5-year). "Pure RAPM" includes playoffs and is adjusted for fatigue.
    *   **DARKO**
    *   **LEBRON**
    *   **eRAPTOR** and **MAMBA** are also mentioned as sourced metrics.
*   **Coverage**:
    *   Annual RAPM data is available from the 2005 season up to the current season (2026 shown in examples).
    *   Career and peak metrics are ranked against all players from 1997-2024.
*   **Details**:
    *   Metrics are broken down into offensive and defensive impact.
    *   Provides rankings for players based on these metrics.
    *   The data appears to be focused on individual player performance rather than team or game stats.

#### pbpstats.com

*   **Data Types**: Provides a wide range of statistics derived from play-by-play data. Key categories include:
    *   **On/Off Stats**: Includes Wowy (With or Without You), Wowy combinations, and on/off stats for players and teams.
    *   **Possession-Based Stats**: Totals and per-100-possession stats for players, teams, opponents, and lineups.
    *   **Game Logs**: Player, team, and opponent game logs.
    *   **Possession Finder**: A tool to query possessions based on various criteria like period, time remaining, and score.
    *   **Visualizations**: Tools like assist networks, scatter plots, and year-over-year plots.
*   **Coverage**:
    *   **NBA**: Data available from the 2000-01 season to the present.
    *   **WNBA**: Data available from the 2009 season to the present.
    *   **G-League**: Data available from the 2016-17 season to the present.
*   **Details**:
    *   Provides granular data such as points from assisted/unassisted shots, foul types, rebound percentages by zone, and turnover breakdowns (live vs. dead ball).
    *   Includes an expected eFG shot quality model.
    *   Offers live stats during games.
    *   The site has a documented API.

#### craftednba.com

- Player Traits (Best offensive rebounders, elite defenders, rising young stars, and future superstars)
- NBA Games & Puzzles
- Membership with custom roster building and award-winning projections
- Doppelgangers to compare player's seasons to historical data since 1978
- 2025 Draft Guide
- Player Stats (traditional, advanced, and plus-minus)

#### thinkingbasketball.net

A website with articles, podcasts, and stat tools.

**Features**

*   Player stats updated daily during the season.
*   In-house metrics for scoring, playmaking, and overall effectiveness (BPM).
*   Player summary cards with percentiles.
*   Team and player comparison tools.
*   Player trend data since 2016.
*   Historical data for some metrics going back to 1978 and even further.

**Notes**

*   Some content is behind a Patreon paywall.
*   Provides unique metrics not found elsewhere.

#### cleaningtheglass.com

**Data available**:

*   Advanced NBA stats with a focus on accuracy and context.
*   Garbage time and heaves are filtered out.
*   Possessions are counted directly from play-by-play.
*   Stats are presented with percentiles for easier interpretation.
*   Shot locations are broken into meaningful categories.
*   Positional groupings that fit the modern NBA.
*   Stats are broken down by half-court vs. transition vs. putbacks.
*   On/off court impact analysis for players.
*   Positional estimates for all players.

**Seasons/Years**:

*   The website has articles and analysis dating back to the 2017-2018 NBA season.
*   It's highly likely that data is available for all seasons from 2017-2018 to the present, but the exact range is not publicly specified. The service is subscription-based, and more detailed information is likely available to subscribers.

#### nbastuffer.com

- **Team Stats**: Includes power rankings, rest days stats, and referee stats.
- **Player Stats**: Provides box score-like statistics such as points, rebounds, and assists.
- **Advanced Stats**: Offers metrics for team and player evaluation.
- **Historical Data**: The website focuses on the 2025-2026 season, with some data from the 2024-2025 season. For more comprehensive historical datasets, there are links to `bigdataball.com`.
- **Other Resources**: The site also features a blog and an "Analytics 101" section for deeper insights into basketball analytics.

#### bball-index.com

*   **Seasons:** 2013-2026
*   **Data:**
    *   Player data (basic, advanced, grades)
    *   Team data
    *   Leaderboards
    *   Play types
    *   Lineups
*   **Notes:**
    *   Mix of free and paid data.
    *   Excellent source for deep player and team analytics.
    *   Not an API, would require scraping.