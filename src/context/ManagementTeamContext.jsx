import React, { createContext, useState, useEffect} from "react";
import { GetLineUp } from "../services/Repository/Football";


export const ManagementTeamContext = createContext();

export default function ManagementTeamProvider({ children }){

    const [teamList, setTeamList] = useState([]);
    const [ageAvg, setAgeAvg ] = useState([])
    const [allPlayer , setAllPlayer] = useState([])

    return (
        <ManagementTeamContext.Provider
            value={
                {
                    teamList,
                    setTeamList,

                    ageAvg,
                    setAgeAvg,

                    allPlayer,
                    setAllPlayer
                }
            }
        >
            {children}
        </ManagementTeamContext.Provider>
    )
}