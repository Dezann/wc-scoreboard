import React, { useContext } from "react";
import TitleBox from "../TitleBox/TitleBox";
import GamesContext from "../../utils/context/GamesContext";
import GameCard from "../GameCard/GameCard";

export default function LiveGames() {
    const context = useContext(GamesContext);
    const liveGames = context.games.filter((game) => !!game.isLive);
    return (
        <TitleBox title="Live games">
            {liveGames.map((game) => (
                <GameCard game={game} />
            ))}
        </TitleBox>
    );
}
