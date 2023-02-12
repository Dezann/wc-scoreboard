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
import React, {
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useMemo,
} from "react";
import GamesContext from "../../../utils/context/GamesContext";
import useSummary from "../../../utils/hooks/useSummary";

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
    const games = useSummary();

    useEffect(() => {
        if (!games.length) {
            handleClose()
        }
    }, [games])

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
                    {games.map(({ id, homeTeam, awayTeam, score }) => {
                        return (
                            <p key={id}>{`${homeTeam} ${score} ${awayTeam}`}</p>
                        );
                    })}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
