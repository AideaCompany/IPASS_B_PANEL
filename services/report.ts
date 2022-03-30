import client from '@/graphql/config'
import { generatePDFLocationEntries } from '@/graphql/report/mutation/generatePDFLocationEntries'
import { generaReportBreach } from '@/graphql/report/queries/generaReportBreach'
import { generaReportBreachPDF } from '@/graphql/report/queries/generaReportBreachPDF'
import { generateReportLocationEntries } from '@/graphql/report/queries/generateReportLocationEntries'
import { FilterType } from '@/types/interfaces/graphqlTypes'
import { ILocationEntries } from '@/types/interfaces/ILocationEntries/LocationEntries.interface'
import { gql } from 'apollo-boost'

export const generateReport = async (page: number, limit: number, filters: FilterType): Promise<ILocationEntries[]> => {
  client.cache.reset()
  return (await client.query({ query: gql(generateReportLocationEntries), variables: { page, limit, filters } })).data
    .generateReportLocationEntries as ILocationEntries[]
}

export const generateReportPDF = async (page: number, limit: number, filters: FilterType): Promise<ILocationEntries[]> => {
  client.cache.reset()
  return (await client.mutate({ mutation: gql(generatePDFLocationEntries), variables: { page, limit, filters } })).data
    .generatePDFLocationEntries as ILocationEntries[]
}

export const generaReportBreachFn = async (page: number, limit: number, filters: FilterType): Promise<ILocationEntries[]> => {
  client.cache.reset()
  return (await client.query({ query: gql(generaReportBreach), variables: { page, limit, filters } })).data.generaReportBreach as ILocationEntries[]
}

export const generaReportBreachPDFFn = async (page: number, limit: number, filters: FilterType): Promise<ILocationEntries[]> => {
  client.cache.reset()
  return (await client.query({ query: gql(generaReportBreachPDF), variables: { page, limit, filters } })).data
    .generaReportBreachPDF as ILocationEntries[]
}
