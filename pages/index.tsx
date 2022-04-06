import useAuth from '@/providers/AuthContext'
import React, { useEffect } from 'react'
import Main from '../components/main'
import { useRouter } from 'next/router'
import { getInitialLocale } from 'i18n/getInitialLocale'

const Home = () => {
  const router = useRouter()
  const { setSpinning } = useAuth()

  useEffect(() => {
    setSpinning(true)
    console.info('12')
    router.push(`/${getInitialLocale()}/session`)
  }, [])

  return (
    <Main>
      <></>
    </Main>
  )
}

export default Home
