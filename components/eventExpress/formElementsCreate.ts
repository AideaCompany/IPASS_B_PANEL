import { IContact } from '@/types/interfaces/Contact/Contact.interface'
import { IEventExpress } from '@/types/interfaces/EventExpress/eventExpress.interface'
import { ILocation } from '@/types/interfaces/Location/Location.interface'
import { FormFactory } from '@/types/typeTemplate'

export const formElementsCreate = (locations?: ILocation[], contacts?: IContact[]): FormFactory.IFormFactoryType<IEventExpress>[] => [
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
