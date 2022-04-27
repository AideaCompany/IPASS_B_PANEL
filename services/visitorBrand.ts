import client from '@/graphql/config'
import { listVisitorBrand } from '@/graphql/visitorBrand/queries/listVisitorBrand'
import { IVisitorBrand } from '@/types/interfaces/VistorBrand/VisitorBrand.interface'
import { convertTotable } from '@/utils/utils'
import gql from 'graphql-tag'

export const getAllVisitorBrand = async (): Promise<IVisitorBrand[]> => {
  client.cache.reset()
  return convertTotable<IVisitorBrand>((await (await client.query({ query: gql(listVisitorBrand) })).data.listVisitorBrand) as IVisitorBrand[])
}
