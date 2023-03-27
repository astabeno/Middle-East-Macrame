import React from 'react'

import PieceGrid from '../../../components/managePieces/pieceGrid'

export default function managePieces({ pieces }) {
   return (
      <div className="h-screen w-screen">
         <PieceGrid pieces={pieces} />
      </div>
   )
}

export async function getServerSideProps() {
   const res = await fetch('http://localhost:3000/api/pieces')

   const pieces = await res.json()

   return {
      props: {
         pieces,
      },
   }
}
