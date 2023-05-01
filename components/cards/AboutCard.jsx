import Image from 'next/image'

export default function AboutCard() {
   return (
      <div className="m-0 w-full">
         <div className="about-middleeastmacrame flex border-8 border-gray-700">
            <Image
               className="right-0 w-2/3"
               cover
               src="/macrameBackground.webp"
               alt="image"
               width={600}
               height={800}
            />
            <div className="writing w-1/3 bg-gray-700 p-5">
               <h4
                  className="title mb-4 text-center text-2xl font-extrabold 
                              tracking-tight text-stone-300">
                  About Middle East Macrame
               </h4>
               <p className="text mb-2 leading-normal text-white">
                  Welcome to our online store featuring beautiful and unique
                  macrame products Jacob made in the Middle East! Macrame has
                  ancient origins in the Middle East. It's been used for
                  decoration and clothing for thousands of years. While living
                  in The Middle East the Stabeno so this art on walls of cafes.
                  Jacob was inspired by the art he saw and decided to make his
                  own.
               </p>
               <p className="text mb-2 leading-normal text-white">
                  Jacob creates stunning macrame pieces, from wall hangings to
                  plant hangers and more. Each piece is made with care and
                  attention to detail, highlighting the rich cultural heritage
                  of macrame in the Middle East. Browse our collection and add a
                  touch of style to your home or office today!
               </p>
            </div>
         </div>

         <div className="flex border-8 border-gray-700">
            <div className="w-1/3 bg-gray-700 p-5">
               <h4
                  className="title mb-4 text-center text-2xl font-extrabold 
                              tracking-tight text-stone-300">
                  About Jacob
               </h4>
               <p className="text mb-4 leading-normal text-white">
                  Jacob has always been good with making things with knots and
                  yarn. When he was younger in and living in Jordan he started
                  making lanyards. At first he did the normal style every kid
                  does at some point, but he started making better and better
                  ones. He has always had a keen attention to detail and he has
                  always used this in designing things.
               </p>
               <p className="text mb-2 leading-normal text-white">
                  Even though he is a native Texan, he has lived most of his
                  life in the Middle East. This connection with Arabia has
                  inspired much of his work. We hope you enjoy his art and allow
                  it to bring the flavors of both Texas and The Middle East to
                  your home.
               </p>
            </div>
            <Image
               className="w-2/3"
               src="/about-pic.webp"
               alt="image"
               width={600}
               height={800}
            />
         </div>
      </div>
   )
}
