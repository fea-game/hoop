/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AllTeamsResponse } from '../models/AllTeamsResponse';
import type { GamesResponse } from '../models/GamesResponse';
import type { LeagueEnum } from '../models/LeagueEnum';
import type { routers__all_players_for_league__AllPlayersResponse } from '../models/routers__all_players_for_league__AllPlayersResponse';
import type { routers__team_players_for_season__AllPlayersResponse } from '../models/routers__team_players_for_season__AllPlayersResponse';
import type { SeasonTypeEnum } from '../models/SeasonTypeEnum';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GeneralService {
    /**
     * Gets all players for league
     * @param league
     * @returns routers__all_players_for_league__AllPlayersResponse Successful Response
     * @throws ApiError
     */
    public static getAllPlayersForLeagueGetAllPlayersForLeagueLeagueGet(
        league: LeagueEnum,
    ): CancelablePromise<routers__all_players_for_league__AllPlayersResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-all-players-for-league/{league}',
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
     * Gets all games for season and season type
     * @param league
     * @param season Multiple seasons should be separated by a comma
     * @param seasonType
     * @returns GamesResponse Successful Response
     * @throws ApiError
     */
    public static getGamesGetGamesLeagueGet(
        league: LeagueEnum,
        season: string,
        seasonType: SeasonTypeEnum,
    ): CancelablePromise<GamesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-games/{league}',
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
     * Gets all players who played for team in given season(s)
     * @param season Multiple seasons should be separated by a comma
     * @param seasonType
     * @param teamId (w)nba.com/stats team id
     * @returns routers__team_players_for_season__AllPlayersResponse Successful Response
     * @throws ApiError
     */
    public static getTeamPlayersForSeasonGetTeamPlayersForSeasonGet(
        season: string,
        seasonType: SeasonTypeEnum,
        teamId: string,
    ): CancelablePromise<routers__team_players_for_season__AllPlayersResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-team-players-for-season',
            query: {
                'Season': season,
                'SeasonType': seasonType,
                'TeamId': teamId,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Gets all teams for current season for league
     * @param league
     * @returns AllTeamsResponse Successful Response
     * @throws ApiError
     */
    public static getTeamsGetTeamsLeagueGet(
        league: LeagueEnum,
    ): CancelablePromise<AllTeamsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-teams/{league}',
            path: {
                'league': league,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
}
