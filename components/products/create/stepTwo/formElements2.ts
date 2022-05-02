import { IBrands } from '@/types/interfaces/Brands/Brands.interface'
import { IService } from '@/types/types'
import { FormFactory } from '@/types/typeTemplate'

export const formelements2 = (services: IService[], brands: IBrands[]): FormFactory.IFormFactoryType<IService>[] => [
  {
    name: 'photo',
    type: 'avatar',
    show: true
  }
]
