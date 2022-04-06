import { basicTable } from '@/types/typeTemplate'
import { IContact } from '../Contact/Contact.interface'
import { IEvent } from '../Event/event.interface'
import { ILocation } from '../Location/Location.interface'
import { IUser } from '../user/User.interface'

export interface IInvitationEvent extends basicTable {
  event?: IEvent | string
  contact?: IContact | string
  confirmed?: boolean
  alreadySendInvitation?: boolean
  isIn?: boolean
  hourIn?: string
  host?: string | IUser
  expiration?: string
  location?: ILocation | string
}
