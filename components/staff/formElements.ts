import { IApps } from '@/types/interfaces/Apps/Apps.interface'
import { IGroupWorker } from '@/types/interfaces/GroupWorker/GroupWorker.interface'
import { ILocation } from '@/types/interfaces/Location/Location.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { ITimeZone } from '@/types/interfaces/TimeZone/TimeZone.interface'
import { FormFactory } from '@/types/typeTemplate'

export const formElements = (
  locations: ILocation[],
  group: IGroupWorker[],
  timeZone: ITimeZone[],
  apps: IApps[],
  inicialData?: boolean | unknown
): FormFactory.IFormFactoryType<IStaff>[] => [
  {
    name: 'photo',
    type: 'avatar',
    show: true,
    inicialData: inicialData
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
