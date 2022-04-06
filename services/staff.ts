import client from '@/graphql/config'
import { createMassiveStaff } from '@/graphql/Staff/mutation/createMassiveStaff'
import { signUpStaff } from '@/graphql/Staff/mutation/signUpStaff'
import { getStaff } from '@/graphql/Staff/queries/getStaff'
import { listStaff } from '@/graphql/Staff/queries/listStaff'
import { IPaginated, IResponseMassive } from '@/types/interfaces/graphqlTypes'
import { ICreateStaff } from '@/types/interfaces/staff/mutationStaff.interface'
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

export const createMassiveStaffFn = async (input: { input: ICreateStaff[] }): Promise<IResponseMassive[]> => {
  client.cache.reset()
  return (await (
    await client.mutate({ mutation: gql(createMassiveStaff), variables: { input } })
  ).data.createMassiveStaff) as IResponseMassive[]
}

// export const generateNewTemporalQRFn = async (_id: string): Promise<boolean> => {
//   client.cache.reset()
//   return (await client.mutate({ mutation: gql(gen), variables: { _id } })).data.generateNewTemporalQR
// }

// export const generateNewPermanentQRFn = async (_id: string): Promise<boolean> => {
//   client.cache.reset()
//   return (await client.mutate({ mutation: gql(generateNewPermanentQR), variables: { _id } })).data.generateNewTemporalQR
// }

// export const deleteTemporalQRFn = async (_id: string): Promise<boolean> => {
//   client.cache.reset()
//   return (await client.mutate({ mutation: gql(deleteTemporalQR), variables: { _id } })).data.deleteTemporalQR
// }

// export const listGroupWorkerIfExistFn = async (): Promise<IGroupWorker[]> => {
//   client.cache.reset()
//   return convertTotable<IStaff>((await client.query({ query: gql(listGroupWorkerIfExist) })).data.listGroupWorkerIfExist)
// }

export const getStaffFn = async (id: string): Promise<IStaff> => {
  client.cache.reset()
  return (await client.query({ query: gql(getStaff), variables: { _id: id } })).data.getStaff as IStaff
}
