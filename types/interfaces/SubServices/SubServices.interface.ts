import { fileType } from 'interfaces'
import { IProducts } from 'interfaces/services/Services.interface'
import { IStaff } from 'interfaces/staff/staff.interface'
import { IStores } from 'interfaces/Stores/stores.interface'
import { Document } from 'mongoose'

export interface ISubService extends Document {
  plus: boolean
  abbreviation: string
  name: string
  products: IProducts[]
  photo: fileType
  staffers: string[] | IStaff[]
  eta: string
  price: number
  cost: number
  subServiceFee: number
  taxes: number
  discounts: number
  subServiceTime: number
  returnTime: number
  stores: IStores[] | string[]
}
