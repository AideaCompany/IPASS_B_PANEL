import { IApps } from '../Apps/Apps.interface'
import { IGroupWorker } from '../GroupWorker/GroupWorker.interface'
import { graphqlFile, LanguageType, uploadedFile } from '../index'
import { ILocation } from '../Location/Location.interface'
import { IPrivilege } from '../Privilege/Privilege.interface'
import { ITimeZone } from '../TimeZone/TimeZone.interface'
import { IUser } from './User.interface'

export interface ICreateUser {
  password?: string
  photo?: graphqlFile | uploadedFile
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
  lang?: LanguageType
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

export interface IUpdateUser {
  _id: string
  password?: string
  photo?: graphqlFile | uploadedFile
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
  lang?: LanguageType
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
