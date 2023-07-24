import NavbarMap from '@/components/navbar/NavbarMap'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const Map = dynamic(import('../../components/MapPengguna'), {
  ssr: false,
})

export default function Index() {
  return (
    <>
      <Head>
        <title>INA Agro-GARLIC</title>
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>
      <NavbarMap />
      <div className='flex font-display flex-col h-screen bg-white'>
        <div className='  overflow-y-auto paragraph'>
          <main>
            <div className='flex-grow bg-white'>
              <Map />
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
