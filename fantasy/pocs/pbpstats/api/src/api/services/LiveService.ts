/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LeagueEnum } from '../models/LeagueEnum';
import type { LiveGameResponse } from '../models/LiveGameResponse';
import type { LiveGamesResponse } from '../models/LiveGamesResponse';
import type { LiveResultTypeEnum } from '../models/LiveResultTypeEnum';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LiveService {
    /**
     * Gets live game data
     * @param gameId
     * @param resultType
     * @returns LiveGameResponse Successful Response
     * @throws ApiError
     */
    public static getLiveGameLiveGameGameIdResultTypeGet(
        gameId: string,
        resultType: LiveResultTypeEnum,
    ): CancelablePromise<LiveGameResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/live/game/{game_id}/{result_type}',
            path: {
                'game_id': gameId,
                'result_type': resultType,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Gets all today's games
     * @param league
     * @returns LiveGamesResponse Successful Response
     * @throws ApiError
     */
    public static getLiveGamesLiveGamesLeagueGet(
        league: LeagueEnum,
    ): CancelablePromise<LiveGamesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/live/games/{league}',
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
