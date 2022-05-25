import { ILocation } from '@/types/interfaces/Location/Location.interface'
import { IMasterLocation } from '@/types/interfaces/MasterLocation/MasterLocation.interface'
import { FormFactory } from '@/types/typeTemplate'

export const formElements = (locations: ILocation[]): FormFactory.IFormFactoryType<IMasterLocation>[] => [
  {
    name: 'name',
    type: 'string',
    required: true
  },
  {
    name: 'address',
    type: 'string',
    required: true
  },
  {
    name: 'location',
    type: 'selectMultiple',
    data: locations
  },
  {
    name: 'onlyAllowAuthUSers',
    type: 'boolean'
  }
]
