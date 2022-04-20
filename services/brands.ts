import client from '@/graphql/config'
import { updateMasterLocation } from '@/graphql/masterLocations/mutation/updateMasterLocation'
import { getMasterLocation } from '@/graphql/masterLocations/queries/getMasterLocation'
import { listMasterLocationActive } from '@/graphql/masterLocations/queries/listMasterLocationActive'
import { listBrands } from '@/graphql/brands/queries/listBrands'
import { IBrands } from '@/types/types'
import { convertTotable } from '@/utils/utils'
import gql from 'graphql-tag'

export const getAllBrands = async (): Promise<IBrands[]> => {
  client.cache.reset()
  return convertTotable<IBrands>(await (await client.query({ query: gql(listBrands) })).data.listBrands)
}

export const getAllMasterLocationActive = async (): Promise<IBrands[]> => {
  client.cache.reset()
  return convertTotable<IBrands>(await (await client.query({ query: gql(listMasterLocationActive) })).data.listMasterLocationActive)
}

export const getMasterLocationFn = async (_id: string) => {
  client.cache.reset()
  return (await client.query({ query: gql(getMasterLocation), variables: { _id } })).data.getMasterLocation
}

export const updateMasterLocationFn = async (input: any) => {
  return (await client.mutate({ mutation: gql(updateMasterLocation), variables: { input } })).data.updateMasterLocation
}
