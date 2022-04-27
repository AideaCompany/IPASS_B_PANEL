import { basicTable } from '@/types/typeTemplate'
import { graphqlFile, uploadedFile } from '../index'

export interface IStyleHair extends basicTable {
  _id: string
  name: string
  photo: graphqlFile | uploadedFile
  question: string
  text: string
}
