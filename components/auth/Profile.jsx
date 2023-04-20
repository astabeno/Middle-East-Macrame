import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/userContext'
import useUSDate from '../../hooks/useUSDate'
import { getUserBidCount } from '../../utils/firebase.utils'

import Input from '../form/Input'

export default function ProfileComponent() {
   const { currentUser } = useContext(UserContext)
   const [userBidCount, setUserBidCount] = useState(0)

   const { displayName, userType, createdAt, email, numberOfBids, uid } =
      currentUser

   const initialsMatch = displayName.match(/\b(\w)/g)
   const initials = initialsMatch.join('')

   useEffect(() => {
      const getBidCount = async () => {
         const count = await getUserBidCount(uid)
         setUserBidCount(count)
      }
      getBidCount()
   })

   const dateSignedup = useUSDate(createdAt.toDate())

   //const bidCount = useUserBidCount(currentUser.uid)

   return (
      <div className="justify container m-auto w-3/4 rounded-md bg-white p-8 shadow-2xl">
         <h1 className="text-center text-4xl">{displayName}</h1>
         {userType === 'admin' ? (
            <p className="fon text-center">{userType}</p>
         ) : (
            <p>bidder</p>
         )}
         <hr className="my-5" />
         <div className="flex flex-row">
            <div className="flex w-1/3 flex-col">
               <div className="mb-6">
                  <span
                     className="mx-auto inline-block h-28 w-28 rounded-full bg-black
                                   text-center align-middle text-6xl text-white"
                     style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                     }}>
                     {initials}
                  </span>
               </div>
               <div className="flex flex-col px-10 text-center">
                  <span className="text text-neutral-600">Member Since </span>
                  <span className="mb-3 text-sm text-blue-500">
                     {dateSignedup}
                  </span>
                  <span className="text-lg font-thin text-neutral-600">
                     Bids{' '}
                  </span>
                  <span className="mb-3 text-sm text-blue-500">
                     {userBidCount}
                  </span>
                  <div className="flex flex-row justify-between">
                     <div>
                        <p>Active</p>
                        <span>2</span>
                     </div>
                     <div>
                        <p>Won</p>
                        <span>0</span>
                     </div>
                     <div>
                        <p>Out Bid</p>
                        <span>0</span>
                     </div>
                  </div>
               </div>
            </div>
            <div className="flex w-2/3 flex-col">
               <div className="flex flex-col border border-gray-300 p-4">
                  <div className="mb-3 flex">
                     <label className="mt-2 mr-4" htmlFor="email">
                        Email address:
                     </label>
                     <Input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                     />
                  </div>
                  <div className="mb-3 flex">
                     <label className="mt-2 mr-4" htmlFor="displayName">
                        Display Name:
                     </label>
                     <input
                        className="w-2/3 border-b border-gray-400  text-gray-600"
                        type="text"
                        name="displayName"
                        id="displayName"
                        value={displayName}
                     />
                  </div>
               </div>
               <form className="passwords flex flex-col bg-gray-300 p-4">
                  <div className="mb-3 flex">
                     <label className="mt-2 w-44" htmlFor="currentPassword">
                        Current Password:
                     </label>
                     <input
                        className="w-2/3 border-b border-gray-400"
                        type="password"
                        name="currentPassword"
                        id="currentPassword"
                     />
                  </div>
                  <div className="mb-3 flex">
                     <label className="mt-2  w-44" htmlFor="password">
                        New Password:
                     </label>
                     <input
                        className="w-2/3 border-b border-gray-400"
                        type="password"
                        name="password"
                        id="password"
                     />
                  </div>
                  <div className="mb-3 flex">
                     <label className="mt-2  w-44" htmlFor="confirmPassword">
                        Confirm Password:
                     </label>
                     <input
                        className="w-2/3 border-b border-gray-400"
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                     />
                  </div>
                  <button className="mt-5 w-28 rounded-md bg-black p-3 text-white shadow-xl">
                     Submit
                  </button>
               </form>
            </div>
         </div>
      </div>
   )
}
