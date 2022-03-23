import { FormFactory } from '@/types/typeTemplate'

export const formElements = (): FormFactory.FormFactoryType[] => [
  {
    name: 'DPI',
    type: 'string',
    required: true
  },
  {
    name: 'firstName',
    type: 'string',
    required: true
  },
  {
    name: 'lastName',
    type: 'string',
    required: true
  },
  {
    name: 'email',
    type: 'email',
    required: true
  },
  {
    name: 'phone',
    type: 'phone',
    required: true
  }
  // {
  //   name: 'nickname',
  //   type: 'string',
  //   required: true
  // }
]
