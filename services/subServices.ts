import client from '@/graphql/config'
import { createSubService } from '@/graphql/subServices/mutations/createSubService'
import { updateSubService } from '@/graphql/subServices/mutations/updateSubService'
import { getSubService } from '@/graphql/subServices/queries/getSubService'
import { listSubService } from '@/graphql/subServices/queries/listSubService'
import { IPaginated } from '@/types/interfaces/graphqlTypes'
import { ICreateSubService } from '@/types/interfaces/SubServices/MutationSubServices.interface'
import { ISubService } from '@/types/interfaces/SubServices/SubServices.interface'
import { gql } from '@apollo/client'

export const getAllSubServices = async (page: number, limit: number, filters: any): Promise<IPaginated<ISubService>> => {
  client.cache.reset()
  const paginated = await (await client.query({ query: gql(listSubService), variables: { limit, page, filters } })).data.listSubService
  return paginated
}

export const createSubServiceFn = async (input: ICreateSubService): Promise<IPaginated<ISubService>> => {
  client.cache.reset()

  return await (
    await client.mutate({ mutation: gql(createSubService), variables: { input } })
  ).data.createSubService
}

export const updateSubServiceFn = async (input: ICreateSubService): Promise<IPaginated<ISubService>> => {
  client.cache.reset()

  return await (
    await client.mutate({ mutation: gql(updateSubService), variables: { input } })
  ).data.updateSubService
}

export const getSubServiceFn = async (_id: string): Promise<ISubService> => {
  client.cache.reset()
  return await (
    await client.query({ query: gql(getSubService), variables: { _id } })
  ).data.getSubService
}
