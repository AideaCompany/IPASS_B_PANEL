import { IService, Paginated } from '@/types/types'
import { gql } from '@apollo/client'
import client from '@/graphql/config'
import { listSubService } from '@/graphql/subServices/queries/listSubService'

export const getAllSubServices = async (page: number, limit: number, filters: any): Promise<Paginated<IService>> => {
  client.cache.reset()
  const paginated = await (await client.query({ query: gql(listSubService), variables: { limit, page, filters } })).data.listSubService
  return paginated
}
