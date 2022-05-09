import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { IProduct, IServiceType, ISubService } from '@/types/types'
import { FormFactory } from '@/types/typeTemplate'

export const formElementsComplements = (
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
      name: 'sex',
      type: 'select',
      data: ['Hombre', 'Mujer']
    },
    {
      name: 'stores',
      type: 'selectMultiple',
      data: stores
    }
  ]
}
