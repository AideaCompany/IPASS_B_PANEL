import locales from '@/i18n/locales'
import { Stream } from 'stream'
import { fileType } from '../typeTemplate'
import { IContact } from './Contact/Contact.interface'
import { ILocation } from './Location/Location.interface'
import { IRisk } from './Risk/Risk.interface'
import { IStaff } from './staff/staff.interface'
import { IUser } from './user/User.interface'

export interface IWorkerQrTemporal {
  Worker: IStaff
  user: IUser
  timeEnd: string
  location: ILocation | string
  QR: string
  valid: boolean
}

export type InputConfirmUser = {
  token: string
}
export type tokenConfirm = {
  first_config?: boolean
  token: string
  idUser: string
}

export type Translations = {
  de: string
  es: string
  fr: string
  ja: string
  it: string
  br: string
  pt: string
  nl: string
  hr: string
  fa: string
}

export type Sections = {
  name: string
}

export interface IHistoryAction extends Document {
  userId: IUser
  action: string
  createdAt?: string
  updatedAt?: string
}

export interface IAuthMiddleware extends Request {
  isAuth: boolean
  tokenAuth: string
}

export interface IFirstConfig extends Document {
  alreadyLogin: boolean
}

export interface IKeyUser extends Document {
  key: string
  expires: Date
}

export interface IContextGraphql {
  req: IAuthMiddleware
  isProd: boolean
  client: unknown
}

export interface IGallery extends Document {
  name: string
}

export type LanguageType = typeof locales

// //Context type
// export interface IContextGraphql {

// }

export type typeCheck = 'in' | 'out'
export type statusLocation = 'enabled' | 'disabled'

export interface IWorkerLocation {
  _id: string
  Worker: string | IStaff
  location: string | ILocation
}

export type operation = 'create' | 'update' | 'delete'

export type typeRaspberry = 'Entrada' | 'Entrada y salida'

export interface IQrUses {
  QrCode: string
  uses: {
    location: string | ILocation
    order: number
    createdAt: string
    updatedAt: string
  }[]
}

export type verifiedData = {
  photo: fileType
  documentA: fileType
  documentB: fileType
  birthDate: string
  expirationDate: string
  sex: string
  lastName: string
  firstName: string
  nationality: string
  documentNumber: string
  correctionName: string
  correctionLastname: string
  correctionNumber: string
}

export type verifiedDataPDF = {
  photo?: fileType
  documentA?: fileType
  documentB?: fileType
  num1?: string
  type?: string
  name?: string
  expedition?: string
  expiration?: string
  licNum?: string
  num2?: string
}

export type route = {
  isIn: boolean
  location: ILocation | string
  // parent: ILocation[]
}

export type graphqlFile = {
  key?: string
  promise: Promise<unknown>
  file: {
    filename: string
    mimetype: string
    encoding: string
    createReadStream: () => Stream
  }
}

export type uploadedFile = {
  filename: string
  key: string
  filePath?: {
    basePath: string
    name: string
  }
}

export type createBreach = {
  risk: IRisk | string
  grade: string
  location: ILocation | string
  contact?: IContact | string
  Worker?: IStaff | string
  user?: IUser | string
}
