import React from 'react'

import DateTimeDisplay from './DateTimeDisplay'

export default function ShowCounter({ days, hours, minutes, seconds, large }) {
   const largeClassNames =
      'items-center justify-center rounded-md border bg-gray-700 border-gray-300 text-lg font-bold leading-7 text-white'

   return (
      <div className="p1">
         <p className="text m-auto text-center text-sm">Time left to bid</p>
         <div
            className={`flex py-1 text-black ${large ? largeClassNames : ''}`}>
            <DateTimeDisplay value={days} type={'Day'} isDanger={days <= 3} />

            <DateTimeDisplay value={hours} type={'Hour'} isDanger={days <= 3} />

            <DateTimeDisplay
               value={minutes}
               type={'Min'}
               isDanger={days <= 3}
            />

            <DateTimeDisplay
               value={seconds}
               type={'Sec'}
               isDanger={days <= 3}
            />
         </div>
      </div>
   )
}
