import { currentUser, BaseCurrentUser } from '@/services/authService'
import { useQuery, useMutation } from 'react-query'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

interface RequireAuthProps {
  children: JSX.Element
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')
  const { mutate, reset } = useMutation(currentUser, {
    onError: (error: any) => {
      setErrorMessage(error?.message)
    },
  })

  useEffect(() => {
    mutate()
  }, [])

  if (errorMessage === 'Unauthorized') {
    router.push('/')
    return null
  } else return children
}
