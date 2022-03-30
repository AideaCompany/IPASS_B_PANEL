import { IUser } from '../user/User.interface'
import { Document } from 'mongoose'
import { ILocation } from 'interfaces/Location/Location.interface'
import { IContact } from 'interfaces/Contact/Contact.interface'

export interface IEventExpress extends Document {
  _id: string
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
