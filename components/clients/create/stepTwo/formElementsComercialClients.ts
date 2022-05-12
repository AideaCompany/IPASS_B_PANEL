import { FormFactory } from '@/types/typeTemplate'
export const formElementsComercialClients = (): FormFactory.IFormFactoryType<any>[] => [
  {
    name: 'referrals',
    type: 'string'
  },
  {
    name: 'servicesNotes',
    type: 'textArea'
  },
  {
    name: 'productsNotes',
    type: 'textArea'
  },
  {
    name: 'medicalNotes',
    type: 'textArea'
  },
  {
    name: 'socialMedia',
    type: 'textArea'
  }
]
