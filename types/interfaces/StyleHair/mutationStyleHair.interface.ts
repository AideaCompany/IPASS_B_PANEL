import { graphqlFile, uploadedFile } from '../index'

export interface ICreateStyleHair {
  name: string
  photo: graphqlFile | uploadedFile
}

export interface IUpdateStyleHair {
  _id: string
  name: string
  photo: graphqlFile | uploadedFile
}
