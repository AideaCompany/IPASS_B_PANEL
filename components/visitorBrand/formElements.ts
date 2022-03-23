import { IVisitorCategory } from '@/types/types'
import { FormFactory } from '@/types/typeTemplate'

export const formElements = (categories: IVisitorCategory[], photo?: any): FormFactory.FormFactoryType[] => [
  {
    name: 'name',
    type: 'string',
    required: true
  },
  {
    name: 'photo',
    type: 'avatar',
    required: true,
    inicialData: photo
  },
  {
    name: 'category',
    type: 'select',
    data: categories
  }
]
