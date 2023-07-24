import Link from 'next/link'
import Image from 'next/image'
import logoIpb from '../../../public/logo_ipb.png'
import { getTokenFromLocalStorage } from '@/utils/tokenManager'
import { useEffect } from 'react'
import { useState } from 'react'

export default function NavbarAdmin() {
  const [isTokenExisted, setIsTokenExisted] = useState(false)

  useEffect(() => {
    const token = getTokenFromLocalStorage()
    if (token) {
      setIsTokenExisted(true)
    } else {
      setIsTokenExisted(false)
    }
  }, [])

  return (
    <header className='fixed w-full top-0 z-50 text-black'>
      <div className='navbar bg-base-100'>
        <div className='flex-1 px-2 lg:flex-none'>
          <Image
            src={logoIpb}
            className='w-16 h-16 relative cursor-pointer'
            alt=''
          />
          <Link
            href='/'
            className='btn btn-ghost normal-case text-xl font-bold'
          >
            INA Agro-Garlic
          </Link>
        </div>
        <div className='flex justify-end flex-1 px-2'>
          <div className='flex items-stretch'>
            <Link
              href='/'
              className='btn btn-ghost rounded-btn'
            >
              Home
            </Link>
            <Link
              href='/admin'
              className='btn btn-ghost rounded-btn'
            >
              Aktivasi Pengguna
            </Link>
            <Link
              href='/admin/activate-institution'
              className='btn btn-ghost rounded-btn'
            >
              Daftar Institusi
            </Link>
            <div className='flex-grow'></div>
            {!isTokenExisted ? (
              <Link
                href='/login'
                className='btn btn-ghost rounded-btn text-title'
              >
                Login
              </Link>
            ) : (
              <Link
                href='/profile'
                className='btn btn-ghost rounded-btn'
              >
                <div className='avatar'>
                  <div className='w-8 h-8 rounded-full bg-s1'></div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
