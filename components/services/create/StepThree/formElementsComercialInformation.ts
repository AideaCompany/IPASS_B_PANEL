import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { IProduct, IServiceType, ISubService } from '@/types/types'
import { FormFactory } from '@/types/typeTemplate'

export const formElementsComercialInformation = (
  dataServiceType: IServiceType[] | undefined,
  dataProducts: IProduct[] | undefined,
  staff: IStaff[],
  stores: IStores[],
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
