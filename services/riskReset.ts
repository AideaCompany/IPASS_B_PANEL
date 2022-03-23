import client from '@/graphql/config'
import { listRiskReset } from '@/graphql/riskReset/queries/listRiskReset'
import { IRiskReset } from '@/types/types'
import { convertTotable } from '@/utils/utils'
import gql from 'graphql-tag'

export const getResetTime = async (): Promise<IRiskReset[]> => {
  client.cache.reset()
  return convertTotable<IRiskReset>(await (await client.query({ query: gql(listRiskReset) })).data.listRiskReset)
}
