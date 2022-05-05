import { FormFactory } from '@/types/typeTemplate'
import countries from 'country-data'
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
    name: 'country',
    type: 'select',
    data: countries.callingCountries.all.map(country => ({
      _id: country.countryCallingCodes[0],
      name: country.name
    })),
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
    type: 'string'
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
    type: 'textArea'
  },
  {
    name: 'productsNotes',
    type: 'textArea'
  },
  {
    name: 'medicalNotes',
    type: 'textArea'
  },
  {
    name: 'socialMedia',
    type: 'textArea'
  }
]
