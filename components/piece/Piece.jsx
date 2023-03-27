import { useState, useContext } from 'react'
import Image from 'next/image'
import classes from './piece.module.css'
import { Button } from '@material-tailwind/react'

import { placeBid } from '../../utils/firebase.utils'

import CountdownTimer from '../countdown/CountdownTimer'
import { UserContext } from '../../contexts/userContext'
import Input from '../form/Input'

export default function Piece({ piece }) {
   const {
      auctionEnd,
      currentBid,
      dimensions,
      name,
      sold,
      highestBidder,
      startingBid,
   } = piece

   const { currentUser } = useContext(UserContext)

   const [bidAmount, setBidAmount] = useState(currentBid)
   const [newBid, setNewBid] = useState(bidAmount + 5)

   function isCurrent(date) {
      return Date.parse(date) > new Date()
   }

   function handleBidChange(event) {
      const { value } = event.target
      setNewBid(value)
   }

   async function submitBid(event) {
      event.preventDefault()
      const newBidNumber = Number(newBid)
      if (newBid >= bidAmount + 5) {
         setBidAmount(newBidNumber)
         piece.currentBid = newBidNumber
         await placeBid(currentUser, piece, newBidNumber)
      } else {
         alert('Bid Must be greater than current bid')
      }
   }

   return (
      <div className={classes.piece_container}>
         <Image src={piece.url} width={500} height={0} alt="" />
         <div className="w-full space-y-3 p-3">
            <h1 className="text-center text-4xl">{piece.name}</h1>
            <CountdownTimer targetDate={auctionEnd} large />
            <div>
               <span>Highest Bidder: {highestBidder}</span>
            </div>
            <div>
               <form className="flex flex-col" onSubmit={submitBid}>
                  <div className="space-y-3">
                     <Input
                        type="number"
                        name="currentBid"
                        label="Current Bid"
                        disabled
                        value={bidAmount}
                     />
                     <Input
                        type="number"
                        name="bid"
                        label="Your Bid"
                        id="bid"
                        onChange={handleBidChange}
                        value={newBid}
                        disabled={!isCurrent(auctionEnd)}
                     />
                  </div>
                  {isCurrent(auctionEnd) ? (
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
            </div>
         </div>
      </div>
   )
}
