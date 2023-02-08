import React, { Dispatch, SetStateAction, createContext } from "react";

export type IGame = {
    dateAdded: Date;
    homeTeam: string;
    awayTeam: string;
    score: string; //0-0 format
  }
  
type IGamesContext = {
    games: IGame[] | null;
    setGames: Dispatch<SetStateAction<IGame[]>>;
}


const GamesContext = createContext<IGamesContext>({
    games: null,
    setGames: () => {},
});

export default GamesContext;