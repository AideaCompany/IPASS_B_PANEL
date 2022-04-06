import { IApps } from '@/types/interfaces/Apps/Apps.interface'
import { IGroupWorker } from '@/types/interfaces/GroupWorker/GroupWorker.interface'
import { ILocation } from '@/types/interfaces/Location/Location.interface'
import { IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { ITimeZone } from '@/types/interfaces/TimeZone/TimeZone.interface'
import { IUser } from '@/types/interfaces/user/User.interface'

import { fileType, FormFactory } from '@/types/typeTemplate'

export const formElementsSuperAdmin = (
  privilege: IPrivilege[],
  locations: ILocation[],
  timeZone: ITimeZone[],
  group: IGroupWorker[],
  apps: IApps[],
  inicialData?: boolean | fileType
): FormFactory.IFormFactoryType<IUser>[] => [
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
    name: 'privilegeID',
    type: 'select',
    data: privilege.filter(e => e.name !== 'host'),
    required: true
  },
  {
    name: 'email',
    type: 'email',
    required: true
  },
  {
    name: 'verifyLogin',
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
    name: 'canCreateHost',
    type: 'boolean'
  },
  {
    name: 'allEventWithAuth',
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
