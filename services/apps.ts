import { listApps } from '@/graphql/apps/queries/listApps'
import client from '@/graphql/config'
import { IApps } from '@/types/types'
import { convertTotable } from '@/utils/utils'
import gql from 'graphql-tag'

export const getAllApps = async (): Promise<IApps[]> => {
  client.cache.reset()
  return convertTotable<IApps>(await (await client.query({ query: gql(listApps) })).data.listApps)
}
