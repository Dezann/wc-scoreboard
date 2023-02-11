import React, { Dispatch, SetStateAction, createContext } from "react";

export type IGame = {
    id: string;
    dateAdded: Date;
    homeTeam: string;
    awayTeam: string;
    score: string; //0-0 format homeTeam - awayTeam
    isLive: boolean;
  }
  
type IGamesContext = {
    games: IGame[];
    setGames: Dispatch<SetStateAction<IGame[]>>;
}


const GamesContext = createContext<IGamesContext>({
    games: [],
    setGames: () => {},
});

export default GamesContext;