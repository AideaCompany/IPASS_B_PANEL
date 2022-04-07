import client from '@/graphql/config'
import { acceptEventExpress } from '@/graphql/eventExpress/mutations/acceptEventExpress'
import { createEventExpress } from '@/graphql/eventExpress/mutations/createEventExpress'
import { denyEventExpress } from '@/graphql/eventExpress/mutations/denyEventExpress'
import { sendQREventExpress } from '@/graphql/eventExpress/mutations/sendQREventExpress'
import { listEventExpress } from '@/graphql/eventExpress/queries/listEventExpress'
import { subListEventExpress } from '@/graphql/eventExpress/suscriptions/subListEventExpress'
import { IEventExpress } from '@/types/interfaces/EventExpress/eventExpress.interface'
import { ICreateEventExpress } from '@/types/interfaces/EventExpress/MutationEventeExpress.interface'
import { convertTotable } from '@/utils/utils'
import { gql } from 'apollo-boost'

export const listEventExpressFn = async (): Promise<IEventExpress[]> => {
  await client.cache.reset()
  return convertTotable<IEventExpress>((await client.query({ query: gql(listEventExpress) })).data.listEventExpress as IEventExpress[])
}

export const createEventExpressFn = async (input: { input: ICreateEventExpress }): Promise<IEventExpress> => {
  return (await client.mutate({ mutation: gql(createEventExpress), variables: { input } })).data.createEventExpress as IEventExpress
}

export const acceptEventExpressFn = async (_id: string): Promise<boolean> => {
  return (await client.mutate({ mutation: gql(acceptEventExpress), variables: { _id } })).data.acceptEventExpress as boolean
}

export const denyEventExpressFn = async (_id: string): Promise<boolean> => {
  return (await client.mutate({ mutation: gql(denyEventExpress), variables: { _id } })).data.denyEventExpress as boolean
}

export const sendQREventExpressFn = async (_id: string): Promise<boolean> => {
  return (await client.mutate({ mutation: gql(sendQREventExpress), variables: { _id } })).data.denyEventExpress as boolean
}

export const subListEventExpressFn = (after: (data: boolean) => void): ZenObservable.Subscription => {
  return client.subscribe({ query: gql(subListEventExpress) }).subscribe({
    next: ({ data }) => {
      after(data.subListEventExpress as boolean)
    },
    error(err) {
      throw new Error(String(err))
    }
  })
}
