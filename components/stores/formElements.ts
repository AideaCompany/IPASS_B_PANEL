import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { ITimeZone } from '@/types/interfaces/TimeZone/TimeZone.interface'
import { FormFactory } from '@/types/typeTemplate'

export const formElements = (timeZone: ITimeZone[]): FormFactory.IFormFactoryType<IStores>[] => [
  {
    name: 'name',
    type: 'string',
    required: true
  },
  {
    name: 'address',
    type: 'string',
    required: true
  },

  {
    name: 'schedule',
    type: 'select',
    required: true,
    data: timeZone
  }
]
