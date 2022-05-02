import { IBrands } from '@/types/interfaces/Brands/Brands.interface'
import { IService } from '@/types/types'
import { FormFactory } from '@/types/typeTemplate'

export const formElements1 = (services: IService[], brands: IBrands[]): FormFactory.IFormFactoryType<IService>[] => [
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
    name: 'brand',
    type: 'select',
    required: true,
    data: brands
  },
  {
    name: 'productType',
    type: 'select',
    data: ['Servicios', 'Venta', 'Ambos']
  }
]
