import Head from 'next/head'
import { useRouter } from 'next/router';
import Message from '../components/message/message'
import { Sansita_Swashed } from '@next/font/google';

const titleFont = Sansita_Swashed({
  weight: '400',
  subsets: ['latin']
})

import Carousel from '../components/carousel/carousel.component'

const OPTIONS = {}

export default function Home({pieces}) {
  const router = useRouter()

  return (
    <>  
        <div className="site-title">
          <h1 className={titleFont.className}>Macrame By Jacob</h1>
        </div>
        <section>
          <Carousel pieces={pieces} />
        </section>
    </>
  )
}

export async function getStaticProps (context) {
  const res = await fetch('http://localhost:3000/api/pieces')

  const pieces = await res.json()
  

  return {
        props: {
          pieces,
        }
      }
}