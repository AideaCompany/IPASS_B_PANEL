import { graphqlFile, uploadedFile } from 'interfaces'
import { IProducts } from 'interfaces/services/Services.interface'

export interface ICreateSubService {
  plus: boolean
  abbreviation: string
  name: string
  products: IProducts[]
  photo: uploadedFile | graphqlFile
  staffers: string[]
  eta: string
  price: number
  cost: number
  subServiceFee: number
  taxes: number
  discounts: number
  subServiceTime: number
  returnTime: number
  stores: string[]
}

export interface IUpdateSubService {
  plus: boolean
  abbreviation: string
  name: string
  products: IProducts[]
  photo: uploadedFile | graphqlFile
  staffers: string[]
  eta: string
  price: number
  cost: number
  subServiceFee: number
  taxes: number
  discounts: number
  subServiceTime: number
  returnTime: number
  stores: string[]
}
