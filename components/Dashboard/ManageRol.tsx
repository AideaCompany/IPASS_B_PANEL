import MainLayout from '@/components/layout/Layout'
import { Translations } from '@/i18n/types'
import useSecurity from '@/providers/SecurityContext'
import React from 'react'
import SecurityScreen from './SecurityScreen'

const ManageRol = ({ translate }: { translate: Translations }) => {
  const { lang } = useSecurity()
  return (
    <MainLayout layoutMargin={{ margin: '0px 0px' }} notShowHeader hideButtons lang={lang} title={`Seguridad`}>
      <SecurityScreen translate={translate} />
    </MainLayout>
  )
}

export default ManageRol
