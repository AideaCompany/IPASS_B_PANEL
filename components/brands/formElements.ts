<<<<<<< HEAD
import { FormFactory } from '@/types/typeTemplate'

export const formElements = (): FormFactory.FormFactoryType[] => [
=======
import { IBrands } from '@/types/interfaces/Brands/Brands.interface'
import { FormFactory } from '@/types/typeTemplate'

export const formElements = (): FormFactory.IFormFactoryType<IBrands>[] => [
>>>>>>> dev
  {
    name: 'name',
    type: 'string',
    required: true
  },
  {
    name: 'logo',
    type: 'avatar',
    show: true,
    required: true
  }
]
