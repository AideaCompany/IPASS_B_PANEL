import { generalAnalythics } from '@/graphql/analythics/queries/generalAnalythics'
import client from '@/graphql/config'
import { iGeneralAnalythics } from '@/types/types'
import { gql } from 'apollo-boost'

export const generalAnalythicsFn = async (): Promise<iGeneralAnalythics> => {
  await client.cache.reset()
  return await (
    await client.query({ query: gql(generalAnalythics) })
  ).data.generalAnalythics
}
