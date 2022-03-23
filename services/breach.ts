import { listBreach } from '@/graphql/breach/queries/listBreach'
import { listBreachLast2DaysApp } from '@/graphql/breach/queries/listBreachLast2DaysApp'
import client from '@/graphql/config'
import { IBreach, Paginated } from '@/types/types'
import { convertTotable } from '@/utils/utils'
import gql from 'graphql-tag'

export const getAllBreach = async (): Promise<IBreach[]> => {
  client.cache.reset()
  return convertTotable<IBreach>(await (await client.query({ query: gql(listBreach) })).data.listBreach)
}

export const getAllBreach2Days = async (page: number, limit: number, filters: any): Promise<Paginated<IBreach>> => {
  client.cache.reset()
  return await (
    await client.query({ query: gql(listBreachLast2DaysApp), variables: { limit, page, filters } })
  ).data.listBreachLast2DaysApp
}
