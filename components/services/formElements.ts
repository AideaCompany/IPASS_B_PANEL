import { IProduct, IServiceType } from '@/types/types'
import { FormFactory } from '@/types/typeTemplate'

export const formElements = (dataServiceType: IServiceType[] | undefined, dataProducts: IProduct[] | undefined): FormFactory.FormFactoryType[] => {
  const formElementsDynamicProducts: FormFactory.FormFactoryType[] = [
    {
      name: 'product',
      type: 'selectMultiple',
      data: dataProducts
    },
    {
      name: 'productQuantity',
      type: 'number'
    }
  ]
  return [
    {
      name: 'photo',
      type: 'avatar',
      show: true
    },
    {
      name: 'plus',
      type: 'boolean'
    },
    {
      name: 'name',
      type: 'string',
      required: true
    },
    {
      name: 'abbreviation',
      type: 'string'
    },
    {
      name: 'type',
      type: 'select',
      data: dataServiceType
    },
    {
      name: 'products',
      type: 'dynamic',
      formListElements: formElementsDynamicProducts
    },
    {
      name: 'staffers',
      type: 'selectMultiple',
      data: ['staffer1', 'staffer2']
    },
    {
      name: 'eta',
      type: 'string'
    },
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
    },
    {
      name: 'sex',
      type: 'select',
      data: ['Hombre', 'Mujer']
    },
    {
      name: 'stores',
      type: 'selectMultiple',
      data: ['store1', 'store2']
    },
    {
      name: 'subService',
      type: 'selectMultiple',
      data: ['subService1', 'subService2']
    }
  ]
}
