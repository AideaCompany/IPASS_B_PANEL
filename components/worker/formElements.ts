import { IApps, IGroupWorker, ILocation, iTimeZone } from '@/types/types'
import { FormFactory } from '@/types/typeTemplate'

export const formElements = (
  locations: ILocation[],
  group: IGroupWorker[],
  timeZone: iTimeZone[],
  apps: IApps[],
  inicialData?: any
): FormFactory.FormFactoryType[] => [
  {
    name: 'photo',
    type: 'avatar',
    show: true,
    inicialData
  },
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
    name: 'lastname',
    type: 'string',
    required: true
  },
  {
    name: 'lastname1',
    type: 'string'
  },
  {
    name: 'lastname2',
    type: 'string'
  },
  {
    name: 'email',
    type: 'email',
    required: true
  },
  {
    name: 'typeDocument',
    type: 'select',
    data: ['DPI', 'Documento extranjero'],
    required: true
  },
  {
    name: 'document',
    type: 'string',
    required: true
  },
  {
    name: 'phone',
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
    name: 'code',
    type: 'boolean'
  },
  {
    name: 'canUseAuthenticator',
    type: 'boolean'
  },
  {
    name: 'group',
    type: 'selectMultiple',
    data: group
  },

  {
    name: 'nativeLocation',
    type: 'selectMultiple',
    data: locations
  },
  {
    name: 'timeZone',
    type: 'selectMultiple',
    data: timeZone
  },
  {
    name: 'apps',
    type: 'selectMultiple',
    data: apps
  }
]
