import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import locales from '../i18n/locales'
import defaultStrings from '../i18n/locales/es'
import { isLocale, Locale, Localization } from '../i18n/types'

interface ContextProps {
  readonly localization: Localization
  readonly setLocale: (localization: Localization) => void
}

export const LanguageContext = React.createContext<ContextProps>({
  localization: {
    locale: 'es', // default lang
    translations: defaultStrings.common, // default translations TODO: what to do here?
    namespace: 'common' // default namespace TODO: could we null this? 'common' might be misleading
  },
  setLocale: () => null
})

export const LanguageProvider = (props: { localization: Localization; children: JSX.Element }) => {
  //props
  const { localization, children } = props

  const [localizationState, setLocalizationState] = React.useState({
    locale: localization?.locale,
    translations: localization?.translations,
    namespace: localization?.namespace
  })
  const [getStoredLocale, setStoredLocale] = useLocalStorage('locale')

  const { query } = useRouter()

  React.useEffect(() => {
    if (localizationState.locale !== getStoredLocale) {
      setStoredLocale(localizationState.locale)
    }
  }, [localizationState])

  React.useEffect(() => {
    if (typeof query.lang === 'string' && isLocale(query.lang) && localization?.locale !== query.lang) {
      setLocalizationState({
        locale: localization?.locale,
        translations: localization?.translations,
        namespace: localization?.namespace
      })
    }
  }, [query.lang, localizationState])

  return <LanguageContext.Provider value={{ localization, setLocale: setLocalizationState }}>{children}</LanguageContext.Provider>
}

export const getLocalizationProps = (ctx: GetStaticPropsContext<ParsedUrlQuery>, namespace: string) => {
  const lang: Locale = (ctx.params?.lang as Locale) || 'es'
  const locale: any = locales[lang]
  const strings: any = locale[namespace]
  const translations = {
    ...locales[lang]?.common,
    ...strings
  }
  return {
    locale: ctx.params?.lang || 'es',
    translations,
    namespace
  }
}
