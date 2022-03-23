import { FormFactory } from '@/types/typeTemplate'

export const formElementsSuperanfitrion = (): FormFactory.FormFactoryType[] => [
  {
    name: 'DPI',
    type: 'string',
    required: true
    // adicionalProps:{ma}
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
  },
  {
    name: 'verificationRegistro',
    type: 'boolean'
  }
]
