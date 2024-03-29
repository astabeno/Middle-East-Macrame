import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
   return (
      <Html lang="en">
         <Head>
            <link
               rel="icon"
               href="/middleEastMacrame.svg"
               type="image/svg+xml"
            />
         </Head>
         <body>
            <Main />
            <div id="portal" />
            <NextScript />
         </body>
      </Html>
   )
}
