import Navbar from '../navbar/Navbar'
import Footer from './Footer'
import Message from '../message/Message'
import { useRouter } from 'next/router'

export default function MainLayout({ children }) {
   const router = useRouter()
   const { message } = router.query
   return (
      <div className="flex h-screen flex-col justify-between">
         <Navbar />
         {message ? <Message text={message} /> : <></>}
         <div className="">{children}</div>

         {/* Footer if needed */}
         {/* Anything Else to be on all pages */}
         <Footer />
      </div>
   )
}
