import client from '@/graphql/config'
import { updateMasterLocation } from '@/graphql/masterLocations/mutation/updateMasterLocation'
import { getMasterLocation } from '@/graphql/masterLocations/queries/getMasterLocation'
import { listMasterLocationActive } from '@/graphql/masterLocations/queries/listMasterLocationActive'
import { listStyleHair } from '@/graphql/styleHair/queries/listStyleHair'
import { IstyleHair } from '@/types/types'
import { convertTotable } from '@/utils/utils'
import gql from 'graphql-tag'

export const getAllstyleHair = async (): Promise<IstyleHair[]> => {
  client.cache.reset()
  return convertTotable<IstyleHair>(await (await client.query({ query: gql(listStyleHair) })).data.listStyleHair)
}

export const getAllMasterLocationActive = async (): Promise<IstyleHair[]> => {
  client.cache.reset()
  return convertTotable<IstyleHair>(await (await client.query({ query: gql(listMasterLocationActive) })).data.listMasterLocationActive)
}

export const getMasterLocationFn = async (_id: string) => {
  client.cache.reset()
  return (await client.query({ query: gql(getMasterLocation), variables: { _id } })).data.getMasterLocation
}

export const updateMasterLocationFn = async (input: any) => {
  return (await client.mutate({ mutation: gql(updateMasterLocation), variables: { input } })).data.updateMasterLocation
}
