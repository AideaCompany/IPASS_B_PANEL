import { FormFactory } from '@/types/typeTemplate'
import countries from 'country-data'
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
