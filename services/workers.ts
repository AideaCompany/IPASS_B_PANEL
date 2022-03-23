import client from '@/graphql/config'
import { createMassiveWorker } from '@/graphql/worker/mutation/createMassiveWorker'
import { deleteTemporalQR } from '@/graphql/worker/mutation/deleteTemporalQR'
import { generateNewPermanentQR } from '@/graphql/worker/mutation/generateNewPermanentQR'
import { generateNewTemporalQR } from '@/graphql/worker/mutation/generateNewTemporalQR'
import { signUpWorker } from '@/graphql/worker/mutation/signUpWorker'
import { getWorker } from '@/graphql/worker/queries/getWorker'
import { listGroupWorkerIfExist } from '@/graphql/worker/queries/listGroupWorkerIfExist'
import { listWorker } from '@/graphql/worker/queries/listWorker'
import { IGroupWorker, IWorker, Paginated } from '@/types/types'
import { convertTotable } from '@/utils/utils'
import { gql } from '@apollo/client'

export const listWorkerFn = async (page: number, limit: number, filters: any): Promise<Paginated<IWorker>> => {
  client.cache.reset()
  const paginated = (await client.query({ query: gql(listWorker), variables: { limit, page, filters } })).data.listWorker as Paginated<IWorker>
  return paginated
}

export const confirmSignUpWorkerFn = async (input: any) => {
  client.cache.reset()
  return (await client.mutate({ mutation: gql(signUpWorker), variables: { input } })).data.signUpWorker
}

export const createMassiveWorkerFn = async (input: any): Promise<any[]> => {
  client.cache.reset()
  return convertTotable<IWorker>(await (await client.mutate({ mutation: gql(createMassiveWorker), variables: { input } })).data.createMassiveWorker)
}

export const generateNewTemporalQRFn = async (_id: string): Promise<boolean> => {
  client.cache.reset()
  return (await client.mutate({ mutation: gql(generateNewTemporalQR), variables: { _id } })).data.generateNewTemporalQR
}
export const generateNewPermanentQRFn = async (_id: string): Promise<boolean> => {
  client.cache.reset()
  return (await client.mutate({ mutation: gql(generateNewPermanentQR), variables: { _id } })).data.generateNewTemporalQR
}

export const deleteTemporalQRFn = async (_id: string): Promise<boolean> => {
  client.cache.reset()
  return (await client.mutate({ mutation: gql(deleteTemporalQR), variables: { _id } })).data.deleteTemporalQR
}

export const listGroupWorkerIfExistFn = async (): Promise<IGroupWorker[]> => {
  client.cache.reset()
  return convertTotable((await client.query({ query: gql(listGroupWorkerIfExist) })).data.listGroupWorkerIfExist)
}

export const getWorkerFn = async (id: string): Promise<IWorker> => {
  client.cache.reset()
  return (await client.query({ query: gql(getWorker), variables: { _id: id } })).data.getWorker
}
