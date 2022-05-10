import { IServiceType } from '@/types/interfaces/ServiceType/serviceType.interface'
import { FormFactory } from '@/types/typeTemplate'

export const formElements = (inicialData?: unknown): FormFactory.IFormFactoryType<IServiceType>[] => [
  {
    name: 'name',
    type: 'string',
    required: true
  },
  {
    name: 'logo',
    type: 'avatar',
    show: true,
    required: true,
    inicialData
  }
]
