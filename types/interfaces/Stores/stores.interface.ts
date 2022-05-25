import { basicTable } from '@/types/typeTemplate'
import { ITimeZone } from '../TimeZone/TimeZone.interface'

export interface IStores extends basicTable {
  name: string
  address: string
  schedule: string[] | ITimeZone[]
}
