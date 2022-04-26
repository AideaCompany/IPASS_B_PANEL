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
import { IEvent } from '@/types/interfaces/Event/event.interface'
import { IEventExpress } from '@/types/interfaces/EventExpress/eventExpress.interface'
import { ILocationEntries } from '@/types/interfaces/ILocationEntries/LocationEntries.interface'
import { IInvitationEvent } from '@/types/interfaces/InvitationEvent/InvitationEvent.interface'
import { ILocation } from '@/types/interfaces/Location/Location.interface'
import { ICreateLocation, IUpdateLocation } from '@/types/interfaces/Location/MutationLocation.interface'

import { convertTotable } from '@/utils/utils'
import { gql } from '@apollo/client'

export const getAllLocation = async (): Promise<ILocation[]> => {
  client.cache.reset()
  return convertTotable<ILocation>((await (await client.query({ query: gql(listLocation) })).data.listLocation) as ILocation[])
}

export const getLocationsByMasterFn = async (_id: string): Promise<ILocation[]> => {
  client.cache.reset()
  return convertTotable<ILocation>(
    (await client.query({ query: gql(getLocationsByMaster), variables: { _id } })).data.getLocationsByMaster as ILocation[]
  )
}

export const getAllLocationActive = async (): Promise<ILocation[]> => {
  client.cache.reset()
  return convertTotable<ILocation>((await (await client.query({ query: gql(listLocationActive) })).data.listLocationActive) as ILocation[])
}

export const subscribeLocation = async (after: (data: ILocation[], isFirst: boolean) => void): Promise<ZenObservable.Subscription> => {
  after(await getAllLocation(), true)
  return client.subscribe({ query: gql(subListLocation) }).subscribe({
    next(data) {
      after(data.data.subListLocation as ILocation[], false)
    },
    error(error) {
      throw new Error(String(error))
    }
  })
}

export const createLocationFn = async (input: ICreateLocation): Promise<boolean> => {
  return (await client.mutate({ mutation: gql(createLocation), variables: { input } })).data.createLocation as boolean
}

export const getLocationFn = async (_id: string): Promise<ILocation> => {
  client.cache.reset()
  return (await (
    await client.query({ query: gql(getLocation), variables: { _id } })
  ).data.getLocation) as ILocation
}

export const updateLocationFn = async (input: IUpdateLocation): Promise<boolean> => {
  return (await client.mutate({ mutation: gql(updateLocation), variables: { input } })).data.updateLocation as boolean
}

interface IAllToSecurity {
  entries: ILocationEntries[]
  events: IEvent[]
  eventsExpress: IEventExpress[]
  invitations: IInvitationEvent[]
}

export const getAllToSecurityFn = async (locationID: string): Promise<IAllToSecurity> => {
  client.cache.reset()
  return (await client.query({ query: gql(getAllToSecurity), variables: { locationID } })).data.getAllToSecurity as IAllToSecurity
}

export const generateExcelSecurityFn = async (locationID: string): Promise<string> => {
  client.cache.reset()
  return (await client.query({ query: gql(generateExcelSecurity), variables: { locationID } })).data.generateExcelSecurity as string
}

export const generatePDFSecurityFn = async (locationID: string): Promise<string> => {
  client.cache.reset()
  return (await client.query({ query: gql(generatePDFSecurity), variables: { locationID } })).data.generatePDFSecurity as string
}

export const subscribeSecurity = (locationID: string, after: (id: ILocation[]) => void): ZenObservable.Subscription => {
  return client.subscribe({ query: gql(subSecurityByLocation), variables: { locationID } }).subscribe({
    next(data) {
      after(data.data.subSecurityByLocation as ILocation[])
    },
    error(error) {
      throw new Error(String(error))
    }
  })
}
