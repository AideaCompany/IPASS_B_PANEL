import { IEvent } from '@/types/interfaces/Event/event.interface'
import { ILocation } from '@/types/interfaces/Location/Location.interface'
import { FormFactory } from '@/types/typeTemplate'
import { disabledDateFn } from '@/utils/utils'

export const formElements = (locations?: ILocation[]): FormFactory.IFormFactoryType<IEvent>[] => [
  {
    name: 'name',
    type: 'string',
    required: true,
    fullWidth: true
  },
  {
    name: 'rangeTime',
    type: 'dateRange',
    adicionalProps: { disabledDate: disabledDateFn },
    fullWidth: true
  },
  {
    name: 'location',
    type: 'select',
    data: locations,
    fullWidth: true,
    required: true
  },
  {
    name: 'beforeStart',
    type: 'number',
    adicionalProps: { min: 1 },
    fullWidth: true
  },
  {
    name: 'onlyAuthUser',
    type: 'boolean',
    fullWidth: true
  },
  {
    name: 'open',
    type: 'boolean'
  }
]
