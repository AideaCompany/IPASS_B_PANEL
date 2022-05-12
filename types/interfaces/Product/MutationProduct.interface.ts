import { graphqlFile, uploadedFile } from '..'
import { IService } from '../services/Services.interface'

export interface ICreateProduct {
  name: string
  abbreviation: string
  brand: string
  photo: uploadedFile | graphqlFile
  productType: string
  price: number
  measureType: string
  amount: number
  services: IService[] | string[]
  designedFor: string
}

export interface IUpdateProduct {
  _id: string
  name: string
  abbreviation: string
  brand: string
  photo: uploadedFile | graphqlFile
  productType: string
  price: number
  measureType: string
  amount: number
  services: IService[] | string[]
  designedFor: string
}
