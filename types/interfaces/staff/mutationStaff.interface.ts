import { graphqlFile, uploadedFile } from '..'

export interface ICreateStaff {
  name?: string
  name1?: string
  name2?: string
  lastName: string
  lastName1?: string
  lastName2?: string
  address?: string
  stores?: string[]
  phone?: string
  phone1?: string
  photo?: graphqlFile | uploadedFile
  email?: string
  specialty: string[]
  AET?: string
  canAccessToApp?: boolean
  canAccessToWeb?: boolean
  password?: string
  client: string[]
  active?: boolean
  tokenExpo?: string
  plus?: boolean
  // canUseAuthenticator?: boolean
  // privilegeID?: IPrivilege

  // country?: string
  // token?: string
  // createdAt?: Date
  // tokenExpo?: string
  // updatedAt?: Date

  // lang: LanguageType
  // verifyLogin: boolean
  // temporal_Qr: IWorker_qr_temporal
  // group: IGroupWorker[] | string[]
  // nativeLocation: ILocation[] | string[]
  // document: string
  // typeDocument: string
  // code: boolean
  // QR: string
  // banFinish: string
  // timeZone: iTimeZone[] | string[]
  // apps: IApps[] | string[]
}

export interface IUpdateStaff {
  _id: string
  name?: string
  name1?: string
  name2?: string
  lastName: string
  lastName1?: string
  lastName2?: string
  address?: string
  stores?: string[]
  phone?: string
  phone1?: string
  photo?: graphqlFile | uploadedFile
  email?: string
  specialty: string[]
  AET?: string
  canAccessToApp?: boolean
  canAccessToWeb?: boolean
  password?: string
  client: string[]
  active?: boolean
  tokenExpo?: string
  plus?: boolean
  // canUseAuthenticator?: boolean
  // privilegeID?: IPrivilege

  // country?: string
  // token?: string
  // createdAt?: Date
  // tokenExpo?: string
  // updatedAt?: Date

  // lang: LanguageType
  // verifyLogin: boolean
  // temporal_Qr: IWorker_qr_temporal
  // group: IGroupWorker[] | string[]
  // nativeLocation: ILocation[] | string[]
  // document: string
  // typeDocument: string
  // code: boolean
  // QR: string
  // banFinish: string
  // timeZone: iTimeZone[] | string[]
  // apps: IApps[] | string[]
}
