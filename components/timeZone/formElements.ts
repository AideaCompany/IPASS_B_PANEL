import { ITimeZone } from '@/types/interfaces/TimeZone/TimeZone.interface'
import { FormFactory } from '@/types/typeTemplate'

export const formElements = (): FormFactory.IFormFactoryType<ITimeZone>[] => [
  {
    name: 'name',
    type: 'string',
    required: true,
    adicionalProps: { min: 1 }
  },
  {
    name: 'start',
    type: 'hour',
    required: true
  },
  {
    name: 'abbreviation',
    type: 'string',
    required: true
  },
  {
    name: 'end',
    type: 'hour',
    required: true
  },
  {
    name: 'days',
    type: 'selectMultiple',
    data: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    required: true
  }
]
