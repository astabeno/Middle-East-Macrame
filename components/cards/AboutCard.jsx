import Image from 'next/image'

export default function AboutCard() {
   return (
      <div className="w-full rounded-lg bg-stone-100 shadow-lg md:m-auto md:my-5 lg:max-w-lg">
         <div>
            <div>
               <h4 className="text-xl font-extrabold tracking-tight text-stone-600">
                  About Jacob
               </h4>
               <p className="mb-2 leading-normal">
                  Jacob has always been good with making things with knots and
                  yarn. When he was younger in and living in Jordan he started
                  making lanyards. At first he did the normal style every kid
                  does at some point, but he started making better and better
                  ones.
               </p>
            </div>

            <Image
               className="rounded-t-lg object-cover"
               src="/about-pic.png"
               alt="image"
               width={1000}
               height={2000}
            />
         </div>
      </div>
   )
}
