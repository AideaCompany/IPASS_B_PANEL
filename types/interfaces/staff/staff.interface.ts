import { basicTable, fileType } from '@/types/typeTemplate'
import { IStores } from '../Stores/stores.interface'

export interface IStaff extends basicTable {
  _id: string
  name?: string
  name1?: string
  name2?: string
  lastName: string
  lastName1?: string
  lastName2?: string
  address?: string
  stores?: string[] | IStores[]
  phone?: string
  phone1?: string
  photo?: fileType
  email?: string
  specialty: string[]
  AET?: string
  canAccessToApp?: boolean
  canAccessToWeb?: boolean
  password?: string
  encryptPassword: (password: string) => Promise<string>
  matchPassword: (password: string) => Promise<boolean>
  client: string[]
  active?: boolean
  tokenExpo?: string
  plus?: boolean
  verifyLogin: boolean

  // canUseAuthenticator?: boolean
  // privilegeID?: IPrivilege

  // country?: string
  // token?: string
  // createdAt?: Date
  // tokenExpo?: string
  // updatedAt?: Date

  // lang: LanguageType

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

export interface IResponseMassive {
  email: string
  success: boolean
  reason:
    | {
        code: string
        keyPattern: string
      }
    | string
}
