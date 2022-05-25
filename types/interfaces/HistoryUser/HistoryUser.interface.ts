import { basicTable } from '@/types/typeTemplate'
import { LanguageType } from '../index'
import { IUser } from '../user/User.interface'

// History
export interface IHistoryUser extends basicTable {
  name?: string
  lastName?: string
  email?: string
  // password?: string
  privilegeID: string
  active?: boolean
  // token?: string
  admin: IUser | string
  canCreateHost: boolean
  allEventWithAuth: boolean
  // encryptPassword: (password: string) => Promise<string>
  // matchPassword: (password: string) => Promise<boolean>
  lang: LanguageType
  whoDeleted: IUser | string
  state: string
  createdAt?: Date
  updatedAt?: Date
  origID: string
  deletedDate: Date
}
