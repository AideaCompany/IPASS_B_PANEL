import { IProduct, IServiceType, ISubService } from '@/types/types'
import { FormFactory } from '@/types/typeTemplate'

export const formElementsGeneralInformation = (
  dataServiceType: IServiceType[] | undefined,
  dataProducts: IProduct[] | undefined,
  subServices: ISubService[]
): FormFactory.IFormFactoryType<undefined>[] => {
  const formElementsDynamicProducts: FormFactory.IFormFactoryType<undefined>[] = [
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
      name: 'products',
      type: 'dynamic',
      formListElements: formElementsDynamicProducts
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
    // {
    //   name: 'stores',
    //   type: 'selectMultiple',
    //   data: stores
    // },
    {
      name: 'sex',
      type: 'select',
      data: ['Hombre', 'Mujer']
    },
    {
      name: 'subService',
      type: 'selectMultiple',
      data: subServices
    }
  ]
}
