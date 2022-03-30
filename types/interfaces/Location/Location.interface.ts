import { operation, typeCheck } from '../index'
import { IMasterLocation } from 'interfaces/MasterLocation/MasterLocation.interface'
import { IUser } from 'interfaces/user/User.interface'
import { Document } from 'mongoose'
import { IDevice } from 'interfaces/Device/Device.interface'

export interface ILocation extends Document {
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
