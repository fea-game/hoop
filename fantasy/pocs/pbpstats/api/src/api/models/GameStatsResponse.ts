/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BoxscoreStats } from './BoxscoreStats';
import type { TeamBoxscoreStats } from './TeamBoxscoreStats';
export type GameStatsResponse = {
    stats?: BoxscoreStats;
    team_results?: TeamBoxscoreStats;
    home_team_abbreviation?: string;
    away_team_abbreviation?: string;
    home_team_id?: string;
    away_team_id?: string;
    date?: string;
    league?: string;
    season?: string;
    season_type?: string;
};

