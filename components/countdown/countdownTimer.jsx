import React from 'react'
import { useCountdown } from '../../hooks/useCountdown'

import ExpiredNotice from './ExpiredNotice'
import ShowCounter from './ShowCounter'

export default function CountdownTimer({ targetDate, large }) {
   const [days, hours, minutes, seconds] = useCountdown(targetDate)

   if (days + hours + minutes + seconds <= 0) {
      return <ExpiredNotice large={large} />
   }
   return (
      <ShowCounter
         large={large}
         days={days}
         hours={hours}
         minutes={minutes}
         seconds={seconds}
      />
   )
}
