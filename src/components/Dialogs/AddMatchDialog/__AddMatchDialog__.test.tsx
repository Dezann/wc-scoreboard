import React, { Dispatch, SetStateAction, useContext } from "react";
import { render, fireEvent } from "@testing-library/react";
import GamesContext from "../../../utils/context/GamesContext";
import AddMatchDialog from "./AddMatchDialog";

describe("AddMatchDialog", () => {
    const gamesContext = {
        games: [],
        setGames: jest.fn(),
    };

    let setOpen: Dispatch<SetStateAction<boolean>>;
    beforeEach(() => {
        setOpen = jest.fn();
    });

    it("should render the add match dialog", () => {
        const { getByLabelText } = render(
            <AddMatchDialog open={true} setOpen={setOpen} />
        );
        expect(getByLabelText("Add match")).toBeInTheDocument();
    });

    it("should set the error for home team and away team if fields are empty", () => {
        const { getByText } = render(
            <AddMatchDialog open={true} setOpen={setOpen} />
        );
        fireEvent.click(getByText("Submit"));

        expect(getByText("Home team is required")).toBeInTheDocument();
    });

    it("should close the dialog when the cancel button is clicked", () => {
        const { getByText } = render(
            <AddMatchDialog open={true} setOpen={setOpen} />
        );
        fireEvent.click(getByText("Cancel"));
        expect(setOpen).toHaveBeenCalledWith(false);
    });

    it("should add a match to the games list when submit is clicked", () => {
        const { getByText, getByLabelText } = render(
            <GamesContext.Provider value={gamesContext}>
                <AddMatchDialog open={true} setOpen={setOpen} />
            </GamesContext.Provider>
        );
        fireEvent.change(getByLabelText("Home Team", { exact: false }), {
            target: { value: "Home Team" },
        });
        fireEvent.change(getByLabelText("Away Team", { exact: false }), {
            target: { value: "Away Team" },
        });
        fireEvent.click(getByText("Submit"));
        expect(gamesContext.setGames).toHaveBeenCalled();
        expect(setOpen).toHaveBeenCalledWith(false);
    });
});
