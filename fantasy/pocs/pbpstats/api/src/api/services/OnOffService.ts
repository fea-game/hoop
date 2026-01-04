/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LeagueEnum } from '../models/LeagueEnum';
import type { LineupSubunitResponse } from '../models/LineupSubunitResponse';
import type { NonLineupEntityTypeEnum } from '../models/NonLineupEntityTypeEnum';
import type { OnOffStatTypeEnum } from '../models/OnOffStatTypeEnum';
import type { PeriodEnum } from '../models/PeriodEnum';
import type { SeasonTypeEnum } from '../models/SeasonTypeEnum';
import type { WowyComboResponse } from '../models/WowyComboResponse';
import type { WowyResponse } from '../models/WowyResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OnOffService {
    /**
     * Gets offensive, defensive and net efficiency for all x player combinations of players selected
     * @param league
     * @param season Multiple seasons should be separated by a comma
     * @param seasonType
     * @param teamId (w)nba.com/stats team id
     * @param lineupId lineup ids are "-" separated (w)nba.com/stats player ids sorted as strings
     * @param subUnitSize
     * @returns LineupSubunitResponse Successful Response
     * @throws ApiError
     */
    public static getLineupSubunitStatsGetLineupSubunitStatsLeagueGet(
        league: LeagueEnum,
        season: string,
        seasonType: SeasonTypeEnum,
        teamId: string,
        lineupId: string,
        subUnitSize: number,
    ): CancelablePromise<LineupSubunitResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-lineup-subunit-stats/{league}',
            path: {
                'league': league,
            },
            query: {
                'Season': season,
                'SeasonType': seasonType,
                'TeamId': teamId,
                'LineupId': lineupId,
                'SubUnitSize': subUnitSize,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Gets on/off data for query params
     * Stat is required query param if stat_type is stat
     *
     * PlayerId is required query param if stat_type is player or team
     * @param league
     * @param statType
     * @param season Multiple seasons should be separated by a comma
     * @param seasonType
     * @param teamId (w)nba.com/stats team id
     * @param playerId (w)nba.com/stats player id
     * @param stat
     * @param leverage Multiple types should be separated by a comma.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getOnOffGetOnOffLeagueStatTypeGet(
        league: LeagueEnum,
        statType: OnOffStatTypeEnum,
        season: string,
        seasonType: SeasonTypeEnum,
        teamId: string,
        playerId?: string,
        stat?: string,
        leverage?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-on-off/{league}/{stat_type}',
            path: {
                'league': league,
                'stat_type': statType,
            },
            query: {
                'Season': season,
                'SeasonType': seasonType,
                'TeamId': teamId,
                'PlayerId': playerId,
                'Stat': stat,
                'Leverage': leverage,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Gets lineup and team stats for given set of players on/off
     * In addition to the listed query params, this endpoint also accepts the following for player and opponent player filters
     *
     * Player Filter Paramater format:
     *
     * index, amount (Exactly | GreaterThan | LessThan), number, description (OnFloor | OffFloor | PlayedInGame | DidNotPlayInGame | Started | CameOffBench)
     *
     * example: 0Exactly1OnFloor
     *
     * value is comma separated player ids
     *
     *
     * Opponent Player Filter Paramater format:
     *
     * Opponent, amount (Exactly | GreaterThan | LessThan), number, description (OnFloor | OffFloor)
     *
     * example: OpponentExactly1OnFloor
     *
     * value is comma separated player ids
     * @param league
     * @param season Multiple seasons should be separated by a comma
     * @param seasonType
     * @param teamId (w)nba.com/stats team id
     * @param toDate YYYY-MM-DD
     * @param fromDate YYYY-MM-DD
     * @param leverage Multiple types should be separated by a comma.
     * @param starterState When querying multiple starter states separate by comma
     * @param type
     * @param opponent Separated team ids by comma for multiple teams
     * @param period
     * @param fromTime Maximum number of seconds remaining in period at start of possession
     * @param toTime Minimum number of seconds remaining in period at start of possession
     * @param fromMargin Minimum score margin from the perspective of the selected team at start of possession
     * @param toMargin Maximum score margin from the perspective of the selected team at start of possession
     * @returns WowyResponse Successful Response
     * @throws ApiError
     */
    public static getWowyStatsGetWowyStatsLeagueGet(
        league: LeagueEnum,
        season: string,
        seasonType: SeasonTypeEnum,
        teamId: string,
        toDate?: string,
        fromDate?: string,
        leverage?: string,
        starterState?: string,
        type?: NonLineupEntityTypeEnum,
        opponent?: string,
        period?: PeriodEnum,
        fromTime?: number,
        toTime?: number,
        fromMargin?: number,
        toMargin?: number,
    ): CancelablePromise<WowyResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-wowy-stats/{league}',
            path: {
                'league': league,
            },
            query: {
                'Season': season,
                'SeasonType': seasonType,
                'TeamId': teamId,
                'ToDate': toDate,
                'FromDate': fromDate,
                'Leverage': leverage,
                'StarterState': starterState,
                'Type': type,
                'Opponent': opponent,
                'Period': period,
                'FromTime': fromTime,
                'ToTime': toTime,
                'FromMargin': fromMargin,
                'ToMargin': toMargin,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Gets offensive, defensive and net efficiency for all on/off combinations of players selected
     * @param league
     * @param season Multiple seasons should be separated by a comma
     * @param seasonType
     * @param teamId (w)nba.com/stats team id
     * @param playerIds comma separated (w)nba.com/stats player id
     * @param leverage Multiple types should be separated by a comma.
     * @param onlyCommonGames Should the results only include games in which all players played
     * @returns WowyComboResponse Successful Response
     * @throws ApiError
     */
    public static getWowyCombinationStatsGetWowyCombinationStatsLeagueGet(
        league: LeagueEnum,
        season: string,
        seasonType: SeasonTypeEnum,
        teamId: string,
        playerIds: string,
        leverage?: string,
        onlyCommonGames: boolean = false,
    ): CancelablePromise<WowyComboResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-wowy-combination-stats/{league}',
            path: {
                'league': league,
            },
            query: {
                'Season': season,
                'SeasonType': seasonType,
                'TeamId': teamId,
                'Leverage': leverage,
                'PlayerIds': playerIds,
                'OnlyCommonGames': onlyCommonGames,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
}
