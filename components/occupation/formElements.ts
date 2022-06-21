import { IOccupation } from '@/types/interfaces/Occupation/occupation.interface'
import { FormFactory } from '@/types/typeTemplate'

export const formElements = (): FormFactory.IFormFactoryType<IOccupation>[] => [
  {
    name: 'name',
    type: 'string',
    required: true
  }
]
