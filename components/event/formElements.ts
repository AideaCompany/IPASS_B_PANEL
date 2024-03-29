import { IEvent } from '@/types/interfaces/Event/event.interface'
import { ILocation } from '@/types/interfaces/Location/Location.interface'
import { FormFactory } from '@/types/typeTemplate'
import { disabledDateFn } from '@/utils/utils'

export const formElements = (locations?: ILocation[]): FormFactory.IFormFactoryType<IEvent>[] => [
  {
    name: 'name',
    type: 'string',
    required: true
  },
  {
    name: 'rangeTime',
    type: 'dateRange',
    adicionalProps: { disabledDate: disabledDateFn }
  },
  {
    name: 'location',
    type: 'select',
    data: locations
  },
  {
    name: 'beforeStart',
    type: 'number',
    adicionalProps: { min: 1 }
  },
  {
    name: 'onlyAuthUser',
    type: 'boolean'
  },
  {
    name: 'open',
    type: 'boolean'
  }
]
