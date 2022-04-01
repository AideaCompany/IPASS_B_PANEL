import { IService, Paginated } from '@/types/types'
import { gql } from '@apollo/client'
import client from '@/graphql/config'
import { listService } from '@/graphql/services/queries/listService'

export const getAllServices = async (page: number, limit: number, filters: any): Promise<Paginated<IService>> => {
  client.cache.reset()
  const paginated = await (await client.query({ query: gql(listService), variables: { limit, page, filters } })).data.listService
  return paginated
}
