import client from '@/graphql/config'
import { createDevice } from '@/graphql/device/mutation/createDevice'
import { getDevice } from '@/graphql/device/queries/getDevice'
import { listAvailableDevices } from '@/graphql/device/queries/listAvailableDevices'
import { listDevice } from '@/graphql/device/queries/listDevice'
import { listDeviceIfExists } from '@/graphql/device/queries/listDeviceIfExists'
import { IDevice } from '@/types/interfaces/Device/Device.interface'
import { ICreateDevice } from '@/types/interfaces/Device/MutationDevice.interface'

import { convertTotable } from '@/utils/utils'
import gql from 'graphql-tag'

export const getAllDevices = async (): Promise<IDevice[]> => {
  client.cache.reset()
  return convertTotable<IDevice>((await (await client.query({ query: gql(listDevice) })).data.listDevice) as IDevice[])
}

export const getAllExistingDevices = async (): Promise<IDevice[]> => {
  client.cache.reset()
  return convertTotable<IDevice>((await (await client.query({ query: gql(listDeviceIfExists) })).data.listDeviceIfExists) as IDevice[])
}

export const getAvailableDevices = async (): Promise<IDevice[]> => {
  client.cache.reset()
  return convertTotable<IDevice>((await (await client.query({ query: gql(listAvailableDevices) })).data.listAvailableDevices) as IDevice[])
}

export const createDeviceFn = async (input: { input: ICreateDevice }): Promise<boolean> => {
  return (await client.mutate({ mutation: gql(createDevice), variables: { input } })).data.createDevice as boolean
}

export const getDeviceById = async (_id: string): Promise<IDevice> => {
  client.cache.reset()
  return (await (
    await client.query({ query: gql(getDevice), variables: { _id } })
  ).data.getDevice) as IDevice
}
