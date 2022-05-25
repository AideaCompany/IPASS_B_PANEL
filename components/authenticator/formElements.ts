import { IAuthenticator } from '@/types/interfaces/Authenticator/Authenticator.interface'
import { FormFactory } from '@/types/typeTemplate'

export const formElements = (): FormFactory.IFormFactoryType<IAuthenticator>[] => [
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
