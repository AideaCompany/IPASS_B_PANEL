import { IDevice } from '@/types/types'
import { FormFactory } from '@/types/typeTemplate'

export const formElementsSuperAdmin = (devices: IDevice[]): FormFactory.FormFactoryType[] => [
  {
    name: 'address',
    type: 'string',
    fullWidth: true
  },
  {
    name: 'name',
    type: 'string',
    required: true,
    fullWidth: true
  },
  {
    name: 'abbreviation',
    type: 'string',
    required: true,
    fullWidth: true
  },
  {
    name: 'state',
    type: 'select',
    fullWidth: true,
    data: ['enabled', 'disabled']
  },
  {
    name: 'typeCheck',
    type: 'select',
    fullWidth: true,
    data: [
      { _id: 'in', name: 'Entrada' },
      { _id: 'out', name: 'Salida' }
    ]
  },
  {
    name: 'device',
    type: 'select',
    fullWidth: true,
    data: devices
  }
]
