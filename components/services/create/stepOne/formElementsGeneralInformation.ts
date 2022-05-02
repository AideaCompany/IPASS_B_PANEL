import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { IProduct, IServiceType, ISubService } from '@/types/types'
import { FormFactory } from '@/types/typeTemplate'

export const formElementsGeneralInformation = (
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
      name: 'plus',
      type: 'boolean'
    },
    {
      name: 'photo',
      type: 'avatar',
      show: true
    }
  ]
}
