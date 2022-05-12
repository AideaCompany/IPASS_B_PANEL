import { FormFactory } from '@/types/typeTemplate'

export const formElementsComplements = (): FormFactory.IFormFactoryType<undefined>[] => {
  return [
    {
      name: 'sex',
      type: 'select',
      data: ['Hombre', 'Mujer']
    }
  ]
}
