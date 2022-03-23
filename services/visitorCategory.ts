import client from '@/graphql/config'
import { listVisitorCategory } from '@/graphql/visitorCategory/queries/listVisitorCategory'
import { IVisitorCategory } from '@/types/types'
import { convertTotable } from '@/utils/utils'
import gql from 'graphql-tag'

export const getAllVisitorCategory = async (): Promise<IVisitorCategory[]> => {
  client.cache.reset()
  return convertTotable<IVisitorCategory>(await (await client.query({ query: gql(listVisitorCategory) })).data.listVisitorCategory)
}
