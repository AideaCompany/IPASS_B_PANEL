import client from '@/graphql/config'
import { gql } from '@apollo/client'
import { convertTotable } from '@/utils/utils'
import { createProduct } from '@/graphql/product/mutation/createProduct'
import { IProduct } from '@/types/interfaces/Product/Product.interface'
import { listProduct } from '@/graphql/product/queries/listProduct'
import { ICreateProduct, IUpdateProduct } from '@/types/interfaces/Product/MutationProduct.interface'
import { updateProduct } from '@/graphql/product/mutation/updateProduct'
import { getProduct } from '@/graphql/product/queries/getProduct'

export const getAllProductsFn = async (): Promise<IProduct[]> => {
  client.cache.reset()
  return convertTotable<IProduct>(await (await client.query({ query: gql(listProduct) })).data.listProduct)
}

export const createProductFn = async (input: ICreateProduct): Promise<IProduct> => {
  client.cache.reset()
  return (await client.mutate({ mutation: gql(createProduct), variables: { input } })).data.createProduct
}

export const updateProductFn = async (input: IUpdateProduct): Promise<IProduct> => {
  client.cache.reset()
  return (await client.mutate({ mutation: gql(updateProduct), variables: { input } })).data.updateProduct
}

export const getProductFn = async (_id: string): Promise<IProduct> => {
  client.cache.reset()
  return await (
    await client.query({ query: gql(getProduct), variables: { _id } })
  ).data.getProduct
}
