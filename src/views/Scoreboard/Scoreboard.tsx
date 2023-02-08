import React, { useContext } from "react";
import GamesContext from "../../utils/context/GamesContext";
import AllGames from "../../components/AllGames/AllGames";
import LiveGames from "../../components/LiveGames/LiveGames";
import "./scoreboard.css"

export default function Scoreboard() {
    const context = useContext(GamesContext);

    return (
        <div className="scoreboard-wrapper">
            <AllGames />
            <LiveGames />
        </div>
    );
}
