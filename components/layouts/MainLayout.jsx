import Navbar from '../navbar/Navbar'
import Message from '../message/Message'
import { useRouter } from 'next/router'

import { Inter } from '@next/font/google'

const murecho = Inter({
   weight: '400',
   subsets: ['latin'],
})

export default function MainLayout({ children }) {
   const router = useRouter()
   const { message } = router.query
   return (
      <div className={`page-layout h-screen ${murecho.className}`}>
         <Navbar />
         {message ? <Message text={message} /> : <></>}
         <div className="">{children}</div>

         {/* Footer if needed */}
         {/* Anything Else to be on all pages */}
      </div>
   )
}
