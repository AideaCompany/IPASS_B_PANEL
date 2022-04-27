import client from '@/graphql/config'
import { listTimeZone } from '@/graphql/timeZone/queries/listTimeZone'
import { ITimeZone } from '@/types/interfaces/TimeZone/TimeZone.interface'

import { convertTotable } from '@/utils/utils'
import gql from 'graphql-tag'

export const listTimeZonesFn = async (): Promise<ITimeZone[]> => {
  await client.cache.reset()
  return convertTotable<ITimeZone>((await client.query({ query: gql(listTimeZone) })).data.listTimeZone as ITimeZone[])
}
