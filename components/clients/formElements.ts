import { FormFactory } from '@/types/typeTemplate'

export const formElements = (): FormFactory.IFormFactoryType<any>[] => [
  {
    name: 'photo',
    type: 'avatar',
    show: true
  },
  {
    name: 'plus',
    type: 'boolean'
  },
  {
    name: 'document',
    type: 'string'
  },
  {
    name: 'name1',
    type: 'string',
    required: true
  },
  {
    name: 'lastName1',
    type: 'string',
    required: true
  },
  {
    name: 'phone1',
    type: 'string',
    required: true
  },
  {
    name: 'name2',
    type: 'string'
  },
  {
    name: 'lastName2',
    type: 'string'
  },
  {
    name: 'lastName3',
    type: 'string'
  },
  {
    name: 'email',
    type: 'email'
  },
  {
    name: 'phone2',
    type: 'number'
  },
  {
    name: 'privateAddress',
    type: 'string'
  },
  {
    name: 'businessAddress',
    type: 'string'
  },
  {
    name: 'occupation',
    type: 'string'
  },
  {
    name: 'age',
    type: 'dateNoTime'
  },
  {
    name: 'sex',
    type: 'select',
    data: ['Hombre', 'Mujer']
  },
  {
    name: 'referrals',
    type: 'string'
  },
  {
    name: 'servicesNotes',
    type: 'string'
  },
  {
    name: 'productsNotes',
    type: 'string'
  },
  {
    name: 'medicalNotes',
    type: 'string'
  },
  {
    name: 'socialMedia',
    type: 'string'
  }
]
