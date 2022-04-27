import { ITimeZone } from '../TimeZone/TimeZone.interface'

export interface ICreateStores {
  name: string
  address: string
  schedule: string | ITimeZone
}

export interface IUpdateStores {
  _id: string
  name: string
  address: string
  schedule: string | ITimeZone
}
