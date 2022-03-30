import { basicTable } from '@/types/typeTemplate'
import { IContact } from '../Contact/Contact.interface'
import { ILocation } from '../Location/Location.interface'
import { IStaff } from '../staff/staff.interface'
import { IUser } from '../user/User.interface'

export interface IBreach extends basicTable {
  grade: string
  location: ILocation
  status: string
  Worker: IStaff
  user: IUser
  contact: IContact
  createdAt?: Date
  updatedAt?: Date
}
