import { IApps, ILocation, iTimeZone, Privilege } from '@/types/types'
import { FormFactory } from '@/types/typeTemplate'

export const formElements = (
  privilege: Privilege[],
  apps: IApps[],
  locations: ILocation[],
  timeZone: iTimeZone[],
  inicialData?: boolean
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
    name: 'privilegeID',
    type: 'select',
    data: privilege
  },
  {
    name: 'email',
    type: 'email'
  },
  {
    name: 'active',
    type: 'boolean'
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
    name: 'codeWorker',
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
