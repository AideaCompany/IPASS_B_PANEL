import { IService } from '@/types/interfaces/services/Services.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { FormFactory } from '@/types/typeTemplate'

export const formElementsLaboral = (stores: IStores[], services: IService[]): FormFactory.IFormFactoryType<IStaff>[] => [
  {
    name: 'stores',
    type: 'selectMultiple',
    data: stores
  },
  {
    name: 'services',
    type: 'selectMultiple',
    data: services
  },
  {
    name: 'specialty',
    type: 'string',
    required: false
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
