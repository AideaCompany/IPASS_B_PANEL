import { IService } from '@/types/types'
import { FormFactory } from '@/types/typeTemplate'

export const formelements2 = (): FormFactory.IFormFactoryType<IService>[] => [
  {
    name: 'photo',
    type: 'avatar',
    show: true
  },
  {
    name: 'amount',
    type: 'number'
  }
]
