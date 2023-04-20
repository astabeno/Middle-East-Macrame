import { useState, useContext, useEffect } from 'react'
import Image from 'next/image'
import classes from './piece.module.css'
import { Button } from '@material-tailwind/react'

import CountdownTimer from '../countdown/CountdownTimer'

import { UserContext } from '../../contexts/userContext'
import useLatestBid from '../../hooks/useLatestBid'
import useActionActive from '../../hooks/useActionActive'
import useTimestampToMils from '../../hooks/useTimestampToMils'

import { placeBid, getPieceBidCount } from '../../utils/firebase.utils'

import Input from '../form/Input'

export default function Piece({ piece }) {
   const {
      id,
      auctionEnd,
      url,
      description,
      dimensions,
      name,
      sold,
      startingBid,
   } = piece

   const { currentUser } = useContext(UserContext)

   const latestBid = useLatestBid(id)

   const [newBid, setNewBid] = useState(startingBid)
   const [highestBid, setHighestBid] = useState(startingBid)
   const [pieceBidCount, setPieceBidCount] = useState(0)
   const auctionActive = useActionActive(auctionEnd)

   useEffect(() => {
      const getBidCount = async () => {
         const count = await getPieceBidCount(id)
         setPieceBidCount(count)
      }
      setNewBid(latestBid.amount ? latestBid.amount + 1 : startingBid)
      setHighestBid(latestBid.amount ? latestBid.amount : startingBid)
      getBidCount()
   }, [latestBid.amount, highestBid])

   function handleBidChange(event) {
      const { value } = event.target
      setNewBid(value)
   }

   async function submitBid(event) {
      event.preventDefault()

      if (newBid > latestBid.amount) {
         try {
            placeBid(currentUser, piece, newBid)
         } catch (error) {
            console.error(error)
         }
      } else {
         alert('Bid Must be greater than current bid')
      }
   }

   return (
      <div className={`${classes.piece_container} shadow-2xl`}>
         <div className="relative h-[500px] w-[500px] lg:h-[1000px] lg:w-[1000px]">
            <div className="h-15 relative bg-green-500 p-2 text-center text-3xl font-extrabold text-white">
               You are Winning
            </div>
            <Image
               src={url}
               classNamen="w-full h-auto"
               width={500}
               height={500}
               sizes="100vw"
               alt={name}
            />
         </div>
         <div className="w-full space-y-3 p-3">
            <h1 className="text-center text-4xl">{name}</h1>

            <div className="rounded border border-gray-200 p-2 shadow-inner">
               <span className="text-sm text-gray-600">{description}</span>
            </div>
            <div>
               <form className="flex flex-col" onSubmit={submitBid}>
                  <div className="space-y-3">
                     {currentUser ? (
                        <Input
                           type="text"
                           name="highestBidder"
                           label="highest Bidder"
                           disabled
                           value={
                              latestBid.bidderId === currentUser.uid
                                 ? 'You are winning'
                                 : 'You are not winning'
                           }
                        />
                     ) : (
                        <></>
                     )}

                     <Input
                        type="number"
                        name="numberOfBids"
                        label="Number of Bids"
                        disabled
                        value={pieceBidCount}
                     />
                     <Input
                        type="number"
                        name="highestBid"
                        label="Highest Bid"
                        disabled
                        value={highestBid}
                     />
                     <Input
                        type="number"
                        name="bid"
                        label="New Bid"
                        id="bid"
                        onChange={handleBidChange}
                        value={newBid}
                        disabled={!auctionActive}
                     />
                  </div>
                  {auctionActive ? (
                     <div className="my-5 mx-auto">
                        {currentUser ? (
                           <Button
                              type="submit"
                              className="w-60 bg-stone-200 text-stone-700">
                              Place Bid
                           </Button>
                        ) : (
                           <Button
                              type="submit"
                              className="w-60 bg-stone-700 text-stone-400"
                              disabled>
                              Sign In to Bid
                           </Button>
                        )}
                     </div>
                  ) : (
                     <div className="my-5 mx-auto">
                        <Button
                           type="submit"
                           className="w-60 bg-stone-700 text-stone-400"
                           disabled>
                           Auction Finished
                        </Button>
                     </div>
                  )}
               </form>
               <CountdownTimer
                  targetDate={useTimestampToMils(auctionEnd)}
                  large
               />
            </div>
         </div>
      </div>
   )
}
