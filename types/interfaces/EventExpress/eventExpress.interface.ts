import { basicTable } from '@/types/typeTemplate'
import { IContact } from '../Contact/Contact.interface'
import { ILocation } from '../Location/Location.interface'
import { IUser } from '../user/User.interface'

export interface IEventExpress extends basicTable {
  name: string
  host: IUser | string
  start: Date
  end: Date
  location: ILocation | string
  state: string
  motivo: string
  contact: IContact | string
  authorizedBy: IUser | string
  hourIn: string
  hourOut: string
  createdAt?: Date
  updatedAt?: Date
  invitados?: IContact[]
  open: boolean
}
