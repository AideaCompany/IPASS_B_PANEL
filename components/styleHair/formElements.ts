import { FormFactory } from '@/types/typeTemplate'

export const formElements = (): FormFactory.FormFactoryType[] => [
  {
    name: 'name',
    type: 'string',
    required: true
  },
  {
    name: 'text',
    type: 'string',
    required: true
  },
  {
    name: 'question',
    type: 'string',
    required: true
  },
  {
    name: 'photo',
    type: 'avatar',
    show: true,
    required: true
  }
]
