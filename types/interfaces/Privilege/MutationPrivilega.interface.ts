import { PermissionsPrivilege } from './Privilege.interface'

export interface ICreatePrivilege {
  name: string
  permissions: PermissionsPrivilege[]
}

export interface IUpdatePrivilege {
  _id: string
  name: string
  permissions: PermissionsPrivilege[]
}
