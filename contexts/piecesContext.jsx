import { createContext, useContext, useState, useEffect } from "react"
import { getPiecesCollection } from "../utils/firebase.utils"

const PiecesContext = createContext()

export function PiecesProvider({children}){
    const [pieces, setPieces] = useState([])

    useEffect(() => {
        setPieces(getPiecesCollection())
    }, [])

    return(
        <PiecesContext.Provider value={{pieces}}>
            {children}
        </PiecesContext.Provider>
    )
}

export default PiecesContext;
