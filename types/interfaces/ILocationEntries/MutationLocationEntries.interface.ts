import { ILocation } from '../Location/Location.interface'
import { typeQr } from '../valuesAddQr'
import { typeUser } from './LocationEntries.interface'

export interface IFilterLocationEntries {
  start: string
  end: string
  location: string | ILocation
  host: string
}

export interface ICreateLocationEntries {
  createdAt?: string
  event?: string
  eventExpress?: string
  contact?: string
  location?: ILocation | string
  hourIn?: string
  hourOut?: string
  host?: string
  Worker?: string
  user?: string
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
