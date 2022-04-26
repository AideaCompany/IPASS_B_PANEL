import { IProduct } from '@/types/types'
import { FormFactory } from '@/types/typeTemplate'

export const formElements = (dataProducts: IProduct[] | undefined): FormFactory.FormFactoryType[] => {
  const formElementsDynamicProducts: FormFactory.FormFactoryType[] = [
    {
      name: 'product',
      type: 'select',
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
      name: 'subServiceFee',
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
      name: 'subServiceTime',
      type: 'number'
    },
    {
      name: 'returnTime',
      type: 'number'
    },
    {
      name: 'stores',
      type: 'selectMultiple',
      data: ['store1', 'store2']
    }
  ]
}
