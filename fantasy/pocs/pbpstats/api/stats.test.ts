import { expect, test } from "vitest";
import { EntityTypeEnum, LeagueEnum, TotalsService } from "./src/api/index";

const MICHAEL_JORDAN_ID = "893";

test("Provides career totals for Michael Jordan", async () => {
  const result =
    await TotalsService.getAllSeasonStatsForEntityGetAllSeasonStatsLeagueGet(
      LeagueEnum.NBA,
      EntityTypeEnum.PLAYER,
      MICHAEL_JORDAN_ID
    );

  expect(result).toBeDefined();
  expect(result).toMatchSnapshot();
});
