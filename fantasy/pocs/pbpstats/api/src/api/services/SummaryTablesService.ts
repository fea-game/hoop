/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AssistComboResponse } from '../models/AssistComboResponse';
import type { LeagueEnum } from '../models/LeagueEnum';
import type { LineupOpponentResponse } from '../models/LineupOpponentResponse';
import type { NonLineupEntityTypeEnum } from '../models/NonLineupEntityTypeEnum';
import type { NonPlayerEntityTypeEnum } from '../models/NonPlayerEntityTypeEnum';
import type { PaceEfficiencyBySeasonResponse } from '../models/PaceEfficiencyBySeasonResponse';
import type { PaceEfficiencyResponse } from '../models/PaceEfficiencyResponse';
import type { RelativeOffDeffEfficencyResponse } from '../models/RelativeOffDeffEfficencyResponse';
import type { ScoreTimeSummaryResponse } from '../models/ScoreTimeSummaryResponse';
import type { SeasonTypeEnum } from '../models/SeasonTypeEnum';
import type { ShotQueryResponse } from '../models/ShotQueryResponse';
import type { ShotQueryTypeEnum } from '../models/ShotQueryTypeEnum';
import type { ShotsResponse } from '../models/ShotsResponse';
import type { TeamLeverageSummaryResponse } from '../models/TeamLeverageSummaryResponse';
import type { TeamOrOpponentTypeEnum } from '../models/TeamOrOpponentTypeEnum';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SummaryTablesService {
    /**
     * Gets counts for all passer to scorer assist combinations
     * @param league
     * @param season
     * @param seasonType
     * @returns AssistComboResponse Successful Response
     * @throws ApiError
     */
    public static getAssistComboSummaryGetAssistComboSummaryLeagueGet(
        league: LeagueEnum,
        season: string,
        seasonType: SeasonTypeEnum,
    ): CancelablePromise<AssistComboResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-assist-combo-summary/{league}',
            path: {
                'league': league,
            },
            query: {
                'Season': season,
                'SeasonType': seasonType,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Gets opponent lineup stats for each opposing lineup a lineup has played
     * @param league
     * @param season Multiple seasons should be separated by a comma
     * @param seasonType
     * @param teamId (w)nba.com/stats team id
     * @param lineupId lineup ids are "-" separated (w)nba.com/stats player ids sorted as strings
     * @returns LineupOpponentResponse Successful Response
     * @throws ApiError
     */
    public static getLineupOpponentSummaryGetLineupOpponentSummaryLeagueGet(
        league: LeagueEnum,
        season: string,
        seasonType: SeasonTypeEnum,
        teamId: string,
        lineupId: string,
    ): CancelablePromise<LineupOpponentResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-lineup-opponent-summary/{league}',
            path: {
                'league': league,
            },
            query: {
                'Season': season,
                'SeasonType': seasonType,
                'TeamId': teamId,
                'LineupId': lineupId,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Gets pace and efficiency for each season broken down by how the possession started
     * @param league
     * @param seasonType
     * @returns PaceEfficiencyBySeasonResponse Successful Response
     * @throws ApiError
     */
    public static getPaceEfficiencyBySeasonGetPaceEfficiencyBySeasonLeagueGet(
        league: LeagueEnum,
        seasonType: SeasonTypeEnum,
    ): CancelablePromise<PaceEfficiencyBySeasonResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-pace-efficiency-by-season/{league}',
            path: {
                'league': league,
            },
            query: {
                'SeasonType': seasonType,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Gets pace and efficiency for each team broken down by how the possession started
     * @param league
     * @param season
     * @param seasonType
     * @param type
     * @returns PaceEfficiencyResponse Successful Response
     * @throws ApiError
     */
    public static getPaceEfficiencySummaryGetPaceEfficiencySummaryLeagueGet(
        league: LeagueEnum,
        season: string,
        seasonType: SeasonTypeEnum,
        type?: TeamOrOpponentTypeEnum,
    ): CancelablePromise<PaceEfficiencyResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-pace-efficiency-summary/{league}',
            path: {
                'league': league,
            },
            query: {
                'Season': season,
                'SeasonType': seasonType,
                'Type': type,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Gets offensive and defensive efficiency relative to league average for that season
     * @param league
     * @returns RelativeOffDeffEfficencyResponse Successful Response
     * @throws ApiError
     */
    public static getRelativeOffDefEfficiencyGetRelativeOffDefEfficiencyLeagueGet(
        league: LeagueEnum,
    ): CancelablePromise<RelativeOffDeffEfficencyResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-relative-off-def-efficiency/{league}',
            path: {
                'league': league,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Gets summary stats based on score and time parameters
     * @param league
     * @param season
     * @param seasonType
     * @param type
     * @param fromMargin Minimum score margin from the perspective of the selected team at start of possession
     * @param toMargin Maximum score margin from the perspective of the selected team at start of possession
     * @param fromTime Maximum number of seconds remaining in period at start of possession
     * @param toTime Minimum number of seconds remaining in period at start of possession
     * @param periodEquals Period exactly equal to
     * @param periodGte Period greater than or equal to
     * @param periodLte Period less than or equal to
     * @returns ScoreTimeSummaryResponse Successful Response
     * @throws ApiError
     */
    public static getScoreTimeSummaryGetScoreTimeSummaryLeagueGet(
        league: LeagueEnum,
        season: string,
        seasonType: SeasonTypeEnum,
        type?: NonPlayerEntityTypeEnum,
        fromMargin?: number,
        toMargin?: number,
        fromTime?: number,
        toTime?: number,
        periodEquals?: number,
        periodGte?: number,
        periodLte?: number,
    ): CancelablePromise<ScoreTimeSummaryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-score-time-summary/{league}',
            path: {
                'league': league,
            },
            query: {
                'Season': season,
                'SeasonType': seasonType,
                'Type': type,
                'FromMargin': fromMargin,
                'ToMargin': toMargin,
                'FromTime': fromTime,
                'ToTime': toTime,
                'PeriodEquals': periodEquals,
                'PeriodGte': periodGte,
                'PeriodLte': periodLte,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Gets shooting stats based on score and time parameters
     * @param league
     * @param season Multiple seasons should be separated by a comma
     * @param seasonType
     * @param type
     * @param startType team stats only
     * @param fromMargin Minimum score margin from the perspective of the selected team at start of possession
     * @param toMargin Maximum score margin from the perspective of the selected team at start of possession
     * @param periodEquals Period exactly equal to
     * @param periodGte Period greater than or equal to
     * @param periodLte Period less than or equal to
     * @param fromTime Maximum number of seconds remaining in period at start of possession
     * @param toTime Minimum number of seconds remaining in period at start of possession
     * @param shotTimeLte Shot time less than or equal to (in seconds remaining in period)
     * @param shotTimeGte Shot time greater than or equal to (in seconds remaining in period)
     * @param secondsSincePossessionStartGte Number of seconds since the start of the possession greater than or equal to
     * @param secondsSincePossessionStartLte Number of seconds since the start of the possession less than or equal to
     * @param secondsSinceOrebGte Number of seconds since the offensive rebound greater than or equal to
     * @param secondsSinceOrebLte Number of seconds since the offensive rebound less than or equal to
     * @param shotDistanceGte Shot distance in feet greater than or equal to
     * @param shotDistanceLte Shot distance in feet less than or equal to
     * @param offOwnOreb Was the shot after a player's own offensive rebound
     * @param offOwnDreb Was the shot after a player's own defensive rebound
     * @param offOwnMiss Was the shot after a player's own miss
     * @param orebShotType
     * @returns ShotQueryResponse Successful Response
     * @throws ApiError
     */
    public static getShotQuerySummaryGetShotQuerySummaryLeagueGet(
        league: LeagueEnum,
        season: string,
        seasonType: SeasonTypeEnum,
        type: ShotQueryTypeEnum,
        startType: string = 'All',
        fromMargin?: number,
        toMargin?: number,
        periodEquals?: number,
        periodGte?: number,
        periodLte?: number,
        fromTime?: number,
        toTime?: number,
        shotTimeLte?: number,
        shotTimeGte?: number,
        secondsSincePossessionStartGte?: number,
        secondsSincePossessionStartLte?: number,
        secondsSinceOrebGte?: number,
        secondsSinceOrebLte?: number,
        shotDistanceGte?: number,
        shotDistanceLte?: number,
        offOwnOreb: boolean = false,
        offOwnDreb: boolean = false,
        offOwnMiss: boolean = false,
        orebShotType?: string,
    ): CancelablePromise<ShotQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-shot-query-summary/{league}',
            path: {
                'league': league,
            },
            query: {
                'Season': season,
                'SeasonType': seasonType,
                'Type': type,
                'StartType': startType,
                'FromMargin': fromMargin,
                'ToMargin': toMargin,
                'PeriodEquals': periodEquals,
                'PeriodGte': periodGte,
                'PeriodLte': periodLte,
                'FromTime': fromTime,
                'ToTime': toTime,
                'ShotTimeLte': shotTimeLte,
                'ShotTimeGte': shotTimeGte,
                'SecondsSincePossessionStartGte': secondsSincePossessionStartGte,
                'SecondsSincePossessionStartLte': secondsSincePossessionStartLte,
                'SecondsSinceOrebGte': secondsSinceOrebGte,
                'SecondsSinceOrebLte': secondsSinceOrebLte,
                'ShotDistanceGte': shotDistanceGte,
                'ShotDistanceLte': shotDistanceLte,
                'OffOwnOreb': offOwnOreb,
                'OffOwnDreb': offOwnDreb,
                'OffOwnMiss': offOwnMiss,
                'OrebShotType': orebShotType,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Gets all shots for query parameters
     * @param league
     * @param season
     * @param seasonType
     * @param entityType
     * @param entityId player, team or lineup id
     * @param startType team stats only
     * @param fromMargin Minimum score margin from the perspective of the selected team at start of possession
     * @param toMargin Maximum score margin from the perspective of the selected team at start of possession
     * @param periodEquals Period exactly equal to
     * @param periodGte Period greater than or equal to
     * @param periodLte Period less than or equal to
     * @param fromTime Maximum number of seconds remaining in period at start of possession
     * @param toTime Minimum number of seconds remaining in period at start of possession
     * @param shotTimeLte Shot time less than or equal to (in seconds remaining in period)
     * @param shotTimeGte Shot time greater than or equal to (in seconds remaining in period)
     * @param secondsSincePossessionStartGte Number of seconds since the start of the possession greater than or equal to
     * @param secondsSincePossessionStartLte Number of seconds since the start of the possession less than or equal to
     * @param secondsSinceOrebGte Number of seconds since the offensive rebound greater than or equal to
     * @param secondsSinceOrebLte Number of seconds since the offensive rebound less than or equal to
     * @param shotDistanceGte Shot distance in feet greater than or equal to
     * @param shotDistanceLte Shot distance in feet less than or equal to
     * @param offOwnOreb Was the shot after a player's own offensive rebound
     * @param offOwnDreb Was the shot after a player's own defensive rebound
     * @param offOwnMiss Was the shot after a player's own miss
     * @param orebShotType
     * @param shotValue 2 or 3. Leave empty for all.
     * @param assistPlayerId Player id of player who assisted on shot
     * @param blockPlayerId Player id of player who blocked shot
     * @param shotType
     * @param assisted Was the shot assisted
     * @param blocked Was the shot blocked
     * @returns ShotsResponse Successful Response
     * @throws ApiError
     */
    public static getShotsGetShotsLeagueGet(
        league: LeagueEnum,
        season: string,
        seasonType: SeasonTypeEnum,
        entityType: NonLineupEntityTypeEnum,
        entityId: string,
        startType: string = 'All',
        fromMargin?: number,
        toMargin?: number,
        periodEquals?: number,
        periodGte?: number,
        periodLte?: number,
        fromTime?: number,
        toTime?: number,
        shotTimeLte?: number,
        shotTimeGte?: number,
        secondsSincePossessionStartGte?: number,
        secondsSincePossessionStartLte?: number,
        secondsSinceOrebGte?: number,
        secondsSinceOrebLte?: number,
        shotDistanceGte?: number,
        shotDistanceLte?: number,
        offOwnOreb: boolean = false,
        offOwnDreb: boolean = false,
        offOwnMiss: boolean = false,
        orebShotType?: string,
        shotValue?: number,
        assistPlayerId?: string,
        blockPlayerId?: string,
        shotType?: string,
        assisted?: boolean,
        blocked?: boolean,
    ): CancelablePromise<ShotsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-shots/{league}',
            path: {
                'league': league,
            },
            query: {
                'Season': season,
                'SeasonType': seasonType,
                'EntityType': entityType,
                'EntityId': entityId,
                'StartType': startType,
                'FromMargin': fromMargin,
                'ToMargin': toMargin,
                'PeriodEquals': periodEquals,
                'PeriodGte': periodGte,
                'PeriodLte': periodLte,
                'FromTime': fromTime,
                'ToTime': toTime,
                'ShotTimeLte': shotTimeLte,
                'ShotTimeGte': shotTimeGte,
                'SecondsSincePossessionStartGte': secondsSincePossessionStartGte,
                'SecondsSincePossessionStartLte': secondsSincePossessionStartLte,
                'SecondsSinceOrebGte': secondsSinceOrebGte,
                'SecondsSinceOrebLte': secondsSinceOrebLte,
                'ShotDistanceGte': shotDistanceGte,
                'ShotDistanceLte': shotDistanceLte,
                'OffOwnOreb': offOwnOreb,
                'OffOwnDreb': offOwnDreb,
                'OffOwnMiss': offOwnMiss,
                'OrebShotType': orebShotType,
                'ShotValue': shotValue,
                'AssistPlayerId': assistPlayerId,
                'BlockPlayerId': blockPlayerId,
                'ShotType': shotType,
                'Assisted': assisted,
                'Blocked': blocked,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Gets team stats by leverage state
     * @param league
     * @param season
     * @param leverage Multiple types should be separated by a comma.
     * @returns TeamLeverageSummaryResponse Successful Response
     * @throws ApiError
     */
    public static getTeamLeverageSummaryGetTeamLeverageSummaryLeagueGet(
        league: LeagueEnum,
        season: string,
        leverage?: string,
    ): CancelablePromise<TeamLeverageSummaryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-team-leverage-summary/{league}',
            path: {
                'league': league,
            },
            query: {
                'Season': season,
                'Leverage': leverage,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
}
