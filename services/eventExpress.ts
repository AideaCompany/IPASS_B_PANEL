import client from '@/graphql/config'
import { acceptEventExpress } from '@/graphql/eventExpress/mutations/acceptEventExpress'
import { createEventExpress } from '@/graphql/eventExpress/mutations/createEventExpress'
import { denyEventExpress } from '@/graphql/eventExpress/mutations/denyEventExpress'
import { sendQREventExpress } from '@/graphql/eventExpress/mutations/sendQREventExpress'
import { listEventExpress } from '@/graphql/eventExpress/queries/listEventExpress'
import { subListEventExpress } from '@/graphql/eventExpress/suscriptions/subListEventExpress'
import { IEventExpress } from '@/types/types'
import { convertTotable } from '@/utils/utils'
import { gql } from 'apollo-boost'

export const listEventExpressFn = async (): Promise<IEventExpress[]> => {
  await client.cache.reset()
  return convertTotable<IEventExpress>((await client.query({ query: gql(listEventExpress) })).data.listEventExpress)
}

export const createEventExpressFn = async (input: any) => {
  return (await client.mutate({ mutation: gql(createEventExpress), variables: { input } })).data.createEventExpress
}

export const acceptEventExpressFn = async (_id: string) => {
  return (await client.mutate({ mutation: gql(acceptEventExpress), variables: { _id } })).data.acceptEventExpress
}

export const denyEventExpressFn = async (_id: string) => {
  return (await client.mutate({ mutation: gql(denyEventExpress), variables: { _id } })).data.denyEventExpress
}

export const sendQREventExpressFn = async (_id: string) => {
  return (await client.mutate({ mutation: gql(sendQREventExpress), variables: { _id } })).data.denyEventExpress
}

export const subListEventExpressFn = async (after: (data: boolean) => void) => {
  return client.subscribe({ query: gql(subListEventExpress) }).subscribe({
    next: ({ data }) => {
      after(data.subListEventExpress)
    },
    error(err) {
      console.log('err', err)
    }
  })
}
