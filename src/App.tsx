import { ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import Scoreboard from "./views/Scoreboard/Scoreboard";
import { useState } from "react";
import GamesContext, { IGame } from "./utils/context/GamesContext";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

function App() {
    const [games, setGames] = useState<IGame[]>([]);

    return (
        <ThemeProvider theme={darkTheme}>
            <GamesContext.Provider value={{games, setGames}}>
                <div className="App">
                    <Scoreboard />
                </div>
            </GamesContext.Provider>
        </ThemeProvider>
    );
}

export default App;
