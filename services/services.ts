import { gql } from '@apollo/client'
import client from '@/graphql/config'
import { listService } from '@/graphql/services/queries/listService'
import { IPaginated } from '@/types/interfaces/graphqlTypes'
import { convertTotable } from '@/utils/utils'
import { listAllServices } from '@/graphql/services/queries/listAllServices'
import { IService } from '@/types/interfaces/services/Services.interface'
import { createService } from '@/graphql/services/mutations/createService'
import { ICreateService, IUpdateService } from '@/types/interfaces/services/MutationServices.interface'
import { getService } from '@/graphql/services/queries/getService'
import { updateService } from '@/graphql/services/mutations/updateService'

export const getAllServices = async (page: number, limit: number, filters: any): Promise<IPaginated<IService>> => {
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

export const createServiceFn = async (input: ICreateService): Promise<IService> => {
  client.cache.reset()
  return await (
    await client.mutate({ mutation: gql(createService), variables: { input } })
  ).data.createService
}

export const updateServiceFn = async (input: IUpdateService): Promise<IService> => {
  client.cache.reset()
  return await (
    await client.mutate({ mutation: gql(updateService), variables: { input } })
  ).data.updateService
}

export const getServiceFn = async (_id: string): Promise<IService> => {
  client.cache.reset()
  return await (
    await client.query({ query: gql(getService), variables: { _id } })
  ).data.getService
}
