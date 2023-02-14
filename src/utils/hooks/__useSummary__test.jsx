import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import GamesContext from "../context/GamesContext";
import useSummary from "./useSummary";

const games = [
  {
    id: 1,
    homeTeam: "Team A",
    awayTeam: "Team B",
    score: "3-1",
    dateAdded: new Date("2022-01-01"),
    endDate: new Date("2022-01-02"),
  },
  {
    id: 2,
    homeTeam: "Team C",
    awayTeam: "Team D",
    score: "2-2",
    dateAdded: new Date("2022-01-02 13:00"),
    endDate: new Date("2022-01-03 14:00"),
  },
  {
    id: 2,
    homeTeam: "Team C",
    awayTeam: "Team D",
    score: "2-2",
    dateAdded: new Date("2022-01-02 12:00"),
    endDate: new Date("2022-01-03 13:00"),
  },
];

describe("useSummary", () => {
  it("should return an empty array when there are no ended games", () => {
    const gamesContext = {
      games: [],
    };

    const { result } = renderHook(() => useSummary(), {
      wrapper: ({ children }) => (
        <GamesContext.Provider value={gamesContext}>
          {children}
        </GamesContext.Provider>
      ),
    });

    expect(result.current).toEqual([]);
  });

  it("should return the games sorted by total score", () => {
    const gamesContext = {
      games: games,
    };

    const { result } = renderHook(() => useSummary(), {
      wrapper: ({ children }) => (
        <GamesContext.Provider value={gamesContext}>
          {children}
        </GamesContext.Provider>
      ),
    });

    expect(result.current).toEqual([
      {
        id: 1,
        homeTeam: "Team A",
        awayTeam: "Team B",
        score: "3-1",
        dateAdded: new Date("2022-01-01"),
        totalScore: 4,
      },
      {
        id: 2,
        homeTeam: "Team C",
        awayTeam: "Team D",
        score: "2-2",
        dateAdded: new Date("2022-01-02 12:00"),
        endDate: new Date("2022-01-03 13:00"),
      },
      {
        id: 2,
        homeTeam: "Team C",
        awayTeam: "Team D",
        score: "2-2",
        dateAdded: new Date("2022-01-02 13:00"),
        endDate: new Date("2022-01-03 14:00"),
      },
    ]);
  });
});