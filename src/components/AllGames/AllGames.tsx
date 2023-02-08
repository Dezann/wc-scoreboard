import React, { useContext, useEffect, useState } from "react";
import TitleBox from "../TitleBox/TitleBox";
import AddMatchDialog from "../Dialogs/AddMatchDialog/AddMatchDialog";
import GamesContext from "../../utils/context/GamesContext";

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
                {context.games?.map((game) => (
                    <span>{`${game.homeTeam} - ${game.awayTeam}`}</span>
                ))}
            </TitleBox>
            <AddMatchDialog open={dialogOpen} setOpen={setDialogOpen} />
        </>
    );
}
