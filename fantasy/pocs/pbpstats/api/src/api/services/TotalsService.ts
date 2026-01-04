/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AllSeasonStatsResponse } from '../models/AllSeasonStatsResponse';
import type { EntityTypeEnum } from '../models/EntityTypeEnum';
import type { LeagueEnum } from '../models/LeagueEnum';
import type { routers__lineup_player_totals__TotalsResponse } from '../models/routers__lineup_player_totals__TotalsResponse';
import type { routers__totals__TotalsResponse } from '../models/routers__totals__TotalsResponse';
import type { SeasonTypeEnum } from '../models/SeasonTypeEnum';
import type { SortOrderEnum } from '../models/SortOrderEnum';
import type { TopResultsResponse } from '../models/TopResultsResponse';
import type { TopResultTypeEnum } from '../models/TopResultTypeEnum';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TotalsService {
    /**
     * Gets career stats by season for player/team/lineup
     * @param league
     * @param entityType
     * @param entityId player, team or lineup id
     * @returns AllSeasonStatsResponse Successful Response
     * @throws ApiError
     */
    public static getAllSeasonStatsForEntityGetAllSeasonStatsLeagueGet(
        league: LeagueEnum,
        entityType: EntityTypeEnum,
        entityId: string,
    ): CancelablePromise<AllSeasonStatsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-all-season-stats/{league}',
            path: {
                'league': league,
            },
            query: {
                'EntityType': entityType,
                'EntityId': entityId,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get player stats when a given 5 player lineup is on the floor
     * @param league
     * @param season Multiple seasons should be separated by a comma
     * @param seasonType
     * @param lineupId lineup ids are "-" separated (w)nba.com/stats player ids sorted as strings
     * @returns routers__lineup_player_totals__TotalsResponse Successful Response
     * @throws ApiError
     */
    public static getLineupPlayerTotalsGetLineupPlayerStatsLeagueGet(
        league: LeagueEnum,
        season: string,
        seasonType: SeasonTypeEnum,
        lineupId: string,
    ): CancelablePromise<routers__lineup_player_totals__TotalsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-lineup-player-stats/{league}',
            path: {
                'league': league,
            },
            query: {
                'Season': season,
                'SeasonType': seasonType,
                'LineupId': lineupId,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Gets top results by game or season
     * Season is optional if Type is game
     * @param league
     * @param seasonType
     * @param entityType
     * @param type
     * @param stat
     * @param season
     * @param minCutOff Minimum cutoff value for the denominator if the stat is a percentage stat. Ex. Min FG3A when the stat is 3pt%.
     * @param sortOrder
     * @returns TopResultsResponse Successful Response
     * @throws ApiError
     */
    public static getTopResultsGetTopResultsLeagueGet(
        league: LeagueEnum,
        seasonType: SeasonTypeEnum,
        entityType: EntityTypeEnum,
        type: TopResultTypeEnum,
        stat: string,
        season?: string,
        minCutOff?: number,
        sortOrder?: SortOrderEnum,
    ): CancelablePromise<TopResultsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-top-results/{league}',
            path: {
                'league': league,
            },
            query: {
                'Season': season,
                'SeasonType': seasonType,
                'EntityType': entityType,
                'Type': type,
                'Stat': stat,
                'MinCutOff': minCutOff,
                'SortOrder': sortOrder,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Gets totals for player/team/lineup for single/multiple seasons
     * @param league
     * @param season Multiple seasons should be separated by a comma
     * @param seasonType
     * @param type
     * @param leverage Multiple types should be separated by a comma.
     * @param toDate YYYY-MM-DD
     * @param fromDate YYYY-MM-DD
     * @param starterState only for Team, Player or Opponent, no StartType, FromDate or ToDate. When querying multiple starter states separate by comma
     * @param teamId (w)nba.com/stats team id
     * @param groupBy team stats only
     * @param startType team stats only
     * @returns routers__totals__TotalsResponse Successful Response
     * @throws ApiError
     */
    public static getTotalsGetTotalsLeagueGet(
        league: LeagueEnum,
        season: string,
        seasonType: SeasonTypeEnum,
        type: EntityTypeEnum,
        leverage?: string,
        toDate?: string,
        fromDate?: string,
        starterState: string = 'All',
        teamId?: string,
        groupBy?: string,
        startType: string = 'All',
    ): CancelablePromise<routers__totals__TotalsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-totals/{league}',
            path: {
                'league': league,
            },
            query: {
                'Season': season,
                'SeasonType': seasonType,
                'Type': type,
                'Leverage': leverage,
                'ToDate': toDate,
                'FromDate': fromDate,
                'StarterState': starterState,
                'TeamId': teamId,
                'GroupBy': groupBy,
                'StartType': startType,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
}
