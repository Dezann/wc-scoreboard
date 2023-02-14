import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button,
} from "@mui/material";
import React, {
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import GamesContext from "../../../utils/context/GamesContext";

type IEditScoreDialog = {
    score: string;
    id: string;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function EditScoreDialog({
    score,
    id,
    open,
    setOpen,
}: IEditScoreDialog) {
    const gamesContext = useContext(GamesContext);
    const initState = {
        homeTeamScore: 0,
        awayTeamScore: 0,
    };
    const [formState, setFormState] = useState(initState);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setInitalScore();
    }, [score]);

    function setInitalScore() {
        const splittedScore = score.split("-");

        setFormState({
            homeTeamScore: Number(splittedScore[0]),
            awayTeamScore: Number(splittedScore[1]),
        });
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const { homeTeamScore, awayTeamScore } = formState;

        gamesContext.games.map((game) => {
            if (game.id === id) {
                game.score = `${homeTeamScore}-${awayTeamScore}`;
            }
            return game;
        });
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
            <DialogTitle>Edit match score</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="homeTeam"
                    name="homeTeamScore"
                    label="Home Team"
                    value={formState.homeTeamScore}
                    onChange={handleInputChange}
                    type="number"
                    fullWidth
                    variant="standard"
                    InputProps={{ inputProps: { min: 0, max: 50 } }}
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="awayTeam"
                    name="awayTeamScore"
                    value={formState.awayTeamScore}
                    type="number"
                    label="Away Team"
                    fullWidth
                    onChange={handleInputChange}
                    variant="standard"
                    InputProps={{ inputProps: { min: 0, max: 50 } }}
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
