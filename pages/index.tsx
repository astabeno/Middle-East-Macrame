import Head from "next/head";
import Message from "../components/message/message";
import { Sansita_Swashed } from "@next/font/google";

const titleFont = Sansita_Swashed({
  weight: "400",
  subsets: ["latin"],
});

import Carousel from "../components/carousel/carousel.component";

export interface Piece {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
}

interface HomeProps {
  pieces: Piece[];
}

export default function Home({ pieces }: HomeProps) {
  return (
    <>
      <div className="site-title">
        <h1 className={titleFont.className}>Macrame By Jacob</h1>
      </div>
      <section>
        <Carousel pieces={pieces} />
      </section>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/pieces");

  const pieces = await res.json();

  return {
    props: {
      pieces,
    },
  };
}
