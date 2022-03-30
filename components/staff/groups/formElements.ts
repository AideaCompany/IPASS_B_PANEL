import { ILocation } from '@/types/types'
import { FormFactory } from '@/types/typeTemplate'

export const formElements = (locations: ILocation[]): FormFactory.FormFactoryType[] => [
  {
    name: 'name',
    type: 'string',
    required: true
  },
  {
    name: 'abbreviation',
    type: 'string',
    required: true
  },
  {
    name: 'location',
    type: 'selectMultiple',
    data: locations
  }
]
