import { generes } from '@/types/interfaces/Stores/stores.interface'
import { ITimeZone } from '@/types/interfaces/TimeZone/TimeZone.interface'
import { FormFactory } from '@/types/typeTemplate'

export const FormElements = (timeZone: ITimeZone[]): FormFactory.IFormFactoryType<undefined>[] => [
  {
    name: 'zone',
    type: 'number'
  },
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
    type: 'selectMultiple',
    required: true,
    data: timeZone
  },
  {
    name: 'reservePercentage',
    type: 'number'
  },
  {
    name: 'generes',
    type: 'selectMultiple',
    data: [
      {
        _id: generes.MEN,
        name: 'Hombre'
      },
      {
        _id: generes.WOMEN,
        name: 'Mujer'
      },
      {
        _id: generes.CHILDREN,
        name: 'Niños'
      }
    ]
  },
  {
    name: 'phone',
    type: 'string'
  },
  {
    name: 'contact',
    type: 'string'
  }
]
