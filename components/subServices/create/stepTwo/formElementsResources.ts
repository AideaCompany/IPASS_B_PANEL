import { IProduct } from '@/types/interfaces/Product/Product.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { FormFactory } from '@/types/typeTemplate'

export const formElementsResources = (dataProducts: IProduct[] | undefined, staff: IStaff[]): FormFactory.IFormFactoryType<undefined>[] => {
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
    }
  ]
}
