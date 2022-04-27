import { basicTable } from '@/types/typeTemplate'
import { IContact } from '../Contact/Contact.interface'
import { IEvent } from '../Event/event.interface'
import { IEventExpress } from '../EventExpress/eventExpress.interface'
import { ILocation } from '../Location/Location.interface'
import { IStaff } from '../staff/staff.interface'
import { IUser } from '../user/User.interface'
import { typeQr } from '../valuesAddQr'

export interface ILocationEntries extends basicTable {
  _id: string
  event?: IEvent | string
  eventExpress?: IEventExpress | string
  contact?: IContact | string
  location?: ILocation | string
  hourIn?: string
  hourOut?: string
  host?: IUser | string | IUser[] | string[]
  staff?: IStaff | string
  user?: IUser | string
  typeQr?: typeQr
  qrType?: string
  // Residente, invitado, visitante
  type?: typeUser
  isEntry?: boolean
  visitantData?: {
    brand: string
    category: string
    direction: string
    place: string
    readedMRZ: {
      birthDate: string
      expirationDate: string
      sex: string
      firstName: string
      lastName: string
      nationality: string
      documentNumber: string
    }
    readedPDF: {
      num1: string
      type: string
      name: string
      expedition: string
      expiration: string
      licNum: string
      num2: string
    }
  }
  // visitantData: visitantData
}

export type typeUser = 'I' | 'R' | 'V'
