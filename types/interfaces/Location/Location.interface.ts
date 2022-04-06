import { operation, typeCheck } from '../index'
import { IMasterLocation } from '../MasterLocation/MasterLocation.interface'
import { IUser } from '../user/User.interface'
import { IDevice } from '../Device/Device.interface'
import { basicTable } from '@/types/typeTemplate'

export interface ILocation extends basicTable {
  _id: string
  masterLocation: IMasterLocation | string
  childLocations: string[] | ILocation[]
  parentLocations: string[] | ILocation[]
  address: string
  name: string
  admins: IUser[] | string[]
  operation?: operation
  typeCheck: typeCheck
  device: IDevice
  host: IUser[] | string[]
  security: IUser[] | string[]
  state: string
  deletedDate: Date
  whoDeleted: IUser | string
  abbreviation: string
  empresa: string
}
