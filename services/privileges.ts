import client from '@/graphql/config'
import { listPrivilege } from '@/graphql/queries'
import { IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'

import { convertTotable } from '@/utils/utils'
import gql from 'graphql-tag'

export const listPrivilegeFn = async (): Promise<IPrivilege[]> => {
  client.cache.reset()
  return convertTotable<IPrivilege>((await (await client.query({ query: gql(listPrivilege) })).data.listPrivilege) as IPrivilege[])
}
