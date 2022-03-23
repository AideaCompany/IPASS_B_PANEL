import { verifyKey } from '@/graphql/Auth/queries/verifyKey'
import client from '@/graphql/config'
import { gql } from 'apollo-boost'

export const verifyKeyFn = async (key: string) => {
  await client.cache.reset()
  return (await client.query({ query: gql(verifyKey), variables: { key } })).data.verifyKey
}
