import { IServiceType } from '@/types/interfaces/ServiceType/serviceType.interface'
import { FormFactory } from '@/types/typeTemplate'

export const formElementsGeneralInformation = (
  dataServiceType: IServiceType[] | undefined,
  inicialData?: any
): FormFactory.IFormFactoryType<undefined>[] => {
  return [
    {
      name: 'name',
      type: 'string',
      required: true
    },
    {
      name: 'abbreviation',
      type: 'string'
    },
    {
      name: 'type',
      type: 'select',
      data: dataServiceType
    },
    {
      name: 'plus',
      type: 'boolean'
    },
    {
      name: 'photo',
      type: 'avatar',
      show: true,
      inicialData
    }
  ]
}
