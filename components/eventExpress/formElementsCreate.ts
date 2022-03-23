import { IContact, ILocation } from '@/types/types'
import { FormFactory } from '@/types/typeTemplate'

export const formElementsCreate = (locations?: ILocation[], contacts?: IContact[]): FormFactory.FormFactoryType[] => [
  {
    name: 'name',
    type: 'select',
    data: ['Reunión', 'Cita', 'Otro'],
    required: true
  },
  {
    name: 'location',
    type: 'select',
    data: locations,
    required: true
  },
  {
    name: 'motivo',
    type: 'textArea',
    required: true,
    adicionalProps: { maxLength: 100 }
  },

  {
    name: 'invitados',
    type: 'selectMultiple',
    data: contacts
  },
  {
    name: 'open',
    type: 'boolean'
  }
]
