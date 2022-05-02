import { IBrands } from '@/types/interfaces/Brands/Brands.interface'
import { IService } from '@/types/types'
import { FormFactory } from '@/types/typeTemplate'

export const formElements3 = (services: IService[], brands: IBrands[]): FormFactory.IFormFactoryType<IService>[] => [
  {
    name: 'price',
    type: 'number'
  },
  {
    name: 'measureType',
    type: 'string'
  },
  {
    name: 'amount',
    type: 'number'
  },
  {
    name: 'services',
    type: 'selectMultiple',
    data: services
  },
  {
    name: 'designedFor',
    type: 'string'
  }
]
