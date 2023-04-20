import PieceThumb from '../components/piece/PieceThumb'
import { getPiecesCollection } from '../utils/firebase.utils'

export default function gallery({ pieces }) {
   return (
      <div className="flex flex-wrap">
         {pieces.map((piece) => {
            return <PieceThumb piece={piece} />
         })}
      </div>
   )
}

export async function getStaticProps(context) {
   const piecesCollection = await getPiecesCollection()
   console.log(piecesCollection)
   const pieces = piecesCollection.map((piece) => {
      if (!piece.dateUpdated) {
         return {
            ...piece,
            auctionEnd: piece.auctionEnd.toMillis(),
            dateAdded: piece.dateAdded.toMillis(),
         }
      }

      return {
         ...piece,
         auctionEnd: piece.auctionEnd.toMillis(),
         dateAdded: piece.dateAdded.toMillis(),
         dateUpdated: piece.dateUpdated?.toMillis(),
      }
   })

   return {
      props: {
         pieces,
      },
   }
}
