import { Days } from './TimeZone.interface'

export interface ICreateTimeZone {
  name: string
  start: string
  abbreviation: string
  end: string
  days: Days[]
}

export interface IUpdateTimeZone {
  _id: string
  name: string
  start: string
  abbreviation: string
  end: string
  days: Days[]
}
