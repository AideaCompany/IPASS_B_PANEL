import { basicTable } from '@/types/typeTemplate'
import { uploadedFile } from '..'
import { IProducts } from '../services/Services.interface'
import { IServiceType } from '../ServiceType/serviceType.interface'
import { IStaff } from '../staff/staff.interface'
import { IStores } from '../Stores/stores.interface'

export interface ISubService extends basicTable {
  plus: boolean
  abbreviation: string
  name: string
  type: IServiceType | string
  products: IProducts[]
  photo: uploadedFile
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
