import MainLayout from '@/components/layout/Layout'
import MainSuperAdmin from '@/components/location/view/super_admin/MainSuperAdmin'
import useAuth from '@/providers/AuthContext'
import useLocationView from '@/providers/ViewLocationContext'
import React from 'react'

const ManagePermission = () => {
  const { permission } = useAuth()
  const { actualLocation, lang, translate } = useLocationView()
  return (
    <MainLayout hideButtons={true} lang={lang} title={`${translate.titleModalUpdate} ${actualLocation?.name}`}>
      <>{permission?.name === 'Super_admin' && <MainSuperAdmin />}</>
    </MainLayout>
  )
}

export default React.memo(ManagePermission)
