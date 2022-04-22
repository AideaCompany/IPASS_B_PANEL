import { graphqlFile, uploadedFile } from 'interfaces'
import { Document } from 'mongoose'

export interface IBrands extends Document {
  name: string
  logo: graphqlFile | uploadedFile
}
