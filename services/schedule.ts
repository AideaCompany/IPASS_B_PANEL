import client from '@/graphql/config'
import { listServiceSchedule } from '@/graphql/schedule/query/listServiceSchedule'
import { FilterType, IPaginated } from '@/types/interfaces/graphqlTypes'
import { IServiceSchedule } from '@/types/interfaces/ServiceSchedule/serviceSchedule.interface'
import gql from 'graphql-tag'

export const listServiceScheduleFn = async (page: number, limit: number, filters: FilterType): Promise<IPaginated<IServiceSchedule>> => {
  client.cache.reset()
  return await (
    await client.query({ query: gql(listServiceSchedule), variables: { limit, page, filters } })
  ).data.listServiceSchedule
}
