import { IRiskReset } from '@/types/interfaces/RiskReset/RiskReset.interface'
import { FormFactory } from '@/types/typeTemplate'

export const formElements = (): FormFactory.IFormFactoryType<IRiskReset>[] => [
  {
    name: 'time',
    type: 'number',
    required: true,
    adicionalProps: { min: 0 }
  }
]
