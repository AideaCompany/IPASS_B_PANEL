import client from '@/graphql/config'
import { addKeyUser } from '@/graphql/user/mutation/addKeyUser'
import { countUserWorker } from '@/graphql/user/queries/countUserWorker'
import { getUserHost } from '@/graphql/user/queries/getHostUsers'
import { getUser } from '@/graphql/user/queries/getUser'
import { getUsersAdmin } from '@/graphql/user/queries/getUsersAdmin'
import { getUsersSecurity } from '@/graphql/user/queries/getUsersSecurity'
import { listAllUsers } from '@/graphql/user/queries/listAllUsers'
import { listUser } from '@/graphql/user/queries/listUser'
import { resetToken } from '@/graphql/user/queries/resetToken'
import { verifyKeyUser } from '@/graphql/user/queries/verifyKeyUser'
import { Paginated, User } from '@/types/types'
import { convertTotable } from '@/utils/utils'
import { gql } from '@apollo/client'

export const getUsersAdminFn = async (): Promise<User[]> => {
  return convertTotable<User>(await (await client.query({ query: gql(getUsersAdmin) })).data.getUsersAdmin)
}
export const getAllUsers = async (page: number, limit: number, filters: any): Promise<Paginated<User>> => {
  client.cache.reset()
  const paginated = await (await client.query({ query: gql(listUser), variables: { limit, page, filters } })).data.listUser
  return paginated
}

export const listAllUsersFn = async (): Promise<User[]> => {
  client.cache.reset()
  return convertTotable<User>(await (await client.query({ query: gql(listAllUsers) })).data.listAllUsers)
}

export const getUserFn = async (_id: string): Promise<User> => {
  client.cache.reset()
  return (await client.query({ query: gql(getUser), variables: { _id } })).data.getUser
}

export const getAllHostUsers = async (): Promise<User[]> => {
  client.cache.reset()
  return convertTotable<User>(await (await client.query({ query: gql(getUserHost) })).data.getUserHost)
}

export const getAllSecurityUsers = async (): Promise<User[]> => {
  client.cache.reset()
  return (await client.query({ query: gql(getUsersSecurity) })).data.getUsersSecurity
}

export const verifyKeyUserFn = async () => {
  client.cache.reset()
  return (await client.query({ query: gql(verifyKeyUser) })).data.verifyKeyUser
}

export const addKeyUserFn = async (key: string) => {
  client.cache.reset()
  return (await client.mutate({ mutation: gql(addKeyUser), variables: { key } })).data.addKeyUser
}

export const countUserWorkerFn = async () => {
  client.cache.reset()
  return (await client.query({ query: gql(countUserWorker) })).data.countUserWorker
}

export const resetTokenFn = async (_id: string, type: string) => {
  await client.cache.reset()
  return (await client.mutate({ mutation: gql(resetToken), variables: { _id, type } })).data.resetToken
}
