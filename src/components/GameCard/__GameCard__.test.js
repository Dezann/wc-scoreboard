import React from "react";
import { render, fireEvent } from "@testing-library/react";
import GameCard from "./GameCard";
import GamesContext from "../../utils/context/GamesContext";

describe("GameCard component", () => {
    const game = {
        homeTeam: "Home",
        awayTeam: "Away",
        isLive: false,
        score: "0-0",
        id: 1,
    };

    it("should display the correct score", () => {
        const { getByText } = render(
            <GamesContext.Provider value={{ games: [game] }}>
                <GameCard game={game} />
            </GamesContext.Provider>
        );

        expect(getByText("Home 0-0 Away")).toBeInTheDocument();
    });

    it("should display the Start game button if the game is not live and score is 0-0", () => {
        const { getByText } = render(
            <GamesContext.Provider value={{ games: [game] }}>
                <GameCard game={game} />
            </GamesContext.Provider>
        );

        expect(getByText("Start game")).toBeInTheDocument();
    });

    it("should display the End game button if the game is live and score is not 0-0", () => {
        game.isLive = true;
        game.score = "1-0";

        const { getByText } = render(
            <GamesContext.Provider value={{ games: [game] }}>
                <GameCard game={game} />
            </GamesContext.Provider>
        );

        expect(getByText("🔴")).toBeInTheDocument();
        expect(getByText("Edit score")).toBeInTheDocument();
        expect(getByText("End game")).toBeInTheDocument();
    });

    it("should call the setGames function when the End game button is clicked", () => {
        const setGames = jest.fn();
        game.isLive = true;
        game.score = "1-0";

        const { getByText } = render(
            <GamesContext.Provider
                value={{ games: [game], setGames: setGames }}
            >
                <GameCard game={game} />
            </GamesContext.Provider>
        );

        fireEvent.click(getByText("End game"));

        expect(setGames).toHaveBeenCalled();
    });
});
