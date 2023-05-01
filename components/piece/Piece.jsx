import { useState, useContext, useEffect } from 'react'
import Image from 'next/image'
import classes from './piece.module.css'
import { Button } from '@material-tailwind/react'

import CountdownTimer from '../countdown/CountdownTimer'
import PieceBidImage from './PieceBidImage'
import BidForm from './BidForm'
import Input from '../form/Input'

import { UserContext } from '../../contexts/userContext'
import useLatestBid from '../../hooks/useLatestBid'
import useActionActive from '../../hooks/useActionActive'
import useTimestampToMils from '../../hooks/useTimestampToMils'

import { placeBid, getPieceBidCount } from '../../utils/firebase.utils'

import { Cinzel_Decorative, David_Libre } from '@next/font/google'

const titleFont = Cinzel_Decorative({
   weight: '400',
   subsets: ['latin'],
})

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
      <div
         className=" mx-auto mb-5 flex w-full flex-col overflow-hidden
                     rounded-lg bg-white shadow-2xl sm:max-w-lg  sm:flex-col 
                     md:max-w-2xl md:flex-row lg:max-w-3xl lg:flex-row xl:flex-row">
         <div className="xl:6/12  md:w-6/12 lg:w-6/12">
            <PieceBidImage piece={piece} auctionActive={auctionActive} />
         </div>
         <div className="xl:6/12 p-8  md:w-6/12 lg:w-6/12">
            <h1
               className={`${titleFont.className} w-full text-center text-2xl`}>
               {piece.name}
            </h1>
            <BidForm piece={piece} auctionActive={auctionActive} />
         </div>
      </div>
   )
}
