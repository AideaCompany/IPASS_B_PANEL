import client from '@/graphql/config'
import { gql } from '@apollo/client'
import { convertTotable } from '@/utils/utils'

<<<<<<< HEAD
import { IServiceType } from '@/types/types'
import { listServiceType } from '@/graphql/serviceType/queries/listServiceType'
=======
import { listServiceType } from '@/graphql/serviceType/queries/listServiceType'
import { IServiceType } from '@/types/interfaces/ServiceType/serviceType.interface'
>>>>>>> dev

export const getAllServiceTypesFn = async (): Promise<IServiceType[]> => {
  client.cache.reset()
  return convertTotable<IServiceType>(await (await client.query({ query: gql(listServiceType) })).data.listServiceType)
}
