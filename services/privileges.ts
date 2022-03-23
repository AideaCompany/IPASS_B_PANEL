import client from '@/graphql/config'
import { listPrivilege } from '@/graphql/queries'
import { Privilege } from '@/types/types'
import { convertTotable } from '@/utils/utils'
import gql from 'graphql-tag'

export const listPrivilegeFn = async (): Promise<Privilege[]> => {
  client.cache.reset()
  return convertTotable<Privilege>(await (await client.query({ query: gql(listPrivilege) })).data.listPrivilege)
}
