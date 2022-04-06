import { IApps } from 'interfaces/Apps/Apps.interface'
import { IStaff } from 'interfaces/staff/staff.interface'
import { IUser } from 'interfaces/user/User.interface'

export interface ICreateAuthenticator {
  app: string | IApps
  code: string
  status: string
  user: string | IUser
  used: boolean
  Worker: string | IStaff
  entries: {
    hourIn: string
  }
  createdAt: string
}

export interface IUpdateAuthenticator {
  _id: string
  app: string | IApps
  code: string
  status: string
  user: string | IUser
  used: boolean
  Worker: string | IStaff
  entries: {
    hourIn: string
  }
  createdAt: string
}
