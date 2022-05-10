import { graphqlFile, uploadedFile } from 'interfaces'

export interface ICreateServiceType {
  name: string
  logo: graphqlFile | uploadedFile
}

export interface IUpdateServiceType {
  _id: string
  name: string
  logo: graphqlFile | uploadedFile
}
