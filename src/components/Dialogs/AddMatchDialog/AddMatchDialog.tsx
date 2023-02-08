import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import GamesContext from "../../../utils/context/GamesContext";

type IModal = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function AddMatchDialog({ open, setOpen }: IModal) {
    const gamesContext = useContext(GamesContext);
    const initState = {
        homeTeam: "",
        awayTeam: "",
    };
    const [formState, setFormState] = useState(initState);
    const [homeTeamError, setHomeTeamError] = useState("");
    const [awayTeamError, setAwayTeamError] = useState("");

    const handleClose = () => {
        setOpen(false);
    };

    const clearErrors = () => {
        setHomeTeamError("");
        setAwayTeamError("");
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const { homeTeam, awayTeam } = formState;
        clearErrors();

        if (!homeTeam) {
            setHomeTeamError("Home team is required");
            return;
        } else if (!awayTeam) {
            setAwayTeamError("Away team is required");
            return;
        }

        gamesContext.setGames((state) => [
            ...state,
            {
                dateAdded: new Date(),
                homeTeam,
                awayTeam,
                score: "",
            },
        ]);

        setFormState(initState);
        setOpen(false);
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add match</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please fill details of a match
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="homeTeam"
                    name="homeTeam"
                    label="Home Team"
                    error={!!homeTeamError}
                    helperText={homeTeamError}
                    value={formState.homeTeam}
                    onChange={handleInputChange}
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="awayTeam"
                    name="awayTeam"
                    value={formState.awayTeam}
                    label="Away Team"
                    type="text"
                    fullWidth
                    error={!!awayTeamError}
                    helperText={awayTeamError}
                    onChange={handleInputChange}
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}
