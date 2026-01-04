/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AssistNetworkResponse } from '../models/AssistNetworkResponse';
import type { FourFactorsOnOffResponse } from '../models/FourFactorsOnOffResponse';
import type { LeagueEnum } from '../models/LeagueEnum';
import type { LeagueYearOverYearResponse } from '../models/LeagueYearOverYearResponse';
import type { NumberOfStarterStatsResponse } from '../models/NumberOfStarterStatsResponse';
import type { PlayingTimeDistributionResponse } from '../models/PlayingTimeDistributionResponse';
import type { PossessionLengthResponse } from '../models/PossessionLengthResponse';
import type { PossessionTypeEnum } from '../models/PossessionTypeEnum';
import type { ScatterPlotResponse } from '../models/ScatterPlotResponse';
import type { ScoreMarginPeriodEnum } from '../models/ScoreMarginPeriodEnum';
import type { ScoreMarginResponse } from '../models/ScoreMarginResponse';
import type { SeasonTypeEnum } from '../models/SeasonTypeEnum';
import type { TeamOrLineupEntityTypeEnum } from '../models/TeamOrLineupEntityTypeEnum';
import type { TeamOrOpponentTypeEnum } from '../models/TeamOrOpponentTypeEnum';
import type { TimeTypeEnum } from '../models/TimeTypeEnum';
import type { WowyComboPlayingTimeResponse } from '../models/WowyComboPlayingTimeResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class VisualizationsService {
    /**
     * Gets assist network data
     * Needs either GameId or both Season and SeasonType query params
     * @param league
     * @param entityType
     * @param entityId player, team or lineup id
     * @param season
     * @param seasonType
     * @param gameId (w)nba.com/stats game id
     * @returns AssistNetworkResponse Successful Response
     * @throws ApiError
     */
    public static getAssistNetworksGetAssistNetworksLeagueGet(
        league: LeagueEnum,
        entityType: TeamOrLineupEntityTypeEnum,
        entityId: string,
        season?: string,
        seasonType?: SeasonTypeEnum,
        gameId?: string,
    ): CancelablePromise<AssistNetworkResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-assist-networks/{league}',
            path: {
                'league': league,
            },
            query: {
                'Season': season,
                'SeasonType': seasonType,
                'EntityType': entityType,
                'EntityId': entityId,
                'GameId': gameId,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Gets team and opponent four factors stats with player on and off the floor
     * @param league
     * @param season Multiple seasons should be separated by a comma
     * @param seasonType
     * @param teamId (w)nba.com/stats team id
     * @param playerId (w)nba.com/stats player id
     * @returns FourFactorsOnOffResponse Successful Response
     * @throws ApiError
     */
    public static getFourFactorOnOffGetFourFactorOnOffLeagueGet(
        league: LeagueEnum,
        season: string,
        seasonType: SeasonTypeEnum,
        teamId: string,
        playerId: string,
    ): CancelablePromise<FourFactorsOnOffResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-four-factor-on-off/{league}',
            path: {
                'league': league,
            },
            query: {
                'Season': season,
                'SeasonType': seasonType,
                'TeamId': teamId,
                'PlayerId': playerId,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Gets overall league year-over-year stats
     * @param league
     * @param seasonType
     * @param leftAxis
     * @param rightAxis
     * @returns LeagueYearOverYearResponse Successful Response
     * @throws ApiError
     */
    public static getLeagueYearOverYearPlotsGetLeagueYearOverYearPlotsLeagueGet(
        league: LeagueEnum,
        seasonType: SeasonTypeEnum,
        leftAxis: string,
        rightAxis?: string,
    ): CancelablePromise<LeagueYearOverYearResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-league-year-over-year-plots/{league}',
            path: {
                'league': league,
            },
            query: {
                'SeasonType': seasonType,
                'LeftAxis': leftAxis,
                'RightAxis': rightAxis,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Gets frequency and net efficiency for each team broken down by the number of starters on the floor
     * @param league
     * @param season Multiple seasons should be separated by a comma
     * @param seasonType
     * @returns NumberOfStarterStatsResponse Successful Response
     * @throws ApiError
     */
    public static getNumberOfStarterStatsByTeamGetNumberOfStarterStatsByTeamLeagueGet(
        league: LeagueEnum,
        season: string,
        seasonType: SeasonTypeEnum,
    ): CancelablePromise<NumberOfStarterStatsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-number-of-starter-stats-by-team/{league}',
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
     * Gets breakdown of when player is on the floor each game
     * @param league
     * @param season Multiple seasons should be separated by a comma
     * @param seasonType
     * @param teamId (w)nba.com/stats team id
     * @param playerId (w)nba.com/stats player id
     * @returns PlayingTimeDistributionResponse Successful Response
     * @throws ApiError
     */
    public static getPlayingTimeDistributionGetPlayingTimeDistributionLeagueGet(
        league: LeagueEnum,
        season: string,
        seasonType: SeasonTypeEnum,
        teamId: string,
        playerId: string,
    ): CancelablePromise<PlayingTimeDistributionResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-playing-time-distribution/{league}',
            path: {
                'league': league,
            },
            query: {
                'Season': season,
                'SeasonType': seasonType,
                'TeamId': teamId,
                'PlayerId': playerId,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Gets possession length frequency for each team and the league as a whole
     * @param league
     * @param season Multiple seasons should be separated by a comma
     * @param seasonType
     * @param timeType
     * @param possessionType
     * @param startType team stats only
     * @returns PossessionLengthResponse Successful Response
     * @throws ApiError
     */
    public static getPossessionLengthFrequencyGetPossessionLengthFrequencyLeagueGet(
        league: LeagueEnum,
        season: string,
        seasonType: SeasonTypeEnum,
        timeType: TimeTypeEnum,
        possessionType: PossessionTypeEnum,
        startType: string = 'All',
    ): CancelablePromise<PossessionLengthResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-possession-length-frequency/{league}',
            path: {
                'league': league,
            },
            query: {
                'Season': season,
                'SeasonType': seasonType,
                'TimeType': timeType,
                'PossessionType': possessionType,
                'StartType': startType,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Gets stats for each team for given stats
     * @param league
     * @param season Multiple seasons should be separated by a comma
     * @param seasonType
     * @param xaxis
     * @param yaxis
     * @param xaxisType
     * @param yaxisType
     * @returns ScatterPlotResponse Successful Response
     * @throws ApiError
     */
    public static getScatterPlotsGetScatterPlotsLeagueGet(
        league: LeagueEnum,
        season: string,
        seasonType: SeasonTypeEnum,
        xaxis: string,
        yaxis: string,
        xaxisType?: TeamOrOpponentTypeEnum,
        yaxisType?: TeamOrOpponentTypeEnum,
    ): CancelablePromise<ScatterPlotResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-scatter-plots/{league}',
            path: {
                'league': league,
            },
            query: {
                'Season': season,
                'SeasonType': seasonType,
                'Xaxis': xaxis,
                'Yaxis': yaxis,
                'XaxisType': xaxisType,
                'YaxisType': yaxisType,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Gets percentage of possessions a team was up/down by x points
     * @param league
     * @param season Multiple seasons should be separated by a comma
     * @param seasonType
     * @param teamId (w)nba.com/stats team id
     * @param period
     * @returns ScoreMarginResponse Successful Response
     * @throws ApiError
     */
    public static getScoreMarginBreakdownGetScoreMarginBreakdownLeagueGet(
        league: LeagueEnum,
        season: string,
        seasonType: SeasonTypeEnum,
        teamId: string,
        period?: ScoreMarginPeriodEnum,
    ): CancelablePromise<ScoreMarginResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-score-margin-breakdown/{league}',
            path: {
                'league': league,
            },
            query: {
                'Season': season,
                'SeasonType': seasonType,
                'TeamId': teamId,
                'Period': period,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Gets breakdown of when each combo was on the floor each game for all combos of given players
     * @param league
     * @param season Multiple seasons should be separated by a comma
     * @param seasonType
     * @param teamId (w)nba.com/stats team id
     * @param playerIds comma separated (w)nba.com/stats player id
     * @param onlyShowAllPlayersOn
     * @returns WowyComboPlayingTimeResponse Successful Response
     * @throws ApiError
     */
    public static getWowyComboPlayingTimeDistributionGetWowyComboPlayingTimeDistributionLeagueGet(
        league: LeagueEnum,
        season: string,
        seasonType: SeasonTypeEnum,
        teamId: string,
        playerIds: string,
        onlyShowAllPlayersOn: boolean = false,
    ): CancelablePromise<WowyComboPlayingTimeResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-wowy-combo-playing-time-distribution/{league}',
            path: {
                'league': league,
            },
            query: {
                'Season': season,
                'SeasonType': seasonType,
                'TeamId': teamId,
                'PlayerIds': playerIds,
                'OnlyShowAllPlayersOn': onlyShowAllPlayersOn,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
}
