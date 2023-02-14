import React, { useContext, useState } from "react";
import TitleBox from "../TitleBox/TitleBox";
import AddMatchDialog from "../Dialogs/AddMatchDialog/AddMatchDialog";
import GamesContext from "../../utils/context/GamesContext";
import GameCard from "../GameCard/GameCard";

export default function AllGames() {
    const [dialogOpen, setDialogOpen] = useState(false);

    const context = useContext(GamesContext);

    const games = context.games.filter((game) => !game.endDate);
    const endedGames = context.games.filter((game) => !!game.endDate);

    return (
        <>
            <TitleBox
                title="All games"
                buttonText="Add game"
                buttonAction={() => {
                    setDialogOpen((state) => !state);
                }}
            >
                {games
                    .filter((game) => !game.isLive)
                    .map((game) => (
                        <GameCard key={game.id} game={game} />
                    ))}
                {endedGames
                    .filter((game) => !game.isLive)
                    .map((game) => (
                        <GameCard key={game.id} game={game} />
                    ))}
            </TitleBox>
            <AddMatchDialog open={dialogOpen} setOpen={setDialogOpen} />
        </>
    );
}
