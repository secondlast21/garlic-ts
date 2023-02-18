import { Html, Head, Main, NextScript } from 'next/document'
import CardKesesuaianLahan from '@/components/cardKesesuaianLahan/CardKesesuaianLahan'
import CardSyaratTumbuh from '@/components/cardSyaratTumbuh/CardSyaratTumbuh'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/creativetimofficial/tailwind-starter-kit/tailwind.css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <CardKesesuaianLahan />
        <CardSyaratTumbuh />
      </body>
    </Html>
  )
}
