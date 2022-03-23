import { getPrivilege } from '@/graphql/privilege/queries/getPrivilege'
import { listSection } from '@/graphql/queries'
import { getUserFn } from '@/services/users'
import { gql } from '@apollo/client'
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
//next
import { useRouter } from 'next/router'
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { $security } from '../config'
import client, { default as Client, setToken } from '../graphql/config'
import { Privilege, Sections, User } from '../types/types'
import useData from './DataContext'

type typeAuthContext = {
  user: User
  isAuthenticated: boolean
  login: (token: string, firstLogin?: boolean) => Promise<void>
  loading: boolean
  logout: () => void
  permission: Privilege
  setLoading: Dispatch<SetStateAction<boolean>>
  setSpinning: Dispatch<SetStateAction<boolean>>
  spinning: boolean
  section: Sections[]
}

const AuthContext = React.createContext<typeAuthContext>({} as typeAuthContext)

export const AuthProvider = (props: { children: JSX.Element }) => {
  //props
  const { children } = props
  const { section } = useData()
  //next
  const router = useRouter()
  //States
  const [user, setUser] = useState<User>({} as User)
  //@ts-ignore
  const [permission, setPermission] = useState<Privilege>({})
  const [loading, setLoading] = useState<boolean>(true)
  const [spinning, setSpinning] = useState(true)

  //Effect
  useEffect(() => {
    ;(async () => {
      setLoading(true)
      if (section.length > 0) {
        if (Cookie.get('authRenapPanel') !== undefined) {
          const data = jwt.verify(Cookie.get('authRenapPanel') as string, $security.secretKey) as { data: User }
          const user = await getUserFn(data.data._id as string)
          setUser(user)
          var totalPrivilege: Privilege = JSON.parse(JSON.stringify(user.privilegeID))
          totalPrivilege.permissions?.map(l => (l.sectionName = section.find(r => r._id === l.sectionID)?.name))
          setPermission(totalPrivilege)
        } else {
          if (
            ![
              '/',
              '/[lang]',
              '/[lang]/verification',
              '/[lang]/confirmEvent',
              '/[lang]/ourApps',
              '/device/[id]',
              '/certificados/mantenimiento',
              '/certificados/servidor',
              '/certificados/usuarios',
              '/certificados/registro',
              '/certificados/optimizacion',
              '/certificados/propiedad'
            ].includes(router.pathname) &&
            !router.pathname.includes('session')
          ) {
            console.log('60')
            router.push(`${router.query?.lang ? `/${router.query.lang}/session` : '/'}`)
          }
        }
      }
      setLoading(false)
      setSpinning(false)
    })()
  }, [section])

  //functions

  const login = async (token: string, firstLogin?: boolean) => {
    const data = jwt.verify(token, $security.secretKey) as { data: User }
    const user = await getUserFn(data.data._id as string)
    if (user.active) {
      setUser(user)
      const perm = await Client.query<{ getPrivilege: Privilege }>({
        query: gql(getPrivilege),
        variables: { _id: (user.privilegeID as Privilege)._id }
      })
      if (firstLogin) {
        const sections: Sections[] = (await client.query({ query: gql(listSection) })).data.listSection
        var totalPrivilege: Privilege = JSON.parse(JSON.stringify(perm.data.getPrivilege))
        totalPrivilege.permissions?.map(l => (l.sectionName = sections.find(r => r._id === l.sectionID)?.name))
        setPermission(totalPrivilege)
      } else {
        var totalPrivilege: Privilege = JSON.parse(JSON.stringify(perm.data.getPrivilege))
        totalPrivilege.permissions?.map(l => (l.sectionName = section.find(r => r._id === l.sectionID)?.name))
        setPermission(totalPrivilege)
      }
      Cookie.set('authRenapPanel', token, { expires: 1 })
      setSpinning(false)
      setLoading(false)
      setToken(token)
      router.push({ pathname: '/[lang]/dashboard', query: { lang: router.query.lang } })
    }
  }

  const logout = () => {
    setUser({} as User)
    //@ts-ignore
    setPermission({})
    Cookie.remove('authRenapPanel')
    console.log('100')
    router.push({ pathname: '/[lang]/session', query: { lang: router.query.lang } })
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        loading,
        permission,
        logout,
        setLoading,
        setSpinning,
        spinning,
        section
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
