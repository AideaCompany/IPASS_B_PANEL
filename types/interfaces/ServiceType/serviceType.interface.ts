import { graphqlFile, uploadedFile } from '..'
import { basicTable } from '@/types/typeTemplate'
import { IService } from '../services/Services.interface'

export interface IServiceType extends basicTable {
  name: string
  logo: graphqlFile | uploadedFile
  services: IService[]
}
