import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { ROUTES } from '~app/utils/constants'

const Page404 = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace(ROUTES.HOME)
  }, [router])

  return null
}

export default Page404
