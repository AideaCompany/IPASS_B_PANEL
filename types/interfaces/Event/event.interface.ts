import { IUser } from '../user/User.interface'
import { ILocation } from '../Location/Location.interface'
import { basicTable } from '@/types/typeTemplate'

export interface IEvent extends basicTable {
  name: string
  host: IUser | string
  start: Date
  end: Date
  location: ILocation | string
  beforeStart: number
  onlyAuthUser: boolean
  state: string
  deletedDate: Date
  whoDeleted: IUser | string
  open: boolean
}
