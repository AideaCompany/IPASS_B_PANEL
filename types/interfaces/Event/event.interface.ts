import { IUser } from '../user/User.interface'
import { Document } from 'mongoose'
import { ILocation } from 'interfaces/Location/Location.interface'

export interface IEvent extends Document {
  _id: string
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
