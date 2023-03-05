import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {UserProvider} from '../contexts/userContext'
import { PiecesProvider } from '../contexts/piecesContext'


import Layout from './layout'


export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <UserProvider>
        <PiecesProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PiecesProvider>
      </UserProvider>
    </>
  )
}