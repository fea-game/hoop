/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameStatsResponse } from '../models/GameStatsResponse';
import type { NonTeamEntityTypeEnum } from '../models/NonTeamEntityTypeEnum';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameStatsService {
    /**
     * Gets game stats by player/lineup
     * @param gameId (w)nba.com/stats game id
     * @param type
     * @returns GameStatsResponse Successful Response
     * @throws ApiError
     */
    public static getGameStatsGetGameStatsGet(
        gameId: string,
        type: NonTeamEntityTypeEnum,
    ): CancelablePromise<GameStatsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-game-stats',
            query: {
                'GameId': gameId,
                'Type': type,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
}
