import { basicTable } from '@/types/typeTemplate'
import { Moment } from 'moment-timezone'
import { graphqlFile, uploadedFile } from '..'

export interface IClient extends basicTable {
  encryptPassword: (password: string) => Promise<string>
  matchPassword: (password: string) => Promise<boolean>
  plus: boolean
  name1: string
  name2: string
  lastName1: string
  lastName2: string
  lastName3: string
  phone1: string
  phone2: string
  country: string
  email: string
  privateAddress: string
  businessAddress: string
  occupation: string
  age: string | Moment
  sex: string
  ranking: number
  channel: string
  trm: string
  pt: string
  rom: string
  lastVisit: string
  referrals: string
  servicesNotes: string
  productsNotes: string
  document: string
  medicalNotes: string
  socialMedia: string
  photo: uploadedFile | graphqlFile
  //type: { type: String },
  //services: [{ type: Schema.Types.ObjectId, ref: 'services' }],
  //products: [{ type: Schema.Types.ObjectId, ref: 'products' }],
  password: string
  tokenExpo: string[]
  active: boolean
}
