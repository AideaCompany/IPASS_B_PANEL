import { ILocation } from '@/types/types'
import { FormFactory } from '@/types/typeTemplate'
import { disabledDateFn } from '@/utils/utils'

export const formElements = (locations?: ILocation[]): FormFactory.FormFactoryType[] => [
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
