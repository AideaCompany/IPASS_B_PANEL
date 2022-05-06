import { IBrands } from '@/types/interfaces/Brands/Brands.interface'
import { IService } from '@/types/types'
import { FormFactory } from '@/types/typeTemplate'

export const formelements2 = (): FormFactory.IFormFactoryType<IService>[] => [
  {
    name: 'photo',
    type: 'avatar',
    show: true
  },
  {
    name: 'amount',
    type: 'number'
  },
  {
    name: 'price',
    type: 'number'
  },
  {
    name: 'measureType',
    type: 'select',
    data: ['cm^3', 'ml']
  }
]
