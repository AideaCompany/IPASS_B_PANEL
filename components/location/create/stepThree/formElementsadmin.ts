import { ILocation } from '@/types/interfaces/Location/Location.interface'
import { IUser } from '@/types/interfaces/user/User.interface'
import { FormFactory } from '@/types/typeTemplate'

export const formElementsAdmin = (locations?: ILocation[], adminsUsers?: IUser[]): FormFactory.IFormFactoryType<ILocation>[] => [
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
    data: ['in', 'out']
  },
  {
    name: 'admins',
    type: 'selectMultiple',
    data: adminsUsers
  }
]
