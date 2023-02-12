import React, { useContext, useMemo } from "react";
import GamesContext from "../context/GamesContext";

export default function useSummary() {
    const context = useContext(GamesContext);

    const endedGames = context.games.filter((game) => !!game.endDate);
    
    const sortableGames = useMemo(
        () =>
            endedGames.map((game) => {
                const { homeTeam, awayTeam, score, id, dateAdded } = game;
                const splittedScore = game.score.split("-");
                const totalScore = splittedScore
                    .map((score) => Number(score))
                    .reduce((item, acc) => item + acc);
                return {
                    dateAdded,
                    homeTeam,
                    awayTeam,
                    score,
                    id,
                    totalScore,
                };
            }),
        [endedGames]
    );

    const gamesSortedByDate = useMemo(
        () =>
            sortableGames
                .sort((a, b) => a.dateAdded.getTime() - b.dateAdded.getTime())
                .reverse(),
        [sortableGames]
    );

    const gamesSortedByScore = useMemo(
        () =>
            gamesSortedByDate
                .sort((a, b) => a.totalScore - b.totalScore)
                .reverse(),
        [gamesSortedByDate]
    );
    return gamesSortedByScore;
}
