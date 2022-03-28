import { FormFactory } from '@/types/typeTemplate'

export const formElements = (): FormFactory.FormFactoryType[] => [
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
    type: 'string',
    required: true
  },
  {
    name: 'name1',
    type: 'string',
    required: true
  },
  {
    name: 'lastname1',
    type: 'string',
    required: true
  },
  {
    name: 'email',
    type: 'email',
    required: true
  },
  {
    name: 'name2',
    type: 'string'
  },
  {
    name: 'lastname2',
    type: 'string'
  },
  {
    name: 'lastname3',
    type: 'string'
  },
  {
    name: 'phone1',
    type: 'number'
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
