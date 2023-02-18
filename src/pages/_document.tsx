import { Html, Head, Main, NextScript } from 'next/document'
import CardKesesuaianLahan from '@/components/cardKesesuaianLahan/CardKesesuaianLahan'
import CardSyaratTumbuh from '@/components/cardSyaratTumbuh/CardSyaratTumbuh'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <CardKesesuaianLahan />
        <CardSyaratTumbuh />
      </body>
    </Html>
  )
}
