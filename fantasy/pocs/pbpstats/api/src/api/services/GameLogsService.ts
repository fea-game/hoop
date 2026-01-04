/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EntityTypeEnum } from '../models/EntityTypeEnum';
import type { GameLogsResponse } from '../models/GameLogsResponse';
import type { LeagueEnum } from '../models/LeagueEnum';
import type { SeasonTypeEnum } from '../models/SeasonTypeEnum';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameLogsService {
    /**
     * Gets game logs for player/team/lineup
     * @param league
     * @param season Multiple seasons should be separated by a comma
     * @param seasonType
     * @param entityType
     * @param entityId player, team or lineup id
     * @returns GameLogsResponse Successful Response
     * @throws ApiError
     */
    public static getGameLogsGetGameLogsLeagueGet(
        league: LeagueEnum,
        season: string,
        seasonType: SeasonTypeEnum,
        entityType: EntityTypeEnum,
        entityId: string,
    ): CancelablePromise<GameLogsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-game-logs/{league}',
            path: {
                'league': league,
            },
            query: {
                'Season': season,
                'SeasonType': seasonType,
                'EntityType': entityType,
                'EntityId': entityId,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
}
