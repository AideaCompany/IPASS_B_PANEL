import { basicTable } from '@/types/typeTemplate'
import { ISections } from '../Sections/sections.interface'

export interface IPrivilege extends basicTable {
  name: string
  createdAt?: Date
  UpdatedAt?: Date
  permissions: IPermissionsPrivilege[]
}

export interface IPermissionsPrivilege {
  sectionID?: ISections['_id']
  read?: boolean
  create?: boolean
  delete?: boolean
  update?: boolean
  canRead?: boolean
  canCreate?: boolean
  canDelete?: boolean
  canUpdate?: boolean
  sectionName?: string
}
