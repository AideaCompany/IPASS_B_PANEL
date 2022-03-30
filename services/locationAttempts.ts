import client from '@/graphql/config'
import { analythicsAttempts } from '@/graphql/locationAttempt/queries/analythicsAttempts'
import { analythicsAttemptsByLocation } from '@/graphql/locationAttempt/queries/analythicsAttemptsByLocation'
import { listAttemptsAllExternal } from '@/graphql/locationAttempt/queries/listAttemptsAllExternal'
import { listAttemptsAllInternal } from '@/graphql/locationAttempt/queries/listAttemptsAllInternal'
import { listAttemptsMonthExternal } from '@/graphql/locationAttempt/queries/listAttemptsMonthExternal'
import { listAttemptsMonthInternal } from '@/graphql/locationAttempt/queries/listAttemptsMonthInternal'
import { listAttemptsToday } from '@/graphql/locationAttempt/queries/listAttemptsToday'
import { listAttemptsYesterday } from '@/graphql/locationAttempt/queries/listAttemptsYesterday'
import { listLocationAttempt } from '@/graphql/locationAttempt/queries/listLocationAttempt'
import { ILocationAttempt } from '@/types/interfaces/LocationAttempt/LocationAttemp.interface'
import { ILocationAttemptAnalythics } from '@/types/types'

import { gql } from 'apollo-boost'

export const listLocationAttempts = async (): Promise<ILocationAttempt[]> => {
  await client.cache.reset()
  return (await client.query({ query: gql(listLocationAttempt) })).data.listLocationAttempt as ILocationAttempt[]
}

export const listLocationAttemptsToday = async (): Promise<ILocationAttempt[]> => {
  await client.cache.reset()

  return (await client.query({ query: gql(listAttemptsToday) })).data.listAttemptsToday as ILocationAttempt[]
}

export const listLocationAttemptsYesterday = async (): Promise<ILocationAttempt[]> => {
  await client.cache.reset()

  return (await client.query({ query: gql(listAttemptsYesterday) })).data.listAttemptsYesterday as ILocationAttempt[]
}

export const listAttemptsMonthInternalFn = async (): Promise<ILocationAttempt[]> => {
  await client.cache.reset()

  return (await client.query({ query: gql(listAttemptsMonthInternal) })).data.listAttemptsMonthInternal as ILocationAttempt[]
}

export const listAttemptsMonthExternalFn = async (): Promise<ILocationAttempt[]> => {
  await client.cache.reset()
  return (await client.query({ query: gql(listAttemptsMonthExternal) })).data.listAttemptsMonthExternal as ILocationAttempt[]
}

export const listAttemptsAllInternalFn = async (): Promise<ILocationAttempt[]> => {
  return (await client.query({ query: gql(listAttemptsAllInternal) })).data.listAttemptsAllInternal as ILocationAttempt[]
}

export const listAttemptsAllExternalFn = async (): Promise<ILocationAttempt[]> => {
  await client.cache.reset()
  return (await client.query({ query: gql(listAttemptsAllExternal) })).data.listAttemptsAllExternal as ILocationAttempt[]
}

export const analythicsAttemptsFn = async (): Promise<ILocationAttemptAnalythics> => {
  await client.cache.reset()
  return (await client.query({ query: gql(analythicsAttempts) })).data.analythicsAttempts as ILocationAttemptAnalythics
}

export const analythicsAttemptsByLocationFn = async (month?: string): Promise<ILocationAttemptAnalythics> => {
  await client.cache.reset()
  return (await client.query({ query: gql(analythicsAttemptsByLocation), variables: { month: month ? month : null } })).data
    .analythicsAttemptsByLocation as ILocationAttemptAnalythics
}
