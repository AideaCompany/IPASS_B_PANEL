import { getPrivilege } from '@/graphql/privilege/queries/getPrivilege'
import { listSection } from '@/graphql/queries'
import { getUserFn } from '@/services/users'
import { IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { ISections } from '@/types/interfaces/Sections/sections.interface'
import { IUser } from '@/types/interfaces/user/User.interface'
import { gql } from '@apollo/client'
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
//next
import { useRouter } from 'next/router'
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { $security } from '../config'
import client, { default as Client, setToken } from '../graphql/config'

import useData from './DataContext'

type typeAuthContext = {
  user: IUser
  isAuthenticated: boolean
  login: (token: string, firstLogin?: boolean) => Promise<void>
  loading: boolean
  logout: () => void
  permission: IPrivilege
  setLoading: Dispatch<SetStateAction<boolean>>
  setSpinning: Dispatch<SetStateAction<boolean>>
  spinning: boolean
  section: ISections[]
}

const AuthContext = React.createContext<typeAuthContext>({} as typeAuthContext)

export const AuthProvider = (props: { children: JSX.Element }) => {
  //props
  const { children } = props
  const { section } = useData()
  //next
  const router = useRouter()
  //States
  const [user, setUser] = useState<IUser>({} as IUser)
  const [permission, setPermission] = useState<IPrivilege>({} as IPrivilege)
  const [loading, setLoading] = useState<boolean>(true)
  const [spinning, setSpinning] = useState(true)

  //Effect
  useEffect(() => {
    // eslint-disable-next-line no-extra-semi,@typescript-eslint/no-extra-semi
    ;(async () => {
      setLoading(true)
      if (section.length > 0) {
        if (Cookie.get('authRenapPanel') !== undefined) {
          const data = jwt.verify(Cookie.get('authRenapPanel') as string, $security.secretKey) as { data: IUser }
          const currentUser = await getUserFn(data.data._id)
          setUser(currentUser)
          const totalPrivilege: IPrivilege = JSON.parse(JSON.stringify(currentUser.privilegeID))
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
            console.info('60')
            router.push(`${router.query?.lang ? `/${router.query.lang as string}/session` : '/'}`)
          }
        }
      }
      setLoading(false)
      setSpinning(false)
    })()
  }, [section])

  //functions

  const login = async (token: string, firstLogin?: boolean) => {
    const data = jwt.verify(token, $security.secretKey) as { data: IUser }
    const currentUser = await getUserFn(data.data._id)
    if (currentUser.active) {
      setUser(currentUser)
      const perm = await Client.query<{ getPrivilege: IPrivilege }>({
        query: gql(getPrivilege),
        variables: { _id: currentUser.privilegeID._id }
      })
      let totalPrivilege: IPrivilege
      if (firstLogin) {
        const sections: ISections[] = (await client.query({ query: gql(listSection) })).data.listSection
        totalPrivilege = JSON.parse(JSON.stringify(perm.data.getPrivilege))
        totalPrivilege.permissions?.map(l => (l.sectionName = sections.find(r => r._id === l.sectionID)?.name))
        setPermission(totalPrivilege)
      } else {
        totalPrivilege = JSON.parse(JSON.stringify(perm.data.getPrivilege))
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
    setUser({} as IUser)
    setPermission({} as IPrivilege)
    Cookie.remove('authRenapPanel')
    console.info('100')
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

const useAuth = () => {
  return useContext(AuthContext)
}
export default useAuth
