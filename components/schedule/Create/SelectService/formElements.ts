import { IClient } from '@/types/interfaces/Clients/client.interface'
import { IProduct } from '@/types/interfaces/Product/Product.interface'
import { IService } from '@/types/interfaces/services/Services.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { FormFactory } from '@/types/typeTemplate'

export const formElements = (services: IService[], clients: IClient[], staff: IStaff[]): FormFactory.IFormFactoryType<IProduct>[] => {
  const formElementsDynamicService: FormFactory.IFormFactoryType<undefined>[] = [
    {
      name: 'service',
      type: 'select',
      data: services
    },
    {
      name: 'staffer',
      type: 'select',
      data: staff
    }
  ]

  return [
    {
      name: 'client',
      type: 'select',
      required: true,
      data: clients.map(client => ({ ...client, name: client.name1 + ' ' + client.lastName1 }))
    },
    {
      name: 'services',
      type: 'dynamic',
      formListElements: formElementsDynamicService
    }
  ]
}
