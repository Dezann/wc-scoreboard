import React, { useContext, useState } from "react";
import GamesContext, { IGame } from "../../utils/context/GamesContext";
import { Alert, Button, Paper } from "@mui/material";
import "./GameCard.css";
import EditScoreDialog from "../Dialogs/EditScoreDialog/EditScoreDialog";

export default function GameCard({ game }: { game: IGame }) {
    const context = useContext(GamesContext);
    const [editScoreDialogVisibility, setEditScoreDialogVisibility] =
        useState(false);
    const { homeTeam, awayTeam, isLive, score, id, endDate } = game;
    const { games, setGames } = context;

    const endGame = () => {
        const tempGames: IGame[] = games.map((game) => {
            if (game.id === id) {
                game.isLive = false;
                game.endDate = new Date();
            }
            return game;
        });

        setGames(tempGames);
    };

    const startGame = () => {
        const tempGames: IGame[] = games.map((game) => {
            if (game.id === id && game.score === "0-0") {
                game.isLive = true;
            }

            return game;
        });

        setGames(tempGames);
    };

    const editScore = () => {
        setEditScoreDialogVisibility(true);
    };

    return (
        <>
            <Paper className="game-card">
                {isLive && <span>🔴</span>}
                <div>{`${homeTeam} ${score} ${awayTeam}`}</div>
                <div className="game-card__body">
                    {isLive && (
                        <>
                            <Button variant="contained" onClick={editScore}>
                                Edit score
                            </Button>
                            <Button variant="contained" onClick={endGame}>
                                End game
                            </Button>
                        </>
                    )}
                    {!endDate && !isLive && (
                        <Button variant="contained" onClick={startGame}>
                            Start game
                        </Button>
                    )}
                </div>
            </Paper>
            <EditScoreDialog
                score={score}
                id={id}
                open={editScoreDialogVisibility}
                setOpen={setEditScoreDialogVisibility}
            />
        </>
    );
}
