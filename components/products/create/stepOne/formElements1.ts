import { IBrands } from '@/types/interfaces/Brands/Brands.interface'
import { IProduct } from '@/types/interfaces/Product/Product.interface'
import { FormFactory } from '@/types/typeTemplate'

export const formElements1 = (brands: IBrands[]): FormFactory.IFormFactoryType<IProduct>[] => [
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
