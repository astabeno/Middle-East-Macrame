import React from 'react'

import DateTimeDisplay from './DateTimeDisplay'

export default function ShowCounter({ days, hours, minutes, seconds, large }) {
   const largeClassNames =
      'items-center justify-center rounded-md border border-gray-300 text-lg font-bold leading-7 text-black hover:bg-gray-200'

   return (
      <div className="p2">
         <div
            className={`flex py-2 px-4 text-black ${
               large ? largeClassNames : ''
            }`}>
            <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
            <p>:</p>
            <DateTimeDisplay
               value={hours}
               type={'Hours'}
               isDanger={days <= 3}
            />
            <p>:</p>
            <DateTimeDisplay
               value={minutes}
               type={'Mins'}
               isDanger={days <= 3}
            />
            <p>:</p>
            <DateTimeDisplay
               value={seconds}
               type={'Seconds'}
               isDanger={days <= 3}
            />
         </div>
      </div>
   )
}
