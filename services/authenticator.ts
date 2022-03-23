import { generateExcelAuthenticator } from '@/graphql/authenticator/mutations/generateExcelAuthenticator'
import { generatePDFAuthenticator } from '@/graphql/authenticator/mutations/generatePDFAuthenticator'
import { listAuthenticator } from '@/graphql/authenticator/queries/listAuthenticator'
import client from '@/graphql/config'
import { IAuthenticator, Paginated } from '@/types/types'
import gql from 'graphql-tag'

export const getAllAuthenticator = async (page: number, limit: number, filters: any): Promise<Paginated<IAuthenticator>> => {
  client.cache.reset()
  return await (
    await client.query({ query: gql(listAuthenticator), variables: { limit, page, filters } })
  ).data.listAuthenticator
}

export const generateExcelAuthenticatorFn = async (filters: any): Promise<string> => {
  client.cache.reset()
  return await (
    await client.mutate({ mutation: gql(generateExcelAuthenticator), variables: { limit: 0, page: 1, filters } })
  ).data.generateExcelAuthenticator
}
export const generatePDFAuthenticatorFn = async (filters: any): Promise<string> => {
  client.cache.reset()
  return await (
    await client.mutate({ mutation: gql(generatePDFAuthenticator), variables: { limit: 0, page: 1, filters } })
  ).data.generatePDFAuthenticator
}
