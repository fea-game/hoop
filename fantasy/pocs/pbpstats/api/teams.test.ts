import { expect, test } from "vitest";
import { GeneralService, LeagueEnum } from "./src/api/index";

test("Provides 30 NBA teams", async () => {
  const result = await GeneralService.getTeamsGetTeamsLeagueGet(LeagueEnum.NBA);

  expect(result).toBeDefined();
  expect(result.teams.length).toBe(30);
  expect(result.teams).toMatchSnapshot();
});
