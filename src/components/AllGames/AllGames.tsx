import React, { useContext, useEffect, useState } from "react";
import TitleBox from "../TitleBox/TitleBox";
import AddMatchDialog from "../Dialogs/AddMatchDialog/AddMatchDialog";
import GamesContext from "../../utils/context/GamesContext";
import GameCard from "../GameCard/GameCard";

export default function AllGames() {
    const [dialogOpen, setDialogOpen] = useState(false);

    const context = useContext(GamesContext);

    return (
        <>
            <TitleBox
                title="All games"
                buttonText="Add game"
                buttonAction={() => {
                    setDialogOpen((state) => !state);
                }}
            >
                {context.games
                    .filter((game) => !game.isLive)
                    .map((game) => (
                        <GameCard game={game} />
                    ))}
            </TitleBox>
            <AddMatchDialog open={dialogOpen} setOpen={setDialogOpen} />
        </>
    );
}
