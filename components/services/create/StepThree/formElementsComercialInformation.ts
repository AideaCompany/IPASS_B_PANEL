import { FormFactory } from '@/types/typeTemplate'

export const formElementsComercialInformation = (): FormFactory.IFormFactoryType<undefined>[] => {
  return [
    {
      name: 'price',
      type: 'number'
    },
    {
      name: 'cost',
      type: 'number'
    },
    {
      name: 'serviceFee',
      type: 'number'
    },
    {
      name: 'taxes',
      type: 'number'
    },
    {
      name: 'discounts',
      type: 'number'
    },
    {
      name: 'serviceTime',
      type: 'number'
    },
    {
      name: 'returnTime',
      type: 'number'
    }
  ]
}
