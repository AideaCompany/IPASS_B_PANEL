import { graphqlFile, uploadedFile } from 'interfaces'

export interface ICreateBrands {
  name: string
  logo: graphqlFile | uploadedFile
}

export interface IUpdateBrands {
  _id: string
  name: string
  logo: graphqlFile | uploadedFile
}
