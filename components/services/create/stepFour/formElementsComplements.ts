import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { ISubService } from '@/types/interfaces/SubServices/SubServices.interface'
import { FormFactory } from '@/types/typeTemplate'

export const formElementsComplements = (stores: IStores[], subServices: ISubService[]): FormFactory.IFormFactoryType<undefined>[] => {
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
    },
    {
      name: 'subService',
      type: 'selectMultiple',
      data: subServices
    }
  ]
}
