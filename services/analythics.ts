import { generalAnalythics } from '@/graphql/analythics/queries/generalAnalythics'
import client from '@/graphql/config'
import { IGeneralAnalythics } from '@/types/types'

import { gql } from 'apollo-boost'

export const generalAnalythicsFn = async (): Promise<IGeneralAnalythics> => {
  await client.cache.reset()
  return (await (
    await client.query({ query: gql(generalAnalythics) })
  ).data.generalAnalythics) as IGeneralAnalythics
}
