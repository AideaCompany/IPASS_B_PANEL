import { ITimeZone } from 'interfaces/TimeZone/TimeZone.interface'
import { Types } from 'mongoose'
export interface ICreateStores {
  name: string
  address: string
  schedule: Types.ObjectId | ITimeZone
}

export interface IUpdateStores {
  _id: string
  name: string
  address: string
  schedule: Types.ObjectId | ITimeZone
}
