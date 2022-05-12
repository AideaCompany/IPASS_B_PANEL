import { IProduct } from '@/types/interfaces/Product/Product.interface'
import { FormFactory } from '@/types/typeTemplate'

export const formelements2 = (inicialData?: any): FormFactory.IFormFactoryType<IProduct>[] => [
  {
    name: 'photo',
    type: 'avatar',
    show: true,
    inicialData
  },
  {
    name: 'amount',
    type: 'number'
  }
]
