import React, { useContext } from "react";
import GamesContext, { IGame } from "../../utils/context/GamesContext";
import { Button, Paper } from "@mui/material";
import "./GameCard.css";

export default function GameCard({ game }: { game: IGame }) {
    const context = useContext(GamesContext);
    const { homeTeam, awayTeam, isLive, score, id } = game;
    const { games, setGames } = context;

    const toggleGame = () => {
        const tempGames: IGame[] = games.map((game) => {
            if (game.id === id) {
                game.isLive = !game.isLive;
            }
            return game;
        });

        setGames(tempGames);
    };

    return (
        <Paper className="game-card">
            <div>{`${homeTeam} ${score} ${awayTeam}`}</div>
            <div className="game-card__body">
                {isLive ? (
                    <>
                        <span>🔴</span>
                        <Button variant="contained">Edit score</Button>
                        <Button variant="contained" onClick={toggleGame}>
                            End game
                        </Button>
                    </>
                ) : (
                    <Button variant="contained" onClick={toggleGame}>
                        Start game
                    </Button>
                )}
            </div>
        </Paper>
    );
}
