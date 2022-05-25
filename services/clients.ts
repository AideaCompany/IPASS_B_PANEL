import { IClient, Paginated } from '@/types/types'
import { gql } from '@apollo/client'
import client from '@/graphql/config'
import { listClient } from '@/graphql/clients/queries/listClient'

export const getAllClients = async (page: number, limit: number, filters: any): Promise<Paginated<IClient>> => {
  client.cache.reset()
  const paginated = await (await client.query({ query: gql(listClient), variables: { limit, page, filters } })).data.listClient
  return paginated
}
