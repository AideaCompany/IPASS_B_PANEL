import { IVisitorCategory } from '../VisitorCategory/VisitorCategory.interface'
import { graphqlFile, uploadedFile } from '../index'

export interface ICreateVisitorBrand {
  name: string
  photo: graphqlFile | uploadedFile
  category: IVisitorCategory
}

export interface IUpdateVisitorBrand {
  _id: string
  name: string
  photo: graphqlFile | uploadedFile
  category: IVisitorCategory
}
