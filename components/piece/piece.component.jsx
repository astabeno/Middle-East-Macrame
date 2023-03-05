import {useState, useContext} from 'react'
import Image from 'next/image'
import classes from './piece.module.css'
import { Button } from '@material-tailwind/react'

import { placeBid, addBidForUser } from '../../utils/firebase.utils'

import CountdownTimer from '../countdown/countdownTimer'
import  { UserContext } from '../../contexts/userContext'


export default function Piece({piece}) {
  const { auctionEnd,
          currentBid,
          dimensions,
          name,
          sold,
          highestBidder,
          startingBid,} = piece

  const { currentUser  } = useContext( UserContext )

  const [bidAmount, setBidAmount] = useState(currentBid)
  const [newBid, setNewBid] = useState(bidAmount + 5)

  function handleBidChange(event){
    const { value } = event.target
    setNewBid(value)
  }

  async function submitBid(event) {
    event.preventDefault()
    const newBidNumber = Number(newBid)
    if (newBid >= bidAmount + 5 ) {
      setBidAmount(newBidNumber)
      piece.currentBid = newBidNumber
        await placeBid(
          currentUser,
          piece,
          newBidNumber,
        )
    } else {
      alert( 'Bid Must be greater than current bid' )
    }
  }
 
  return (
    <div className={classes.piece_container}>
        <Image src={piece.url} width={800} height={0} alt="" />
        <div className={classes.piece_info_container}>
            <CountdownTimer targetDate={auctionEnd}/>
            <h1>{piece.name}</h1>
            <div>
              <h2>Details</h2>
              <ul>
                <li>{
                    (highestBidder) ? `Highest Bidder: ${highestBidder}`
                      : 'No Bids Yet'
                     }</li>
                <li>Dimensions: {piece.dimensions}</li>
                <li>Colors: </li>
              </ul>
            </div>
            <div>
              <form className='flex flex-col' onSubmit={submitBid}>
                <div>
                  <label>Current Bid: </label><span>{bidAmount}</span>
                </div>
                <div>
                  <label htmlFor="">New Bid Ammount: </label>
                  <input type="number" 
                         name="bid" 
                         id="bid"
                         onChange={handleBidChange}
                         defaultValue={newBid}/>
                </div>
                {
                  (currentUser) ? (
                    <Button type="submit" 
                            className='bg-stone-700'
                    >
                      Place Bid
                    </Button>
                  ):
                  (
                    <Button type="submit" 
                            className='bg-stone-700'
                            disabled
                    >
                      Place Bid
                    </Button>
                  )
                }
              </form>
          </div>  
        </div>
    </div>
  )
}
