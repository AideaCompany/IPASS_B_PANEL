import { FormFactory } from '@/types/typeTemplate'

export const formElements = (): FormFactory.FormFactoryType[] => [
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
    type: 'string',
    required: true
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
    data: []
  },
  {
    name: 'designedFor',
    type: 'string'
  }
]
