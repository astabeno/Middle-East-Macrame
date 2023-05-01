import React from 'react'
import Image from 'next/image'
import CountdownTimer from '../countdown/CountdownTimer'

import useTimestampToMils from '../../hooks/useTimestampToMils'

export default function PieceBidImage({ piece, auctionActive }) {
   const { auctionEnd, highestBid, url, name } = piece

   return (
      <div className="relative">
         {auctionActive ? (
            <div
               className="relative w-auto bg-stone-500 p-2 
                            text-center text-2xl text-white">
               <CountdownTimer
                  targetDate={useTimestampToMils(auctionEnd)}
                  large
               />
            </div>
         ) : (
            <div className="relative bg-stone-500 p-2 text-center text-3xl font-extrabold text-white">
               Piece Sold for ${highestBid}
            </div>
         )}
         <Image
            src={url}
            width={400}
            height={400}
            alt={name}
            className="mx-auto"
         />
      </div>
   )
}
