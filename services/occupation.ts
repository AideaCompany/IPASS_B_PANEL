import client from '@/graphql/config'
import { listOccupation } from '@/graphql/occupation/queries/listOccupation'
import { IApps } from '@/types/interfaces/Apps/Apps.interface'
import { convertTotable } from '@/utils/utils'
import gql from 'graphql-tag'

export const listOccupationFn = async (): Promise<IApps[]> => {
  client.cache.reset()
  return convertTotable<IApps>((await (await client.query({ query: gql(listOccupation) })).data.listOccupation) as IApps[])
}
