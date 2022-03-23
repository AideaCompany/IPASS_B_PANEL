import { ILocation, User } from '@/types/types'
import { FormFactory } from '@/types/typeTemplate'

export const formElementsAdmin = (locations?: ILocation[], adminsUsers?: User[], securityUsers?: User[]): FormFactory.FormFactoryType[] => [
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
    data: [
      { _id: 'in', name: 'Entrada' },
      { _id: 'out', name: 'Salida' }
    ]
  },
  {
    name: 'admins',
    type: 'selectMultiple',
    data: adminsUsers
  }
]
