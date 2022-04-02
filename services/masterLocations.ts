import client from '@/graphql/config'
import { updateMasterLocation } from '@/graphql/masterLocations/mutation/updateMasterLocation'
import { getMasterLocation } from '@/graphql/masterLocations/queries/getMasterLocation'
import { listMasterLocation } from '@/graphql/masterLocations/queries/listMasterLocation'
import { listMasterLocationActive } from '@/graphql/masterLocations/queries/listMasterLocationActive'
import { IMasterLocation } from '@/types/interfaces/MasterLocation/MasterLocation.interface'
import { IUpdateMasterLocation } from '@/types/interfaces/MasterLocation/MutationMasterLocation.interface'
import { convertTotable } from '@/utils/utils'
import gql from 'graphql-tag'

export const getAllMasterLocation = async (): Promise<IMasterLocation[]> => {
  client.cache.reset()
  return convertTotable<IMasterLocation>(
    (await (
      await client.query({ query: gql(listMasterLocation) })
    ).data.listMasterLocation) as IMasterLocation[]
  )
}

export const getAllMasterLocationActive = async (): Promise<IMasterLocation[]> => {
  client.cache.reset()
  return convertTotable<IMasterLocation>(
    (await (
      await client.query({ query: gql(listMasterLocationActive) })
    ).data.listMasterLocationActive) as IMasterLocation[]
  )
}

export const getMasterLocationFn = async (_id: string): Promise<IMasterLocation> => {
  client.cache.reset()
  return (await client.query({ query: gql(getMasterLocation), variables: { _id } })).data.getMasterLocation as IMasterLocation
}

export const updateMasterLocationFn = async (input: { input: IUpdateMasterLocation }): Promise<IMasterLocation> => {
  return (await client.mutate({ mutation: gql(updateMasterLocation), variables: { input } })).data.updateMasterLocation as IMasterLocation
}
