// import pieceList from '../../data/pieces.json'

import Piece from '../../../components/piece/Piece'

export default function PieceInfo({ piece }) {
   return (
      <div className="centered">
         <Piece piece={piece} />
      </div>
   )
}

export async function getStaticPaths() {
   const res = await fetch('https://www.middleeastmacrame.com/api/pieces')
   const pieces = await res.json()

   const paths = pieces.map((piece) => ({
      params: { id: piece.id },
   }))

   return {
      paths,
      fallback: 'blocking',
   }
}

export async function getStaticProps(context) {
   const res = await fetch(
      `https://www.middleeastmacrame.com/api/pieces/${context.params.id}`
   )
   const piece = await res.json()

   return { props: { piece }, revalidate: 10 }
}
