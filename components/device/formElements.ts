import { FormFactory } from '@/types/typeTemplate'

export const formElements = (): FormFactory.FormFactoryType[] => [
  {
    name: 'name',
    type: 'string',
    required: true,
    fullWidth: true
  },
  {
    name: 'type',
    type: 'select',
    fullWidth: true,
    required: true,
    data: ['classic', 'touch']
  },
  {
    name: 'serialNumber',
    type: 'string',
    fullWidth: true,
    required: true
  },
  {
    name: 'timeWait',
    type: 'number',
    adicionalProps: { min: 1 },
    fullWidth: true,
    required: true
  },
  {
    name: 'enableTalk',
    type: 'boolean',
    fullWidth: true,
    required: true
  },
  {
    name: 'enableVideo',
    type: 'boolean',
    fullWidth: true,
    required: true
  }
]
