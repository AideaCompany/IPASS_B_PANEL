import { IBrands } from '@/types/interfaces/Brands/Brands.interface'
import { IService } from '@/types/types'
import { FormFactory } from '@/types/typeTemplate'

export const formElements = (services: IService[], brands: IBrands[]): FormFactory.IFormFactoryType<IService>[] => [
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
    name: 'photo',
    type: 'avatar',
    show: true
  },
  {
    name: 'productType',
    type: 'select',
    data: ['Servicios', 'Venta', 'Ambos']
  },
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
