import Link from 'next/link'
import Image from 'next/image'
import logoIPB from '../../../public/logo_ipb.png'
import logoIpb from '../../../public/logo_ipb.png'
import Navbar from '@/components/navbar/Navbar'

export default function emailVerify() {
  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center h-screen my-auto'>
        <div className='card w-96 bg-base-100 shadow-xl'>
          <figure className='px-10 pt-10'>
            <Image
              src={logoIpb}
              className=' w-36 mx-auto'
              alt=''
            />
          </figure>
          <div className='card-body items-center text-center'>
            <h2 className='card-title'>Email Terverifikasi</h2>
            <p>Selamat email anda sudah terverifikasi! Silahkan menunggu admin untuk mengaktifkan akun anda.</p>
            <div className='card-actions'>
              <Link
                href='/login'
                className='btn btn-accent m-5 px-16'
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
