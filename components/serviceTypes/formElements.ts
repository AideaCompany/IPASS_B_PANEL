<<<<<<< HEAD
import { FormFactory } from '@/types/typeTemplate'

export const formElements = (): FormFactory.FormFactoryType[] => [
=======
import { IServiceType } from '@/types/interfaces/ServiceType/serviceType.interface'
import { FormFactory } from '@/types/typeTemplate'

export const formElements = (inicialData?: unknown): FormFactory.IFormFactoryType<IServiceType>[] => [
>>>>>>> dev
  {
    name: 'name',
    type: 'string',
    required: true
<<<<<<< HEAD
=======
  },
  {
    name: 'logo',
    type: 'avatar',
    show: true,
    required: true,
    inicialData
>>>>>>> dev
  }
]
