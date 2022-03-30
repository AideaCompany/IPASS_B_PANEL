import client from '@/graphql/config'
import { listEventHistory } from '@/graphql/history/queries/listEventHistory'
import { listHistoryUser } from '@/graphql/history/queries/listHistoryUser'
import { IEvent } from '@/types/interfaces/Event/event.interface'
import { IHistoryUser } from '@/types/interfaces/HistoryUser/HistoryUser.interface'

import { convertTotable } from '@/utils/utils'
import { gql } from '@apollo/client'

export const getAllHistoryUser = async (): Promise<IHistoryUser[]> => {
  return convertTotable<IHistoryUser>((await (await client.query({ query: gql(listHistoryUser) })).data.listHistoryUser) as IHistoryUser[])
}

export const getAllEventsHistory = async (): Promise<IEvent[]> => {
  return convertTotable<IEvent>((await (await client.query({ query: gql(listEventHistory) })).data.listEventHistory) as IEvent[])
}
