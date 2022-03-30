import { fileType, verifiedData, verifiedDataPDF } from 'interfaces'
import { ILocation } from 'interfaces/Location/Location.interface'
import { IUser } from 'interfaces/user/User.interface'
import { Document } from 'mongoose'

export interface IContact extends Document {
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
  verified?: boolean
  askVerification?: boolean | string
  verifiedData?: verifiedData
  verifiedDataPDF?: verifiedDataPDF
  banFinish: string
  DPI: string
  location: string[] | ILocation[]
  verificationRegistro: boolean
}
