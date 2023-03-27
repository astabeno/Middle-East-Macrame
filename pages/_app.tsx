import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from '../contexts/userContext'
import { PiecesProvider } from '../contexts/piecesContext'

import MainLayout from '../components/layouts/MainLayout'

export default function App({ Component, pageProps }: AppProps) {
   return (
      <>
         <UserProvider>
            <PiecesProvider>
               <MainLayout>
                  <Component {...pageProps} />
               </MainLayout>
            </PiecesProvider>
         </UserProvider>
      </>
   )
}
