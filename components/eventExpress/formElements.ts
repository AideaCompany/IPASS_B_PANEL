import { IContact, ILocation } from '@/types/types'
import { FormFactory } from '@/types/typeTemplate'

export const formElements = (locations?: ILocation[], contacts?: IContact[]): FormFactory.FormFactoryType[] => [
  {
    name: 'name',
    type: 'string',
    required: true
  },
  {
    name: 'location',
    type: 'select',
    data: locations,
    required: true
  },
  {
    name: 'contact',
    type: 'select',
    data: contacts,
    required: true
  },
  {
    name: 'motivo',
    type: 'textArea',
    required: true,
    adicionalProps: { maxLength: 100 }
  },
  {
    name: 'open',
    type: 'boolean'
  }
]
