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

import { IVisitorCategory, PermissionsPrivilege } from '@/types/types'
import { gql } from '@apollo/client'
//next
import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useEffect, useState } from 'react'
import { getAllApps } from '@/services/apps'
import { createApps } from '@/graphql/apps/mutation/createApps'

interface actualItem extends IVisitorCategory {}
const visitorCategory = (props: { localization: Localization; lang: string }) => {
  //props
  const { localization, lang } = props

  //states
  const [actualPermission, setActualPermission] = useState<PermissionsPrivilege>()
  const [data, setdata] = useState<actualItem[]>([])
  const [loading, setloading] = useState<boolean>(true)
  //providers
  const { permission } = useAuth()
  //Effect
  useEffect(() => {
    setActualPermission(permission.permissions?.find(e => e.sectionName === 'Apps'))
  }, [permission])

  useEffect(() => {
    ;(async () => {
      if (actualPermission) {
        getData()
      }
    })()
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
            actualPermission={actualPermission as PermissionsPrivilege}
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
            actualPermission: actualPermission as PermissionsPrivilege,
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

export const getStaticProps: GetStaticProps = async ctx => {
  const localization = getLocalizationProps(ctx, 'apps')
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
