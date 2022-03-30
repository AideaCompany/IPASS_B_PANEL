import { generateExcelAuthenticator } from '@/graphql/authenticator/mutations/generateExcelAuthenticator'
import { generatePDFAuthenticator } from '@/graphql/authenticator/mutations/generatePDFAuthenticator'
import { listAuthenticator } from '@/graphql/authenticator/queries/listAuthenticator'
import client from '@/graphql/config'
import { IAuthenticator } from '@/types/interfaces/Authenticator/Authenticator.interface'
import { FilterType, IPaginated } from '@/types/interfaces/graphqlTypes'

import gql from 'graphql-tag'

export const getAllAuthenticator = async (page: number, limit: number, filters: FilterType): Promise<IPaginated<IAuthenticator>> => {
  client.cache.reset()
  return (await (
    await client.query({ query: gql(listAuthenticator), variables: { limit, page, filters } })
  ).data.listAuthenticator) as IPaginated<IAuthenticator>
}

export const generateExcelAuthenticatorFn = async (filters: FilterType): Promise<string> => {
  client.cache.reset()
  return (await (
    await client.mutate({ mutation: gql(generateExcelAuthenticator), variables: { limit: 0, page: 1, filters } })
  ).data.generateExcelAuthenticator) as string
}
export const generatePDFAuthenticatorFn = async (filters: FilterType): Promise<string> => {
  client.cache.reset()
  return (await (
    await client.mutate({ mutation: gql(generatePDFAuthenticator), variables: { limit: 0, page: 1, filters } })
  ).data.generatePDFAuthenticator) as string
}
