import { IContact } from '../Contact/Contact.interface'
import { ILocation } from '../Location/Location.interface'
import { IStaff } from '../staff/staff.interface'
import { IUser } from '../user/User.interface'

export interface ILocationAttempt {
  _id: string
  authenticated: boolean
  Worker: IStaff
  user: IUser
  contact: IContact | string
  attempts: number
  location: ILocation | string
  type: string
  createdAt?: Date
  updatedAt?: Date
}
