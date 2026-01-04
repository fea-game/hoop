/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GameLog = {
    EntityId?: string;
    /**
     * nba.com/stats team id
     */
    TeamId?: string;
    Name?: string;
    ShortName?: string;
    Season?: string;
    RowId?: string;
    TeamAbbreviation?: string;
    SecondsPlayed?: number;
    GamesPlayed?: number;
    Minutes?: string;
    PlusMinus?: number;
    OffPoss?: number;
    DefPoss?: number;
    /**
     * Possessions played in the bonus
     */
    PenaltyOffPoss?: number;
    /**
     * Possessions played in the penalty
     */
    PenaltyDefPoss?: number;
    SecondChanceOffPoss?: number;
    MinutesMMSS?: string;
    /**
     * Offensive possessions + defensive possessions
     */
    TotalPoss?: number;
    AtRimFGM?: number;
    /**
     * FGA within 4ft of basket
     */
    AtRimFGA?: number;
    OpponentAtRimFGM?: number;
    OpponentAtRimFGA?: number;
    SecondChanceAtRimFGM?: number;
    SecondChanceAtRimFGA?: number;
    PenaltyAtRimFGM?: number;
    PenaltyAtRimFGA?: number;
    ShortMidRangeFGM?: number;
    /**
     * FGA within 4-14ft of basket
     */
    ShortMidRangeFGA?: number;
    OpponentShortMidRangeFGM?: number;
    OpponentShortMidRangeFGA?: number;
    SecondChanceShortMidRangeFGM?: number;
    SecondChanceShortMidRangeFGA?: number;
    PenaltyShortMidRangeFGM?: number;
    PenaltyShortMidRangeFGA?: number;
    LongMidRangeFGM?: number;
    /**
     * 2pt FGA 14+ ft from basket
     */
    LongMidRangeFGA?: number;
    OpponentLongMidRangeFGM?: number;
    OpponentLongMidRangeFGA?: number;
    SecondChanceLongMidRangeFGM?: number;
    SecondChanceLongMidRangeFGA?: number;
    PenaltyLongMidRangeFGM?: number;
    PenaltyLongMidRangeFGA?: number;
    Corner3FGM?: number;
    Corner3FGA?: number;
    OpponentCorner3FGM?: number;
    OpponentCorner3FGA?: number;
    SecondChanceCorner3FGM?: number;
    SecondChanceCorner3FGA?: number;
    PenaltyCorner3FGM?: number;
    PenaltyCorner3FGA?: number;
    Arc3FGM?: number;
    Arc3FGA?: number;
    OpponentArc3FGM?: number;
    OpponentArc3FGA?: number;
    SecondChanceArc3FGM?: number;
    SecondChanceArc3FGA?: number;
    PenaltyArc3FGM?: number;
    PenaltyArc3FGA?: number;
    FG2M?: number;
    FG2A?: number;
    FG3M?: number;
    FG3A?: number;
    FGM?: number;
    FGA?: number;
    OpponentFG2M?: number;
    OpponentFG2A?: number;
    OpponentFG3M?: number;
    OpponentFG3A?: number;
    OpponentFGM?: number;
    OpponentFGA?: number;
    FtPoints?: number;
    Points?: number;
    OpponentPoints?: number;
    SecondChanceFG2M?: number;
    SecondChanceFG2A?: number;
    SecondChanceFG3M?: number;
    SecondChanceFG3A?: number;
    SecondChanceFtPoints?: number;
    SecondChancePoints?: number;
    PenaltyFG2M?: number;
    PenaltyFG2A?: number;
    PenaltyFG3M?: number;
    PenaltyFG3A?: number;
    PenaltyFtPoints?: number;
    PenaltyPoints?: number;
    PtsAssisted2s?: number;
    PtsUnassisted2s?: number;
    PtsAssisted3s?: number;
    PtsUnassisted3s?: number;
    /**
     * Putbacks are defined as unassisted FGA within 2s of OREB by the player who got the OREB
     */
    PtsPutbacks?: number;
    HeaveMakes?: number;
    /**
     * Heaves are defined as shots from 40+ ft with <2s remaining in period
     */
    HeaveAttempts?: number;
    NonHeaveFg3a?: number;
    NonHeaveFg3m?: number;
    NonHeaveArc3FGA?: number;
    NonHeaveArc3FGM?: number;
    /**
     * Number of 2pt attempts by the player/team/lineup that were blocked
     */
    Fg2aBlocked?: number;
    /**
     * Number of 3pt attempts by the player/team/lineup that were blocked
     */
    Fg3aBlocked?: number;
    TwoPtAssists?: number;
    ThreePtAssists?: number;
    Assists?: number;
    Arc3Assists?: number;
    Corner3Assists?: number;
    AtRimAssists?: number;
    ShortMidRangeAssists?: number;
    LongMidRangeAssists?: number;
    AssistPoints?: number;
    /**
     * OREBS on missed 3s
     */
    OffThreePtRebounds?: number;
    /**
     * OREBS on missed 2s
     */
    OffTwoPtRebounds?: number;
    /**
     * OREBS on missed FTs
     */
    FTOffRebounds?: number;
    /**
     * DREBS on missed 3s
     */
    DefThreePtRebounds?: number;
    /**
     * DREBS on missed 2s
     */
    DefTwoPtRebounds?: number;
    /**
     * DREBS on missed FTs
     */
    FTDefRebounds?: number;
    DefRebounds?: number;
    OffRebounds?: number;
    Rebounds?: number;
    /**
     * OREB opportunities on missed 3s
     */
    OffThreePtReboundOpportunities?: number;
    /**
     * OREB opportunities on missed 2s
     */
    OffTwoPtReboundOpportunities?: number;
    /**
     * OREB opportunities on missed FTs
     */
    DefThreePtReboundOpportunities?: number;
    /**
     * DREB opportunities on missed 3s
     */
    DefTwoPtReboundOpportunities?: number;
    /**
     * DREB opportunities on missed 2s
     */
    DefReboundOpportunities?: number;
    /**
     * DREB opportunities on missed FTs
     */
    OffReboundOpportunities?: number;
    /**
     * OREBS on missed your own missed shot
     */
    SelfOReb?: number;
    Steals?: number;
    BadPassSteals?: number;
    LostBallSteals?: number;
    LiveBallTurnovers?: number;
    BadPassOutOfBoundsTurnovers?: number;
    BadPassTurnovers?: number;
    DeadBallTurnovers?: number;
    LostBallOutOfBoundsTurnovers?: number;
    LostBallTurnovers?: number;
    StepOutOfBoundsTurnovers?: number;
    Travels?: number;
    OpponentLiveBallTurnovers?: number;
    SecondChanceLiveBallTurnovers?: number;
    PenaltyLiveBallTurnovers?: number;
    Turnovers?: number;
    OpponentTurnovers?: number;
    SecondChanceTurnovers?: number;
    PenaltyTurnovers?: number;
    ShootingFouls?: number;
    BlockingFouls?: number;
    Fouls?: number;
    'Charge Fouls'?: number;
    'Clear Path Fouls'?: number;
    'Loose Ball Fouls'?: number;
    'Offensive Fouls'?: number;
    'Transition Take Fouls'?: number;
    FoulsDrawn?: number;
    'Charge Fouls Drawn'?: number;
    'Loose Ball Fouls Drawn'?: number;
    'Offensive Fouls Drawn'?: number;
    'Transition Take Fouls Drawn'?: number;
    BlockingFoulsDrawn?: number;
    FTA?: number;
    '2pt And 1 Free Throw Trips'?: number;
    '3pt And 1 Free Throw Trips'?: number;
    'Technical Free Throw Trips'?: number;
    OpponentFTA?: number;
    TwoPtShootingFoulsDrawn?: number;
    ThreePtShootingFoulsDrawn?: number;
    NonShootingFoulsDrawn?: number;
    /**
     * Number of 2pt attempts blocked by the player/team/lineup
     */
    Blocked2s?: number;
    /**
     * Number of 3pt attempts blocked by the player/team/lineup
     */
    Blocked3s?: number;
    /**
     * Number of above the break 3 attempts blocked by the player/team/lineup
     */
    BlockedArc3?: number;
    /**
     * Number of rim attempts blocked by the player/team/lineup
     */
    BlockedAtRim?: number;
    /**
     * Number of corner 3 attempts blocked by the player/team/lineup
     */
    BlockedCorner3?: number;
    /**
     * Number of long mid range attempts blocked by the player/team/lineup
     */
    BlockedLongMidRange?: number;
    /**
     * Number of short mid range attempts blocked by the player/team/lineup
     */
    BlockedShortMidRange?: number;
    Blocks?: number;
    /**
     * Blocked shots recovered by your team
     */
    RecoveredBlocks?: number;
    DefensiveGoaltends?: number;
    OffensiveGoaltends?: number;
    '3SecondViolations'?: number;
    'Defensive 3 Seconds Violations'?: number;
    /**
     * Points scored excluding second chance points
     */
    FirstChancePoints?: number;
    PenaltyPointsExcludingTakeFouls?: number;
    PenaltyOffPossExcludingTakeFouls?: number;
    NonShootingPenaltyNonTakeFouls?: number;
    NonShootingPenaltyNonTakeFoulsDrawn?: number;
    /**
     * Minutes played with 0 fouls in the first quarter
     */
    Period1Fouls0Minutes?: number;
    Period1Fouls1Minutes?: number;
    Period1Fouls2Minutes?: number;
    Period1Fouls3Minutes?: number;
    Period1Fouls4Minutes?: number;
    Period1Fouls5Minutes?: number;
    Period2Fouls0Minutes?: number;
    Period2Fouls1Minutes?: number;
    Period2Fouls2Minutes?: number;
    Period2Fouls3Minutes?: number;
    Period2Fouls4Minutes?: number;
    Period2Fouls5Minutes?: number;
    Period3Fouls0Minutes?: number;
    Period3Fouls1Minutes?: number;
    Period3Fouls2Minutes?: number;
    Period3Fouls3Minutes?: number;
    Period3Fouls4Minutes?: number;
    Period3Fouls5Minutes?: number;
    Period4Fouls0Minutes?: number;
    Period4Fouls1Minutes?: number;
    Period4Fouls2Minutes?: number;
    Period4Fouls3Minutes?: number;
    Period4Fouls4Minutes?: number;
    Period4Fouls5Minutes?: number;
    PeriodOTFouls0Minutes?: number;
    PeriodOTFouls1Minutes?: number;
    PeriodOTFouls2Minutes?: number;
    PeriodOTFouls3Minutes?: number;
    PeriodOTFouls4Minutes?: number;
    PeriodOTFouls5Minutes?: number;
    TrueShotAttempts?: number;
    PtsPer100Poss?: number;
    PtsPer100PossOpponent?: number;
    SecondsPerPoss?: number;
    FirstChancePtsPer100Poss?: number;
    SecondChancePtsPer100Poss?: number;
    PenaltyPtsPer100Poss?: number;
    PenaltyPtsPer100PossPenalty?: number;
    PenaltyOffPossPer100Poss?: number;
    AssistPointsPer100Poss?: number;
    FTAPer100Poss?: number;
    TurnoversPer100Poss?: number;
    AssistsPer100Poss?: number;
    OnOffRtg?: number;
    OnDefRtg?: number;
    OnNetRtg?: number;
    Assisted2sPct?: number;
    NonPutbacksAssisted2sPct?: number;
    Assisted3sPct?: number;
    Fg3Pct?: number;
    FTPct?: number;
    Fg3PctOpponent?: number;
    SecondChanceFg3Pct?: number;
    PenaltyFg3Pct?: number;
    NonHeaveFg3Pct?: number;
    Fg2Pct?: number;
    Fg2PctOpponent?: number;
    SecondChanceFg2Pct?: number;
    PenaltyFg2Pct?: number;
    EfgPct?: number;
    EfgPctOpponent?: number;
    SecondChanceEfgPct?: number;
    PenaltyEfgPct?: number;
    TsPct?: number;
    SecondChanceTsPct?: number;
    PenaltyTsPct?: number;
    FG3APct?: number;
    FG3APctOpponent?: number;
    FG3APctBlocked?: number;
    FG2APctBlocked?: number;
    AtRimPctBlocked?: number;
    ShortMidRangePctBlocked?: number;
    LongMidRangePctBlocked?: number;
    Corner3PctBlocked?: number;
    Arc3PctBlocked?: number;
    Usage?: number;
    LiveBallTurnoverPct?: number;
    OffReboundPct?: number;
    DefReboundPct?: number;
    DefFTReboundPct?: number;
    OffFTReboundPct?: number;
    DefTwoPtReboundPct?: number;
    OffTwoPtReboundPct?: number;
    DefThreePtReboundPct?: number;
    OffThreePtReboundPct?: number;
    DefFGReboundPct?: number;
    OffFGReboundPct?: number;
    OffAtRimReboundPct?: number;
    OffShortMidRangeReboundPct?: number;
    OffLongMidRangeReboundPct?: number;
    OffArc3ReboundPct?: number;
    OffCorner3ReboundPct?: number;
    DefAtRimReboundPct?: number;
    DefShortMidRangeReboundPct?: number;
    DefLongMidRangeReboundPct?: number;
    DefArc3ReboundPct?: number;
    DefCorner3ReboundPct?: number;
    SelfORebPct?: number;
    Pace?: number;
    /**
     * Percentage of blocked shots recovered by your team
     */
    BlocksRecoveredPct?: number;
    SecondsPerPossOff?: number;
    SecondsPerPossDef?: number;
    SecondsExcludingORebsPerPossOff?: number;
    SecondsExcludingORebsPerPossDef?: number;
    AtRimFrequency?: number;
    AtRimAccuracy?: number;
    UnblockedAtRimAccuracy?: number;
    AtRimPctAssisted?: number;
    ShortMidRangeFrequency?: number;
    ShortMidRangeAccuracy?: number;
    UnblockedShortMidRangeAccuracy?: number;
    ShortMidRangePctAssisted?: number;
    LongMidRangeFrequency?: number;
    LongMidRangeAccuracy?: number;
    UnblockedLongMidRangeAccuracy?: number;
    LongMidRangePctAssisted?: number;
    Corner3Frequency?: number;
    Corner3Accuracy?: number;
    UnblockedCorner3Accuracy?: number;
    Corner3PctAssisted?: number;
    Arc3Frequency?: number;
    Arc3Accuracy?: number;
    UnblockedArc3Accuracy?: number;
    Arc3PctAssisted?: number;
    AtRimFrequencyOpponent?: number;
    AtRimAccuracyOpponent?: number;
    ShortMidRangeFrequencyOpponent?: number;
    ShortMidRangeAccuracyOpponent?: number;
    LongMidRangeFrequencyOpponent?: number;
    LongMidRangeAccuracyOpponent?: number;
    Corner3FrequencyOpponent?: number;
    Corner3AccuracyOpponent?: number;
    Arc3FrequencyOpponent?: number;
    Arc3AccuracyOpponent?: number;
    SecondChanceAtRimFrequency?: number;
    SecondChanceAtRimAccuracy?: number;
    SecondChanceAtRimPctAssisted?: number;
    SecondChanceShortMidRangeFrequency?: number;
    SecondChanceShortMidRangeAccuracy?: number;
    SecondChanceShortMidRangePctAssisted?: number;
    SecondChanceLongMidRangeFrequency?: number;
    SecondChanceLongMidRangeAccuracy?: number;
    SecondChanceLongMidRangePctAssisted?: number;
    SecondChanceCorner3Frequency?: number;
    SecondChanceCorner3Accuracy?: number;
    SecondChanceCorner3PctAssisted?: number;
    SecondChanceArc3Frequency?: number;
    SecondChanceArc3Accuracy?: number;
    SecondChanceArc3PctAssisted?: number;
    PenaltyAtRimFrequency?: number;
    PenaltyAtRimAccuracy?: number;
    PenaltyShortMidRangeFrequency?: number;
    PenaltyShortMidRangeAccuracy?: number;
    PenaltyLongMidRangeFrequency?: number;
    PenaltyLongMidRangeAccuracy?: number;
    PenaltyCorner3Frequency?: number;
    PenaltyCorner3Accuracy?: number;
    PenaltyArc3Frequency?: number;
    PenaltyArc3Accuracy?: number;
    AtRimFG3AFrequency?: number;
    NonHeaveArc3Accuracy?: number;
    ShotQualityAvg?: number;
    OpponentShotQualityAvg?: number;
    SecondChanceShotQualityAvg?: number;
    PenaltyShotQualityAvg?: number;
    ShootingFoulsDrawnPct?: number;
    TwoPtShootingFoulsDrawnPct?: number;
    ThreePtShootingFoulsDrawnPct?: number;
    SecondChancePointsPct?: number;
    SecondChancePtsPer100PossSecondChance?: number;
    SecondChanceOffPossPer100Poss?: number;
    SecondChancePointsPer100PossSecondChance?: number;
    PenaltyPointsPct?: number;
    PenaltyPossessionsPct?: number;
    Avg2ptShotDistance?: number;
    Avg3ptShotDistance?: number;
    /**
     * Percentage of Player's Misses At Rim That Are Offensive Rebounded
     */
    AtRimOffReboundedPct?: number;
    /**
     * Percentage of Player's Short Mid-Range Misses That Are Offensive Rebounded
     */
    ShortMidRangeOffReboundedPct?: number;
    /**
     * Percentage of Player's Long Mid-Range Misses That Are Offensive Rebounded
     */
    LongMidRangeOffReboundedPct?: number;
    /**
     * Percentage of Player's Missed 3s That Are Offensive Rebounded
     */
    ThreePtOffReboundedPct?: number;
    PenaltyEfficiencyExcludingTakeFouls?: number;
    /**
     * Percentage of offensive possessions played in the bonus
     */
    PenaltyOffPossPct?: number;
    Date?: string;
    GameId?: string;
    Team?: string;
    Opponent?: string;
};

