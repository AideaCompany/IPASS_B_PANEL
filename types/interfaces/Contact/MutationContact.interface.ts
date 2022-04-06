import { graphqlFile, uploadedFile, verifiedData, verifiedDataPDF } from '../index'

export interface ICreateContact {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  host?: string
  indicativo?: string
  nickname?: string
  verified?: boolean
  askVerification?: boolean | string
  verifiedData?: verifiedData
  verifiedDataPDF?: verifiedDataPDF
  banFinish: string
  DPI: string
  location: string[]
  verificationRegistro: boolean
}

export interface IUpdateContact {
  _id: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  host?: string
  indicativo?: string
  nickname?: string
  verified?: boolean
  askVerification?: boolean | string
  verifiedData?: verifiedData
  verifiedDataPDF?: verifiedDataPDF
  banFinish: string
  DPI: string
  location: string[]
  verificationRegistro: boolean
}

export interface IInputSendDataVerification {
  documentPass: graphqlFile | uploadedFile
  photo: graphqlFile | uploadedFile
  documentA: graphqlFile | uploadedFile
  documentB: graphqlFile | uploadedFile
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

export interface IInputSendDataVerificationPDF {
  photo: graphqlFile | uploadedFile
  documentA: graphqlFile | uploadedFile
  documentB: graphqlFile | uploadedFile
  num1: string
  type: string
  name: string
  expedition: string
  expiration: string
  licNum: string
  num2: string
}
