import { FormFactory } from '@/types/typeTemplate'

export const formElements = (): FormFactory.IFormFactoryType<unknown>[] => [
  {
    name: 'name',
    type: 'string',
    required: true
  },
  {
    name: 'abbreviation',
    type: 'string',
    required: true
  },
  {
    name: 'tokenKey',
    type: 'string',
    required: true
  },
  {
    name: 'url',
    type: 'string',
    required: true
  }
]
