import { FormFactory } from '@/types/typeTemplate'

export const formElements = (): FormFactory.FormFactoryType[] => [
  {
    name: 'name',
    type: 'string',
    required: true
  },
  {
    name: 'url',
    type: 'string',
    required: true
  }
]
