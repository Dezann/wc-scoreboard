import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import AllGames from "./AllGames";
import GamesContext from "../../utils/context/GamesContext";

describe("AllGames", () => {
    it("Should render title and add game button", () => {
        const { getByText } = render(<AllGames />);

        const title = getByText("All games");
        expect(title).toBeInTheDocument();

        const button = getByText("Add game");
        expect(button).toBeInTheDocument();
    });

    it("Should open addMatchDialog when add game button is clicked", () => {
        const { getByText } = render(<AllGames />);

        const button = getByText("Add game");
        fireEvent.click(button);

        const dialog = getByText("Add match");
        expect(dialog).toBeInTheDocument();
    });

    it("Should render games", async () => {
        const games = [
            {
                id: 1,
                homeTeam: "Team A",
                awayTeam: "Team B",
                isLive: false,
                dateAdded: "",
                score: "0-0",
            },
            {
                id: 2,
                homeTeam: "Team C",
                awayTeam: "Team D",
                isLive: false,
                dateAdded: "",
                score: "0-0",
            },
        ];

        const contextValues = { games };

        const { getByText } = render(
            <GamesContext.Provider value={contextValues}>
                <AllGames />
            </GamesContext.Provider>
        );

        await waitFor(() => {
            expect(getByText("Team A 0-0 Team B")).toBeInTheDocument();
            expect(getByText("Team C 0-0 Team D")).toBeInTheDocument();
        });
    });
});
