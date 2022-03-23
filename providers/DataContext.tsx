import { ApolloQueryResult, gql } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
import client from '../graphql/config'
import { listPrivilege, listSection } from '../graphql/queries'
import { Privilege, Sections } from '../types/types'
type DataContext = {
  privilege: Privilege[]
  section: Sections[]
  getData: () => Promise<void>
}

const DataContext = React.createContext<DataContext>({} as DataContext)

export const DataProvider = (props: { children: JSX.Element }) => {
  //props
  const { children } = props

  //states
  const [privilege, setPrivilege] = useState<Privilege[]>([])
  const [section, setSection] = useState<Sections[]>([])

  //effect
  useEffect(() => {
    getData()
  }, [])

  //functions
  const getData = async () => {
    await client.cache.reset()
    var privilege: ApolloQueryResult<{
      listPrivilege: Privilege[]
    }> = await client.query({ query: gql(listPrivilege) })
    const sections: ApolloQueryResult<{
      listSection: Sections[]
    }> = await client.query({ query: gql(listSection) })
    setPrivilege(privilege.data.listPrivilege)
    setSection(sections.data.listSection)
  }
  return <DataContext.Provider value={{ privilege, section, getData }}>{children}</DataContext.Provider>
}

export default function useData() {
  return useContext(DataContext)
}
