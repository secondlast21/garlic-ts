import Image from 'next/image'

interface HeaderProps {
  name: String
  role: String
  image: any
}

export default function Peneliti({ name, role, image }: HeaderProps) {
  return (
    <div className='card w-92 bg-base-100 m-9'>
      <figure className='px-10 pt-10'>
        <Image
          src={image}
          className=' w-64 h-64 right-0 mb-5 mx-auto rounded-full bg-pfp object-scale-down'
          alt=''
        />
      </figure>
      <div className='card-body items-center text-center text-xl'>
        <h2 className='card-title'>{name}</h2>
        <p>{role}</p>
      </div>
    </div>
  )
}
