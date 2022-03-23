import ManageRol from '@/components/Dashboard/ManageRol'
import { Localization } from '@/i18n/types'
import { SecurityProvider } from '@/providers/SecurityContext'
import { GetServerSidePropsContext } from 'next'
import React from 'react'
import { getLocalizationProps } from '../../../providers/LenguageContext'
const index = ({ localization, lang }: { localization: Localization; lang: string }) => {
  return (
    <SecurityProvider translate={localization.translations} lang={lang}>
      <ManageRol translate={localization.translations} />
    </SecurityProvider>
  )
}

export default React.memo(index)
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const localization = getLocalizationProps(ctx, 'dashboard')

  return { props: { localization } }
}
