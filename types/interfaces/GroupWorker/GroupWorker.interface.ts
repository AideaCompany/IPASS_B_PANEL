import { basicTable } from '@/types/typeTemplate'
import { ILocation } from '../Location/Location.interface'

export interface IGroupWorker extends basicTable {
  name: string
  location: ILocation[] | string[]
  exists: boolean
  abbreviation: string
}
