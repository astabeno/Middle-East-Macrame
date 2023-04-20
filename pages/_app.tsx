import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from '../contexts/userContext'
import { AuthProvider } from '../contexts/AuthContext'

import MainLayout from '../components/layouts/MainLayout'

export default function App({ Component, pageProps }: AppProps) {
   return (
      <>
         <AuthProvider>
            <UserProvider>
               <MainLayout>
                  <Component {...pageProps} />
               </MainLayout>
            </UserProvider>
         </AuthProvider>
      </>
   )
}
