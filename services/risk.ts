import client from '@/graphql/config'
import { listRisk } from '@/graphql/risk/queries/listRisk'
import { IRisk } from '@/types/types'
import { convertTotable } from '@/utils/utils'
import gql from 'graphql-tag'

export const getAllRisks = async (): Promise<IRisk[]> => {
  client.cache.reset()
  return convertTotable<IRisk>(await (await client.query({ query: gql(listRisk) })).data.listRisk)
}
