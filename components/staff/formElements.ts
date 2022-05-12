import { IService } from '@/types/interfaces/services/Services.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'

import { FormFactory } from '@/types/typeTemplate'

export const formElements = (stores: IStores[], services: IService[], inicialData?: boolean | unknown): FormFactory.IFormFactoryType<IStaff>[] => [
  {
    name: 'name',
    type: 'string',
    required: true
  },
  {
    name: 'name1',
    type: 'string'
  },
  {
    name: 'name2',
    type: 'string'
  },
  {
    name: 'lastName',
    type: 'string',
    required: true
  },
  {
    name: 'lastName1',
    type: 'string'
  },
  {
    name: 'lastName2',
    type: 'string'
  },
  {
    name: 'address',
    type: 'string'
  },
  {
    name: 'stores',
    type: 'selectMultiple',
    data: stores
  },
  {
    name: 'phone',
    type: 'string'
  },
  {
    name: 'phone1',
    type: 'string'
  },
  {
    name: 'photo',
    type: 'avatar',
    show: true,
    inicialData: inicialData
  },
  {
    name: 'email',
    type: 'email',
    required: true
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
