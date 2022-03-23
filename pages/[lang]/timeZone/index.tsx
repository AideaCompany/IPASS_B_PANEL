//react
//Components
import MainLayout from '@/components/layout/Layout'
import TableData from '@/components/TableDatas'
import columns from '@/components/timeZone/columns'
import { formElements } from '@/components/timeZone/formElements'
import CreateItem from '@/components/crudFunctions/create'

//types
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
//Context
import { getLocalizationProps } from '@/providers/LenguageContext'
import { listTimeZonesFn } from '@/services/timeZone'
/* import { getAllAuthenticator } from '@/services/risk' */
import { iTimeZone, PermissionsPrivilege } from '@/types/types'
//next
import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { createTimeZone } from '@/graphql/timeZone/mutations/createTimeZone'
import FormItems from '@/components/timeZone/formItem'
import moment from 'moment-timezone'

interface actualItem extends iTimeZone {}
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
    setActualPermission(permission.permissions?.find(e => e.sectionName === 'timeZone'))
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
    const listData = await listTimeZonesFn()
    setdata(listData.map(e => ({ ...e, start: moment(e.start, 'HH:mm'), end: moment(e.end, 'HH:mm') })))
    setloading(false)
  }

  const beforeCreate = (data: iTimeZone) => {
    data.start = data.start.format('HH:mm')
    data.end = data.end.format('HH:mm')
    return data
  }

  return (
    <>
      <MainLayout
        create={
          <CreateItem
            iconButton={true}
            actualPermission={actualPermission as PermissionsPrivilege}
            translations={localization.translations}
            mutation={gql(createTimeZone)}
            formElements={formElements()}
            afterCreate={getData}
            beforeCreate={beforeCreate}
            FormItem={<FormItems translations={localization.translations} />}
            /* manageMentError={manageMentError} */
          />
        }
        getData={getData}
        lang={lang}
        title={localization?.translations.titleSection}
        hideButtons={false}
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

export default React.memo(visitorCategory)

export const getStaticProps: GetStaticProps = async ctx => {
  const localization = getLocalizationProps(ctx, 'timeZone')
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
