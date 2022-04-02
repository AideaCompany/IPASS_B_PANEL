import client from '@/graphql/config'
import { listEventActive } from '@/graphql/event/queries/listEventActive'
import { createEvent } from '@/graphql/event/mutation/createEvent'
import { convertTotable } from '@/utils/utils'
import gql from 'graphql-tag'
import { getEvent } from '@/graphql/event/queries/getEvent'
import { listAllEventsActive } from '@/graphql/event/queries/listAllEventsActive'
import { listEventsToday } from '@/graphql/event/queries/listEventsToday'
import { listEventsYesterday } from '@/graphql/event/queries/listEventsYesterday'
import { listEventsTomorrow } from '@/graphql/event/queries/listEventsTomorrow'
import { IEvent } from '@/types/interfaces/Event/event.interface'
import { ICreateEvent } from '@/types/interfaces/Event/MutationEvent.interface'

export const getAllEventsUserActive = async (): Promise<IEvent[]> => {
  client.cache.reset()

  return convertTotable<IEvent>((await (await client.query({ query: gql(listEventActive) })).data.listEventActive) as IEvent[])
}

export const listEvents = async (): Promise<IEvent[]> => {
  return convertTotable<IEvent>((await (await client.query({ query: gql(listAllEventsActive) })).data.listAllEventsActive) as IEvent[])
}

export const createEventFn = async (input: ICreateEvent): Promise<boolean> => {
  return (await client.mutate({ mutation: gql(createEvent), variables: { input } })).data.createEvent as boolean
}

export const getEventFn = async (_id: string): Promise<IEvent> => {
  client.cache.reset()
  return (await (
    await client.query({ query: gql(getEvent), variables: { _id } })
  ).data.getEvent) as IEvent
}

export const getEventsYesterday = async (): Promise<IEvent[]> => {
  return convertTotable<IEvent>((await (await client.query({ query: gql(listEventsYesterday) })).data.listEventsYesterday) as IEvent[])
}

export const getEventsToday = async (): Promise<IEvent[]> => {
  return convertTotable<IEvent>((await (await client.query({ query: gql(listEventsToday) })).data.listEventsToday) as IEvent[])
}

export const getEventsTomorrow = async (): Promise<IEvent[]> => {
  return convertTotable<IEvent>((await (await client.query({ query: gql(listEventsTomorrow) })).data.listEventsTomorrow) as IEvent[])
}
