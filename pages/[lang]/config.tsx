import React from 'react'
//components
import MainLayout from '../../components/layout/Layout'
import ConfigComponent from '../../components/layout/config'
//types
import { Localization } from 'i18n/types'
import { getLocalizationProps } from '@/providers/LenguageContext'
import { GetStaticPaths, GetStaticProps } from 'next'
//provider
// import useData from '@/providers/DataContext'
import useAuth from '@/providers/AuthContext'

const Config = (props: { localization: Localization; lang: string }) => {
  //provicer
  const { permission } = useAuth()

  return (
    <MainLayout lang={props.lang} title={props.localization.translations.config}>
      <ConfigComponent permissions={permission} localization={props.localization} />
    </MainLayout>
  )
}

export default Config

export const getStaticProps: GetStaticProps = async ctx => {
  const localization = getLocalizationProps(ctx, 'auth')
  return {
    props: {
      localization
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ['es', 'en'].map(lang => ({ params: { lang } })),
    fallback: false
  }
}
