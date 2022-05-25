import { graphqlFile, uploadedFile } from '..'
import { IServiceType } from '../ServiceType/serviceType.interface'
import { ISubService } from '../SubServices/SubServices.interface'
import { IProducts } from './Services.interface'

export interface ICreateService {
  plus: boolean
  abbreviation: string
  name: string
  type: string
  products: IProducts[]
  photo: uploadedFile | graphqlFile
  staffers: string[]
  eta: string
  price: number
  cost: number
  serviceFee: number
  taxes: number
  discounts: number
  serviceTime: number
  returnTime: number
  sex: string
  stores: string[]
  subService: string[]
}

export interface IUpdateService {
  _id: string
  plus: boolean
  abbreviation: string
  name: string
  type: IServiceType | string
  products: IProducts[]
  photo: uploadedFile | graphqlFile
  staffers: string[]
  eta: string
  price: number
  cost: number
  serviceFee: number
  taxes: number
  discounts: number
  serviceTime: number
  returnTime: number
  sex: string
  stores: string[]
  subService: ISubService[] | string
}
