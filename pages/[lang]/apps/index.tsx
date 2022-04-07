//react
//Components
import MainLayout from '@/components/layout/Layout'
import TableData from '@/components/TableDatas'
import columns from '@/components/apps/columns'
import { formElements } from '@/components/apps/formElements'
import FormItems from '@/components/apps/formItem'
import CreateItem from '@/components/crudFunctions/create'
//types
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
//Context
import { getLocalizationProps } from '@/providers/LenguageContext'

import { gql } from '@apollo/client'
//next
import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useEffect, useState } from 'react'
import { getAllApps } from '@/services/apps'
import { createApps } from '@/graphql/apps/mutation/createApps'
import { IVisitorCategory } from '@/types/interfaces/VisitorCategory/VisitorCategory.interface'
import { IPermissionsPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'

type actualItem = IVisitorCategory
const visitorCategory = (props: { localization: Localization; lang: string }) => {
  //props
  const { localization, lang } = props

  //states
  const [actualPermission, setActualPermission] = useState<IPermissionsPrivilege>()
  const [data, setdata] = useState<actualItem[]>([])
  const [loading, setloading] = useState<boolean>(true)
  //providers
  const { permission } = useAuth()
  //Effect
  useEffect(() => {
    setActualPermission(permission.permissions?.find(e => e.sectionName === 'Apps'))
  }, [permission])

  useEffect(() => {
    if (actualPermission) {
      getData()
    }
  }, [actualPermission])

  const getData = async () => {
    setloading(true)
    setdata(await getAllApps())
    setloading(false)
  }

  return (
    <>
      <MainLayout
        create={
          <CreateItem
            iconButton={true}
            afterCreate={getData}
            actualPermission={actualPermission as IPermissionsPrivilege}
            translations={localization.translations}
            mutation={gql(createApps)}
            formElements={formElements()}
            FormItem={<FormItems translations={localization.translations} />}
            /* manageMentError={manageMentError} */
          />
        }
        getData={getData}
        lang={lang}
        title={localization?.translations.titleSection}
      >
        <TableData
          columns={columns({
            after: getData,
            translations: localization.translations,
            actualPermission: actualPermission as IPermissionsPrivilege,
            permision: permission,
            lang: lang
          })}
          data={data}
          loading={loading}
        />
      </MainLayout>
    </>
  )
}

export default React.memo(visitorCategory)

export const getStaticProps: GetStaticProps = ctx => {
  const localization = getLocalizationProps(ctx, 'apps')
  return {
    props: {
      localization
    }
  }
}
export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: ['es', 'en'].map(lang => ({ params: { lang } })),
    fallback: false
  }
}
