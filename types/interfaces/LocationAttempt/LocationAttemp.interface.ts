import { IContact } from 'interfaces/Contact/Contact.interface'
import { ILocation } from 'interfaces/Location/Location.interface'
import { IStaff } from 'interfaces/staff/staff.interface'
import { IUser } from 'interfaces/user/User.interface'

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
