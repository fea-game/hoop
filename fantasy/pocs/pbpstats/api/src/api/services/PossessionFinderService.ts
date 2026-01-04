/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LeagueEnum } from '../models/LeagueEnum';
import type { PeriodEnum } from '../models/PeriodEnum';
import type { PossessionsResponse } from '../models/PossessionsResponse';
import type { PossessionTypeEnum } from '../models/PossessionTypeEnum';
import type { SeasonTypeEnum } from '../models/SeasonTypeEnum';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PossessionFinderService {
    /**
     * Gets stats and details for possessions that meet query parameters. If more than 500 possessions meet criteria, only 500 possessions will be returned
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
     * @param offDef
     * @param toDate YYYY-MM-DD
     * @param fromDate YYYY-MM-DD
     * @param leverage Multiple types should be separated by a comma.
     * @param opponent Separated team ids by comma for multiple teams
     * @param period
     * @param fromTime Maximum number of seconds remaining in period at start of possession
     * @param toTime Minimum number of seconds remaining in period at start of possession
     * @param fromMargin Minimum score margin from the perspective of the selected team at start of possession
     * @param toMargin Maximum score margin from the perspective of the selected team at start of possession
     * @param startType team stats only
     * @param eventPlayerId Player id of the player who performed the event in the EventType
     * @param eventType
     * @param reboundPlayerId Player id of player who got defensive rebound to end previous possession
     * @param shooterPlayerId Player id of player who got took shot that ended previous possession
     * @param turnoverPlayerId Player id of player who turned the ball over to end previous possession
     * @param stealPlayerId Player id of player who got the steal to end previous possession
     * @returns PossessionsResponse Successful Response
     * @throws ApiError
     */
    public static getPossessionsGetPossessionsLeagueGet(
        league: LeagueEnum,
        season: string,
        seasonType: SeasonTypeEnum,
        teamId: string,
        offDef: PossessionTypeEnum,
        toDate?: string,
        fromDate?: string,
        leverage?: string,
        opponent?: string,
        period?: PeriodEnum,
        fromTime?: number,
        toTime?: number,
        fromMargin?: number,
        toMargin?: number,
        startType: string = 'All',
        eventPlayerId?: string,
        eventType?: string,
        reboundPlayerId?: string,
        shooterPlayerId?: string,
        turnoverPlayerId?: string,
        stealPlayerId?: string,
    ): CancelablePromise<PossessionsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-possessions/{league}',
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
                'Opponent': opponent,
                'Period': period,
                'FromTime': fromTime,
                'ToTime': toTime,
                'FromMargin': fromMargin,
                'ToMargin': toMargin,
                'OffDef': offDef,
                'StartType': startType,
                'EventPlayerId': eventPlayerId,
                'EventType': eventType,
                'ReboundPlayerId': reboundPlayerId,
                'ShooterPlayerId': shooterPlayerId,
                'TurnoverPlayerId': turnoverPlayerId,
                'StealPlayerId': stealPlayerId,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
}
