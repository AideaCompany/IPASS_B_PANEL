import { IDevice } from '@/types/interfaces/Device/Device.interface'
import { ILocation } from '@/types/interfaces/Location/Location.interface'
import { FormFactory } from '@/types/typeTemplate'

export const formElementsSuperAdmin = (devices: IDevice[]): FormFactory.IFormFactoryType<ILocation>[] => [
  {
    name: 'name',
    type: 'string',
    required: true,
    fullWidth: true
  },
  {
    name: 'address',
    type: 'string',
    fullWidth: true
  },
  {
    name: 'state',
    type: 'select',
    fullWidth: true,
    required: true,
    data: ['enabled', 'disabled']
  },
  {
    name: 'typeCheck',
    type: 'select',
    fullWidth: true,
    required: true,
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
  },
  {
    name: 'abbreviation',
    type: 'string',
    fullWidth: true
  }
]
