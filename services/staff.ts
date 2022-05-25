import client from '@/graphql/config'
import { createMassiveStaff } from '@/graphql/Staff/mutation/createMassiveStaff'
import { createStaff } from '@/graphql/Staff/mutation/createStaff'
import { signUpStaff } from '@/graphql/Staff/mutation/signUpStaff'
import { updateStaff } from '@/graphql/Staff/mutation/updateStaff'
import { getStaff } from '@/graphql/Staff/queries/getStaff'
import { listStaff } from '@/graphql/Staff/queries/listStaff'
import { IPaginated, IResponseMassive } from '@/types/interfaces/graphqlTypes'
import { ICreateStaff, IUpdateStaff } from '@/types/interfaces/staff/mutationStaff.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { gql } from '@apollo/client'

export const listStaffFn = async (page: number, limit: number, filters: { [value: string]: string }): Promise<IPaginated<IStaff>> => {
  client.cache.reset()
  const paginated = (await client.query({ query: gql(listStaff), variables: { limit, page, filters } })).data.listStaff as IPaginated<IStaff>
  return paginated
}

export const confirmSignUpStaffFn = async (input: { password: string; _id: string }): Promise<{ token: string }> => {
  client.cache.reset()
  return (await client.mutate({ mutation: gql(signUpStaff), variables: { input } })).data.signUpStaff as { token: string }
}

export const createMassiveStaffFn = async (input: ICreateStaff[]): Promise<IResponseMassive[]> => {
  client.cache.reset()
  return (await (
    await client.mutate({ mutation: gql(createMassiveStaff), variables: { input } })
  ).data.createMassiveStaff) as IResponseMassive[]
}

export const getStaffFn = async (_id: string): Promise<IStaff> => {
  client.cache.reset()
  return (await client.query({ query: gql(getStaff), variables: { _id } })).data.getStaff as IStaff
}

export const createStaffFn = async (input: ICreateStaff): Promise<IStaff> => {
  client.cache.reset()
  return (await client.mutate({ mutation: gql(createStaff), variables: { input } })).data.createStaff as IStaff
}

export const updateStaffFn = async (input: IUpdateStaff): Promise<IStaff> => {
  client.cache.reset()
  return (await client.mutate({ mutation: gql(updateStaff), variables: { input } })).data.updateStaff as IStaff
}
