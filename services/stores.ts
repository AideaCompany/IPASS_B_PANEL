import client from '@/graphql/config'
import { updateMasterLocation } from '@/graphql/masterLocations/mutation/updateMasterLocation'
import { getMasterLocation } from '@/graphql/masterLocations/queries/getMasterLocation'
import { listMasterLocationActive } from '@/graphql/masterLocations/queries/listMasterLocationActive'
import { listStores } from '@/graphql/stores/queries/listStores'
import { IStores } from '@/types/interfaces/Stores/stores.interface'

import { convertTotable } from '@/utils/utils'
import gql from 'graphql-tag'

export const getAllStores = async (): Promise<IStores[]> => {
  client.cache.reset()
  return convertTotable<IStores>(await (await client.query({ query: gql(listStores) })).data.listStores)
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
