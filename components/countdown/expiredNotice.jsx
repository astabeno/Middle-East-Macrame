import React from 'react'

export default function ExpiredNotice() {
  return (
    <div className='text-center p-8 border border-gray-300 rounded-md my-2'>
        <span className='text-red-500 font-bold text-4xl block'>Auction Finished</span>
        <p className="text-lg">Check out our other pieces</p>
    </div>
  )
}
