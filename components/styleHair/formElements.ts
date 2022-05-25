<<<<<<< HEAD
import { FormFactory } from '@/types/typeTemplate'

export const formElements = (): FormFactory.FormFactoryType[] => [
=======
import { IStyleHair } from '@/types/interfaces/StyleHair/styleHair.interface'
import { FormFactory } from '@/types/typeTemplate'

export const formElements = (): FormFactory.IFormFactoryType<IStyleHair>[] => [
>>>>>>> dev
  {
    name: 'name',
    type: 'string',
    required: true
  },
  {
    name: 'text',
    type: 'string',
    required: true
  },
  {
    name: 'question',
    type: 'string',
    required: true
  },
  {
    name: 'photo',
    type: 'avatar',
    show: true,
    required: true
  }
]
