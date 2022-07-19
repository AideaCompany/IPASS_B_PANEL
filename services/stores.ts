import client from '@/graphql/config'
import { updateMasterLocation } from '@/graphql/masterLocations/mutation/updateMasterLocation'
import { getMasterLocation } from '@/graphql/masterLocations/queries/getMasterLocation'
import { listMasterLocationActive } from '@/graphql/masterLocations/queries/listMasterLocationActive'
import { createStores } from '@/graphql/stores/mutations/createStores'
import { updateStores } from '@/graphql/stores/mutations/updateStores'
import { getStores } from '@/graphql/stores/queries/getStores'
import { listStores } from '@/graphql/stores/queries/listStores'
import { ICreateStores, IUpdateStores } from '@/types/interfaces/Stores/mutationStores.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'

import { convertTotable } from '@/utils/utils'
import gql from 'graphql-tag'

export const getAllStores = async (): Promise<IStores[]> => {
  client.cache.reset()
  return convertTotable<IStores>(await (await client.query({ query: gql(listStores) })).data.listStores)
}

export const getStoresFn = async (_id: string): Promise<IStores> => {
  client.cache.reset()
  return await (
    await client.query({ query: gql(getStores), variables: { _id } })
  ).data.getStores
}

export const getAllMasterLocationActive = async (): Promise<IStores[]> => {
  client.cache.reset()
  return convertTotable<IStores>(await (await client.query({ query: gql(listMasterLocationActive) })).data.listMasterLocationActive)
}

export const getMasterLocationFn = async (_id: string) => {
  client.cache.reset()
  return (await client.query({ query: gql(getMasterLocation), variables: { _id } })).data.getMasterLocation
}

export const updateMasterLocationFn = async (input: any) => {
  return (await client.mutate({ mutation: gql(updateMasterLocation), variables: { input } })).data.updateMasterLocation
}

export const createStoresFn = async (input: ICreateStores) => {
  return (await client.mutate({ mutation: gql(createStores), variables: { input } })).data.createStores
}

export const updateStoresFn = async (input: IUpdateStores) => {
  return (await client.mutate({ mutation: gql(updateStores), variables: { input } })).data.updateStores
}
