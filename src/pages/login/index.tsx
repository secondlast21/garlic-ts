import Link from 'next/link'
import Navbar from '@/components/navbar/Navbar'
import LoginForm from '@/components/loginForm/LoginForm'
import Head from 'next/head'

export default function Login() {
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
      <div className='flex items-center justify-center'>
        <LoginForm />
      </div>
    </div>
  )
}
