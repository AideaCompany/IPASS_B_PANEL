import { FormFactory } from '@/types/typeTemplate'

export const formElements = (): FormFactory.FormFactoryType[] => [
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
    data: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
    required: true
  }
]
