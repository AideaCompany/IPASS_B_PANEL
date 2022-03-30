import { IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { ISections } from '@/types/interfaces/Sections/sections.interface'
import { ApolloQueryResult, gql } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
import client from '../graphql/config'
import { listPrivilege, listSection } from '../graphql/queries'

type DataContextType = {
  privilege: IPrivilege[]
  section: ISections[]
  getData: () => Promise<void>
}

const DataContext = React.createContext<DataContextType>({} as DataContextType)

export const DataProvider = (props: { children: JSX.Element }) => {
  //props
  const { children } = props

  //states
  const [privilege, setPrivilege] = useState<IPrivilege[]>([])
  const [section, setSection] = useState<ISections[]>([])

  //effect
  useEffect(() => {
    getData()
  }, [])

  //functions
  const getData = async () => {
    await client.cache.reset()
    const currentPrivilege: ApolloQueryResult<{
      listPrivilege: IPrivilege[]
    }> = await client.query({ query: gql(listPrivilege) })
    const sections: ApolloQueryResult<{
      listSection: ISections[]
    }> = await client.query({ query: gql(listSection) })
    setPrivilege(currentPrivilege.data.listPrivilege)
    setSection(sections.data.listSection)
  }
  return <DataContext.Provider value={{ privilege, section, getData }}>{children}</DataContext.Provider>
}

const useData = () => {
  return useContext(DataContext)
}
export default useData
