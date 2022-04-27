import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { IProduct, IServiceType, ISubService } from '@/types/types'
import { FormFactory } from '@/types/typeTemplate'

export const formElements = (
  dataServiceType: IServiceType[] | undefined,
  dataProducts: IProduct[] | undefined,
  staff: IStaff[],
  stores: IStores[],
  subServices: ISubService[]
): FormFactory.IFormFactoryType<undefined>[] => {
  const formElementsDynamicProducts: FormFactory.IFormFactoryType<undefined>[] = [
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
      data: staff
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
      data: stores
    },
    {
      name: 'subService',
      type: 'selectMultiple',
      data: subServices
    }
  ]
}
