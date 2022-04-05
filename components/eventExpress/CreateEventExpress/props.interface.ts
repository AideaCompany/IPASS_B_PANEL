import { ITranslations } from '@/i18n/types'
import { IContact } from '@/types/interfaces/Contact/Contact.interface'
import { ILocation } from '@/types/interfaces/Location/Location.interface'

export interface IProps {
  translations: ITranslations
  contacts: IContact[]
  translationsContact: ITranslations
  getContacts: () => Promise<void>
  locations: ILocation[]
}
