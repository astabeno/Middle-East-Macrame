import { useState, useEffect } from 'react'

import PieceGrid from '../../../components/managePieces/pieceGrid'
import { getPiecesCollection } from '../../../utils/firebase.utils'

export default function ManagePieces() {
   const [pieces, setPieces] = useState([])

   useEffect(() => {
      const getPieces = async () => {
         const piecesCollection = await getPiecesCollection()
         setPieces(piecesCollection)
      }
      getPieces()
   }, [])

   console.log(pieces)

   return (
      <div className="h-screen w-screen">
         {pieces.length > 0 && <PieceGrid pieces={pieces} />}
      </div>
   )
}
