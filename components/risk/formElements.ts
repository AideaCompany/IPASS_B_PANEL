import { FormFactory } from '@/types/typeTemplate'

export const formElements = (): FormFactory.FormFactoryType[] => [
  {
    name: 'try',
    type: 'number',
    required: true,
    adicionalProps: { min: 1 }
  },
  {
    name: 'actions',
    type: 'select',
    data: ['Tablero', 'Email', 'Bloquear', 'App'],
    required: true,
    adicionalProps: { mode: 'multiple' }
  },
  {
    name: 'ban',
    type: 'number',
    required: true,
    adicionalProps: { min: 0 }
  }
]
