import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { FormFactory } from '@/types/typeTemplate'

export const formElementsPersonal = (stores: IStores[], inicialData?: boolean | unknown): FormFactory.IFormFactoryType<IStaff>[] => [
  {
    name: 'name',
    type: 'string',
    required: true
  },

  {
    name: 'lastName',
    type: 'string',
    required: true
  },
  {
    name: 'address',
    type: 'string'
  },
  {
    name: 'phone',
    type: 'string'
  },
  {
    name: 'email',
    type: 'email',
    required: true
  },
  {
    name: 'photo',
    type: 'avatar',
    show: true,
    inicialData: inicialData
  }
]
