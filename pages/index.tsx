import { useContext, useEffect } from 'react'
import { Sansita_Swashed } from '@next/font/google'
import { app, getPiecesCollection } from '../utils/firebase.utils'
import { AuthContext } from '../contexts/AuthContext'

import Carousel from '../components/carousel/Carousel'

const titleFont = Sansita_Swashed({
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
            <h1 className={titleFont.className}>Macrame By Jacob</h1>
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
