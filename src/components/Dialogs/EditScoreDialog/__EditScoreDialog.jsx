import { render, screen, fireEvent } from "@testing-library/react";
import GamesContext from "../../../utils/context/GamesContext";
import EditScoreDialog from "./EditScoreDialog";

describe("EditScoreDialog", () => {
    const gamesContext = {
        games: [],
        setGames: jest.fn(),
    };

    it("should render the dialog with correct title", () => {
        render(
            <GamesContext.Provider value={gamesContext}>
                <EditScoreDialog
                    score="0-0"
                    id="1"
                    open={true}
                    setOpen={jest.fn()}
                />
            </GamesContext.Provider>
        );

        const dialogTitle = screen.getByText("Edit match score");

        expect(dialogTitle).toBeInTheDocument();
    });

    it("should update game score and close the dialog on submit", () => {
        const setOpen = jest.fn();
        render(
            <GamesContext.Provider value={gamesContext}>
                <EditScoreDialog
                    score="0-0"
                    id="1"
                    open={true}
                    setOpen={setOpen}
                />
            </GamesContext.Provider>
        );

        const homeTeamScoreInput = screen.getByLabelText("Home Team");
        const awayTeamScoreInput = screen.getByLabelText("Away Team");
        const submitButton = screen.getByRole("button", { name: "Submit" });

        fireEvent.change(homeTeamScoreInput, { target: { value: "2" } });
        fireEvent.change(awayTeamScoreInput, { target: { value: "1" } });
        fireEvent.click(submitButton);

        expect(gamesContext.updateGame).toHaveBeenCalledWith("1", "2-1");
        expect(setOpen).toHaveBeenCalledWith(false);
    });
});
