import { ILocation } from '@/types/types'
import { FormFactory } from '@/types/typeTemplate'

export const formElementsSuperAdmin = (locations?: ILocation[]): FormFactory.FormFactoryType[] => [
  {
    name: 'serialNumber',
    type: 'string',
    required: true
  },
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
    name: 'timeWait',
    type: 'number',
    required: true,
    adicionalProps: { min: 1 }
  },
  {
    name: 'enableVideo',
    type: 'boolean',
    required: true
  },
  {
    name: 'enableTalk',
    type: 'boolean',
    required: true
  },
  {
    name: 'typeLocation',
    type: 'select',
    data: ['classic', 'touch']
  }
]
