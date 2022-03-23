//react
//Components
import CreateItem from '@/components/crudFunctions/create'
import MainLayout from '@/components/layout/Layout'
import columns from '@/components/masterLocation/columns'
import { formElements } from '@/components/masterLocation/formElements'
import FormItems from '@/components/masterLocation/formItem'
import TableData from '@/components/TableDatas'
import { createMasterLocation } from '@/graphql/masterLocations/mutation/createMasterLocation'
//types
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
//Context
import { getLocalizationProps } from '@/providers/LenguageContext'
import { getAllLocationActive } from '@/services/locations'
import { getAllMasterLocationActive } from '@/services/masterLocations'
import { ILocation, IMasterLocation, PermissionsPrivilege } from '@/types/types'
import { gql } from '@apollo/client'
//next
import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useEffect, useState } from 'react'

interface actualItem extends IMasterLocation {}
const visitorCategory = (props: { localization: Localization; lang: string }) => {
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
    setActualPermission(permission.permissions?.find(e => e.sectionName === 'MasterLocation'))
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
    setdata(await getAllMasterLocationActive())
    setLocations(await getAllLocationActive())
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
            mutation={gql(createMasterLocation)}
            formElements={formElements(locations)}
            FormItem={<FormItems isUpdate={true} translations={localization.translations} locations={locations} />}
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
            locations: locations,
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

export default React.memo(visitorCategory)

export const getStaticProps: GetStaticProps = async ctx => {
  const localization = getLocalizationProps(ctx, 'masterLocation')
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
