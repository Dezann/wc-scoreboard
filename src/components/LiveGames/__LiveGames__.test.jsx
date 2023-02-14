import React from "react";
import { render, waitFor } from "@testing-library/react";
import GamesContext from "../../utils/context/GamesContext";
import LiveGames from "./LiveGames";

describe("AllGames", () => {
    it("Should render title", () => {
        const { getByText } = render(<LiveGames />);

        const title = getByText("Live games");
        expect(title).toBeInTheDocument();
    });

    it("Should render live games", async () => {
        const games = [
            {
                id: 1,
                homeTeam: "Team A",
                awayTeam: "Team B",
                isLive: true,
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

        const { queryByText } = render(
            <GamesContext.Provider value={contextValues}>
                <LiveGames />
            </GamesContext.Provider>
        );

        await waitFor(() => {
            expect(queryByText("Team A 0-0 Team B")).toBeInTheDocument();
            expect(queryByText("Team C 0-0 Team D")).not.toBeInTheDocument();
        });
    });
});
