import client from '@/graphql/config'
import { listEventActive } from '@/graphql/event/queries/listEventActive'
import { createEvent } from '@/graphql/event/mutation/createEvent'
import { IEvent } from '@/types/types'
import { convertTotable } from '@/utils/utils'
import gql from 'graphql-tag'
import { getEvent } from '@/graphql/event/queries/getEvent'
import { listAllEventsActive } from '@/graphql/event/queries/listAllEventsActive'
import { listEventsToday } from '@/graphql/event/queries/listEventsToday'
import { listEventsYesterday } from '@/graphql/event/queries/listEventsYesterday'
import { listEventsTomorrow } from '@/graphql/event/queries/listEventsTomorrow'

export const getAllEventsUserActive = async (): Promise<IEvent[]> => {
  client.cache.reset()

  return convertTotable<IEvent>(await (await client.query({ query: gql(listEventActive) })).data.listEventActive)
}

export const listEvents = async (): Promise<IEvent[]> => {
  return convertTotable<IEvent>(await (await client.query({ query: gql(listAllEventsActive) })).data.listAllEventsActive)
}

export const createEventFn = async (input: any): Promise<boolean> => {
  return (await client.mutate({ mutation: gql(createEvent), variables: { input } })).data.createEvent
}

export const getEventFn = async (_id: string): Promise<IEvent> => {
  client.cache.reset()
  return await (
    await client.query({ query: gql(getEvent), variables: { _id } })
  ).data.getEvent
}

export const getEventsYesterday = async (): Promise<IEvent[]> => {
  return convertTotable<IEvent>(await (await client.query({ query: gql(listEventsYesterday) })).data.listEventsYesterday)
}

export const getEventsToday = async (): Promise<IEvent[]> => {
  return convertTotable<IEvent>(await (await client.query({ query: gql(listEventsToday) })).data.listEventsToday)
}

export const getEventsTomorrow = async (): Promise<IEvent[]> => {
  return convertTotable<IEvent>(await (await client.query({ query: gql(listEventsTomorrow) })).data.listEventsTomorrow)
}
