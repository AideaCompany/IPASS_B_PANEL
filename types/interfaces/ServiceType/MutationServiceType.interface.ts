import { graphqlFile, uploadedFile } from '..'

export interface ICreateServiceType {
  name: string
  logo: graphqlFile | uploadedFile
}

export interface IUpdateServiceType {
  _id: string
  name: string
  logo: graphqlFile | uploadedFile
}
