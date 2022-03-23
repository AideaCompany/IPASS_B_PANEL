import useAuth from '@/providers/AuthContext'
import { useEffect } from 'react'
import Main from '../components/main'
import { useRouter } from 'next/router'
import { getInitialLocale } from 'i18n/getInitialLocale'

export default function Home() {
  const router = useRouter()
  const { setSpinning } = useAuth()

  useEffect(() => {
    setSpinning(true)
    console.log('12')
    router.push(`/${getInitialLocale()}/session`)
  }, [])

  return (
    <Main title={''}>
      <></>
    </Main>
  )
}
