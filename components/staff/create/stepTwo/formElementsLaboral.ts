import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { FormFactory } from '@/types/typeTemplate'

export const formElementslaboral = (stores: IStores[], inicialData?: boolean | unknown): FormFactory.IFormFactoryType<IStaff>[] => [
  {
    name: 'specialty',
    type: 'string'
  },
  {
    name: 'stores',
    type: 'selectMultiple',
    data: stores
  },
  {
    name: 'AET',
    type: 'string'
  },
  {
    name: 'canAccessToApp',
    type: 'boolean'
  },
  {
    name: 'canAccessToWeb',
    type: 'boolean'
  },
  {
    name: 'plus',
    type: 'boolean'
  }
]
