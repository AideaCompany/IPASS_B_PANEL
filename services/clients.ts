import { IClient, Paginated } from '@/types/types'
import { gql } from '@apollo/client'
import client from '@/graphql/config'
import { listClient } from '@/graphql/clients/queries/listClient'
import { convertTotable } from '@/utils/utils'
import { createMassiveClient } from '@/graphql/clients/mutations/createMassiveClient'

export const getAllClients = async (page: number, limit: number, filters: any): Promise<Paginated<IClient>> => {
  client.cache.reset()
  const paginated = await (await client.query({ query: gql(listClient), variables: { limit, page, filters } })).data.listClient
  return paginated
}

export const createMassiveClientFn = async (input: any): Promise<any[]> => {
  client.cache.reset()
  return convertTotable<IClient>(await (await client.mutate({ mutation: gql(createMassiveClient), variables: { input } })).data.createMassiveClient)
}
