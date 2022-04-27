// ./src/translations/types.ts
import { locales } from './config'

export type Locale = typeof locales[number]

export interface ITranslations {
  [key: string]: string
}

export type Strings = {
  [key in Locale]: ITranslations
}

export type Localization = {
  locale: Locale
  translations: ITranslations
  namespace: string
}

export const isLocale = (tested: string): tested is Locale => {
  return locales.some(locale => locale === tested)
}
