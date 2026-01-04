/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EndGameBreakeven2Response } from '../models/EndGameBreakeven2Response';
import type { LeverageResponse } from '../models/LeverageResponse';
import type { NoGLeagueLeagueEnum } from '../models/NoGLeagueLeagueEnum';
import type { WinProbabilityResponse } from '../models/WinProbabilityResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WinProbabilityService {
    /**
     * Gets win probability for given conditions
     * @param league
     * @param teamWithBallMargin
     * @param teamWithBallPregameWinProb
     * @param secondsRemainingInGame
     * @returns WinProbabilityResponse Successful Response
     * @throws ApiError
     */
    public static getWinProbabilityGetWinProbabilityLeagueTeamWithBallMarginTeamWithBallPregameWinProbSecondsRemainingInGameGet(
        league: NoGLeagueLeagueEnum,
        teamWithBallMargin: number,
        teamWithBallPregameWinProb: number,
        secondsRemainingInGame: number,
    ): CancelablePromise<WinProbabilityResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-win-probability/{league}/{team_with_ball_margin}/{team_with_ball_pregame_win_prob}/{seconds_remaining_in_game}',
            path: {
                'league': league,
                'team_with_ball_margin': teamWithBallMargin,
                'team_with_ball_pregame_win_prob': teamWithBallPregameWinProb,
                'seconds_remaining_in_game': secondsRemainingInGame,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Gets win leverage for given conditions
     * @param league
     * @param teamWithBallMargin
     * @param teamWithBallPregameWinProb
     * @param secondsRemainingInGame
     * @param endOfPossessionSecondsRemainingInGame
     * @returns LeverageResponse Successful Response
     * @throws ApiError
     */
    public static getLeverageGetLeverageLeagueTeamWithBallMarginTeamWithBallPregameWinProbSecondsRemainingInGameEndOfPossessionSecondsRemainingInGameGet(
        league: NoGLeagueLeagueEnum,
        teamWithBallMargin: number,
        teamWithBallPregameWinProb: number,
        secondsRemainingInGame: number,
        endOfPossessionSecondsRemainingInGame: number,
    ): CancelablePromise<LeverageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-leverage/{league}/{team_with_ball_margin}/{team_with_ball_pregame_win_prob}/{seconds_remaining_in_game}/{end_of_possession_seconds_remaining_in_game}',
            path: {
                'league': league,
                'team_with_ball_margin': teamWithBallMargin,
                'team_with_ball_pregame_win_prob': teamWithBallPregameWinProb,
                'seconds_remaining_in_game': secondsRemainingInGame,
                'end_of_possession_seconds_remaining_in_game': endOfPossessionSecondsRemainingInGame,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Gets breakeven 2pt percentage needed for 2pt shot to be better than 3pt shot for given percentage
     * @param league
     * @param teamWithBallMargin
     * @param shotResultSecondsRemainingInGame
     * @param threePtPct
     * @returns EndGameBreakeven2Response Successful Response
     * @throws ApiError
     */
    public static getBreakeven2PctGetEndgameBreakeven2PctLeagueTeamWithBallMarginShotResultSecondsRemainingInGameThreePtPctGet(
        league: NoGLeagueLeagueEnum,
        teamWithBallMargin: number,
        shotResultSecondsRemainingInGame: number,
        threePtPct: number,
    ): CancelablePromise<EndGameBreakeven2Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-endgame-breakeven-2-pct/{league}/{team_with_ball_margin}/{shot_result_seconds_remaining_in_game}/{three_pt_pct}',
            path: {
                'league': league,
                'team_with_ball_margin': teamWithBallMargin,
                'shot_result_seconds_remaining_in_game': shotResultSecondsRemainingInGame,
                'three_pt_pct': threePtPct,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
