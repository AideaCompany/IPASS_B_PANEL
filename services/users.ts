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
import { FilterType, IPaginated } from '@/types/interfaces/graphqlTypes'
import { IUser } from '@/types/interfaces/user/User.interface'

import { convertTotable } from '@/utils/utils'
import { gql } from '@apollo/client'

export const getUsersAdminFn = async (): Promise<IUser[]> => {
  return convertTotable<IUser>((await (await client.query({ query: gql(getUsersAdmin) })).data.getUsersAdmin) as IUser[])
}
export const getAllUsers = async (page: number, limit: number, filters: FilterType): Promise<IPaginated<IUser>> => {
  client.cache.reset()
  const paginated: IPaginated<IUser> = await (await client.query({ query: gql(listUser), variables: { limit, page, filters } })).data.listUser
  return paginated
}

export const listAllUsersFn = async (): Promise<IUser[]> => {
  client.cache.reset()
  return convertTotable<IUser>((await (await client.query({ query: gql(listAllUsers) })).data.listAllUsers) as IUser[])
}

export const getUserFn = async (_id: string): Promise<IUser> => {
  client.cache.reset()
  return (await client.query({ query: gql(getUser), variables: { _id } })).data.getUser as IUser
}

export const getAllHostUsers = async (): Promise<IUser[]> => {
  client.cache.reset()
  return convertTotable<IUser>((await (await client.query({ query: gql(getUserHost) })).data.getUserHost) as IUser[])
}

export const getAllSecurityUsers = async (): Promise<IUser[]> => {
  client.cache.reset()
  return (await client.query({ query: gql(getUsersSecurity) })).data.getUsersSecurity as IUser[]
}

export const verifyKeyUserFn = async (): Promise<boolean> => {
  client.cache.reset()
  return (await client.query({ query: gql(verifyKeyUser) })).data.verifyKeyUser as boolean
}

export const addKeyUserFn = async (key: string): Promise<boolean> => {
  client.cache.reset()
  return (await client.mutate({ mutation: gql(addKeyUser), variables: { key } })).data.addKeyUser as boolean
}

export const countUserWorkerFn = async (): Promise<number> => {
  client.cache.reset()
  return (await client.query({ query: gql(countUserWorker) })).data.countUserWorker as number
}

export const resetTokenFn = async (_id: string, type: string): Promise<boolean> => {
  await client.cache.reset()
  return (await client.mutate({ mutation: gql(resetToken), variables: { _id, type } })).data.resetToken as boolean
}
