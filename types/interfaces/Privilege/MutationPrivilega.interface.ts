import { IPermissionsPrivilege } from './Privilege.interface'

export interface ICreatePrivilege {
  name: string
  permissions: IPermissionsPrivilege[]
}

export interface IUpdatePrivilege {
  _id: string
  name: string
  permissions: IPermissionsPrivilege[]
}
