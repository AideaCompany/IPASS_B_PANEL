import { IVisitorPlace } from '@/types/interfaces/VisitorPlace/visitorPlace.interface'
import { FormFactory } from '@/types/typeTemplate'

export const formElements = (): FormFactory.IFormFactoryType<IVisitorPlace>[] => [
  {
    name: 'name',
    type: 'string',
    required: true
  }
]
