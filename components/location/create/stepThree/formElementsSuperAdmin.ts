import { ILocation, User } from '@/types/types'
import { FormFactory } from '@/types/typeTemplate'

export const formElementsSuperAdmin = (adminsUsers?: User[], locations?: ILocation[]): FormFactory.FormFactoryType[] => [
  {
    name: 'childLocations',
    type: 'selectMultiple',
    data: locations
  },
  {
    name: 'parentLocations',
    type: 'select',
    data: locations
  },
  {
    name: 'address',
    type: 'string'
  },
  {
    name: 'name',
    type: 'string',
    required: true
  },
  {
    name: 'typeCheck',
    type: 'select',
    data: ['in', 'in:out']
  },
  {
    name: 'admins',
    type: 'selectMultiple',
    data: adminsUsers
  }
]
