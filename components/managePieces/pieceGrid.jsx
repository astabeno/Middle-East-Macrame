import React from 'react'
import Image from 'next/image'
import CountdownTimer from '../countdown/CountdownTimer'

export default function PieceGrid({ pieces }) {
   function selectHandler(id) {
      console.log(`piece with id ${id} was selected`)
   }
   return (
      <div className="m-5 rounded-xl bg-white p-5 shadow-lg">
         <div className="mb-3 text-center text-4xl">
            <h1>Piece Manager</h1>
         </div>
         <hr />
         <div className="m-5 space-y-2">
            {pieces.map((piece) => {
               const { name, auctionEnd, bids, url, id } = piece
               const numberOfBids = bids ? bids.length : 0
               return (
                  <>
                     <div
                        className="grid h-20 grid-cols-4 border-b bg-slate-100
                                    hover:translate-x-1 hover:translate-y-1 hover:shadow-md"
                        onClick={() => {
                           selectHandler(id)
                        }}>
                        <div>
                           <Image src={url} width={50} height={50} />
                        </div>
                        <div>{name}</div>
                        <div>
                           <CountdownTimer targetDate={auctionEnd} />
                        </div>
                        <div>{numberOfBids}</div>
                     </div>
                  </>
               )
            })}
         </div>
      </div>
   )
}
