import client from '@/graphql/config'
import { listLocationEntriesExternal } from '@/graphql/locationEntries/queries/listLocationEntriesExternal'
import { listLocationEntriesPaginated } from '@/graphql/locationEntries/queries/listLocationEntriesPaginated'
import { filterLocationEntries } from '@/graphql/report/queries/filterLocationEntries'
import { ILocationEntries, Paginated } from '@/types/types'
import { convertTotable } from '@/utils/utils'
import { gql } from 'apollo-boost'

export const getAllLocationEntries = async (filter: any): Promise<ILocationEntries[]> => {
  //@ts-ignore
  return convertTotable((await client.query({ query: gql(filterLocationEntries), variables: { filter } })).data.filterLocationEntries).reverse()
}

export const getAllLocationEntriesExternal = async (): Promise<ILocationEntries[]> => {
  return convertTotable((await client.query({ query: gql(listLocationEntriesExternal) })).data.listLocationEntriesExternal)
}

export const listLocationEntriesPaginatedFn = async (page: number, limit: number, filters: any): Promise<Paginated<ILocationEntries>> => {
  //@ts-ignore
  return (await client.query({ query: gql(listLocationEntriesPaginated), variables: { limit, page, filters } })).data.listLocationEntriesPaginated
}
