import client from '@/graphql/config'
import { listTimeZone } from '@/graphql/timeZone/queries/listTimeZone'
import { iTimeZone } from '@/types/types'
import { convertTotable } from '@/utils/utils'
import gql from 'graphql-tag'

export const listTimeZonesFn = async () => {
  try {
    await client.cache.reset()
    return convertTotable<iTimeZone>((await client.query({ query: gql(listTimeZone) })).data.listTimeZone)
  } catch (error: any) {
    throw new Error(error.message)
  }
}
