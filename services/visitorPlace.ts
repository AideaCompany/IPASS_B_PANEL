import client from '@/graphql/config'
import { listVisitorPlace } from '@/graphql/visitorPlace/queries/listVisitorPlace'
import { IVisitorPlace } from '@/types/types'
import { convertTotable } from '@/utils/utils'
import gql from 'graphql-tag'

export const getAllVisitorPlace = async (): Promise<IVisitorPlace[]> => {
  client.cache.reset()
  return convertTotable<IVisitorPlace>(await (await client.query({ query: gql(listVisitorPlace) })).data.listVisitorPlace)
}
