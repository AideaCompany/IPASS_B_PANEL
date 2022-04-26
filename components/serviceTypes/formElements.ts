import { IServiceType } from '@/types/types'
import { FormFactory } from '@/types/typeTemplate'

export const formElements = (): FormFactory.IFormFactoryType<IServiceType>[] => [
  {
    name: 'name',
    type: 'string',
    required: true
  }
]
