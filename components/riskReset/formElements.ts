import { FormFactory } from '@/types/typeTemplate'

export const formElements = (): FormFactory.FormFactoryType[] => [
  {
    name: 'time',
    type: 'number',
    required: true,
    adicionalProps: { min: 0 }
  }
]
