/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ShotResult = {
    assist_player?: string;
    assist_player_id?: number;
    assisted?: boolean;
    block_player?: string;
    block_player_id?: number;
    blocked?: boolean;
    dtid: number;
    end_time?: number;
    event_num?: number;
    game_date: string;
    gid: string;
    lineup_id: string;
    made: boolean;
    opponent: string;
    opponent_lineup_id: string;
    oreb_rebound_player?: string;
    oreb_rebound_player_id?: number;
    oreb_shot_player?: string;
    oreb_shot_player_id?: number;
    oreb_shot_type?: string;
    otid: number;
    period?: number;
    player: string;
    player_id?: number;
    poss_num?: number;
    possession_start_time?: string;
    previous_poss_end_rebound_pid?: number;
    previous_poss_end_rebound_player?: string;
    previous_poss_end_shooter_pid?: number;
    previous_poss_end_shooter_player?: string;
    previous_poss_end_steal_pid?: number;
    previous_poss_end_steal_player?: string;
    previous_poss_end_turnover_pid?: number;
    previous_poss_end_turnover_player?: string;
    putback?: boolean;
    score_margin?: number;
    seconds_since_oreb?: number;
    shot_distance?: number;
    shot_quality?: number;
    shot_time?: number;
    shot_type?: string;
    shot_value?: number;
    start_time?: number;
    start_type: string;
    team?: string;
    time?: string;
    url?: string;
    'x'?: number;
    'y'?: number;
};

