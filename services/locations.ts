import client from '@/graphql/config'
import { createLocation } from '@/graphql/location/mutation/createLocation'
import { updateLocation } from '@/graphql/location/mutation/updateLocation'
import { generateExcelSecurity } from '@/graphql/location/queries/generateExcelSecurity'
import { generatePDFSecurity } from '@/graphql/location/queries/generatePDFSecurity'
import { getAllToSecurity } from '@/graphql/location/queries/getAllToSecurity'
import { getLocation } from '@/graphql/location/queries/getLocation'
import { getLocationsByMaster } from '@/graphql/location/queries/getLocationsByMaster'
import { listLocation } from '@/graphql/location/queries/listLocation'
import { listLocationActive } from '@/graphql/location/queries/listLocationActive'
import { subListLocation } from '@/graphql/location/subscrition/subListLocation'
import { subSecurityByLocation } from '@/graphql/location/subscrition/subSecurityByLocation'
import { ILocation } from '@/types/types'
import { convertTotable } from '@/utils/utils'
import { gql } from '@apollo/client'

export const getAllLocation = async (): Promise<ILocation[]> => {
  client.cache.reset()
  return convertTotable<ILocation>(await (await client.query({ query: gql(listLocation) })).data.listLocation)
}

export const getLocationsByMasterFn = async (_id: string) => {
  client.cache.reset()
  return convertTotable<ILocation>((await client.query({ query: gql(getLocationsByMaster), variables: { _id } })).data.getLocationsByMaster)
}

export const getAllLocationActive = async (): Promise<ILocation[]> => {
  client.cache.reset()
  return convertTotable<ILocation>(await (await client.query({ query: gql(listLocationActive) })).data.listLocationActive)
}

export const subscribeLocation = async (after: (data: ILocation[], isFirst: boolean) => void): Promise<ZenObservable.Subscription> => {
  after(await getAllLocation(), true)
  return client.subscribe({ query: gql(subListLocation) }).subscribe({
    next(data) {
      after(data.data.subListLocation, false)
    },
    error(error) {
      console.error(error)
    }
  })
}

export const createLocationFn = async (input: any): Promise<boolean> => {
  return (await client.mutate({ mutation: gql(createLocation), variables: { input } })).data.createLocation
}

export const getLocationFn = async (_id: string): Promise<ILocation> => {
  client.cache.reset()
  return await (
    await client.query({ query: gql(getLocation), variables: { _id } })
  ).data.getLocation
}

export const updateLocationFn = async (input: any): Promise<boolean> => {
  return (await client.mutate({ mutation: gql(updateLocation), variables: { input } })).data.updateLocation
}

export const getAllToSecurityFn = async (locationID: string): Promise<any> => {
  client.cache.reset()
  return (await client.query({ query: gql(getAllToSecurity), variables: { locationID } })).data.getAllToSecurity
}

export const generateExcelSecurityFn = async (locationID: string): Promise<any> => {
  client.cache.reset()
  return (await client.query({ query: gql(generateExcelSecurity), variables: { locationID } })).data.generateExcelSecurity
}

export const generatePDFSecurityFn = async (locationID: string): Promise<any> => {
  client.cache.reset()
  return (await client.query({ query: gql(generatePDFSecurity), variables: { locationID } })).data.generatePDFSecurity
}

export const subscribeSecurity = async (locationID: string, after: (id: ILocation[]) => void): Promise<ZenObservable.Subscription> => {
  console.log(locationID)
  return client.subscribe({ query: gql(subSecurityByLocation), variables: { locationID } }).subscribe({
    next(data) {
      after(data.data.subSecurityByLocation)
    },
    error(error) {
      console.log('error subscribeSecurity', error)
      console.error(error)
    }
  })
}
