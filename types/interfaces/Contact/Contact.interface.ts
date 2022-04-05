import { verifiedData, verifiedDataPDF } from '@/types/types'
import { basicTable, fileType } from '@/types/typeTemplate'
import { ILocation } from '../Location/Location.interface'
import { IUser } from '../user/User.interface'

export interface IContact extends basicTable {
  _id: string
  photo: fileType
  documentA: fileType
  documentB: fileType
  num1: string
  type: string
  name: string
  expedition: string
  expiration: string
  licNum: string
  num2: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  host?: IUser | string
  indicativo?: string
  nickname?: string
  typeVerified: string
  verified?: boolean
  askVerification?: boolean | string
  verifiedData?: verifiedData
  verifiedDataPDF?: verifiedDataPDF
  banFinish: string
  DPI: string
  location: string[] | ILocation[]
  verificationRegistro: boolean
}
