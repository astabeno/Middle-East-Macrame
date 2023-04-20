import Image from 'next/image'
import Link from 'next/link'

export default function PieceThumb({ piece }) {
   return (
      <Link href={`/pieces/${piece.id}`}>
         <div className="m-5 rounded border border-transparent shadow-lg">
            <div className="relative rounded-t-lg">
               <Image src={piece.url} alt={piece.name} height={1} width={250} />
            </div>
            <div className="h-10 rounded-b-lg bg-gray-800 pt-2 text-center text-white">
               {piece.name}
            </div>
         </div>
      </Link>
   )
}
