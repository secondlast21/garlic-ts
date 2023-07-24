import Image from 'next/image'
import logoIpb from '../../../public/logo_ipb.png'

export default function Footer() {
  return (
    <footer className='footer footer-center p-10 bg-accent text-accent-content'>
      <div>
        <Image
          src={logoIpb}
          className='w-16 h-16 relative cursor-pointer'
          alt=''
        />
        <p className='font-bold'>
          INA Agro-GARLIC - Agroecological Assessment of Land Suitability for Garlic <br />
          Departemen Ilmu Komputer FMIPA IPB <br /> Tahun 2023
        </p>
      </div>
    </footer>
  )
}
