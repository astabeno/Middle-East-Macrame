import Image from "next/image"

export default function gallery({ pieces }) {

  return (
    <div>
      {pieces.map( (piece) => {
        return (
            <div key={piece.id}>
                <h2>{piece.name}</h2>
                <Image src={piece.url} height={400} width={300} />
                <span>{piece.dimensions}</span>
            </div>
        )
      })}
    </div>
  )
}

// export async function getStaticProps (context) {
//   const res = await getPiecesCollection()
//     const pieces = res.map( piece => ({
//         ...piece,
//         auctionEnd: piece.auctionEnd.toDate().toString()
//     }))

//   return {
//     props: {
//       pieces,
//     }
//   }
// }
export async function getStaticProps (context) {
  const res = await fetch('http://localhost:3000/api/pieces')

  const pieces = await res.json()
  

  return {
        props: {
          pieces,
        }
      }
}



