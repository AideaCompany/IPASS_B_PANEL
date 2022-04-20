//react
//Components
import columns from '@/components/styleHair/columns'
import { formElements } from '@/components/styleHair/formElements'
import FormItems from '@/components/styleHair/formItem'
import CreateItem from '@/components/crudFunctions/create'
import MainLayout from '@/components/layout/Layout'
import TableData from '@/components/TableDatas'
import { createStyleHair } from '@/graphql/styleHair/mutations/createStyleHair'
//types
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
//Context
import { getLocalizationProps } from '@/providers/LenguageContext'
import { getAllstyleHair } from '@/services/styleHair'
import { IstyleHair, ILocation, PermissionsPrivilege } from '@/types/types'
import { gql } from '@apollo/client'
//next
import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useEffect, useState } from 'react'

interface actualItem extends IstyleHair {}
const styleHair = (props: { localization: Localization; lang: string }) => {
  //props
  const { localization, lang } = props

  //states
  const [actualPermission, setActualPermission] = useState<PermissionsPrivilege>()
  const [data, setdata] = useState<actualItem[]>([])
  const [locations, setLocations] = useState<ILocation[]>([])
  const [loading, setloading] = useState<boolean>(true)
  //providers
  const { permission } = useAuth()
  //Effect
  useEffect(() => {
    setActualPermission(permission.permissions?.find(e => e.sectionName === 'styleHair'))
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
    setdata(await getAllstyleHair())
    setloading(false)
  }

  return (
    <>
      <MainLayout
        create={
          <CreateItem
            iconButton={true}
            actualPermission={actualPermission as PermissionsPrivilege}
            translations={localization.translations}
            mutation={gql(createStyleHair)}
            formElements={formElements()}
            FormItem={<FormItems isUpdate={true} translations={localization.translations} />}
            afterCreate={getData}

            /* manageMentError={manageMentError} */
          />
        }
        getData={getData}
        lang={lang}
        title={localization?.translations.titleSection}
      >
        <TableData
          columns={columns({
            translations: localization.translations,
            actualPermission: actualPermission as PermissionsPrivilege,
            permision: permission,

            lang: lang,
            after: getData
          })}
          data={data}
          loading={loading}
        />
      </MainLayout>
    </>
  )
}

export default React.memo(styleHair)

export const getStaticProps: GetStaticProps = async ctx => {
  const localization = getLocalizationProps(ctx, 'styleHair')
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