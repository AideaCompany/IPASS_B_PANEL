import { IGroupWorker } from '../GroupWorker/GroupWorker.interface'
import { ILocation } from '../Location/Location.interface'
import { IPrivilege } from '../Privilege/Privilege.interface'
import { ITimeZone } from '../TimeZone/TimeZone.interface'
import { IApps } from '../Apps/Apps.interface'
import { basicTable, fileType } from '@/types/typeTemplate'

export interface IUser extends basicTable {
  _id: string
  password?: string
  photo?: fileType
  name?: string
  name1?: string
  name2?: string
  codeWorker?: string
  apps: IApps[] | string[]
  lastName?: string
  lastName1?: string
  lastName2?: string
  email?: string
  privilegeID?: IPrivilege
  active?: boolean
  country?: string
  tokenExpo?: string
  nativeLocation: ILocation[] | string[]
  token?: string
  createdAt?: Date
  updatedAt?: Date
  encryptPassword: (password: string) => Promise<string>
  matchPassword: (password: string) => Promise<boolean>
  lang?: string
  verifyLogin: boolean
  admin: IUser | string
  canCreateHost: boolean
  allEventWithAuth: boolean
  canAccessToApp: boolean
  canAccessToWeb: boolean
  document: string
  typeDocument: string
  canUseAuthenticator: boolean
  code: boolean
  phone: string
  QR: string
  group: IGroupWorker[] | string[]
  timeZone: ITimeZone[] | string[]
  banFinish: string
  security: ILocation[] | string[]
  temporal_Qr: string
}

export interface IPushTokenSend {
  _id: string
  token: string
  type: string
}

export interface IResetToken {
  _id: string
  type: string
}
