import { iTimeZone } from '@/types/types'
import { FormFactory } from '@/types/typeTemplate'

export const formElements = (timeZone: iTimeZone[]): FormFactory.FormFactoryType[] => [
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
