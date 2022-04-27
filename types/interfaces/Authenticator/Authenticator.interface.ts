import { basicTable } from '@/types/typeTemplate'
import { IApps } from '../Apps/Apps.interface'
import { IStaff } from '../staff/staff.interface'
import { IUser } from '../user/User.interface'

export interface IAuthenticator extends basicTable {
  app: string | IApps
  code: string
  status: string
  user: string | IUser
  used: boolean
  Worker: string | IStaff
  entries: {
    hourIn: string
  }
}
