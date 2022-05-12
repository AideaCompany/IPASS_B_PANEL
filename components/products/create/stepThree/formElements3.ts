import { IProduct } from '@/types/interfaces/Product/Product.interface'
import { IService } from '@/types/interfaces/services/Services.interface'
import { FormFactory } from '@/types/typeTemplate'

export const formElements3 = (services: IService[]): FormFactory.IFormFactoryType<IProduct>[] => [
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
