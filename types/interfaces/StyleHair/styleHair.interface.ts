import { Document } from 'mongoose'
import { graphqlFile, uploadedFile } from '../index'

export interface IStyleHair extends Document {
  _id: string
  name: string
  photo: graphqlFile | uploadedFile
  question: string
  text: string
}
