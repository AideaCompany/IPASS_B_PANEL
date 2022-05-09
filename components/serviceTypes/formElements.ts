import { IServiceType } from '@/types/types'
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
