import client from '@/graphql/config'
import { gql } from '@apollo/client'
import { convertTotable } from '@/utils/utils'
import { listProduct } from '@/graphql/product/queries/listProduct'
import { IProduct } from '@/types/types'

export const getAllProductsFn = async (): Promise<IProduct[]> => {
  client.cache.reset()
  return convertTotable<IProduct>(await (await client.query({ query: gql(listProduct) })).data.listProduct)
}
