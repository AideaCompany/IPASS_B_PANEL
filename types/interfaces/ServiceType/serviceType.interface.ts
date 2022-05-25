import { graphqlFile, uploadedFile } from '..'
import { basicTable } from '@/types/typeTemplate'

export interface IServiceType extends basicTable {
  name: string
  logo: graphqlFile | uploadedFile
}
