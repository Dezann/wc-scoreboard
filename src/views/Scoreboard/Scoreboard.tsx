import React, { useContext, useEffect } from "react";
import GamesContext from "../../utils/context/GamesContext";
import AllGames from "../../components/AllGames/AllGames";
import LiveGames from "../../components/LiveGames/LiveGames";
import "./scoreboard.css";
import Summary from "../../components/Summary/Summary";

export default function Scoreboard() {
    return (
        <div className="scoreboard-wrapper">
            <section className="games-wrapper">
                <AllGames />
                <LiveGames />
            </section>
            <Summary />
        </div>
    );
}
