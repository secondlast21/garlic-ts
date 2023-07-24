import RegisterForm from '@/components/registerForm/RegisterForm'
import Navbar from '@/components/navbar/Navbar'
import Head from 'next/head'

export default function Index() {
  return (
    <div>
      <Head>
        <title>INA Agro-GARLIC</title>
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>
      <Navbar />
      <RegisterForm />
    </div>
  )
}
