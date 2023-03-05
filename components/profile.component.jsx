import { useContext } from 'react'
import { UserContext } from '../contexts/userContext'
import useUSDate from '../hooks/useUSDate'

export default function ProfileComponent() {
    const { currentUser, setCurrentUser  } = useContext( UserContext )
    const { displayName, email, createdAt, bids } = currentUser
    const initialsMatch = displayName.match(/\b(\w)/g)
    const initials = initialsMatch.join('')

    const dateSignedup = useUSDate(createdAt.toDate())
    const numberOfBids = bids.length


  return (
    <div className='container p-8 w-3/4 rounded-md justify bg-white m-auto shadow-2xl'>
        <h1 className='text-center text-4xl'>{displayName}</h1>
        <hr className='my-5'/>
        <div className='flex flex-row'>
            <div className='w-1/3 flex flex-col'>
                <div className='mb-6'>
                    <span 
                        className='inline-block h-28 w-28 mx-auto bg-black text-white
                                   text-6xl rounded-full text-center align-middle'
                                     style={{display: 'flex', justifyContent: 'center', 
                                             alignItems: 'center'}}>
                        {initials}
                    </span>
                </div>
                <div className='flex flex-col text-center px-10'>
                    <span className='text-neutral-600 text'>Member Since  </span>
                    <span className='mb-3 text-sm text-blue-500'>{dateSignedup}</span>
                    <span className='text-neutral-600 text-lg font-thin'>Bids </span>
                    <span className='mb-3 text-blue-500 text-sm'>{numberOfBids}</span>
                    <div className='flex flex-row justify-between'>
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
            <div className='w-2/3 flex flex-col'>
                <div className='border border-gray-300 flex flex-col p-4'>
                    <div className='flex mb-3'>
                        <label className='mt-2 mr-4'
                            htmlFor="email">Email address:</label>
                        <input className="border-b border-gray-400 w-2/3  text-gray-600"
                            type="email" 
                            name="email" 
                            id="email" 
                            value={email}/>
                    </div>
                    <div className='flex mb-3'>
                        <label className='mt-2 mr-4'
                            htmlFor="displayName">Display Name:</label>
                        <input className="border-b border-gray-400 w-2/3  text-gray-600"
                            type="text" 
                            name="displayName" 
                            id="displayName" 
                            value={displayName}/>
                    </div>
                </div>
                <form className='passwords flex flex-col p-4 bg-gray-300'>
                    <div className='flex mb-3'>
                        <label className='mt-2 w-44'
                            htmlFor="currentPassword">Current Password:</label>
                        <input className="border-b border-gray-400 w-2/3"
                            type="password" 
                            name="currentPassword" 
                            id="currentPassword" />
                    </div>
                    <div className='flex mb-3'>
                        <label className='mt-2  w-44'
                            htmlFor="password">New Password:</label>
                        <input className="border-b border-gray-400 w-2/3"
                            type="password" 
                            name="password" 
                            id="password" />
                    </div>
                    <div className='flex mb-3'>
                        <label className='mt-2  w-44'
                            htmlFor="confirmPassword">Confirm Password:</label>
                        <input className="border-b border-gray-400 w-2/3"
                            type="password" 
                            name="confirmPassword" 
                            id="confirmPassword" />
                    </div>
                    <button className='bg-black text-white w-28 mt-5 rounded-md p-3 shadow-xl'
                            >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}
