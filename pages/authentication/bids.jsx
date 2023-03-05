import {useContext} from 'react'

import { UserContext } from '../../contexts/userContext'
import useUSDate from '../../hooks/useUSDate'
import useFormatTime from '../../hooks/useFormatTime'


export default function Bids() {
    const {currentUser} = useContext(UserContext)
    const { bids, displayName } = currentUser
    return (
        <div>
        <h1>Bids for {displayName}</h1>
        {
            (bids) ?
                currentUser.bids.map(bid => {
                return (
                    <p>{bid.pieceName} - amount: {bid.bidAmount} -
                        Date: {useUSDate(bid.bidTime.toDate())} -
                        Time: {useFormatTime(bid.bidTime.toDate())}
                        `
                    </p>
                    )
            }) 
                :
                <p>You haven't bid on anything</p>
        }

        </div>
    )
}
