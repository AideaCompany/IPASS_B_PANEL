import { basicTable } from '@/types/typeTemplate'
import { graphqlFile, uploadedFile } from '..'

export interface IBrands extends basicTable {
  name: string
  logo: graphqlFile | uploadedFile
}
