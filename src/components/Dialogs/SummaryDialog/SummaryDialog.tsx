import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { Dispatch, SetStateAction, useContext } from "react";
import GamesContext from "../../../utils/context/GamesContext";

type ISummaryDialog = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SummaryDialog({ open, setOpen }: ISummaryDialog) {
    const context = useContext(GamesContext);

    const endedGames = context.games.filter((game) => !!game.endDate);

    const sortableGames = endedGames.map((game) => {
        const { homeTeam, awayTeam, score, id } = game;
        const splittedScore = game.score.split("-");
        const totalScore = splittedScore
            .map((score) => Number(score))
            .reduce((item, acc) => item + acc);
        return {
            homeTeam,
            awayTeam,
            score,
            id,
            totalScore,
        };
    });

    const gamesSortedByScore = sortableGames
        .sort((a, b) => a.totalScore - b.totalScore)
        .reverse();

    const sortedByDate = gamesSortedByScore.map();

    function handleClose() {
        setOpen(false);
    }
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Matches summary"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {gamesSortedByScore.map(
                        ({ id, homeTeam, awayTeam, score }) => {
                            return (
                                <p
                                    key={id}
                                >{`${homeTeam} ${score} ${awayTeam}`}</p>
                            );
                        }
                    )}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Export data</Button>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}