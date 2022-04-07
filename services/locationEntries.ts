import client from '@/graphql/config'
import { listLocationEntriesExternal } from '@/graphql/locationEntries/queries/listLocationEntriesExternal'
import { listLocationEntriesPaginated } from '@/graphql/locationEntries/queries/listLocationEntriesPaginated'
import { filterLocationEntries } from '@/graphql/report/queries/filterLocationEntries'
import { FilterType, IPaginated } from '@/types/interfaces/graphqlTypes'
import { ILocationEntries } from '@/types/interfaces/ILocationEntries/LocationEntries.interface'
import { convertTotable } from '@/utils/utils'
import { gql } from 'apollo-boost'

export const getAllLocationEntries = async (filter: FilterType): Promise<ILocationEntries[]> => {
  return convertTotable<ILocationEntries>(
    (await client.query({ query: gql(filterLocationEntries), variables: { filter } })).data.filterLocationEntries as ILocationEntries[]
  ).reverse()
}

export const getAllLocationEntriesExternal = async (): Promise<ILocationEntries[]> => {
  return convertTotable((await client.query({ query: gql(listLocationEntriesExternal) })).data.listLocationEntriesExternal as ILocationEntries[])
}

export const listLocationEntriesPaginatedFn = async (page: number, limit: number, filters: FilterType): Promise<IPaginated<ILocationEntries>> => {
  return (await client.query({ query: gql(listLocationEntriesPaginated), variables: { limit, page, filters } })).data
    .listLocationEntriesPaginated as IPaginated<ILocationEntries>
}
