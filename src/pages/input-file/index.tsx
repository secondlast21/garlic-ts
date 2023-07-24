import FormikInput from '@/components/inputFile/FormikInput'
import Navbar from '@/components/navbar/Navbar'
import RequireAuth from '@/components/Auth'

export default function inputFile() {
  return (
    <RequireAuth>
      <div className='bg-s1'>
        <Navbar />
        <div className='text-center p-24 '>
          <FormikInput />
        </div>
      </div>
    </RequireAuth>
  )
}
