import { Translations } from '@/i18n/types'
import { IContact, ILocation } from '@/types/types'

export interface iProps {
  translations: Translations
  contacts: IContact[]
  translationsContact: Translations
  getContacts: () => Promise<void>
  locations: ILocation[]
}
