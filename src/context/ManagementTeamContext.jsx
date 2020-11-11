import React, { createContext, useState, useEffect} from "react";
import { GetLineUp } from "../services/Repository/Football";


export const ManagementTeamContext = createContext();

export default function ManagementTeamProvider({ children }){

    const [teamList, setTeamList] = useState([]);

    return (
        <ManagementTeamContext.Provider
            value={
                {
                    teamList,
                    setTeamList
                }
            }
        >
            {children}
        </ManagementTeamContext.Provider>
    )
}