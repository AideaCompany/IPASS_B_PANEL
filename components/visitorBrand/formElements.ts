import { IVisitorCategory } from '@/types/interfaces/VisitorCategory/VisitorCategory.interface'

import { fileType, FormFactory } from '@/types/typeTemplate'

export const formElements = (categories: IVisitorCategory[], photo?: fileType): FormFactory.IFormFactoryType<IVisitorCategory>[] => [
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
