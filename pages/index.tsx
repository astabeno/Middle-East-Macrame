import { Cinzel_Decorative } from '@next/font/google'
import { getPiecesCollection } from '../utils/firebase.utils'

import Carousel from '../components/carousel/Carousel'

const titleFont = Cinzel_Decorative({
   weight: '400',
   subsets: ['latin'],
})

export interface Piece {
   id: string
   name: string
   imageUrl: string
   price: number
}

interface HomeProps {
   pieces: Piece[]
}

export default function Home({ pieces }: HomeProps) {
   return (
      <>
         <div className="site-title">
            <h1 className={titleFont.className}>Middle East Macrame</h1>
         </div>
         <section>
            <Carousel pieces={pieces} />
         </section>
      </>
   )
}

export async function getStaticProps() {
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
