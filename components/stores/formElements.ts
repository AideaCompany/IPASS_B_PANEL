import { IService } from '@/types/interfaces/services/Services.interface'
import { generes, IStores } from '@/types/interfaces/Stores/stores.interface'
import { ITimeZone } from '@/types/interfaces/TimeZone/TimeZone.interface'

import { FormFactory } from '@/types/typeTemplate'

export const formElements = (timeZone: ITimeZone[], services: IService[]): FormFactory.IFormFactoryType<IStores>[] => [
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
    name: 'services',
    type: 'selectMultiple',
    data: services
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
  }
]
