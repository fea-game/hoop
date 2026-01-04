import { expect, suite, test } from "vitest";
import { GeneralService, LeagueEnum } from "./src/api/index";

suite("Players", async () => {
  const result =
    await GeneralService.getAllPlayersForLeagueGetAllPlayersForLeagueLeagueGet(
      LeagueEnum.NBA
    );

  expect(result).toBeDefined();

  test("Provides all NBA players from 1996 to present", () => {
    expect(result.players).toMatchSnapshot();
  });

  const players = new Set(Object.values(result.players));

  test("Doesn't include players that retired before 1996", () => {
    expect(players.has("Brad Daugherty")).toBe(false);
    expect(players.has("Magic Johnson")).toBe(false);
    expect(players.has("Michael Adams")).toBe(false);
    expect(players.has("Larry Bird")).toBe(false);
  });

  test("Includes players that were drafted in 1996", () => {
    expect(players.has("Kobe Bryant")).toBe(true);
    expect(players.has("Allen Iverson")).toBe(true);
    expect(players.has("Steve Nash")).toBe(true);
  });

  test("Includes players being in the league between 1996 and present", () => {
    expect(players.has("Michael Jordan")).toBe(true);
    expect(players.has("LeBron James")).toBe(true);
    expect(players.has("Kenyon Martin")).toBe(true);
    expect(players.has("Jamal Crawford")).toBe(true);
    expect(players.has("Mike Miller")).toBe(true);
    expect(players.has("Shaquille O'Neal")).toBe(true);
    expect(players.has("Yao Ming")).toBe(true);
    expect(players.has("JR Smith")).toBe(true);
    expect(players.has("Tracy McGrady")).toBe(true);
    expect(players.has("Andre Miller")).toBe(true);
    expect(players.has("Klay Thompson")).toBe(true);
    expect(players.has("Josh Smith")).toBe(true);
  });

  test("Includes players that were drafted in 2025", () => {
    expect(players.has("Cooper Flagg")).toBe(true);
    expect(players.has("Kon Knueppel")).toBe(true);
    expect(players.has("VJ Edgecombe")).toBe(true);
  });
});
