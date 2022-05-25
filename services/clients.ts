import { gql } from '@apollo/client'
import client from '@/graphql/config'
import { listClient } from '@/graphql/clients/queries/listClient'
import { convertTotable } from '@/utils/utils'
import { createMassiveClient } from '@/graphql/clients/mutations/createMassiveClient'
import { createClient } from '@/graphql/clients/mutations/createClient'
import { IClient } from '@/types/interfaces/Clients/client.interface'
import { IPaginated } from '@/types/interfaces/graphqlTypes'
import { getClient } from '@/graphql/clients/queries/getClient'
import { updateClient } from '@/graphql/clients/mutations/updateClient'

export const getAllClients = async (page: number, limit: number, filters: any): Promise<IPaginated<IClient>> => {
  client.cache.reset()
  const paginated = await (await client.query({ query: gql(listClient), variables: { limit, page, filters } })).data.listClient
  return paginated
}

export const getClientFn = async (_id: string): Promise<IClient> => {
  client.cache.reset()
  return await (
    await client.query({ query: gql(getClient), variables: { _id } })
  ).data.getClient
}

export const createMassiveClientFn = async (input: any): Promise<any[]> => {
  client.cache.reset()
  return convertTotable<IClient>(await (await client.mutate({ mutation: gql(createMassiveClient), variables: { input } })).data.createMassiveClient)
}

export const createClientFn = async (input: any): Promise<IClient> => {
  client.cache.reset()
  return await (
    await client.mutate({ mutation: gql(createClient), variables: { input } })
  ).data.createClient
}

export const updateClientFn = async (input: any): Promise<IClient> => {
  client.cache.reset()
  return await (
    await client.mutate({ mutation: gql(updateClient), variables: { input } })
  ).data.updateClient
}
