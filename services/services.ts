import { IService, Paginated } from '@/types/types'
import { gql } from '@apollo/client'
import client from '@/graphql/config'
import { listService } from '@/graphql/services/queries/listService'
import { IPaginated } from '@/types/interfaces/graphqlTypes'
import { convertTotable } from '@/utils/utils'
import { listAllServices } from '@/graphql/services/queries/listAllServices'

export const getAllServices = async (page: number, limit: number, filters: any): Promise<Paginated<IService>> => {
  client.cache.reset()
  const paginated = (await (
    await client.query({ query: gql(listService), variables: { limit, page, filters } })
  ).data.listService) as IPaginated<IService>
  return paginated
}

export const listAllServicesFn = async (): Promise<IService[]> => {
  client.cache.reset()
  return convertTotable<IService>(await (await client.query({ query: gql(listAllServices) })).data.listAllServices)
}
