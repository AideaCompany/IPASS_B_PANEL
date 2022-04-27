import { graphqlFile, uploadedFile } from '..'

export interface ICreateBrands {
  name: string
  logo: graphqlFile | uploadedFile
}

export interface IUpdateBrands {
  _id: string
  name: string
  logo: graphqlFile | uploadedFile
}
