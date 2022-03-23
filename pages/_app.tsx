import { useEffect, useState } from 'react'
//Antd
import 'antd/dist/antd.css'
// import '@ant - design/flowchart/dist/index.css'
// import '@ant-design/flowchart/dist/index.css'
import '@nosferatu500/react-sortable-tree/style.css'
import { ThemeContext } from '../providers/ThemeContext'
//graphQl
import { ApolloProvider } from '@apollo/client'
import Client from '../graphql/config'
//Styles
import '../styles/index.scss'

//Providers
import { AuthProvider } from '../providers/AuthContext'
import { DataProvider } from '../providers/DataContext'
//next
import { getLocalizationProps, LanguageProvider } from '../providers/LenguageContext'
import { Localization } from '../i18n/types'
import defaultStrings from '../i18n/locales/es'
import App, { AppProps } from 'next/app'
import ProtectRoute from '../components/Auth/ProtectRoute'
import { getInitialLocale } from '../i18n/getInitialLocale'
import moment from 'moment-timezone'
moment.locale('es-es')
function MyApp({ Component, pageProps, router }: AppProps) {
  //States
  const [theme, setTheme] = useState<string>('')
  const [collapsed, setCollapsed] = useState<boolean>(false)

  //effect
  useEffect(() => {
    if (localStorage.getItem('theme')) {
      setTheme(localStorage.getItem('theme') as string)
    }
    if (localStorage.getItem('collapsed')) {
      setCollapsed(localStorage.getItem('collapsed') === 'true' ? true : false)
    }
  }, [])

  useEffect(() => {
    if (router.pathname === '/' || router.pathname === '/[lang]') {
      console.log('43')
      router.push(`/${getInitialLocale()}/session`)
    }
  }, [router])

  const toggleTheme = () => {
    localStorage.setItem('theme', theme === '' ? '-dark' : '')
    setTheme(theme === '' ? '-dark' : '')
  }

  const toggleCollapsed = () => {
    localStorage.setItem('collapsed', (!collapsed).toString())
    setCollapsed(!collapsed)
  }

  const getLenguaje = (lng: string): Localization => {
    var local: Localization
    if (lng) {
      local = getLocalizationProps({ params: { lang: lng } }, 'user') as Localization
    } else {
      local = {
        locale: 'es', // default lang
        translations: defaultStrings.common, // default translations TODO: what to do here?
        namespace: 'common'
      } as Localization
    }
    return local
  }

  return (
    <ApolloProvider client={Client}>
      <ThemeContext.Provider value={{ theme, toggleTheme, collapsed, toggleCollapsed }}>
        <DataProvider>
          <AuthProvider>
            <ProtectRoute router={router}>
              <LanguageProvider localization={getLenguaje(pageProps.lang)}>
                <Component {...pageProps} />
              </LanguageProvider>
            </ProtectRoute>
          </AuthProvider>
        </DataProvider>
      </ThemeContext.Provider>
    </ApolloProvider>
  )
}

MyApp.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext)
  appProps.pageProps.lang = appContext.router.query.lang
  return { ...appProps }
}

export default MyApp
