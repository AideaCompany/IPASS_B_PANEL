import client from '@/graphql/config'
import { getConfig } from '@/graphql/config/getConfig'
import { IConfig } from '@/types/interfaces/config/Config.interface'
import gql from 'graphql-tag'

export const getConfigFn = async (): Promise<IConfig> => {
  client.cache.reset()
  return (await client.query({ query: gql(getConfig) })).data.getConfig as IConfig
}
