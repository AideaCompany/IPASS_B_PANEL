import client from '@/graphql/config'
import { createDevice } from '@/graphql/device/mutation/createDevice'
import { getDevice } from '@/graphql/device/queries/getDevice'
import { listAvailableDevices } from '@/graphql/device/queries/listAvailableDevices'
import { listDevice } from '@/graphql/device/queries/listDevice'
import { listDeviceIfExists } from '@/graphql/device/queries/listDeviceIfExists'
import { IDevice } from '@/types/types'
import { convertTotable } from '@/utils/utils'
import gql from 'graphql-tag'

export const getAllDevices = async (): Promise<IDevice[]> => {
  client.cache.reset()
  return convertTotable<IDevice>(await (await client.query({ query: gql(listDevice) })).data.listDevice)
}

export const getAllExistingDevices = async (): Promise<IDevice[]> => {
  client.cache.reset()
  return convertTotable<IDevice>(await (await client.query({ query: gql(listDeviceIfExists) })).data.listDeviceIfExists)
}

export const getAvailableDevices = async (): Promise<IDevice[]> => {
  client.cache.reset()
  return convertTotable<IDevice>(await (await client.query({ query: gql(listAvailableDevices) })).data.listAvailableDevices)
}

export const createDeviceFn = async (input: any): Promise<boolean> => {
  return (await client.mutate({ mutation: gql(createDevice), variables: { input } })).data.createDevice
}

export const getDeviceById = async (_id: string): Promise<IDevice> => {
  client.cache.reset()
  return await (
    await client.query({ query: gql(getDevice), variables: { _id } })
  ).data.getDevice
}
