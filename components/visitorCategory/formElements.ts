import { IVisitorCategory } from '@/types/interfaces/VisitorCategory/VisitorCategory.interface'
import { FormFactory } from '@/types/typeTemplate'

export const formElements = (): FormFactory.IFormFactoryType<IVisitorCategory>[] => [
  {
    name: 'name',
    type: 'string',
    required: true
  }
]
