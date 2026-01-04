# NBA Data APIs for Fantasy Basketball & Management Games

- [APIs](#apis)
  - [Important Limitations of Free/Public APIs](#important-limitations-of-freepublic-apis)
  - [❌ 1. BALDONTLIE API (Free, well documented) - No Statistics](#-1-baldontlie-api-free-well-documented---no-statistics)
  - [❌ 2. NBA REST API (Unofficial / public) - Unavailable](#-2-nba-rest-api-unofficial--public---unavailable)
  - [❌ 3. NBA GraphQL API - Unavailable](#-3-nba-graphql-api---unavailable)
  - [❌ 4. API-Basketball Free Tier - No Statistics](#-4-api-basketball-free-tier---no-statistics)
  - [✅ 5. pbpstats.com API (Free, well documented)](#-5-pbpstatscom-api-free-well-documented)
  - [What These APIs Typically Provide](#what-these-apis-typically-provide)
  - [Tips for Building Your Fantasy/Management Game](#tips-for-building-your-fantasymanagement-game)
- [Scraping](#scraping)
  - [robots.txt](#robotstxt)
  - [Terms of service](#terms-of-service)
  - [Free Content](#free-content)

## APIs

If you want to build a game that combines fantasy basketball and management aspects using real NBA player data, there are several free APIs available. These APIs provide data on current and former NBA players, though most have some limitations compared to paid offerings. Below is a rundown of good options to get started:

| API | Free | API Key | Data Coverage | Good For |
| --- | --- | --- | --- | --- |
| **Balldontlie** | ❌ | Yes | Only Game statistics | Game analysis |
| **NBA REST API** | ❌ | No | Unavailable | - |
| **NBA GraphQL** | ❌ | Depends | Unavailable | - |
| **API-Basketball** | ❌ | Yes | Leagues, Teams and Player names | League structure |
| **pbpstats.com** | ✅ | No | Extensive | Detailed stats & live data |

### Important Limitations of Free/Public APIs

Before diving in, be aware of constraints common to all public and free NBA data sources:

*   Limited depth and detail: advanced or granular data is typically unavailable.
*   Season-scoped constraints: many endpoints are restricted by season and lack multi-year rollups.
*   Live/real-time data is minimal or gated behind paid tiers.
*   Historical completeness varies; coverage gaps and inconsistent advanced metrics are common.
*   Strict rate limits often require heavy caching and careful batching.

#### About Sportradar (Paid)

For truly comprehensive, production-grade coverage (rich events, advanced metrics, timely feeds), Sportradar is widely regarded as the only sufficiently powerful option among commonly known providers. However, reliable public pricing is not available; information encountered suggests costs starting around $1,000+ per month, which makes it a non-candidate for this project or most indie prototypes.

### ❌ 1. BALDONTLIE API (Free, well documented) - <span style="color:orange">No Statistics</span>

A widely-used free API with NBA player & team data going back decades.

**Features**

*   Player profiles (names, basic info)
*   Team info
*   Game stats and seasonal data
*   Historical data back to the early NBA era

**Notes**

*   You need a free API key.
*   Some endpoints (like detailed live box scores / advanced stats) **may require paid tiers**. [nba.balldontlie.io+1](https://nba.balldontlie.io/?utm_source=chatgpt.com)
*   <span style="color:orange">Doesn't provide player statistics, beyond a specific game.</span>

👉 Great starting point for basic player data and historical stats.

### ❌ 2. NBA REST API (Unofficial / public) - <span style="color:orange">Unavailable</span>

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

### ❌ 3. NBA GraphQL API - <span style="color:orange">Unavailable</span>

A GraphQL-style API that lets you request NBA data via flexible queries.

**Features**

*   Players, teams, seasons, stats all in one schema
*   Request only the fields you need
*   Flexible for building UI or game backend logic

**Notes**

*   Official authentication requirements may vary (check endpoint docs). [openpublicapis.com](https://openpublicapis.com/api/nba-graphql?utm_source=chatgpt.com)
*   <span style="color:orange">**Status:** As of late 2025, this API appears to be unavailable or deprecated.</span>

👉 Great if you like **GraphQL flexibility**.

### ❌ 4. API-Basketball Free Tier - <span style="color:orange">No Statistics</span>

A more general sports API provider that includes basketball/NBA support.

**Features**

*   NBA data endpoints
*   Free tier available (with registration)
*   Designed for building apps and dashboards
*   <span style="color:orange">Doesn't provide player statistics.</span>

**Notes**

*   Might not be as detailed for advanced metrics as some others. [api-basketball.com](https://www.api-basketball.com/sports?utm_source=chatgpt.com)

👉 Useful if you want **multi-sport support** and simple endpoints.

### ✅ 5. pbpstats.com API (Free, well documented)

[pbpstats.com](https://www.pbpstats.com/) provides a powerful and free API for NBA, WNBA, and G-League data. It is well-documented with a [Swagger UI](https://api.pbpstats.com/docs).

**Features**

*   **General Data**: Get all players, teams, and games for a league.
*   **Detailed Stats**: Access career stats, game logs, and on/off court data (WOWY).
*   **Possession & Shot Data**: Granular access to possession and shot data with filtering.
*   **Live Data**: Provides live game data.
*   **Visualization Endpoints**: Data for assist networks, four-factor charts, and more.
*   **Win Probability**: Calculate win probability based on game situations.

**Notes**

*   The API is free and does not require an API key.
*   It provides a rich set of data suitable for in-depth analysis and simulation.

👉 An excellent and comprehensive free resource for detailed basketball statistics.

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

## Scraping

While APIs are the preferred method for data retrieval, scraping websites is another option.

| Website | Content | Notes | Access | Restriction |
| --- | --- | --- | --- | --- |
| [pbpstats.com](https://www.pbpstats.com/) | 9 | Provides a wide range of statistics from play-by-play data. | 10 | Fully permissive; no `robots.txt` or terms of service were found. |
| [nbastuffer.com](https://www.nbastuffer.com/) | 7 | Offers team and player stats, including power rankings, box score-like statistics, and some advanced metrics. | 8.5 | `robots.txt` is permissive. Terms of use prohibit commercial use and require a link back for any reuse or distribution. |
| [craftednba.com](https://craftednba.com) | 6 | Provides an interesting mix of traditional and advanced stats, but mostly limited to the current season. | 10 | Fully permissive; `robots.txt` allows all scraping and no terms of service were found. |

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

### Free Content

After reviewing the content providers, it's clear that only a few sites offer a substantial amount of free, easily accessible data suitable for a fantasy basketball project. Many sites either have their most valuable data behind a paywall or provide very specific, niche metrics that may not be suitable for a general-purpose fantasy game.

The table below summarizes the available data from each site, with a rating from 1 to 10 indicating the amount of free data provided.

| Rating | Website | Seasons | Notes |
| --- | --- | --- | --- |
| 9/10 | [pbpstats.com](https://www.pbpstats.com/) | 2000-Present | Provides a wide range of statistics from play-by-play data, including On/Off stats, possession-based stats, and game logs for the NBA, WNBA, and G-League, dating back to the 2000-01 season. It also has a documented API. |
| 7/10 | [nbastuffer.com](https://www.nbastuffer.com/) | 2016-Present | Offers team and player stats, including power rankings, box score-like statistics, and some advanced metrics. However, the focus is primarily on the current and most recent seasons. |
| 6/10 | [craftednba.com](https://craftednba.com) | Present | The site provides an interesting mix of traditional and advanced stats. However only current players seem to be available, even though once accessing the players, you can find there former data too. |
| 4/10 | [nbarapm.com](https://www.nbarapm.com) | 2004-Present | Provides specific player impact metrics like RAPM, DARKO, and LEBRON. While the data goes back to 2004, it is highly specialized and may not be suitable for a general fantasy game. |
| 3/10 | [bball-index.com](https://www.bball-index.com/) | 2010-Present | Only contains Lebron data and some advanced analysis. The data is not suitable to build a simulation on it. |
| 2/10 | [cleaningtheglass.com](https://cleaningtheglass.com) | 2003-Present | Only provides categorised data for top 5 of that category. It's too fragmented and specific to use it as the foundation of a simulation. |
| 0/10 | [thinkingbasketball.net](https://thinkingbasketball.net) | Since 2016 | All relevant data seems to be behind a Paetron paywall. |