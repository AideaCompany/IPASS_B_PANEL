import { useContext } from 'react'
import { LanguageContext } from '../providers/LenguageContext'

const useTranslation = () => {
  const { localization } = useContext(LanguageContext)

  const t = (key: string) => {
    if (!localization.translations[key]) {
      console.info(`Translation '${key}' for locale '${localization.locale}' not found.`)
    }
    return localization.translations[key] || ''
  }

  return {
    t,
    locale: localization.locale
  }
}

export default useTranslation
